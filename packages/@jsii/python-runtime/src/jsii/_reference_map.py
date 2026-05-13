# This module exists to break an import cycle between jsii.runtime and jsii.kernel
import importlib
import inspect

from typing import Any, Iterable, List, Mapping, MutableMapping, Type
from ._kernel.types import ObjRef


_types = {}
_data_types: MutableMapping[str, Any] = {}
_enums: MutableMapping[str, Any] = {}
_interfaces: MutableMapping[str, Any] = {}

# Mapping from jsii assembly name to Python root module name, populated by
# JSIIAssembly.load() so that on-demand type resolution can trigger imports
# of lazily-loaded submodules when the kernel returns an unknown type.
_assembly_to_module: MutableMapping[str, str] = {}


def register_type(klass: Type):
    _types[klass.__jsii_type__] = klass


def register_data_type(data_type: Any):
    _data_types[data_type.__jsii_type__] = data_type


def register_enum(enum_type: Any):
    _enums[enum_type.__jsii_type__] = enum_type


def register_interface(iface: Any):
    _interfaces[iface.__jsii_type__] = iface


def _try_import_type_module(class_fqn: str) -> bool:
    """Attempt to import the Python module containing a jsii type by FQN.

    With PEP 562 lazy loading, submodules are not imported until first attribute
    access. If the jsii runtime needs to deserialize a type from a submodule
    that hasn't been imported yet (e.g., a callback returns an object whose type
    lives in an unloaded submodule), this function triggers the import so that
    the type self-registers with the runtime.

    The FQN format is: ``assembly_name.submodule.path.TypeName``
    We strip the type name (last dot-separated component) and try to import
    progressively shorter module paths until one succeeds.

    Returns True if an import was successfully triggered, False otherwise.
    """
    # Split FQN into components: e.g. "jsii-calc.cdk16625.donotimport.MyType"
    parts = class_fqn.split(".")
    if len(parts) < 2:
        return False

    # The first component is the assembly name
    assembly_name = parts[0]
    root_module = _assembly_to_module.get(assembly_name)
    if root_module is None:
        return False

    # Try importing submodule paths from most specific to least specific
    # e.g. for "jsii-calc.cdk16625.donotimport.MyType":
    #   try: jsii_calc.cdk16625.donotimport
    #   try: jsii_calc.cdk16625
    submodule_parts = parts[1:]  # Remove assembly name
    for depth in range(len(submodule_parts), 0, -1):
        module_path = f"{root_module}.{'.'.join(submodule_parts[:depth])}"
        try:
            importlib.import_module(module_path)
            return True
        except (ImportError, ModuleNotFoundError):
            continue

    return False


class _FakeReference:
    def __init__(self, ref: str) -> None:
        self.__jsii_ref__ = ref


