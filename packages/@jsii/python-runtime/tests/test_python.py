from typing import cast, Any, Optional
import jsii
import pytest
import re

from jsii.errors import JSIIError
import jsii_calc
from jsii_calc.module2702 import IVpc, Vpc, IBaz, Baz
from jsii_calc.jsii3656 import OverrideMe


class TestErrorHandling:
    def test_jsii_error(self):
        obj = jsii_calc.Calculator()

        with pytest.raises(
            JSIIError, match="Class jsii-calc.Calculator doesn't have a method"
        ):
            jsii.kernel.invoke(obj, "nonexistentMethod")

    def test_inheritance_maintained(self):
        """Check that for JSII struct types we can get the inheritance tree in some way."""
        # inspect.getmro() won't work because of TypedDict, but we add another annotation
        bases = find_struct_bases(jsii_calc.DerivedStruct)

        base_names = [b.__name__ for b in bases]

        assert base_names == ["DerivedStruct", "MyFirstStruct"]


class TestImplementsInterface:

    def test_jsii_proxy_class_defaults_to_none(self) -> None:
        @jsii.implements(IBaz)
        class MyBaz:
            pass

        klass = getattr(MyBaz, "__jsii_proxy_class__")()
        assert klass == None

    def test_jsii_proxy_class_preserves_user_defined_attribute(self) -> None:

        class _MyBazProxy:
            def baz_method(self) -> str:
                return "_MyBazProxy"

        @jsii.implements(IBaz)
        class MyBaz:

            @staticmethod
            def __jsii_proxy_class__():
                return _MyBazProxy

            def baz_method(self) -> str:
                return "MyBaz"

        klass = getattr(MyBaz, "__jsii_proxy_class__")()
        instance = klass()
        assert instance.baz_method() == "_MyBazProxy"

    def test_implements_interface(self) -> None:
        """Checks that jsii-generated classes correctly implement the relevant jsii-generated interfaces."""

        def vpc_interface_func(v: IVpc) -> None:
            assert v is not None

        vpc = Vpc()
        vpc_interface_func(vpc)

        def baz_interface_func(b: IBaz) -> None:
            assert b is not None

        baz = Baz()
        baz_interface_func(baz)


def test_overrides_method_with_kwargs() -> None:
    class Overridden(OverrideMe):
        def implement_me(
            self, *, name: str, count: Optional[jsii.Number] = None
        ) -> bool:
            return name == "John Doe" and count is None

    assert OverrideMe.call_abstract(Overridden())


def find_struct_bases(x):
    ret = []
    seen = set([])

    def recurse(s):
        if s not in seen:
            ret.append(s)
            seen.add(s)
            bases = getattr(s, "__jsii_struct_bases__", [])
            for base in bases:
                recurse(base)

    recurse(x)
    return ret
