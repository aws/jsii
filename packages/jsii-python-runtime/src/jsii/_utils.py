import functools

from typing import Any, Mapping, Type


class Singleton(type):

    _instances: Mapping[Type[Any], Any] = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)

        return cls._instances[cls]


def memoized_property(fgetter):
    stored = []

    @functools.wraps(fgetter)
    def wrapped(self):
        nonlocal stored
        if not stored:
            stored.append(fgetter(self))
        return stored[0]

    return property(wrapped)
