from typing import Any, Callable, Generic, Optional, Type, TypeVar, Union

T = TypeVar("T")


class _ClassProperty(Generic[T]):
    """
    A property on a class (rather than on an instance), holding a value of type `T`.
    """

    def __init__(
        self,
        fget: "classmethod[Any, [], T]",
        fset: "Optional[classmethod[Any, [T], None]]" = None,
    ):
        self.fget = fget
        self.fset = fset

    def __get__(self, obj: Any, klass: Optional[Type] = None) -> T:
        if klass is None:
            klass = type(obj)
        return self.fget.__get__(obj, klass)()

    def __set__(self, obj: Any, value: T) -> None:
        if self.fset is None:
            raise AttributeError("Can't set class property (no setter)")
        # `obj` is what the property was assigned on: the class for `Foo.prop = value`,
        # or an instance for `Foo().prop = value`. The setter is always called with the class.
        klass = obj if isinstance(obj, type) else type(obj)
        setter = self.fset.__get__(None, klass)  # the setter, with `cls` set to `klass`
        return setter(value)

    def setter(
        self, fset: "Union[Callable[[Any, T], None], classmethod[Any, [T], None]]"
    ) -> "_ClassProperty[T]":
        """
        Defines the setter for a class property
        """
        if not isinstance(fset, classmethod):
            fset = classmethod(fset)
        self.fset = fset
        return self


def classproperty(
    fget: "Union[Callable[[Any], T], classmethod[Any, [], T]]",
) -> _ClassProperty[T]:
    """
    Declares a new class property with the decorated getter.
    """
    if not isinstance(fget, classmethod):
        fget = classmethod(fget)
    return _ClassProperty(fget)


def _find_class_attribute(klass: type, name: str) -> Any:
    """
    Returns the attribute `name` as stored on `klass` or one of its base classes,
    or None if it isn't defined. Property getters are not run, so for a class
    property this returns the _ClassProperty object itself.
    """
    for cls in klass.__mro__:  # `klass` first, then its base classes in order
        if name in cls.__dict__:
            return cls.__dict__[name]
    return None


class _ClassPropertyMeta(type):
    """
    Makes `Foo.prop = value` call the setter of the class property `prop`.
    """

    def __setattr__(self, key: str, value: Any) -> None:
        attribute = _find_class_attribute(self, key)
        if isinstance(attribute, _ClassProperty):
            return attribute.__set__(self, value)

        return super().__setattr__(key, value)
