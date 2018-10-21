# This module exists to break an import cycle between jsii.runtime and jsii.kernel
import weakref

from ._kernel.types import JSClass, Referenceable


_types = {}


def register_type(klass: JSClass):
    _types[klass.__jsii_type__] = klass


class _ReferenceMap:
    def __init__(self, types):
        self._refs = weakref.WeakValueDictionary()
        self._types = types

    def register(self, inst: Referenceable):
        self._refs[inst.__jsii_ref__.ref] = inst

    def resolve(self, ref):
        # First we need to check our reference map to see if we have any instance that
        # already matches this reference.
        try:
            return self._refs[ref.ref]
        except KeyError:
            pass

        # If we got to this point, then we didn't have a referene for this, in that case
        # we want to create a new instance, but we need to create it in such a way that
        # we don't try to recreate the type inside of the JSII interface.
        klass = _types[ref.ref.rsplit("@", 1)[0]]

        # Create our instance, bypassing __init__ by directly calling __new__, and then
        # assign our reference to __jsii_ref__
        inst = klass.__new__(klass)
        inst.__jsii_ref__ = ref

        return inst


_refs = _ReferenceMap(_types)


register_reference = _refs.register
resolve_reference = _refs.resolve
