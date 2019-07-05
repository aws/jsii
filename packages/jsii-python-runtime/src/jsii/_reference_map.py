# This module exists to break an import cycle between jsii.runtime and jsii.kernel
import inspect

from typing import Any, MutableMapping

from ._kernel.types import JSClass, Referenceable


_types = {}
_data_types: MutableMapping[str, Any] = {}
_enums: MutableMapping[str, Any] = {}
_interfaces: MutableMapping[str, Any] = {}


def register_type(klass: JSClass):
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

    def register(self, inst: Referenceable):
        self._refs[inst.__jsii_ref__.ref] = inst

    def resolve(self, kernel, ref):
        # First we need to check our reference map to see if we have any instance that
        # already matches this reference.
        try:
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
        elif class_fqn in _data_types:
            # Data types have been serialized by-reference (see aws/jsii#400).
            # We retrieve all of its properties right now and then construct a value
            # object from it. This will be slow :(.

            # Ugly delayed import here because I can't solve the cyclic
            # package dependency right now :(.
            from ._runtime import python_jsii_mapping

            data_type = _data_types[class_fqn]
            remote_struct = _FakeReference(ref)

            python_props = {python_name: kernel.get(remote_struct, jsii_name)
                    for python_name, jsii_name in python_jsii_mapping(data_type).items()}

            return data_type(**python_props)
        elif class_fqn in _enums:
            inst = _enums[class_fqn]
        elif class_fqn in _interfaces:
            # Get our proxy class by finding our interface, then asking it to give us
            # the proxy class.
            iface = _interfaces[class_fqn]
            klass = iface.__jsii_proxy_class__()

            # Create our instance, bypassing __init__ by directly calling __new__, and
            # then assign our reference to __jsii_ref__
            inst = klass.__new__(klass)
            inst.__jsii_ref__ = ref
        else:
            raise ValueError(f"Unknown type: {class_fqn}")

        return inst

    def resolve_id(self, id):
        return self._refs[id]


_refs = _ReferenceMap(_types)


register_reference = _refs.register
resolve_reference = _refs.resolve
resolve_id = _refs.resolve_id
