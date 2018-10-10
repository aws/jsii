# This module exists to break an import cycle between jsii.runtime and jsii.kernel
import weakref


_types = {}


def register_type(type_, obj):
    _types[type_] = obj


class _ReferenceMap:
    def __init__(self, types):
        self._refs = weakref.WeakValueDictionary()
        self._types = types

    def register(self, ref, inst):
        self._refs[ref] = inst

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
        class_ = _types[ref.ref.rsplit("@", 1)[0]]
        return class_.__class__.from_reference(class_, ref)


_refs = _ReferenceMap(_types)


register_reference = _refs.register
resolve_reference = _refs.resolve
