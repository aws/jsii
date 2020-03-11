import abc
import builtins
import datetime
import enum
import publication
import typing

import jsii
import jsii.compat

import scope.jsii_calc_base
import scope.jsii_calc_base_of_base
import scope.jsii_calc_lib

__jsii_assembly__ = jsii.JSIIAssembly.load("jsii-calc", "1.0.0", "jsii_calc", "jsii-calc@1.0.0.jsii.tgz")


@jsii.interface(jsii_type="jsii-calc.erasureTests.IJSII417Derived")
class IJSII417Derived(jsii_calc.erasureTests.IJSII417PublicBaseOfBase, jsii.compat.Protocol):
    """
    stability
    :stability: experimental
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IJSII417DerivedProxy

    @builtins.property
    @jsii.member(jsii_name="property")
    def property(self) -> str:
        """
        stability
        :stability: experimental
        """
        ...

    @jsii.member(jsii_name="bar")
    def bar(self) -> None:
        """
        stability
        :stability: experimental
        """
        ...

    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        """
        stability
        :stability: experimental
        """
        ...


class _IJSII417DerivedProxy(jsii.proxy_for(jsii_calc.erasureTests.IJSII417PublicBaseOfBase)):
    """
    stability
    :stability: experimental
    """
    __jsii_type__ = "jsii-calc.erasureTests.IJSII417Derived"
    @builtins.property
    @jsii.member(jsii_name="property")
    def property(self) -> str:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "property")

    @jsii.member(jsii_name="bar")
    def bar(self) -> None:
        """
        stability
        :stability: experimental
        """
        return jsii.invoke(self, "bar", [])

    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        """
        stability
        :stability: experimental
        """
        return jsii.invoke(self, "baz", [])


@jsii.interface(jsii_type="jsii-calc.erasureTests.IJSII417PublicBaseOfBase")
class IJSII417PublicBaseOfBase(jsii.compat.Protocol):
    """
    stability
    :stability: experimental
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IJSII417PublicBaseOfBaseProxy

    @builtins.property
    @jsii.member(jsii_name="hasRoot")
    def has_root(self) -> bool:
        """
        stability
        :stability: experimental
        """
        ...

    @jsii.member(jsii_name="foo")
    def foo(self) -> None:
        """
        stability
        :stability: experimental
        """
        ...


class _IJSII417PublicBaseOfBaseProxy():
    """
    stability
    :stability: experimental
    """
    __jsii_type__ = "jsii-calc.erasureTests.IJSII417PublicBaseOfBase"
    @builtins.property
    @jsii.member(jsii_name="hasRoot")
    def has_root(self) -> bool:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "hasRoot")

    @jsii.member(jsii_name="foo")
    def foo(self) -> None:
        """
        stability
        :stability: experimental
        """
        return jsii.invoke(self, "foo", [])


@jsii.interface(jsii_type="jsii-calc.erasureTests.IJsii487External")
class IJsii487External(jsii.compat.Protocol):
    """
    stability
    :stability: experimental
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IJsii487ExternalProxy

    pass

class _IJsii487ExternalProxy():
    """
    stability
    :stability: experimental
    """
    __jsii_type__ = "jsii-calc.erasureTests.IJsii487External"
    pass

@jsii.interface(jsii_type="jsii-calc.erasureTests.IJsii487External2")
class IJsii487External2(jsii.compat.Protocol):
    """
    stability
    :stability: experimental
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IJsii487External2Proxy

    pass

class _IJsii487External2Proxy():
    """
    stability
    :stability: experimental
    """
    __jsii_type__ = "jsii-calc.erasureTests.IJsii487External2"
    pass

@jsii.interface(jsii_type="jsii-calc.erasureTests.IJsii496")
class IJsii496(jsii.compat.Protocol):
    """
    stability
    :stability: experimental
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IJsii496Proxy

    pass

class _IJsii496Proxy():
    """
    stability
    :stability: experimental
    """
    __jsii_type__ = "jsii-calc.erasureTests.IJsii496"
    pass

class JSII417Derived(jsii_calc.erasureTests.JSII417PublicBaseOfBase, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.erasureTests.JSII417Derived"):
    """
    stability
    :stability: experimental
    """
    def __init__(self, property: str) -> None:
        """
        :param property: -

        stability
        :stability: experimental
        """
        jsii.create(jsii_calc.erasureTests.JSII417Derived, self, [property])

    @jsii.member(jsii_name="bar")
    def bar(self) -> None:
        """
        stability
        :stability: experimental
        """
        return jsii.invoke(self, "bar", [])

    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        """
        stability
        :stability: experimental
        """
        return jsii.invoke(self, "baz", [])

    @builtins.property
    @jsii.member(jsii_name="property")
    def _property(self) -> str:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "property")


class JSII417PublicBaseOfBase(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.erasureTests.JSII417PublicBaseOfBase"):
    """
    stability
    :stability: experimental
    """
    def __init__(self) -> None:
        jsii.create(jsii_calc.erasureTests.JSII417PublicBaseOfBase, self, [])

    @jsii.member(jsii_name="makeInstance")
    @builtins.classmethod
    def make_instance(cls) -> jsii_calc.erasureTests.JSII417PublicBaseOfBase:
        """
        stability
        :stability: experimental
        """
        return jsii.sinvoke(cls, "makeInstance", [])

    @jsii.member(jsii_name="foo")
    def foo(self) -> None:
        """
        stability
        :stability: experimental
        """
        return jsii.invoke(self, "foo", [])

    @builtins.property
    @jsii.member(jsii_name="hasRoot")
    def has_root(self) -> bool:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "hasRoot")


@jsii.implements(jsii_calc.erasureTests.IJsii487External2, jsii_calc.erasureTests.IJsii487External)
class Jsii487Derived(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.erasureTests.Jsii487Derived"):
    """
    stability
    :stability: experimental
    """
    def __init__(self) -> None:
        jsii.create(jsii_calc.erasureTests.Jsii487Derived, self, [])


@jsii.implements(jsii_calc.erasureTests.IJsii496)
class Jsii496Derived(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.erasureTests.Jsii496Derived"):
    """
    stability
    :stability: experimental
    """
    def __init__(self) -> None:
        jsii.create(jsii_calc.erasureTests.Jsii496Derived, self, [])


__all__ = ["IJSII417Derived", "IJSII417PublicBaseOfBase", "IJsii487External", "IJsii487External2", "IJsii496", "JSII417Derived", "JSII417PublicBaseOfBase", "Jsii487Derived", "Jsii496Derived", "__jsii_assembly__"]

publication.publish()
