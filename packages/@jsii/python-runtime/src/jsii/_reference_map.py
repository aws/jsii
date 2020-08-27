# This module exists to break an import cycle between jsii.runtime and jsii.kernel
import inspect

from typing import Any, MutableMapping, Type


_types = {}
_data_types: MutableMapping[str, Any] = {}
_enums: MutableMapping[str, Any] = {}
_interfaces: MutableMapping[str, Any] = {}


def register_type(klass: Type):
    _types[klass.__jsii_type__] = klass


def register_data_type(data_type: Any):
    _data_types[data_type.__jsii_type__] = data_type


def register_enum(enum_type: Any):
    _enums[enum_type.__jsii_type__] = enum_type


def register_interface(iface: Any):
    _interfaces[iface.__jsii_type__] = iface


class _FakeReference:
    def __init__(self, ref: str) -> None:
        self.__jsii_ref__ = ref


class _ReferenceMap:
    def __init__(self, types):
        # We are using a real dictionary here instead of a WeakValueDictionary because
        # the nature of the JSII is such that we can never free the memory of JSII
        # objects ever, because we have no idea how many references exist on the *other*
        # side.
        self._refs = {}
        self._types = types

    def register(self, inst: Any):
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
                for python_name, jsii_name in python_jsii_mapping(data_type).items()
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
                insts = [
                    struct(
                        **{
                            python_name: kernel.get(remote_struct, jsii_name)
                            for python_name, jsii_name in python_jsii_mapping(
                                struct
                            ).items()
                        }
                    )
                    for struct in structs
                ]
                return StructDynamicProxy(insts)
            else:
                return InterfaceDynamicProxy(self.build_interface_proxies_for_ref(ref))
        else:
            raise ValueError(f"Unknown type: {class_fqn}")

    def resolve_id(self, id):
        return self._refs[id]

    def build_interface_proxies_for_ref(self, ref):
        ifaces = [_interfaces[fqn] for fqn in ref.interfaces or []]
        classes = [iface.__jsii_proxy_class__() for iface in ifaces]
        insts = [klass.__new__(klass) for klass in classes]
        for inst in insts:
            inst.__jsii_ref__ = ref
        return insts


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
            return super.__setattr__(self, name, value)
        for delegate in self._delegates:
            if hasattr(delegate, name):
                return setattr(delegate, name, value)
        type_info = "+".join([str(delegate.__class__) for delegate in self._delegates])
        raise AttributeError(f"'%s' object has no attribute '%s'" % (type_info, name))


class StructDynamicProxy(object):
    def __init__(self, delegates):
        self._delegates = delegates

    def __getattr__(self, name):
        for delegate in self._delegates:
            if hasattr(delegate, name):
                return getattr(delegate, name)
        type_info = "+".join([str(delegate.__class__) for delegate in self._delegates])
        raise AttributeError("'%s' object has no attribute '%s'" % (type_info, name))

    def __setattr__(self, name, value):
        if name == "_delegates":
            return super.__setattr__(self, name, value)
        for delegate in self._delegates:
            if hasattr(delegate, name):
                return setattr(delegate, name, value)
        type_info = "+".join([str(delegate.__class__) for delegate in self._delegates])
        raise AttributeError(f"'%s' object has no attribute '%s'" % (type_info, name))

    def __eq__(self, rhs) -> bool:
        if len(self._delegates) == 1:
            return rhs == self._delegates[0]
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        if len(self._delegates) == 1:
            return self._delegates[0].__repr__()
        return "%s(%s)" % (
            " & ".join(
                [delegate.__class__.__jsii_type__ for delegate in self._delegates]
            ),
            ", ".join(k + "=" + repr(v) for k, v in self._values.items()),
        )


_refs = _ReferenceMap(_types)


register_reference = _refs.register
resolve_reference = _refs.resolve
resolve_id = _refs.resolve_id