class _ReferenceMap:
    def __init__(self, types: Mapping[str, Type]) -> None:
        # We are using a real dictionary here instead of a WeakValueDictionary because
        # the nature of the JSII is such that we can never free the memory of JSII
        # objects ever, because we have no idea how many references exist on the *other*
        # side.
        self._refs: MutableMapping[str, Any] = {}
        self._types = types

    def register(self, inst: Any) -> None:
        self._refs[inst.__jsii_ref__.ref] = inst

    def resolve(self, kernel, ref):
        # First we need to check our reference map to see if we have any instance that
        # already matches this reference.
        try:
            # TODO: Handle discovery of possible new interfaces on the ObjRef
            return self._refs[ref.ref]
        except KeyError:
            pass

        # If we got to this point, then we didn't have a referene for this, in that case
        # we want to create a new instance, but we need to create it in such a way that
        # we don't try to recreate the type inside of the JSII interface.
        class_fqn = ref.ref.rsplit("@", 1)[0]
        if class_fqn in _types:
            klass = _types[class_fqn]

            # If this class is an abstract class, then we'll use the generated proxy
            # class instead of the abstract class to handle return values for this type.
            if inspect.isabstract(klass):
                klass = klass.__jsii_proxy_class__()

            # Create our instance, bypassing __init__ by directly calling __new__, and
            # then assign our reference to __jsii_ref__
            inst = klass.__new__(klass)
            inst.__jsii_ref__ = ref

            if ref.interfaces is not None:
                return InterfaceDynamicProxy(
                    [inst] + self.build_interface_proxies_for_ref(ref)
                )
            else:
                return inst

        # Legacy code path - Kernel invariant ought to guarantee that class_fqn can't be Struct (they're interfaces)
        elif class_fqn in _data_types:
            # Data types have been serialized by-reference (see aws/jsii#400).
            # We retrieve all of its properties right now and then construct a value
            # object from it. This will be slow :(.

            # Ugly delayed import here because I can't solve the cyclic
            # package dependency right now :(.
            from ._runtime import python_jsii_mapping

            data_type = _data_types[class_fqn]
            remote_struct = _FakeReference(ref)

            python_props = {
                python_name: kernel.get(remote_struct, jsii_name)
                for python_name, jsii_name in (
                    python_jsii_mapping(data_type) or {}
                ).items()
            }

            return data_type(**python_props)
        elif class_fqn in _enums:
            return _enums[class_fqn]
        elif class_fqn == "Object":
            # If any one interface is a struct, all of them are guaranteed to be (Kernel invariant)
            if ref.interfaces is not None and any(
                fqn in _data_types for fqn in ref.interfaces
            ):
                # Ugly delayed import here because I can't solve the cyclic
                # package dependency right now :(.
                from ._runtime import python_jsii_mapping

                structs = [_data_types[fqn] for fqn in ref.interfaces]
                remote_struct = _FakeReference(ref)

                if len(structs) == 1:
                    struct = structs[0]
                else:
                    struct = new_combined_struct(structs)

                return struct(
                    **{
                        python_name: kernel.get(remote_struct, jsii_name)
                        for python_name, jsii_name in (
                            python_jsii_mapping(struct) or {}
                        ).items()
                    }
                )
            else:
                return InterfaceDynamicProxy(self.build_interface_proxies_for_ref(ref))
        else:
            # The type isn't registered yet. With lazy loading, it may live in
            # a submodule that hasn't been imported. Try importing the module
            # that should contain this type — importing triggers type
            # registration as a side effect — then retry the lookup.
            if _try_import_type_module(class_fqn):
                if class_fqn in _types:
                    return self.resolve(kernel, ref)
                elif class_fqn in _data_types:
                    return self.resolve(kernel, ref)
                elif class_fqn in _enums:
                    return self.resolve(kernel, ref)
            raise ValueError(f"Unknown type: {class_fqn}")

    def resolve_id(self, id: str) -> Any:
        return self._refs[id]

    def build_interface_proxies_for_ref(self, ref: ObjRef) -> List[Any]:
        ifaces = [_interfaces[fqn] for fqn in ref.interfaces or []]
        classes = [iface.__jsii_proxy_class__() for iface in ifaces]

        # If there's no classes, use an Opaque reference to make sure the
        # __jsii_ref__ property is visible through the InterfaceDynamicProxy.
        if len(classes) == 0:
            return [Opaque(ref)]

        insts = [klass.__new__(klass) for klass in classes]
        for inst in insts:
            inst.__jsii_ref__ = ref
        return insts


class Opaque:
    def __init__(self, ref: ObjRef) -> None:
        # Set the __jsii_type__ property on the class if it's not there already
        if getattr(self.__class__, "__jsii_type__", None) is None:
            setattr(self.__class__, "__jsii_type__", "Object")

        # Track the jsii reference
        self.__jsii_ref__ = ref


class InterfaceDynamicProxy(object):
    def __init__(self, delegates):
        self._delegates = delegates

    def __getattr__(self, name):
        for delegate in self._delegates:
            if hasattr(delegate, name):
                return getattr(delegate, name)
        type_info = "+".join([str(delegate.__class__) for delegate in self._delegates])
        raise AttributeError(f"'%s' object has no attribute '%s'" % (type_info, name))

    def __setattr__(self, name, value):
        if name == "_delegates":
            return super().__setattr__(name, value)
        for delegate in self._delegates:
            if hasattr(delegate, name):
                return setattr(delegate, name, value)
        type_info = "+".join([str(delegate.__class__) for delegate in self._delegates])
        raise AttributeError(f"'%s' object has no attribute '%s'" % (type_info, name))


def new_combined_struct(structs: Iterable[Type]) -> Type:
    label = " + ".join(struct.__name__ for struct in structs)

    def __init__(self, **kwargs):
        self._values = kwargs

    def __eq__(self, rhs: Any) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs: Any) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return f"<{label}>({', '.join(k + '=' + repr(v) for k, v in self._values.items())})"

    return type(
        label,
        (*structs,),
        {
            "__init__": __init__,
            "__eq__": __eq__,
            "__ne__": __ne__,
            "__repr__": __repr__,
        },
    )


_refs = _ReferenceMap(_types)


register_reference = _refs.register
resolve_reference = _refs.resolve
resolve_id = _refs.resolve_id
