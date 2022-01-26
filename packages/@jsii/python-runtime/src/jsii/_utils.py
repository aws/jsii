import functools

from typing import Any, Callable, List, Mapping, Type, TypeVar


class Singleton(type):

    _instances: Mapping[Type[Any], Any] = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)

        return cls._instances[cls]


T = TypeVar("T", bound=Any)


def memoized_property(fgetter: Callable[[Any], T]) -> property:
    stored: List[T] = []

    @functools.wraps(fgetter)
    def wrapped(self):
        nonlocal stored
        if not stored:
            stored.append(fgetter(self))
        return stored[0]

    return property(wrapped)
