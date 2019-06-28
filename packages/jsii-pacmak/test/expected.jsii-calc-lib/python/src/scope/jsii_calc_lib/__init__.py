import abc
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from jsii.python import classproperty

import scope.jsii_calc_base
__jsii_assembly__ = jsii.JSIIAssembly.load("@scope/jsii-calc-lib", "0.13.0", __name__, "jsii-calc-lib@0.13.0.jsii.tgz")
@jsii.enum(jsii_type="@scope/jsii-calc-lib.EnumFromScopedModule")
class EnumFromScopedModule(enum.Enum):
    """Check that enums from @scoped packages can be references. See awslabs/jsii#138.

    Stability:
        deprecated
    """
    VALUE1 = "VALUE1"
    """
    Stability:
        deprecated
    """
    VALUE2 = "VALUE2"
    """
    Stability:
        deprecated
    """

@jsii.interface(jsii_type="@scope/jsii-calc-lib.IDoublable")
class IDoublable(jsii.compat.Protocol):
    """The general contract for a concrete number.

    Stability:
        deprecated
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IDoublableProxy

    @property
    @jsii.member(jsii_name="doubleValue")
    def double_value(self) -> jsii.Number:
        """
        Stability:
            deprecated
        """
        ...


class _IDoublableProxy():
    """The general contract for a concrete number.

    Stability:
        deprecated
    """
    __jsii_type__ = "@scope/jsii-calc-lib.IDoublable"
    @property
    @jsii.member(jsii_name="doubleValue")
    def double_value(self) -> jsii.Number:
        """
        Stability:
            deprecated
        """
        return jsii.get(self, "doubleValue")


@jsii.interface(jsii_type="@scope/jsii-calc-lib.IFriendly")
class IFriendly(jsii.compat.Protocol):
    """Applies to classes that are considered friendly.

    These classes can be greeted with
    a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.

    Stability:
        deprecated
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IFriendlyProxy

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        """Say hello!

        Stability:
            deprecated
        """
        ...


class _IFriendlyProxy():
    """Applies to classes that are considered friendly.

    These classes can be greeted with
    a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.

    Stability:
        deprecated
    """
    __jsii_type__ = "@scope/jsii-calc-lib.IFriendly"
    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        """Say hello!

        Stability:
            deprecated
        """
        return jsii.invoke(self, "hello", [])


@jsii.interface(jsii_type="@scope/jsii-calc-lib.IThreeLevelsInterface")
class IThreeLevelsInterface(scope.jsii_calc_base.IBaseInterface, jsii.compat.Protocol):
    """Interface that inherits from packages 2 levels up the tree.

    Their presence validates that .NET/Java/jsii-reflect can track all fields
    far enough up the tree.

    Stability:
        deprecated
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IThreeLevelsInterfaceProxy

    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        """
        Stability:
            deprecated
        """
        ...


class _IThreeLevelsInterfaceProxy(jsii.proxy_for(scope.jsii_calc_base.IBaseInterface)):
    """Interface that inherits from packages 2 levels up the tree.

    Their presence validates that .NET/Java/jsii-reflect can track all fields
    far enough up the tree.

    Stability:
        deprecated
    """
    __jsii_type__ = "@scope/jsii-calc-lib.IThreeLevelsInterface"
    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        """
        Stability:
            deprecated
        """
        return jsii.invoke(self, "baz", [])


@jsii.data_type_optionals(jsii_struct_bases=[])
class _MyFirstStruct(jsii.compat.TypedDict, total=False):
    firstOptional: typing.List[str]
    """
    Stability:
        deprecated
    """

@jsii.data_type(jsii_type="@scope/jsii-calc-lib.MyFirstStruct", jsii_struct_bases=[_MyFirstStruct])
class MyFirstStruct(_MyFirstStruct):
    """This is the first struct we have created in jsii.

    Stability:
        deprecated
    """
    anumber: jsii.Number
    """An awesome number value.

    Stability:
        deprecated
    """

    astring: str
    """A string value.

    Stability:
        deprecated
    """

@jsii.data_type(jsii_type="@scope/jsii-calc-lib.StructWithOnlyOptionals", jsii_struct_bases=[])
class StructWithOnlyOptionals(jsii.compat.TypedDict, total=False):
    """This is a struct with only optional properties.

    Stability:
        deprecated
    """
    optional1: str
    """The first optional!

    Stability:
        deprecated
    """

    optional2: jsii.Number
    """
    Stability:
        deprecated
    """

    optional3: bool
    """
    Stability:
        deprecated
    """

class Value(scope.jsii_calc_base.Base, metaclass=jsii.JSIIAbstractClass, jsii_type="@scope/jsii-calc-lib.Value"):
    """Abstract class which represents a numeric value.

    Stability:
        deprecated
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _ValueProxy

    def __init__(self) -> None:
        jsii.create(Value, self, [])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value.

        Stability:
            deprecated
        """
        return jsii.invoke(self, "toString", [])

    @property
    @jsii.member(jsii_name="value")
    @abc.abstractmethod
    def value(self) -> jsii.Number:
        """The value.

        Stability:
            deprecated
        """
        ...


class _ValueProxy(Value, jsii.proxy_for(scope.jsii_calc_base.Base)):
    @property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The value.

        Stability:
            deprecated
        """
        return jsii.get(self, "value")


@jsii.implements(IDoublable)
class Number(Value, metaclass=jsii.JSIIMeta, jsii_type="@scope/jsii-calc-lib.Number"):
    """Represents a concrete number.

    Stability:
        deprecated
    """
    def __init__(self, value: jsii.Number) -> None:
        """Creates a Number object.

        Arguments:
            value: The number.

        Stability:
            deprecated
        """
        jsii.create(Number, self, [value])

    @property
    @jsii.member(jsii_name="doubleValue")
    def double_value(self) -> jsii.Number:
        """The number multiplied by 2.

        Stability:
            deprecated
        """
        return jsii.get(self, "doubleValue")

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The number.

        Stability:
            deprecated
        """
        return jsii.get(self, "value")


class Operation(Value, metaclass=jsii.JSIIAbstractClass, jsii_type="@scope/jsii-calc-lib.Operation"):
    """Represents an operation on values.

    Stability:
        deprecated
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _OperationProxy

    def __init__(self) -> None:
        jsii.create(Operation, self, [])

    @jsii.member(jsii_name="toString")
    @abc.abstractmethod
    def to_string(self) -> str:
        """String representation of the value.

        Stability:
            deprecated
        """
        ...


class _OperationProxy(Operation, jsii.proxy_for(Value)):
    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value.

        Stability:
            deprecated
        """
        return jsii.invoke(self, "toString", [])


__all__ = ["EnumFromScopedModule", "IDoublable", "IFriendly", "IThreeLevelsInterface", "MyFirstStruct", "Number", "Operation", "StructWithOnlyOptionals", "Value", "__jsii_assembly__"]

publication.publish()
