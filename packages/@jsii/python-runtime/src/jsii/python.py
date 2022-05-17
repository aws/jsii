from typing import Any


class _ClassProperty:
    def __init__(
        self,
        fget,
        fset=None,
    ) -> None:
        self.fget = fget
        if fset is not None:
            self.setter(fset)

    def __get__(self, obj, klass=None) -> Any:
        if klass is None:
            klass = type(obj)
        return self.fget.__get__(obj, klass)(klass)

    def __set__(self, obj, value) -> None:
        if not self.fset:
            raise AttributeError("Can't set attribute.")

        klass = type(obj)
        return self.fset.__get__(obj, klass)(value)

    def setter(
        self,
        func,
    ) -> "_ClassProperty":
        if not isinstance(func, (classmethod, staticmethod)):
            func = classmethod(func)

        self.fset = func

        return self


# The name `class_property` with the underscore is used because this is what
# will be causing PyCharm to consider the annotated member as a property.
def class_property(func) -> _ClassProperty:
    return _ClassProperty(func)


# Aliased to maintain backwards compatibility with code generated with <=1.52.2
classproperty = class_property


class _ClassPropertyMeta(type):
    def __setattr__(self, key, value) -> None:
        obj = getattr(self, key, None)
        if isinstance(obj, _ClassProperty):
            return obj.__set__(self, value)

        return super().__setattr__(key, value)
