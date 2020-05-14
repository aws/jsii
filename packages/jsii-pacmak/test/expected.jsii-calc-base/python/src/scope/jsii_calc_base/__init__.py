import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

import scope.jsii_calc_base_of_base

from ._jsii import *


class Base(metaclass=jsii.JSIIAbstractClass, jsii_type="@scope/jsii-calc-base.Base"):
    """A base class."""
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _BaseProxy

    def __init__(self) -> None:
        jsii.create(Base, self, [])

    @jsii.member(jsii_name="typeName")
    def type_name(self) -> typing.Any:
        """
        return
        :return: the name of the class (to verify native type names are created for derived classes).
        """
        return jsii.invoke(self, "typeName", [])


class _BaseProxy(Base):
    pass

@jsii.data_type(jsii_type="@scope/jsii-calc-base.BaseProps", jsii_struct_bases=[scope.jsii_calc_base_of_base.VeryBaseProps], name_mapping={'foo': 'foo', 'bar': 'bar'})
class BaseProps(scope.jsii_calc_base_of_base.VeryBaseProps):
    def __init__(self, *, foo: scope.jsii_calc_base_of_base.Very, bar: str) -> None:
        """
        :param foo: -
        :param bar: -
        """
        self._values = {
            'foo': foo,
            'bar': bar,
        }

    @builtins.property
    def foo(self) -> scope.jsii_calc_base_of_base.Very:
        return self._values.get('foo')

    @builtins.property
    def bar(self) -> str:
        return self._values.get('bar')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'BaseProps(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


@jsii.interface(jsii_type="@scope/jsii-calc-base.IBaseInterface")
class IBaseInterface(scope.jsii_calc_base_of_base.IVeryBaseInterface, jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IBaseInterfaceProxy

    @jsii.member(jsii_name="bar")
    def bar(self) -> None:
        ...


class _IBaseInterfaceProxy(jsii.proxy_for(scope.jsii_calc_base_of_base.IVeryBaseInterface)):
    __jsii_type__ = "@scope/jsii-calc-base.IBaseInterface"
    @jsii.member(jsii_name="bar")
    def bar(self) -> None:
        return jsii.invoke(self, "bar", [])


__all__ = [
    "Base",
    "BaseProps",
    "IBaseInterface",
]

publication.publish()
