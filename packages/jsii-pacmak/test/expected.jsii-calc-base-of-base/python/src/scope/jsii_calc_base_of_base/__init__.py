import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

__jsii_assembly__ = jsii.JSIIAssembly.load("@scope/jsii-calc-base-of-base", "0.21.2", __name__, "jsii-calc-base-of-base@0.21.2.jsii.tgz")


@jsii.interface(jsii_type="@scope/jsii-calc-base-of-base.IVeryBaseInterface")
class IVeryBaseInterface(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IVeryBaseInterfaceProxy

    @jsii.member(jsii_name="foo")
    def foo(self) -> None:
        ...


class _IVeryBaseInterfaceProxy():
    __jsii_type__ = "@scope/jsii-calc-base-of-base.IVeryBaseInterface"
    @jsii.member(jsii_name="foo")
    def foo(self) -> None:
        return jsii.invoke(self, "foo", [])


class Very(metaclass=jsii.JSIIMeta, jsii_type="@scope/jsii-calc-base-of-base.Very"):
    def __init__(self) -> None:
        jsii.create(Very, self, [])

    @jsii.member(jsii_name="hey")
    def hey(self) -> jsii.Number:
        return jsii.invoke(self, "hey", [])


@jsii.data_type(jsii_type="@scope/jsii-calc-base-of-base.VeryBaseProps", jsii_struct_bases=[], name_mapping={'foo': 'foo'})
class VeryBaseProps():
    def __init__(self, *, foo: "Very"):
        """
        :param foo: -
        """
        self._values = {
            'foo': foo,
        }

    @builtins.property
    def foo(self) -> "Very":
        return self._values.get('foo')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'VeryBaseProps(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


__all__ = ["IVeryBaseInterface", "Very", "VeryBaseProps", "__jsii_assembly__"]

publication.publish()
