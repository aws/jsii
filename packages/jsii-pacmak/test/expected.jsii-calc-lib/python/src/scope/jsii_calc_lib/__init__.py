import abc
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from jsii.python import classproperty

import scope.jsii_calc_base
__jsii_assembly__ = jsii.JSIIAssembly.load("@scope/jsii-calc-lib", "0.19.0", __name__, "jsii-calc-lib@0.19.0.jsii.tgz")
@jsii.enum(jsii_type="@scope/jsii-calc-lib.EnumFromScopedModule")
class EnumFromScopedModule(enum.Enum):
    """Check that enums from @scoped packages can be references. See awslabs/jsii#138.

    stability
    :stability: deprecated
    """
    VALUE1 = "VALUE1"
    """
    stability
    :stability: deprecated
    """
    VALUE2 = "VALUE2"
    """
    stability
    :stability: deprecated
    """

@jsii.interface(jsii_type="@scope/jsii-calc-lib.IDoublable")
class IDoublable(jsii.compat.Protocol):
    """The general contract for a concrete number.

    stability
    :stability: deprecated
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IDoublableProxy

    @property
    @jsii.member(jsii_name="doubleValue")
    def double_value(self) -> jsii.Number:
        """
        stability
        :stability: deprecated
        """
        ...


class _IDoublableProxy():
    """The general contract for a concrete number.

    stability
    :stability: deprecated
    """
    __jsii_type__ = "@scope/jsii-calc-lib.IDoublable"
    @property
    @jsii.member(jsii_name="doubleValue")
    def double_value(self) -> jsii.Number:
        """
        stability
        :stability: deprecated
        """
        return jsii.get(self, "doubleValue")


@jsii.interface(jsii_type="@scope/jsii-calc-lib.IFriendly")
class IFriendly(jsii.compat.Protocol):
    """Applies to classes that are considered friendly.

    These classes can be greeted with
    a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.

    stability
    :stability: deprecated
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IFriendlyProxy

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        """Say hello!

        stability
        :stability: deprecated
        """
        ...


class _IFriendlyProxy():
    """Applies to classes that are considered friendly.

    These classes can be greeted with
    a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.

    stability
    :stability: deprecated
    """
    __jsii_type__ = "@scope/jsii-calc-lib.IFriendly"
    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        """Say hello!

        stability
        :stability: deprecated
        """
        return jsii.invoke(self, "hello", [])


