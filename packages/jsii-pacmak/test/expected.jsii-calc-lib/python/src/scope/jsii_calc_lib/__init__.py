import abc
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from jsii.python import classproperty

import scope.jsii_calc_base
__jsii_assembly__ = jsii.JSIIAssembly.load("@scope/jsii-calc-lib", "0.10.4", __name__, "jsii-calc-lib@0.10.4.jsii.tgz")
@jsii.enum(jsii_type="@scope/jsii-calc-lib.EnumFromScopedModule")
class EnumFromScopedModule(enum.Enum):
    """Check that enums from @scoped packages can be references. See awslabs/jsii#138."""
    Value1 = "Value1"
    Value2 = "Value2"

@jsii.interface(jsii_type="@scope/jsii-calc-lib.IDoublable")
class IDoublable(jsii.compat.Protocol):
    """The general contract for a concrete number."""
    @staticmethod
    def __jsii_proxy_class__():
        return _IDoublableProxy

    @property
    @jsii.member(jsii_name="doubleValue")
    def double_value(self) -> jsii.Number:
        ...


class _IDoublableProxy():
    """The general contract for a concrete number."""
    __jsii_type__ = "@scope/jsii-calc-lib.IDoublable"
    @property
    @jsii.member(jsii_name="doubleValue")
    def double_value(self) -> jsii.Number:
        return jsii.get(self, "doubleValue")


@jsii.interface(jsii_type="@scope/jsii-calc-lib.IFriendly")
class IFriendly(jsii.compat.Protocol):
    """Applies to classes that are considered friendly.

    These classes can be greeted with
    a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IFriendlyProxy

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        """Say hello!"""
        ...


class _IFriendlyProxy():
    """Applies to classes that are considered friendly.

    These classes can be greeted with
    a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
    """
    __jsii_type__ = "@scope/jsii-calc-lib.IFriendly"
    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        """Say hello!"""
        return jsii.invoke(self, "hello", [])


@jsii.interface(jsii_type="@scope/jsii-calc-lib.IThreeLevelsInterface")
class IThreeLevelsInterface(scope.jsii_calc_base.IBaseInterface, jsii.compat.Protocol):
    """Interface that inherits from packages 2 levels up the tree.

    Their presence validates that .NET/Java/jsii-reflect can track all fields
    far enough up the tree.
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IThreeLevelsInterfaceProxy

    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        ...


class _IThreeLevelsInterfaceProxy(jsii.proxy_for(scope.jsii_calc_base.IBaseInterface)):
    """Interface that inherits from packages 2 levels up the tree.

    Their presence validates that .NET/Java/jsii-reflect can track all fields
    far enough up the tree.
    """
    __jsii_type__ = "@scope/jsii-calc-lib.IThreeLevelsInterface"
    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        return jsii.invoke(self, "baz", [])


@jsii.data_type_optionals(jsii_struct_bases=[])
class _MyFirstStruct(jsii.compat.TypedDict, total=False):
    firstOptional: typing.List[str]

@jsii.data_type(jsii_type="@scope/jsii-calc-lib.MyFirstStruct", jsii_struct_bases=[_MyFirstStruct])
class MyFirstStruct(_MyFirstStruct):
    """This is the first struct we have created in jsii."""
    anumber: jsii.Number
    """An awesome number value."""

    astring: str
    """A string value."""

@jsii.data_type(jsii_type="@scope/jsii-calc-lib.StructWithOnlyOptionals", jsii_struct_bases=[])
class StructWithOnlyOptionals(jsii.compat.TypedDict, total=False):
    """This is a struct with only optional properties."""
    optional1: str
    """The first optional!"""

    optional2: jsii.Number

    optional3: bool

class Value(scope.jsii_calc_base.Base, metaclass=jsii.JSIIAbstractClass, jsii_type="@scope/jsii-calc-lib.Value"):
    """Abstract class which represents a numeric value."""
    @staticmethod
    def __jsii_proxy_class__():
        return _ValueProxy

    def __init__(self) -> None:
        jsii.create(Value, self, [])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value."""
        return jsii.invoke(self, "toString", [])

    @property
    @jsii.member(jsii_name="value")
    @abc.abstractmethod
    def value(self) -> jsii.Number:
        """The value."""
        ...


class _ValueProxy(Value, jsii.proxy_for(scope.jsii_calc_base.Base)):
    @property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The value."""
        return jsii.get(self, "value")


@jsii.implements(IDoublable)
class Number(Value, metaclass=jsii.JSIIMeta, jsii_type="@scope/jsii-calc-lib.Number"):
    """Represents a concrete number."""
    def __init__(self, value: jsii.Number) -> None:
        """Creates a Number object.

        Arguments:
            value: The number.
        """
        jsii.create(Number, self, [value])

    @property
    @jsii.member(jsii_name="doubleValue")
    def double_value(self) -> jsii.Number:
        """The number multiplied by 2."""
        return jsii.get(self, "doubleValue")

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The number."""
        return jsii.get(self, "value")


class Operation(Value, metaclass=jsii.JSIIAbstractClass, jsii_type="@scope/jsii-calc-lib.Operation"):
    """Represents an operation on values."""
    @staticmethod
    def __jsii_proxy_class__():
        return _OperationProxy

    def __init__(self) -> None:
        jsii.create(Operation, self, [])

    @jsii.member(jsii_name="toString")
    @abc.abstractmethod
    def to_string(self) -> str:
        """String representation of the value."""
        ...


class _OperationProxy(Operation, jsii.proxy_for(Value)):
    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value."""
        return jsii.invoke(self, "toString", [])


__all__ = ["EnumFromScopedModule", "IDoublable", "IFriendly", "IThreeLevelsInterface", "MyFirstStruct", "Number", "Operation", "StructWithOnlyOptionals", "Value", "__jsii_assembly__"]

publication.publish()
