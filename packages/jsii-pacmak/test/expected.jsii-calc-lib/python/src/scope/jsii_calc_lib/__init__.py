import abc
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from jsii.python import classproperty

import scope.jsii_calc_base
__jsii_assembly__ = jsii.JSIIAssembly.load("@scope/jsii-calc-lib", "0.8.0", __name__, "jsii-calc-lib@0.8.0.jsii.tgz")
@jsii.enum(jsii_type="@scope/jsii-calc-lib.EnumFromScopedModule")
class EnumFromScopedModule(enum.Enum):
    Value1 = "Value1"
    Value2 = "Value2"

@jsii.interface(jsii_type="@scope/jsii-calc-lib.IDoublable")
class IDoublable(jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IDoublableProxy

    @property
    @jsii.member(jsii_name="doubleValue")
    def double_value(self) -> jsii.Number:
        ...


class _IDoublableProxy():
    __jsii_type__ = "@scope/jsii-calc-lib.IDoublable"
    @property
    @jsii.member(jsii_name="doubleValue")
    def double_value(self) -> jsii.Number:
        return jsii.get(self, "doubleValue")


@jsii.interface(jsii_type="@scope/jsii-calc-lib.IFriendly")
class IFriendly(jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IFriendlyProxy

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        ...


class _IFriendlyProxy():
    __jsii_type__ = "@scope/jsii-calc-lib.IFriendly"
    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        return jsii.invoke(self, "hello", [])


class _MyFirstStruct(jsii.compat.TypedDict, total=False):
    firstOptional: typing.List[str]

@jsii.data_type(jsii_type="@scope/jsii-calc-lib.MyFirstStruct")
class MyFirstStruct(_MyFirstStruct):
    anumber: jsii.Number
    astring: str

@jsii.data_type(jsii_type="@scope/jsii-calc-lib.StructWithOnlyOptionals")
class StructWithOnlyOptionals(jsii.compat.TypedDict, total=False):
    optional1: str
    optional2: jsii.Number
    optional3: bool

class Value(scope.jsii_calc_base.Base, metaclass=jsii.JSIIAbstractClass, jsii_type="@scope/jsii-calc-lib.Value"):
    @staticmethod
    def __jsii_proxy_class__():
        return _ValueProxy

    def __init__(self) -> None:
        jsii.create(Value, self, [])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        return jsii.invoke(self, "toString", [])

    @property
    @jsii.member(jsii_name="value")
    @abc.abstractmethod
    def value(self) -> jsii.Number:
        ...


class _ValueProxy(Value, jsii.proxy_for(scope.jsii_calc_base.Base)):
    @property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        return jsii.get(self, "value")


@jsii.implements(IDoublable)
class Number(Value, metaclass=jsii.JSIIMeta, jsii_type="@scope/jsii-calc-lib.Number"):
    def __init__(self, value: jsii.Number) -> None:
        jsii.create(Number, self, [value])

    @property
    @jsii.member(jsii_name="doubleValue")
    def double_value(self) -> jsii.Number:
        return jsii.get(self, "doubleValue")

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        return jsii.get(self, "value")


class Operation(Value, metaclass=jsii.JSIIAbstractClass, jsii_type="@scope/jsii-calc-lib.Operation"):
    @staticmethod
    def __jsii_proxy_class__():
        return _OperationProxy

    def __init__(self) -> None:
        jsii.create(Operation, self, [])

    @jsii.member(jsii_name="toString")
    @abc.abstractmethod
    def to_string(self) -> str:
        ...


class _OperationProxy(Operation, jsii.proxy_for(Value)):
    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        return jsii.invoke(self, "toString", [])


__all__ = ["EnumFromScopedModule", "IDoublable", "IFriendly", "MyFirstStruct", "Number", "Operation", "StructWithOnlyOptionals", "Value", "__jsii_assembly__"]

publication.publish()
