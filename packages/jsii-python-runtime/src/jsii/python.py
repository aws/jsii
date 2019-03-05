class _ClassProperty:
    def __init__(self, fget, fset=None):
        self.fget = fget
        self.fset = fset

    def __get__(self, obj, klass=None):
        if klass is None:
            klass = type(obj)
        return self.fget.__get__(obj, klass)(klass)

    def __set__(self, obj, value):
        if not self.fset:
            raise AttributeError("Can't set attribute.")

        klass = type(obj)
        return self.fset.__get__(obj, klass)(value)

    def setter(self, func):
        if not isinstance(func, (classmethod, staticmethod)):
            func = classmethod(func)

        self.fset = func

        return self


def classproperty(func):
    return _ClassProperty(func)


class _ClassPropertyMeta(type):
    def __setattr__(self, key, value):
        obj = getattr(self, key, None)
        if isinstance(obj, _ClassProperty):
            return obj.__set__(self, value)

        return super().__setattr__(key, value)