@jsii.interface(jsii_type="@scope/jsii-calc-lib.IThreeLevelsInterface")
class IThreeLevelsInterface(scope.jsii_calc_base.IBaseInterface, jsii.compat.Protocol):
    """Interface that inherits from packages 2 levels up the tree.

    Their presence validates that .NET/Java/jsii-reflect can track all fields
    far enough up the tree.

    stability
    :stability: deprecated
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IThreeLevelsInterfaceProxy

    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        """
        stability
        :stability: deprecated
        """
        ...


class _IThreeLevelsInterfaceProxy(jsii.proxy_for(scope.jsii_calc_base.IBaseInterface)):
    """Interface that inherits from packages 2 levels up the tree.

    Their presence validates that .NET/Java/jsii-reflect can track all fields
    far enough up the tree.

    stability
    :stability: deprecated
    """
    __jsii_type__ = "@scope/jsii-calc-lib.IThreeLevelsInterface"
    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        """
        stability
        :stability: deprecated
        """
        return jsii.invoke(self, "baz", [])


@jsii.data_type(jsii_type="@scope/jsii-calc-lib.MyFirstStruct", jsii_struct_bases=[], name_mapping={'anumber': 'anumber', 'astring': 'astring', 'first_optional': 'firstOptional'})
class MyFirstStruct():
    def __init__(self, *, anumber: jsii.Number, astring: str, first_optional: typing.Optional[typing.List[str]]=None):
        """This is the first struct we have created in jsii.

        :param anumber: An awesome number value.
        :param astring: A string value.
        :param first_optional: 

        stability
        :stability: deprecated
        """
        self._values = {
            'anumber': anumber,
            'astring': astring,
        }
        if first_optional is not None: self._values["first_optional"] = first_optional

    @property
    def anumber(self) -> jsii.Number:
        """An awesome number value.

        stability
        :stability: deprecated
        """
        return self._values.get('anumber')

    @property
    def astring(self) -> str:
        """A string value.

        stability
        :stability: deprecated
        """
        return self._values.get('astring')

    @property
    def first_optional(self) -> typing.Optional[typing.List[str]]:
        """
        stability
        :stability: deprecated
        """
        return self._values.get('first_optional')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'MyFirstStruct(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


@jsii.data_type(jsii_type="@scope/jsii-calc-lib.StructWithOnlyOptionals", jsii_struct_bases=[], name_mapping={'optional1': 'optional1', 'optional2': 'optional2', 'optional3': 'optional3'})
class StructWithOnlyOptionals():
    def __init__(self, *, optional1: typing.Optional[str]=None, optional2: typing.Optional[jsii.Number]=None, optional3: typing.Optional[bool]=None):
        """This is a struct with only optional properties.

        :param optional1: The first optional!
        :param optional2: 
        :param optional3: 

        stability
        :stability: deprecated
        """
        self._values = {
        }
        if optional1 is not None: self._values["optional1"] = optional1
        if optional2 is not None: self._values["optional2"] = optional2
        if optional3 is not None: self._values["optional3"] = optional3

    @property
    def optional1(self) -> typing.Optional[str]:
        """The first optional!

        stability
        :stability: deprecated
        """
        return self._values.get('optional1')

    @property
    def optional2(self) -> typing.Optional[jsii.Number]:
        """
        stability
        :stability: deprecated
        """
        return self._values.get('optional2')

    @property
    def optional3(self) -> typing.Optional[bool]:
        """
        stability
        :stability: deprecated
        """
        return self._values.get('optional3')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'StructWithOnlyOptionals(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


class Value(scope.jsii_calc_base.Base, metaclass=jsii.JSIIAbstractClass, jsii_type="@scope/jsii-calc-lib.Value"):
    """Abstract class which represents a numeric value.

    stability
    :stability: deprecated
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _ValueProxy

    def __init__(self) -> None:
        jsii.create(Value, self, [])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value.

        stability
        :stability: deprecated
        """
        return jsii.invoke(self, "toString", [])

    @property
    @jsii.member(jsii_name="value")
    @abc.abstractmethod
    def value(self) -> jsii.Number:
        """The value.

        stability
        :stability: deprecated
        """
        ...


class _ValueProxy(Value, jsii.proxy_for(scope.jsii_calc_base.Base)):
    @property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The value.

        stability
        :stability: deprecated
        """
        return jsii.get(self, "value")


@jsii.implements(IDoublable)
class Number(Value, metaclass=jsii.JSIIMeta, jsii_type="@scope/jsii-calc-lib.Number"):
    """Represents a concrete number.

    stability
    :stability: deprecated
    """
    def __init__(self, value: jsii.Number) -> None:
        """Creates a Number object.

        :param value: The number.

        stability
        :stability: deprecated
        """
        jsii.create(Number, self, [value])

    @property
    @jsii.member(jsii_name="doubleValue")
    def double_value(self) -> jsii.Number:
        """The number multiplied by 2.

        stability
        :stability: deprecated
        """
        return jsii.get(self, "doubleValue")

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The number.

        stability
        :stability: deprecated
        """
        return jsii.get(self, "value")


class Operation(Value, metaclass=jsii.JSIIAbstractClass, jsii_type="@scope/jsii-calc-lib.Operation"):
    """Represents an operation on values.

    stability
    :stability: deprecated
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

        stability
        :stability: deprecated
        """
        ...


class _OperationProxy(Operation, jsii.proxy_for(Value)):
    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value.

        stability
        :stability: deprecated
        """
        return jsii.invoke(self, "toString", [])


__all__ = ["EnumFromScopedModule", "IDoublable", "IFriendly", "IThreeLevelsInterface", "MyFirstStruct", "Number", "Operation", "StructWithOnlyOptionals", "Value", "__jsii_assembly__"]

publication.publish()
