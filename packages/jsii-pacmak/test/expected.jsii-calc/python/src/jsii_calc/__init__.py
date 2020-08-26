"""
# jsii Calculator

This library is used to demonstrate and test the features of JSII

## How to use running sum API:

First, create a calculator:

```python
# Example automatically generated. See https://github.com/aws/jsii/issues/826
calculator = calc.Calculator()
```

Then call some operations:

```python
# Example automatically generated. See https://github.com/aws/jsii/issues/826
calculator.add(10)
```

## Code Samples

```python
# Example automatically generated. See https://github.com/aws/jsii/issues/826
# This is totes a magic comment in here, just you wait!
foo = "bar"
```
"""
import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from ._jsii import *

import scope.jsii_calc_base
import scope.jsii_calc_base_of_base
import scope.jsii_calc_lib
import scope.jsii_calc_lib.custom_submodule_name
from .composition import CompositeOperation as _CompositeOperation_1c4d123b


class AbstractClassBase(
    metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.AbstractClassBase"
):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _AbstractClassBaseProxy

    def __init__(self) -> None:
        jsii.create(AbstractClassBase, self, [])

    @builtins.property
    @jsii.member(jsii_name="abstractProperty")
    @abc.abstractmethod
    def abstract_property(self) -> str:
        ...


class _AbstractClassBaseProxy(AbstractClassBase):
    @builtins.property
    @jsii.member(jsii_name="abstractProperty")
    def abstract_property(self) -> str:
        return jsii.get(self, "abstractProperty")


class AbstractClassReturner(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AbstractClassReturner"
):
    def __init__(self) -> None:
        jsii.create(AbstractClassReturner, self, [])

    @jsii.member(jsii_name="giveMeAbstract")
    def give_me_abstract(self) -> "AbstractClass":
        return jsii.invoke(self, "giveMeAbstract", [])

    @jsii.member(jsii_name="giveMeInterface")
    def give_me_interface(self) -> "IInterfaceImplementedByAbstractClass":
        return jsii.invoke(self, "giveMeInterface", [])

    @builtins.property
    @jsii.member(jsii_name="returnAbstractFromProperty")
    def return_abstract_from_property(self) -> "AbstractClassBase":
        return jsii.get(self, "returnAbstractFromProperty")


class AbstractSuite(
    metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.AbstractSuite"
):
    """Ensures abstract members implementations correctly register overrides in various languages."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _AbstractSuiteProxy

    def __init__(self) -> None:
        jsii.create(AbstractSuite, self, [])

    @jsii.member(jsii_name="someMethod")
    @abc.abstractmethod
    def _some_method(self, str: str) -> str:
        """
        :param str: -
        """
        ...

    @jsii.member(jsii_name="workItAll")
    def work_it_all(self, seed: str) -> str:
        """Sets ``seed`` to ``this.property``, then calls ``someMethod`` with ``this.property`` and returns the result.

        :param seed: a ``string``.
        """
        return jsii.invoke(self, "workItAll", [seed])

    @builtins.property
    @jsii.member(jsii_name="property")
    @abc.abstractmethod
    def _property(self) -> str:
        ...

    @_property.setter
    @abc.abstractmethod
    def _property(self, value: str) -> None:
        ...


class _AbstractSuiteProxy(AbstractSuite):
    @jsii.member(jsii_name="someMethod")
    def _some_method(self, str: str) -> str:
        """
        :param str: -
        """
        return jsii.invoke(self, "someMethod", [str])

    @builtins.property
    @jsii.member(jsii_name="property")
    def _property(self) -> str:
        return jsii.get(self, "property")

    @_property.setter
    def _property(self, value: str) -> None:
        jsii.set(self, "property", value)


class AllTypes(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AllTypes"):
    """This class includes property for all types supported by jsii.

    The setters will validate
    that the value set is of the expected type and throw otherwise.
    """

    def __init__(self) -> None:
        jsii.create(AllTypes, self, [])

    @jsii.member(jsii_name="anyIn")
    def any_in(self, inp: typing.Any) -> None:
        """
        :param inp: -
        """
        return jsii.invoke(self, "anyIn", [inp])

    @jsii.member(jsii_name="anyOut")
    def any_out(self) -> typing.Any:
        return jsii.invoke(self, "anyOut", [])

    @jsii.member(jsii_name="enumMethod")
    def enum_method(self, value: "StringEnum") -> "StringEnum":
        """
        :param value: -
        """
        return jsii.invoke(self, "enumMethod", [value])

    @builtins.property
    @jsii.member(jsii_name="enumPropertyValue")
    def enum_property_value(self) -> jsii.Number:
        return jsii.get(self, "enumPropertyValue")

    @builtins.property
    @jsii.member(jsii_name="anyArrayProperty")
    def any_array_property(self) -> typing.List[typing.Any]:
        return jsii.get(self, "anyArrayProperty")

    @any_array_property.setter
    def any_array_property(self, value: typing.List[typing.Any]) -> None:
        jsii.set(self, "anyArrayProperty", value)

    @builtins.property
    @jsii.member(jsii_name="anyMapProperty")
    def any_map_property(self) -> typing.Mapping[str, typing.Any]:
        return jsii.get(self, "anyMapProperty")

    @any_map_property.setter
    def any_map_property(self, value: typing.Mapping[str, typing.Any]) -> None:
        jsii.set(self, "anyMapProperty", value)

    @builtins.property
    @jsii.member(jsii_name="anyProperty")
    def any_property(self) -> typing.Any:
        return jsii.get(self, "anyProperty")

    @any_property.setter
    def any_property(self, value: typing.Any) -> None:
        jsii.set(self, "anyProperty", value)

    @builtins.property
    @jsii.member(jsii_name="arrayProperty")
    def array_property(self) -> typing.List[str]:
        return jsii.get(self, "arrayProperty")

    @array_property.setter
    def array_property(self, value: typing.List[str]) -> None:
        jsii.set(self, "arrayProperty", value)

    @builtins.property
    @jsii.member(jsii_name="booleanProperty")
    def boolean_property(self) -> bool:
        return jsii.get(self, "booleanProperty")

    @boolean_property.setter
    def boolean_property(self, value: bool) -> None:
        jsii.set(self, "booleanProperty", value)

    @builtins.property
    @jsii.member(jsii_name="dateProperty")
    def date_property(self) -> datetime.datetime:
        return jsii.get(self, "dateProperty")

    @date_property.setter
    def date_property(self, value: datetime.datetime) -> None:
        jsii.set(self, "dateProperty", value)

    @builtins.property
    @jsii.member(jsii_name="enumProperty")
    def enum_property(self) -> "AllTypesEnum":
        return jsii.get(self, "enumProperty")

    @enum_property.setter
    def enum_property(self, value: "AllTypesEnum") -> None:
        jsii.set(self, "enumProperty", value)

    @builtins.property
    @jsii.member(jsii_name="jsonProperty")
    def json_property(self) -> typing.Mapping[typing.Any, typing.Any]:
        return jsii.get(self, "jsonProperty")

    @json_property.setter
    def json_property(self, value: typing.Mapping[typing.Any, typing.Any]) -> None:
        jsii.set(self, "jsonProperty", value)

    @builtins.property
    @jsii.member(jsii_name="mapProperty")
    def map_property(self) -> typing.Mapping[str, scope.jsii_calc_lib.Number]:
        return jsii.get(self, "mapProperty")

    @map_property.setter
    def map_property(
        self, value: typing.Mapping[str, scope.jsii_calc_lib.Number]
    ) -> None:
        jsii.set(self, "mapProperty", value)

    @builtins.property
    @jsii.member(jsii_name="numberProperty")
    def number_property(self) -> jsii.Number:
        return jsii.get(self, "numberProperty")

    @number_property.setter
    def number_property(self, value: jsii.Number) -> None:
        jsii.set(self, "numberProperty", value)

    @builtins.property
    @jsii.member(jsii_name="stringProperty")
    def string_property(self) -> str:
        return jsii.get(self, "stringProperty")

    @string_property.setter
    def string_property(self, value: str) -> None:
        jsii.set(self, "stringProperty", value)

    @builtins.property
    @jsii.member(jsii_name="unionArrayProperty")
    def union_array_property(
        self,
    ) -> typing.List[typing.Union[jsii.Number, scope.jsii_calc_lib.Value]]:
        return jsii.get(self, "unionArrayProperty")

    @union_array_property.setter
    def union_array_property(
        self, value: typing.List[typing.Union[jsii.Number, scope.jsii_calc_lib.Value]]
    ) -> None:
        jsii.set(self, "unionArrayProperty", value)

    @builtins.property
    @jsii.member(jsii_name="unionMapProperty")
    def union_map_property(
        self,
    ) -> typing.Mapping[
        str, typing.Union[str, jsii.Number, scope.jsii_calc_lib.Number]
    ]:
        return jsii.get(self, "unionMapProperty")

    @union_map_property.setter
    def union_map_property(
        self,
        value: typing.Mapping[
            str, typing.Union[str, jsii.Number, scope.jsii_calc_lib.Number]
        ],
    ) -> None:
        jsii.set(self, "unionMapProperty", value)

    @builtins.property
    @jsii.member(jsii_name="unionProperty")
    def union_property(
        self,
    ) -> typing.Union[str, jsii.Number, "Multiply", scope.jsii_calc_lib.Number]:
        return jsii.get(self, "unionProperty")

    @union_property.setter
    def union_property(
        self,
        value: typing.Union[str, jsii.Number, "Multiply", scope.jsii_calc_lib.Number],
    ) -> None:
        jsii.set(self, "unionProperty", value)

    @builtins.property
    @jsii.member(jsii_name="unknownArrayProperty")
    def unknown_array_property(self) -> typing.List[typing.Any]:
        return jsii.get(self, "unknownArrayProperty")

    @unknown_array_property.setter
    def unknown_array_property(self, value: typing.List[typing.Any]) -> None:
        jsii.set(self, "unknownArrayProperty", value)

    @builtins.property
    @jsii.member(jsii_name="unknownMapProperty")
    def unknown_map_property(self) -> typing.Mapping[str, typing.Any]:
        return jsii.get(self, "unknownMapProperty")

    @unknown_map_property.setter
    def unknown_map_property(self, value: typing.Mapping[str, typing.Any]) -> None:
        jsii.set(self, "unknownMapProperty", value)

    @builtins.property
    @jsii.member(jsii_name="unknownProperty")
    def unknown_property(self) -> typing.Any:
        return jsii.get(self, "unknownProperty")

    @unknown_property.setter
    def unknown_property(self, value: typing.Any) -> None:
        jsii.set(self, "unknownProperty", value)

    @builtins.property
    @jsii.member(jsii_name="optionalEnumValue")
    def optional_enum_value(self) -> typing.Optional["StringEnum"]:
        return jsii.get(self, "optionalEnumValue")

    @optional_enum_value.setter
    def optional_enum_value(self, value: typing.Optional["StringEnum"]) -> None:
        jsii.set(self, "optionalEnumValue", value)


@jsii.enum(jsii_type="jsii-calc.AllTypesEnum")
class AllTypesEnum(enum.Enum):
    MY_ENUM_VALUE = "MY_ENUM_VALUE"
    YOUR_ENUM_VALUE = "YOUR_ENUM_VALUE"
    THIS_IS_GREAT = "THIS_IS_GREAT"


class AllowedMethodNames(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AllowedMethodNames"
):
    def __init__(self) -> None:
        jsii.create(AllowedMethodNames, self, [])

    @jsii.member(jsii_name="getBar")
    def get_bar(self, _p1: str, _p2: jsii.Number) -> None:
        """
        :param _p1: -
        :param _p2: -
        """
        return jsii.invoke(self, "getBar", [_p1, _p2])

    @jsii.member(jsii_name="getFoo")
    def get_foo(self, with_param: str) -> str:
        """getXxx() is not allowed (see negatives), but getXxx(a, ...) is okay.

        :param with_param: -
        """
        return jsii.invoke(self, "getFoo", [with_param])

    @jsii.member(jsii_name="setBar")
    def set_bar(self, _x: str, _y: jsii.Number, _z: bool) -> None:
        """
        :param _x: -
        :param _y: -
        :param _z: -
        """
        return jsii.invoke(self, "setBar", [_x, _y, _z])

    @jsii.member(jsii_name="setFoo")
    def set_foo(self, _x: str, _y: jsii.Number) -> None:
        """setFoo(x) is not allowed (see negatives), but setXxx(a, b, ...) is okay.

        :param _x: -
        :param _y: -
        """
        return jsii.invoke(self, "setFoo", [_x, _y])


class AmbiguousParameters(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AmbiguousParameters"
):
    def __init__(
        self, scope_: "Bell", *, scope: str, props: typing.Optional[bool] = None
    ) -> None:
        """
        :param scope_: -
        :param scope: 
        :param props: 
        """
        props_ = StructParameterType(scope=scope, props=props)

        jsii.create(AmbiguousParameters, self, [scope_, props_])

    @builtins.property
    @jsii.member(jsii_name="props")
    def props(self) -> "StructParameterType":
        return jsii.get(self, "props")

    @builtins.property
    @jsii.member(jsii_name="scope")
    def scope(self) -> "Bell":
        return jsii.get(self, "scope")


class AsyncVirtualMethods(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AsyncVirtualMethods"
):
    def __init__(self) -> None:
        jsii.create(AsyncVirtualMethods, self, [])

    @jsii.member(jsii_name="callMe")
    def call_me(self) -> jsii.Number:
        return jsii.ainvoke(self, "callMe", [])

    @jsii.member(jsii_name="callMe2")
    def call_me2(self) -> jsii.Number:
        """Just calls "overrideMeToo"."""
        return jsii.ainvoke(self, "callMe2", [])

    @jsii.member(jsii_name="callMeDoublePromise")
    def call_me_double_promise(self) -> jsii.Number:
        """This method calls the "callMe" async method indirectly, which will then invoke a virtual method.

        This is a "double promise" situation, which
        means that callbacks are not going to be available immediate, but only
        after an "immediates" cycle.
        """
        return jsii.ainvoke(self, "callMeDoublePromise", [])

    @jsii.member(jsii_name="dontOverrideMe")
    def dont_override_me(self) -> jsii.Number:
        return jsii.invoke(self, "dontOverrideMe", [])

    @jsii.member(jsii_name="overrideMe")
    def override_me(self, mult: jsii.Number) -> jsii.Number:
        """
        :param mult: -
        """
        return jsii.ainvoke(self, "overrideMe", [mult])

    @jsii.member(jsii_name="overrideMeToo")
    def override_me_too(self) -> jsii.Number:
        return jsii.ainvoke(self, "overrideMeToo", [])


class AugmentableClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AugmentableClass"):
    def __init__(self) -> None:
        jsii.create(AugmentableClass, self, [])

    @jsii.member(jsii_name="methodOne")
    def method_one(self) -> None:
        return jsii.invoke(self, "methodOne", [])

    @jsii.member(jsii_name="methodTwo")
    def method_two(self) -> None:
        return jsii.invoke(self, "methodTwo", [])


class BaseJsii976(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.BaseJsii976"):
    def __init__(self) -> None:
        jsii.create(BaseJsii976, self, [])


@jsii.implements(scope.jsii_calc_lib.IFriendly)
class BinaryOperation(
    scope.jsii_calc_lib.Operation,
    metaclass=jsii.JSIIAbstractClass,
    jsii_type="jsii-calc.BinaryOperation",
):
    """Represents an operation with two operands."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _BinaryOperationProxy

    def __init__(
        self, lhs: scope.jsii_calc_lib.Value, rhs: scope.jsii_calc_lib.Value
    ) -> None:
        """Creates a BinaryOperation.

        :param lhs: Left-hand side operand.
        :param rhs: Right-hand side operand.
        """
        jsii.create(BinaryOperation, self, [lhs, rhs])

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        """Say hello!

        (deprecated)
        """
        return jsii.invoke(self, "hello", [])

    @builtins.property
    @jsii.member(jsii_name="lhs")
    def lhs(self) -> scope.jsii_calc_lib.Value:
        """Left-hand side operand."""
        return jsii.get(self, "lhs")

    @builtins.property
    @jsii.member(jsii_name="rhs")
    def rhs(self) -> scope.jsii_calc_lib.Value:
        """Right-hand side operand."""
        return jsii.get(self, "rhs")


class _BinaryOperationProxy(
    BinaryOperation, jsii.proxy_for(scope.jsii_calc_lib.Operation)
):
    pass


class Calculator(
    _CompositeOperation_1c4d123b,
    metaclass=jsii.JSIIMeta,
    jsii_type="jsii-calc.Calculator",
):
    """A calculator which maintains a current value and allows adding operations.

    Here's how you use it::

       # Example automatically generated. See https://github.com/aws/jsii/issues/826
       calculator = calc.Calculator()
       calculator.add(5)
       calculator.mul(3)
       print(calculator.expression.value)

    I will repeat this example again, but in an @example tag.

    Example::

        # Example automatically generated. See https://github.com/aws/jsii/issues/826
        calculator = calc.Calculator()
        calculator.add(5)
        calculator.mul(3)
        print(calculator.expression.value)
    """

    def __init__(
        self,
        *,
        initial_value: typing.Optional[jsii.Number] = None,
        maximum_value: typing.Optional[jsii.Number] = None,
    ) -> None:
        """Creates a Calculator object.

        :param initial_value: The initial value of the calculator. NOTE: Any number works here, it's fine. Default: 0
        :param maximum_value: The maximum value the calculator can store. Default: none
        """
        props = CalculatorProps(
            initial_value=initial_value, maximum_value=maximum_value
        )

        jsii.create(Calculator, self, [props])

    @jsii.member(jsii_name="add")
    def add(self, value: jsii.Number) -> None:
        """Adds a number to the current value.

        :param value: -
        """
        return jsii.invoke(self, "add", [value])

    @jsii.member(jsii_name="mul")
    def mul(self, value: jsii.Number) -> None:
        """Multiplies the current value by a number.

        :param value: -
        """
        return jsii.invoke(self, "mul", [value])

    @jsii.member(jsii_name="neg")
    def neg(self) -> None:
        """Negates the current value."""
        return jsii.invoke(self, "neg", [])

    @jsii.member(jsii_name="pow")
    def pow(self, value: jsii.Number) -> None:
        """Raises the current value by a power.

        :param value: -
        """
        return jsii.invoke(self, "pow", [value])

    @jsii.member(jsii_name="readUnionValue")
    def read_union_value(self) -> jsii.Number:
        """Returns teh value of the union property (if defined)."""
        return jsii.invoke(self, "readUnionValue", [])

    @builtins.property
    @jsii.member(jsii_name="expression")
    def expression(self) -> scope.jsii_calc_lib.Value:
        """Returns the expression."""
        return jsii.get(self, "expression")

    @builtins.property
    @jsii.member(jsii_name="operationsLog")
    def operations_log(self) -> typing.List[scope.jsii_calc_lib.Value]:
        """A log of all operations."""
        return jsii.get(self, "operationsLog")

    @builtins.property
    @jsii.member(jsii_name="operationsMap")
    def operations_map(
        self,
    ) -> typing.Mapping[str, typing.List[scope.jsii_calc_lib.Value]]:
        """A map of per operation name of all operations performed."""
        return jsii.get(self, "operationsMap")

    @builtins.property
    @jsii.member(jsii_name="curr")
    def curr(self) -> scope.jsii_calc_lib.Value:
        """The current value."""
        return jsii.get(self, "curr")

    @curr.setter
    def curr(self, value: scope.jsii_calc_lib.Value) -> None:
        jsii.set(self, "curr", value)

    @builtins.property
    @jsii.member(jsii_name="maxValue")
    def max_value(self) -> typing.Optional[jsii.Number]:
        """The maximum value allows in this calculator."""
        return jsii.get(self, "maxValue")

    @max_value.setter
    def max_value(self, value: typing.Optional[jsii.Number]) -> None:
        jsii.set(self, "maxValue", value)

    @builtins.property
    @jsii.member(jsii_name="unionProperty")
    def union_property(
        self,
    ) -> typing.Optional[typing.Union["Add", "Multiply", "Power"]]:
        """Example of a property that accepts a union of types."""
        return jsii.get(self, "unionProperty")

    @union_property.setter
    def union_property(
        self, value: typing.Optional[typing.Union["Add", "Multiply", "Power"]]
    ) -> None:
        jsii.set(self, "unionProperty", value)


@jsii.data_type(
    jsii_type="jsii-calc.CalculatorProps",
    jsii_struct_bases=[],
    name_mapping={"initial_value": "initialValue", "maximum_value": "maximumValue"},
)
class CalculatorProps:
    def __init__(
        self,
        *,
        initial_value: typing.Optional[jsii.Number] = None,
        maximum_value: typing.Optional[jsii.Number] = None,
    ) -> None:
        """Properties for Calculator.

        :param initial_value: The initial value of the calculator. NOTE: Any number works here, it's fine. Default: 0
        :param maximum_value: The maximum value the calculator can store. Default: none
        """
        self._values = {}
        if initial_value is not None:
            self._values["initial_value"] = initial_value
        if maximum_value is not None:
            self._values["maximum_value"] = maximum_value

    @builtins.property
    def initial_value(self) -> typing.Optional[jsii.Number]:
        """The initial value of the calculator.

        NOTE: Any number works here, it's fine.

        default
        :default: 0
        """
        return self._values.get("initial_value")

    @builtins.property
    def maximum_value(self) -> typing.Optional[jsii.Number]:
        """The maximum value the calculator can store.

        default
        :default: none
        """
        return self._values.get("maximum_value")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "CalculatorProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class ClassWithCollections(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ClassWithCollections"
):
    def __init__(self, map: typing.Mapping[str, str], array: typing.List[str]) -> None:
        """
        :param map: -
        :param array: -
        """
        jsii.create(ClassWithCollections, self, [map, array])

    @jsii.member(jsii_name="createAList")
    @builtins.classmethod
    def create_a_list(cls) -> typing.List[str]:
        return jsii.sinvoke(cls, "createAList", [])

    @jsii.member(jsii_name="createAMap")
    @builtins.classmethod
    def create_a_map(cls) -> typing.Mapping[str, str]:
        return jsii.sinvoke(cls, "createAMap", [])

    @jsii.python.classproperty
    @jsii.member(jsii_name="staticArray")
    def static_array(cls) -> typing.List[str]:
        return jsii.sget(cls, "staticArray")

    @static_array.setter
    def static_array(cls, value: typing.List[str]) -> None:
        jsii.sset(cls, "staticArray", value)

    @jsii.python.classproperty
    @jsii.member(jsii_name="staticMap")
    def static_map(cls) -> typing.Mapping[str, str]:
        return jsii.sget(cls, "staticMap")

    @static_map.setter
    def static_map(cls, value: typing.Mapping[str, str]) -> None:
        jsii.sset(cls, "staticMap", value)

    @builtins.property
    @jsii.member(jsii_name="array")
    def array(self) -> typing.List[str]:
        return jsii.get(self, "array")

    @array.setter
    def array(self, value: typing.List[str]) -> None:
        jsii.set(self, "array", value)

    @builtins.property
    @jsii.member(jsii_name="map")
    def map(self) -> typing.Mapping[str, str]:
        return jsii.get(self, "map")

    @map.setter
    def map(self, value: typing.Mapping[str, str]) -> None:
        jsii.set(self, "map", value)


class ClassWithDocs(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ClassWithDocs"):
    """This class has docs.

    The docs are great. They're a bunch of tags.

    see
    :see: https://aws.amazon.com/
    customAttribute:
    :customAttribute:: hasAValue

    Example::

        # Example automatically generated. See https://github.com/aws/jsii/issues/826
        def an_example():
            pass
    """

    def __init__(self) -> None:
        jsii.create(ClassWithDocs, self, [])


class ClassWithJavaReservedWords(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ClassWithJavaReservedWords"
):
    def __init__(self, int: str) -> None:
        """
        :param int: -
        """
        jsii.create(ClassWithJavaReservedWords, self, [int])

    @jsii.member(jsii_name="import")
    def import_(self, assert_: str) -> str:
        """
        :param assert_: -
        """
        return jsii.invoke(self, "import", [assert_])

    @builtins.property
    @jsii.member(jsii_name="int")
    def int(self) -> str:
        return jsii.get(self, "int")


class ClassWithMutableObjectLiteralProperty(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ClassWithMutableObjectLiteralProperty"
):
    def __init__(self) -> None:
        jsii.create(ClassWithMutableObjectLiteralProperty, self, [])

    @builtins.property
    @jsii.member(jsii_name="mutableObject")
    def mutable_object(self) -> "IMutableObjectLiteral":
        return jsii.get(self, "mutableObject")

    @mutable_object.setter
    def mutable_object(self, value: "IMutableObjectLiteral") -> None:
        jsii.set(self, "mutableObject", value)


class ConfusingToJackson(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ConfusingToJackson"
):
    """This tries to confuse Jackson by having overloaded property setters.

    see
    :see: https://github.com/aws/aws-cdk/issues/4080
    """

    @jsii.member(jsii_name="makeInstance")
    @builtins.classmethod
    def make_instance(cls) -> "ConfusingToJackson":
        return jsii.sinvoke(cls, "makeInstance", [])

    @jsii.member(jsii_name="makeStructInstance")
    @builtins.classmethod
    def make_struct_instance(cls) -> "ConfusingToJacksonStruct":
        return jsii.sinvoke(cls, "makeStructInstance", [])

    @builtins.property
    @jsii.member(jsii_name="unionProperty")
    def union_property(
        self,
    ) -> typing.Optional[
        typing.Union[
            scope.jsii_calc_lib.IFriendly,
            typing.List[typing.Union[scope.jsii_calc_lib.IFriendly, "AbstractClass"]],
        ]
    ]:
        return jsii.get(self, "unionProperty")

    @union_property.setter
    def union_property(
        self,
        value: typing.Optional[
            typing.Union[
                scope.jsii_calc_lib.IFriendly,
                typing.List[
                    typing.Union[scope.jsii_calc_lib.IFriendly, "AbstractClass"]
                ],
            ]
        ],
    ) -> None:
        jsii.set(self, "unionProperty", value)


@jsii.data_type(
    jsii_type="jsii-calc.ConfusingToJacksonStruct",
    jsii_struct_bases=[],
    name_mapping={"union_property": "unionProperty"},
)
class ConfusingToJacksonStruct:
    def __init__(
        self,
        *,
        union_property: typing.Optional[
            typing.Union[
                scope.jsii_calc_lib.IFriendly,
                typing.List[
                    typing.Union[scope.jsii_calc_lib.IFriendly, "AbstractClass"]
                ],
            ]
        ] = None,
    ) -> None:
        """
        :param union_property: 
        """
        self._values = {}
        if union_property is not None:
            self._values["union_property"] = union_property

    @builtins.property
    def union_property(
        self,
    ) -> typing.Optional[
        typing.Union[
            scope.jsii_calc_lib.IFriendly,
            typing.List[typing.Union[scope.jsii_calc_lib.IFriendly, "AbstractClass"]],
        ]
    ]:
        return self._values.get("union_property")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "ConfusingToJacksonStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class ConstructorPassesThisOut(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ConstructorPassesThisOut"
):
    def __init__(self, consumer: "PartiallyInitializedThisConsumer") -> None:
        """
        :param consumer: -
        """
        jsii.create(ConstructorPassesThisOut, self, [consumer])


class Constructors(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Constructors"):
    def __init__(self) -> None:
        jsii.create(Constructors, self, [])

    @jsii.member(jsii_name="hiddenInterface")
    @builtins.classmethod
    def hidden_interface(cls) -> "IPublicInterface":
        return jsii.sinvoke(cls, "hiddenInterface", [])

    @jsii.member(jsii_name="hiddenInterfaces")
    @builtins.classmethod
    def hidden_interfaces(cls) -> typing.List["IPublicInterface"]:
        return jsii.sinvoke(cls, "hiddenInterfaces", [])

    @jsii.member(jsii_name="hiddenSubInterfaces")
    @builtins.classmethod
    def hidden_sub_interfaces(cls) -> typing.List["IPublicInterface"]:
        return jsii.sinvoke(cls, "hiddenSubInterfaces", [])

    @jsii.member(jsii_name="makeClass")
    @builtins.classmethod
    def make_class(cls) -> "PublicClass":
        return jsii.sinvoke(cls, "makeClass", [])

    @jsii.member(jsii_name="makeInterface")
    @builtins.classmethod
    def make_interface(cls) -> "IPublicInterface":
        return jsii.sinvoke(cls, "makeInterface", [])

    @jsii.member(jsii_name="makeInterface2")
    @builtins.classmethod
    def make_interface2(cls) -> "IPublicInterface2":
        return jsii.sinvoke(cls, "makeInterface2", [])

    @jsii.member(jsii_name="makeInterfaces")
    @builtins.classmethod
    def make_interfaces(cls) -> typing.List["IPublicInterface"]:
        return jsii.sinvoke(cls, "makeInterfaces", [])


class ConsumePureInterface(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ConsumePureInterface"
):
    def __init__(self, delegate: "IStructReturningDelegate") -> None:
        """
        :param delegate: -
        """
        jsii.create(ConsumePureInterface, self, [delegate])

    @jsii.member(jsii_name="workItBaby")
    def work_it_baby(self) -> "StructB":
        return jsii.invoke(self, "workItBaby", [])


class ConsumerCanRingBell(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ConsumerCanRingBell"
):
    """Test calling back to consumers that implement interfaces.

    Check that if a JSII consumer implements IConsumerWithInterfaceParam, they can call
    the method on the argument that they're passed...
    """

    def __init__(self) -> None:
        jsii.create(ConsumerCanRingBell, self, [])

    @jsii.member(jsii_name="staticImplementedByObjectLiteral")
    @builtins.classmethod
    def static_implemented_by_object_literal(cls, ringer: "IBellRinger") -> bool:
        """...if the interface is implemented using an object literal.

        Returns whether the bell was rung.

        :param ringer: -
        """
        return jsii.sinvoke(cls, "staticImplementedByObjectLiteral", [ringer])

    @jsii.member(jsii_name="staticImplementedByPrivateClass")
    @builtins.classmethod
    def static_implemented_by_private_class(cls, ringer: "IBellRinger") -> bool:
        """...if the interface is implemented using a private class.

        Return whether the bell was rung.

        :param ringer: -
        """
        return jsii.sinvoke(cls, "staticImplementedByPrivateClass", [ringer])

    @jsii.member(jsii_name="staticImplementedByPublicClass")
    @builtins.classmethod
    def static_implemented_by_public_class(cls, ringer: "IBellRinger") -> bool:
        """...if the interface is implemented using a public class.

        Return whether the bell was rung.

        :param ringer: -
        """
        return jsii.sinvoke(cls, "staticImplementedByPublicClass", [ringer])

    @jsii.member(jsii_name="staticWhenTypedAsClass")
    @builtins.classmethod
    def static_when_typed_as_class(cls, ringer: "IConcreteBellRinger") -> bool:
        """If the parameter is a concrete class instead of an interface.

        Return whether the bell was rung.

        :param ringer: -
        """
        return jsii.sinvoke(cls, "staticWhenTypedAsClass", [ringer])

    @jsii.member(jsii_name="implementedByObjectLiteral")
    def implemented_by_object_literal(self, ringer: "IBellRinger") -> bool:
        """...if the interface is implemented using an object literal.

        Returns whether the bell was rung.

        :param ringer: -
        """
        return jsii.invoke(self, "implementedByObjectLiteral", [ringer])

    @jsii.member(jsii_name="implementedByPrivateClass")
    def implemented_by_private_class(self, ringer: "IBellRinger") -> bool:
        """...if the interface is implemented using a private class.

        Return whether the bell was rung.

        :param ringer: -
        """
        return jsii.invoke(self, "implementedByPrivateClass", [ringer])

    @jsii.member(jsii_name="implementedByPublicClass")
    def implemented_by_public_class(self, ringer: "IBellRinger") -> bool:
        """...if the interface is implemented using a public class.

        Return whether the bell was rung.

        :param ringer: -
        """
        return jsii.invoke(self, "implementedByPublicClass", [ringer])

    @jsii.member(jsii_name="whenTypedAsClass")
    def when_typed_as_class(self, ringer: "IConcreteBellRinger") -> bool:
        """If the parameter is a concrete class instead of an interface.

        Return whether the bell was rung.

        :param ringer: -
        """
        return jsii.invoke(self, "whenTypedAsClass", [ringer])


class ConsumersOfThisCrazyTypeSystem(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ConsumersOfThisCrazyTypeSystem"
):
    def __init__(self) -> None:
        jsii.create(ConsumersOfThisCrazyTypeSystem, self, [])

    @jsii.member(jsii_name="consumeAnotherPublicInterface")
    def consume_another_public_interface(self, obj: "IAnotherPublicInterface") -> str:
        """
        :param obj: -
        """
        return jsii.invoke(self, "consumeAnotherPublicInterface", [obj])

    @jsii.member(jsii_name="consumeNonInternalInterface")
    def consume_non_internal_interface(
        self, obj: "INonInternalInterface"
    ) -> typing.Any:
        """
        :param obj: -
        """
        return jsii.invoke(self, "consumeNonInternalInterface", [obj])


class DataRenderer(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DataRenderer"):
    """Verifies proper type handling through dynamic overrides."""

    def __init__(self) -> None:
        jsii.create(DataRenderer, self, [])

    @jsii.member(jsii_name="render")
    def render(
        self,
        *,
        anumber: jsii.Number,
        astring: str,
        first_optional: typing.Optional[typing.List[str]] = None,
    ) -> str:
        """
        :param anumber: An awesome number value. (deprecated)
        :param astring: A string value. (deprecated)
        :param first_optional: (deprecated)
        """
        data = scope.jsii_calc_lib.MyFirstStruct(
            anumber=anumber, astring=astring, first_optional=first_optional
        )

        return jsii.invoke(self, "render", [data])

    @jsii.member(jsii_name="renderArbitrary")
    def render_arbitrary(self, data: typing.Mapping[str, typing.Any]) -> str:
        """
        :param data: -
        """
        return jsii.invoke(self, "renderArbitrary", [data])

    @jsii.member(jsii_name="renderMap")
    def render_map(self, map: typing.Mapping[str, typing.Any]) -> str:
        """
        :param map: -
        """
        return jsii.invoke(self, "renderMap", [map])


class DefaultedConstructorArgument(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DefaultedConstructorArgument"
):
    def __init__(
        self,
        arg1: typing.Optional[jsii.Number] = None,
        arg2: typing.Optional[str] = None,
        arg3: typing.Optional[datetime.datetime] = None,
    ) -> None:
        """
        :param arg1: -
        :param arg2: -
        :param arg3: -
        """
        jsii.create(DefaultedConstructorArgument, self, [arg1, arg2, arg3])

    @builtins.property
    @jsii.member(jsii_name="arg1")
    def arg1(self) -> jsii.Number:
        return jsii.get(self, "arg1")

    @builtins.property
    @jsii.member(jsii_name="arg3")
    def arg3(self) -> datetime.datetime:
        return jsii.get(self, "arg3")

    @builtins.property
    @jsii.member(jsii_name="arg2")
    def arg2(self) -> typing.Optional[str]:
        return jsii.get(self, "arg2")


class Demonstrate982(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Demonstrate982"):
    """1.

    call #takeThis() -> An ObjectRef will be provisioned for the value (it'll be re-used!)
    2. call #takeThisToo() -> The ObjectRef from before will need to be down-cased to the ParentStruct982 type
    """

    def __init__(self) -> None:
        jsii.create(Demonstrate982, self, [])

    @jsii.member(jsii_name="takeThis")
    @builtins.classmethod
    def take_this(cls) -> "ChildStruct982":
        """It's dangerous to go alone!"""
        return jsii.sinvoke(cls, "takeThis", [])

    @jsii.member(jsii_name="takeThisToo")
    @builtins.classmethod
    def take_this_too(cls) -> "ParentStruct982":
        """It's dangerous to go alone!"""
        return jsii.sinvoke(cls, "takeThisToo", [])


class DeprecatedClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DeprecatedClass"):
    """(deprecated)

    deprecated
    :deprecated: a pretty boring class

    stability
    :stability: deprecated
    """

    def __init__(
        self, readonly_string: str, mutable_number: typing.Optional[jsii.Number] = None
    ) -> None:
        """(deprecated)

        :param readonly_string: -
        :param mutable_number: -

        deprecated
        :deprecated: this constructor is "just" okay

        stability
        :stability: deprecated
        """
        jsii.create(DeprecatedClass, self, [readonly_string, mutable_number])

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """(deprecated)

        deprecated
        :deprecated: it was a bad idea

        stability
        :stability: deprecated
        """
        return jsii.invoke(self, "method", [])

    @builtins.property
    @jsii.member(jsii_name="readonlyProperty")
    def readonly_property(self) -> str:
        """(deprecated)

        deprecated
        :deprecated: this is not always "wazoo", be ready to be disappointed

        stability
        :stability: deprecated
        """
        return jsii.get(self, "readonlyProperty")

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """(deprecated)

        deprecated
        :deprecated: shouldn't have been mutable

        stability
        :stability: deprecated
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]) -> None:
        jsii.set(self, "mutableProperty", value)


@jsii.enum(jsii_type="jsii-calc.DeprecatedEnum")
class DeprecatedEnum(enum.Enum):
    """(deprecated)

    deprecated
    :deprecated: your deprecated selection of bad options

    stability
    :stability: deprecated
    """

    OPTION_A = "OPTION_A"
    """(deprecated)

    deprecated
    :deprecated: option A is not great

    stability
    :stability: deprecated
    """
    OPTION_B = "OPTION_B"
    """(deprecated)

    deprecated
    :deprecated: option B is kinda bad, too

    stability
    :stability: deprecated
    """


@jsii.data_type(
    jsii_type="jsii-calc.DeprecatedStruct",
    jsii_struct_bases=[],
    name_mapping={"readonly_property": "readonlyProperty"},
)
class DeprecatedStruct:
    def __init__(self, *, readonly_property: str) -> None:
        """(deprecated)

        :param readonly_property: (deprecated)

        deprecated
        :deprecated: it just wraps a string

        stability
        :stability: deprecated
        """
        self._values = {
            "readonly_property": readonly_property,
        }

    @builtins.property
    def readonly_property(self) -> str:
        """(deprecated)

        deprecated
        :deprecated: well, yeah

        stability
        :stability: deprecated
        """
        return self._values.get("readonly_property")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "DeprecatedStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.data_type(
    jsii_type="jsii-calc.DerivedStruct",
    jsii_struct_bases=[scope.jsii_calc_lib.MyFirstStruct],
    name_mapping={
        "anumber": "anumber",
        "astring": "astring",
        "first_optional": "firstOptional",
        "another_required": "anotherRequired",
        "bool": "bool",
        "non_primitive": "nonPrimitive",
        "another_optional": "anotherOptional",
        "optional_any": "optionalAny",
        "optional_array": "optionalArray",
    },
)
class DerivedStruct(scope.jsii_calc_lib.MyFirstStruct):
    def __init__(
        self,
        *,
        anumber: jsii.Number,
        astring: str,
        first_optional: typing.Optional[typing.List[str]] = None,
        another_required: datetime.datetime,
        bool: bool,
        non_primitive: "DoubleTrouble",
        another_optional: typing.Optional[
            typing.Mapping[str, scope.jsii_calc_lib.Value]
        ] = None,
        optional_any: typing.Any = None,
        optional_array: typing.Optional[typing.List[str]] = None,
    ) -> None:
        """A struct which derives from another struct.

        :param anumber: An awesome number value. (deprecated)
        :param astring: A string value. (deprecated)
        :param first_optional: (deprecated)
        :param another_required: 
        :param bool: 
        :param non_primitive: An example of a non primitive property.
        :param another_optional: This is optional.
        :param optional_any: 
        :param optional_array: 
        """
        self._values = {
            "anumber": anumber,
            "astring": astring,
            "another_required": another_required,
            "bool": bool,
            "non_primitive": non_primitive,
        }
        if first_optional is not None:
            self._values["first_optional"] = first_optional
        if another_optional is not None:
            self._values["another_optional"] = another_optional
        if optional_any is not None:
            self._values["optional_any"] = optional_any
        if optional_array is not None:
            self._values["optional_array"] = optional_array

    @builtins.property
    def anumber(self) -> jsii.Number:
        """An awesome number value. (deprecated)

        stability
        :stability: deprecated
        """
        return self._values.get("anumber")

    @builtins.property
    def astring(self) -> str:
        """A string value. (deprecated)

        stability
        :stability: deprecated
        """
        return self._values.get("astring")

    @builtins.property
    def first_optional(self) -> typing.Optional[typing.List[str]]:
        """(deprecated)

        stability
        :stability: deprecated
        """
        return self._values.get("first_optional")

    @builtins.property
    def another_required(self) -> datetime.datetime:
        return self._values.get("another_required")

    @builtins.property
    def bool(self) -> bool:
        return self._values.get("bool")

    @builtins.property
    def non_primitive(self) -> "DoubleTrouble":
        """An example of a non primitive property."""
        return self._values.get("non_primitive")

    @builtins.property
    def another_optional(
        self,
    ) -> typing.Optional[typing.Mapping[str, scope.jsii_calc_lib.Value]]:
        """This is optional."""
        return self._values.get("another_optional")

    @builtins.property
    def optional_any(self) -> typing.Any:
        return self._values.get("optional_any")

    @builtins.property
    def optional_array(self) -> typing.Optional[typing.List[str]]:
        return self._values.get("optional_array")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "DerivedStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.data_type(
    jsii_type="jsii-calc.DiamondInheritanceBaseLevelStruct",
    jsii_struct_bases=[],
    name_mapping={"base_level_property": "baseLevelProperty"},
)
class DiamondInheritanceBaseLevelStruct:
    def __init__(self, *, base_level_property: str) -> None:
        """
        :param base_level_property: 
        """
        self._values = {
            "base_level_property": base_level_property,
        }

    @builtins.property
    def base_level_property(self) -> str:
        return self._values.get("base_level_property")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "DiamondInheritanceBaseLevelStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.data_type(
    jsii_type="jsii-calc.DiamondInheritanceFirstMidLevelStruct",
    jsii_struct_bases=[DiamondInheritanceBaseLevelStruct],
    name_mapping={
        "base_level_property": "baseLevelProperty",
        "first_mid_level_property": "firstMidLevelProperty",
    },
)
class DiamondInheritanceFirstMidLevelStruct(DiamondInheritanceBaseLevelStruct):
    def __init__(
        self, *, base_level_property: str, first_mid_level_property: str
    ) -> None:
        """
        :param base_level_property: 
        :param first_mid_level_property: 
        """
        self._values = {
            "base_level_property": base_level_property,
            "first_mid_level_property": first_mid_level_property,
        }

    @builtins.property
    def base_level_property(self) -> str:
        return self._values.get("base_level_property")

    @builtins.property
    def first_mid_level_property(self) -> str:
        return self._values.get("first_mid_level_property")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "DiamondInheritanceFirstMidLevelStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.data_type(
    jsii_type="jsii-calc.DiamondInheritanceSecondMidLevelStruct",
    jsii_struct_bases=[DiamondInheritanceBaseLevelStruct],
    name_mapping={
        "base_level_property": "baseLevelProperty",
        "second_mid_level_property": "secondMidLevelProperty",
    },
)
class DiamondInheritanceSecondMidLevelStruct(DiamondInheritanceBaseLevelStruct):
    def __init__(
        self, *, base_level_property: str, second_mid_level_property: str
    ) -> None:
        """
        :param base_level_property: 
        :param second_mid_level_property: 
        """
        self._values = {
            "base_level_property": base_level_property,
            "second_mid_level_property": second_mid_level_property,
        }

    @builtins.property
    def base_level_property(self) -> str:
        return self._values.get("base_level_property")

    @builtins.property
    def second_mid_level_property(self) -> str:
        return self._values.get("second_mid_level_property")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "DiamondInheritanceSecondMidLevelStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.data_type(
    jsii_type="jsii-calc.DiamondInheritanceTopLevelStruct",
    jsii_struct_bases=[
        DiamondInheritanceFirstMidLevelStruct,
        DiamondInheritanceSecondMidLevelStruct,
    ],
    name_mapping={
        "base_level_property": "baseLevelProperty",
        "first_mid_level_property": "firstMidLevelProperty",
        "second_mid_level_property": "secondMidLevelProperty",
        "top_level_property": "topLevelProperty",
    },
)
class DiamondInheritanceTopLevelStruct(
    DiamondInheritanceFirstMidLevelStruct, DiamondInheritanceSecondMidLevelStruct
):
    def __init__(
        self,
        *,
        base_level_property: str,
        first_mid_level_property: str,
        second_mid_level_property: str,
        top_level_property: str,
    ) -> None:
        """
        :param base_level_property: 
        :param first_mid_level_property: 
        :param second_mid_level_property: 
        :param top_level_property: 
        """
        self._values = {
            "base_level_property": base_level_property,
            "first_mid_level_property": first_mid_level_property,
            "second_mid_level_property": second_mid_level_property,
            "top_level_property": top_level_property,
        }

    @builtins.property
    def base_level_property(self) -> str:
        return self._values.get("base_level_property")

    @builtins.property
    def first_mid_level_property(self) -> str:
        return self._values.get("first_mid_level_property")

    @builtins.property
    def second_mid_level_property(self) -> str:
        return self._values.get("second_mid_level_property")

    @builtins.property
    def top_level_property(self) -> str:
        return self._values.get("top_level_property")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "DiamondInheritanceTopLevelStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class DisappointingCollectionSource(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DisappointingCollectionSource"
):
    """Verifies that null/undefined can be returned for optional collections.

    This source of collections is disappointing - it'll always give you nothing :(
    """

    @jsii.python.classproperty
    @jsii.member(jsii_name="maybeList")
    def MAYBE_LIST(cls) -> typing.Optional[typing.List[str]]:
        """Some List of strings, maybe?

        (Nah, just a billion dollars mistake!)
        """
        return jsii.sget(cls, "maybeList")

    @jsii.python.classproperty
    @jsii.member(jsii_name="maybeMap")
    def MAYBE_MAP(cls) -> typing.Optional[typing.Mapping[str, jsii.Number]]:
        """Some Map of strings to numbers, maybe?

        (Nah, just a billion dollars mistake!)
        """
        return jsii.sget(cls, "maybeMap")


class DoNotOverridePrivates(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DoNotOverridePrivates"
):
    def __init__(self) -> None:
        jsii.create(DoNotOverridePrivates, self, [])

    @jsii.member(jsii_name="changePrivatePropertyValue")
    def change_private_property_value(self, new_value: str) -> None:
        """
        :param new_value: -
        """
        return jsii.invoke(self, "changePrivatePropertyValue", [new_value])

    @jsii.member(jsii_name="privateMethodValue")
    def private_method_value(self) -> str:
        return jsii.invoke(self, "privateMethodValue", [])

    @jsii.member(jsii_name="privatePropertyValue")
    def private_property_value(self) -> str:
        return jsii.invoke(self, "privatePropertyValue", [])


class DoNotRecognizeAnyAsOptional(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DoNotRecognizeAnyAsOptional"
):
    """jsii#284: do not recognize "any" as an optional argument."""

    def __init__(self) -> None:
        jsii.create(DoNotRecognizeAnyAsOptional, self, [])

    @jsii.member(jsii_name="method")
    def method(
        self,
        _required_any: typing.Any,
        _optional_any: typing.Any = None,
        _optional_string: typing.Optional[str] = None,
    ) -> None:
        """
        :param _required_any: -
        :param _optional_any: -
        :param _optional_string: -
        """
        return jsii.invoke(
            self, "method", [_required_any, _optional_any, _optional_string]
        )


class DocumentedClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DocumentedClass"):
    """Here's the first line of the TSDoc comment.

    This is the meat of the TSDoc comment. It may contain
    multiple lines and multiple paragraphs.

    Multiple paragraphs are separated by an empty line.
    """

    def __init__(self) -> None:
        jsii.create(DocumentedClass, self, [])

    @jsii.member(jsii_name="greet")
    def greet(self, *, name: typing.Optional[str] = None) -> jsii.Number:
        """Greet the indicated person.

        This will print out a friendly greeting intended for
        the indicated person.

        :param name: The name of the greetee. Default: world

        return
        :return: A number that everyone knows very well
        """
        greetee = Greetee(name=name)

        return jsii.invoke(self, "greet", [greetee])

    @jsii.member(jsii_name="hola")
    def hola(self) -> None:
        """Say ¡Hola! (experimental)

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "hola", [])


class DontComplainAboutVariadicAfterOptional(
    metaclass=jsii.JSIIMeta,
    jsii_type="jsii-calc.DontComplainAboutVariadicAfterOptional",
):
    def __init__(self) -> None:
        jsii.create(DontComplainAboutVariadicAfterOptional, self, [])

    @jsii.member(jsii_name="optionalAndVariadic")
    def optional_and_variadic(
        self, optional: typing.Optional[str] = None, *things: str
    ) -> str:
        """
        :param optional: -
        :param things: -
        """
        return jsii.invoke(self, "optionalAndVariadic", [optional, *things])


class EnumDispenser(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.EnumDispenser"):
    @jsii.member(jsii_name="randomIntegerLikeEnum")
    @builtins.classmethod
    def random_integer_like_enum(cls) -> "AllTypesEnum":
        return jsii.sinvoke(cls, "randomIntegerLikeEnum", [])

    @jsii.member(jsii_name="randomStringLikeEnum")
    @builtins.classmethod
    def random_string_like_enum(cls) -> "StringEnum":
        return jsii.sinvoke(cls, "randomStringLikeEnum", [])


class EraseUndefinedHashValues(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.EraseUndefinedHashValues"
):
    def __init__(self) -> None:
        jsii.create(EraseUndefinedHashValues, self, [])

    @jsii.member(jsii_name="doesKeyExist")
    @builtins.classmethod
    def does_key_exist(cls, opts: "EraseUndefinedHashValuesOptions", key: str) -> bool:
        """Returns ``true`` if ``key`` is defined in ``opts``.

        Used to check that undefined/null hash values
        are being erased when sending values from native code to JS.

        :param opts: -
        :param key: -
        """
        return jsii.sinvoke(cls, "doesKeyExist", [opts, key])

    @jsii.member(jsii_name="prop1IsNull")
    @builtins.classmethod
    def prop1_is_null(cls) -> typing.Mapping[str, typing.Any]:
        """We expect "prop1" to be erased."""
        return jsii.sinvoke(cls, "prop1IsNull", [])

    @jsii.member(jsii_name="prop2IsUndefined")
    @builtins.classmethod
    def prop2_is_undefined(cls) -> typing.Mapping[str, typing.Any]:
        """We expect "prop2" to be erased."""
        return jsii.sinvoke(cls, "prop2IsUndefined", [])


@jsii.data_type(
    jsii_type="jsii-calc.EraseUndefinedHashValuesOptions",
    jsii_struct_bases=[],
    name_mapping={"option1": "option1", "option2": "option2"},
)
class EraseUndefinedHashValuesOptions:
    def __init__(
        self,
        *,
        option1: typing.Optional[str] = None,
        option2: typing.Optional[str] = None,
    ) -> None:
        """
        :param option1: 
        :param option2: 
        """
        self._values = {}
        if option1 is not None:
            self._values["option1"] = option1
        if option2 is not None:
            self._values["option2"] = option2

    @builtins.property
    def option1(self) -> typing.Optional[str]:
        return self._values.get("option1")

    @builtins.property
    def option2(self) -> typing.Optional[str]:
        return self._values.get("option2")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "EraseUndefinedHashValuesOptions(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class ExperimentalClass(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ExperimentalClass"
):
    """(experimental)

    stability
    :stability: experimental
    """

    def __init__(
        self, readonly_string: str, mutable_number: typing.Optional[jsii.Number] = None
    ) -> None:
        """(experimental)

        :param readonly_string: -
        :param mutable_number: -

        stability
        :stability: experimental
        """
        jsii.create(ExperimentalClass, self, [readonly_string, mutable_number])

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """(experimental)

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "method", [])

    @builtins.property
    @jsii.member(jsii_name="readonlyProperty")
    def readonly_property(self) -> str:
        """(experimental)

        stability
        :stability: experimental
        """
        return jsii.get(self, "readonlyProperty")

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """(experimental)

        stability
        :stability: experimental
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]) -> None:
        jsii.set(self, "mutableProperty", value)


@jsii.enum(jsii_type="jsii-calc.ExperimentalEnum")
class ExperimentalEnum(enum.Enum):
    """(experimental)

    stability
    :stability: experimental
    """

    OPTION_A = "OPTION_A"
    """(experimental)

    stability
    :stability: experimental
    """
    OPTION_B = "OPTION_B"
    """(experimental)

    stability
    :stability: experimental
    """


@jsii.data_type(
    jsii_type="jsii-calc.ExperimentalStruct",
    jsii_struct_bases=[],
    name_mapping={"readonly_property": "readonlyProperty"},
)
class ExperimentalStruct:
    def __init__(self, *, readonly_property: str) -> None:
        """(experimental)

        :param readonly_property: (experimental)

        stability
        :stability: experimental
        """
        self._values = {
            "readonly_property": readonly_property,
        }

    @builtins.property
    def readonly_property(self) -> str:
        """(experimental)

        stability
        :stability: experimental
        """
        return self._values.get("readonly_property")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "ExperimentalStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class ExportedBaseClass(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ExportedBaseClass"
):
    def __init__(self, success: bool) -> None:
        """
        :param success: -
        """
        jsii.create(ExportedBaseClass, self, [success])

    @builtins.property
    @jsii.member(jsii_name="success")
    def success(self) -> bool:
        return jsii.get(self, "success")


@jsii.data_type(
    jsii_type="jsii-calc.ExtendsInternalInterface",
    jsii_struct_bases=[],
    name_mapping={"boom": "boom", "prop": "prop"},
)
class ExtendsInternalInterface:
    def __init__(self, *, boom: bool, prop: str) -> None:
        """
        :param boom: 
        :param prop: 
        """
        self._values = {
            "boom": boom,
            "prop": prop,
        }

    @builtins.property
    def boom(self) -> bool:
        return self._values.get("boom")

    @builtins.property
    def prop(self) -> str:
        return self._values.get("prop")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "ExtendsInternalInterface(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class ExternalClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ExternalClass"):
    """
    external:
    :external:: true
    """

    def __init__(
        self, readonly_string: str, mutable_number: typing.Optional[jsii.Number] = None
    ) -> None:
        """
        :param readonly_string: -
        :param mutable_number: -

        external:
        :external:: true
        """
        jsii.create(ExternalClass, self, [readonly_string, mutable_number])

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        external:
        :external:: true
        """
        return jsii.invoke(self, "method", [])

    @builtins.property
    @jsii.member(jsii_name="readonlyProperty")
    def readonly_property(self) -> str:
        """
        external:
        :external:: true
        """
        return jsii.get(self, "readonlyProperty")

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        external:
        :external:: true
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]) -> None:
        jsii.set(self, "mutableProperty", value)


@jsii.enum(jsii_type="jsii-calc.ExternalEnum")
class ExternalEnum(enum.Enum):
    """
    external:
    :external:: true
    """

    OPTION_A = "OPTION_A"
    """
    external:
    :external:: true
    """
    OPTION_B = "OPTION_B"
    """
    external:
    :external:: true
    """


@jsii.data_type(
    jsii_type="jsii-calc.ExternalStruct",
    jsii_struct_bases=[],
    name_mapping={"readonly_property": "readonlyProperty"},
)
class ExternalStruct:
    def __init__(self, *, readonly_property: str) -> None:
        """
        :param readonly_property: 

        external:
        :external:: true
        """
        self._values = {
            "readonly_property": readonly_property,
        }

    @builtins.property
    def readonly_property(self) -> str:
        """
        external:
        :external:: true
        """
        return self._values.get("readonly_property")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "ExternalStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class GiveMeStructs(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.GiveMeStructs"):
    def __init__(self) -> None:
        jsii.create(GiveMeStructs, self, [])

    @jsii.member(jsii_name="derivedToFirst")
    def derived_to_first(
        self,
        *,
        another_required: datetime.datetime,
        bool: bool,
        non_primitive: "DoubleTrouble",
        another_optional: typing.Optional[
            typing.Mapping[str, scope.jsii_calc_lib.Value]
        ] = None,
        optional_any: typing.Any = None,
        optional_array: typing.Optional[typing.List[str]] = None,
        anumber: jsii.Number,
        astring: str,
        first_optional: typing.Optional[typing.List[str]] = None,
    ) -> scope.jsii_calc_lib.MyFirstStruct:
        """Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.

        :param another_required: 
        :param bool: 
        :param non_primitive: An example of a non primitive property.
        :param another_optional: This is optional.
        :param optional_any: 
        :param optional_array: 
        :param anumber: An awesome number value. (deprecated)
        :param astring: A string value. (deprecated)
        :param first_optional: (deprecated)
        """
        derived = DerivedStruct(
            another_required=another_required,
            bool=bool,
            non_primitive=non_primitive,
            another_optional=another_optional,
            optional_any=optional_any,
            optional_array=optional_array,
            anumber=anumber,
            astring=astring,
            first_optional=first_optional,
        )

        return jsii.invoke(self, "derivedToFirst", [derived])

    @jsii.member(jsii_name="readDerivedNonPrimitive")
    def read_derived_non_primitive(
        self,
        *,
        another_required: datetime.datetime,
        bool: bool,
        non_primitive: "DoubleTrouble",
        another_optional: typing.Optional[
            typing.Mapping[str, scope.jsii_calc_lib.Value]
        ] = None,
        optional_any: typing.Any = None,
        optional_array: typing.Optional[typing.List[str]] = None,
        anumber: jsii.Number,
        astring: str,
        first_optional: typing.Optional[typing.List[str]] = None,
    ) -> "DoubleTrouble":
        """Returns the boolean from a DerivedStruct struct.

        :param another_required: 
        :param bool: 
        :param non_primitive: An example of a non primitive property.
        :param another_optional: This is optional.
        :param optional_any: 
        :param optional_array: 
        :param anumber: An awesome number value. (deprecated)
        :param astring: A string value. (deprecated)
        :param first_optional: (deprecated)
        """
        derived = DerivedStruct(
            another_required=another_required,
            bool=bool,
            non_primitive=non_primitive,
            another_optional=another_optional,
            optional_any=optional_any,
            optional_array=optional_array,
            anumber=anumber,
            astring=astring,
            first_optional=first_optional,
        )

        return jsii.invoke(self, "readDerivedNonPrimitive", [derived])

    @jsii.member(jsii_name="readFirstNumber")
    def read_first_number(
        self,
        *,
        anumber: jsii.Number,
        astring: str,
        first_optional: typing.Optional[typing.List[str]] = None,
    ) -> jsii.Number:
        """Returns the "anumber" from a MyFirstStruct struct;

        :param anumber: An awesome number value. (deprecated)
        :param astring: A string value. (deprecated)
        :param first_optional: (deprecated)
        """
        first = scope.jsii_calc_lib.MyFirstStruct(
            anumber=anumber, astring=astring, first_optional=first_optional
        )

        return jsii.invoke(self, "readFirstNumber", [first])

    @builtins.property
    @jsii.member(jsii_name="structLiteral")
    def struct_literal(self) -> scope.jsii_calc_lib.StructWithOnlyOptionals:
        return jsii.get(self, "structLiteral")


@jsii.data_type(
    jsii_type="jsii-calc.Greetee", jsii_struct_bases=[], name_mapping={"name": "name"}
)
class Greetee:
    def __init__(self, *, name: typing.Optional[str] = None) -> None:
        """These are some arguments you can pass to a method.

        :param name: The name of the greetee. Default: world
        """
        self._values = {}
        if name is not None:
            self._values["name"] = name

    @builtins.property
    def name(self) -> typing.Optional[str]:
        """The name of the greetee.

        default
        :default: world
        """
        return self._values.get("name")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "Greetee(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class GreetingAugmenter(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.GreetingAugmenter"
):
    def __init__(self) -> None:
        jsii.create(GreetingAugmenter, self, [])

    @jsii.member(jsii_name="betterGreeting")
    def better_greeting(self, friendly: scope.jsii_calc_lib.IFriendly) -> str:
        """
        :param friendly: -
        """
        return jsii.invoke(self, "betterGreeting", [friendly])


@jsii.interface(jsii_type="jsii-calc.IAnonymousImplementationProvider")
class IAnonymousImplementationProvider(jsii.compat.Protocol):
    """We can return an anonymous interface implementation from an override without losing the interface declarations."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IAnonymousImplementationProviderProxy

    @jsii.member(jsii_name="provideAsClass")
    def provide_as_class(self) -> "Implementation":
        ...

    @jsii.member(jsii_name="provideAsInterface")
    def provide_as_interface(self) -> "IAnonymouslyImplementMe":
        ...


class _IAnonymousImplementationProviderProxy:
    """We can return an anonymous interface implementation from an override without losing the interface declarations."""

    __jsii_type__ = "jsii-calc.IAnonymousImplementationProvider"

    @jsii.member(jsii_name="provideAsClass")
    def provide_as_class(self) -> "Implementation":
        return jsii.invoke(self, "provideAsClass", [])

    @jsii.member(jsii_name="provideAsInterface")
    def provide_as_interface(self) -> "IAnonymouslyImplementMe":
        return jsii.invoke(self, "provideAsInterface", [])


@jsii.interface(jsii_type="jsii-calc.IAnonymouslyImplementMe")
class IAnonymouslyImplementMe(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IAnonymouslyImplementMeProxy

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        ...

    @jsii.member(jsii_name="verb")
    def verb(self) -> str:
        ...


class _IAnonymouslyImplementMeProxy:
    __jsii_type__ = "jsii-calc.IAnonymouslyImplementMe"

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        return jsii.get(self, "value")

    @jsii.member(jsii_name="verb")
    def verb(self) -> str:
        return jsii.invoke(self, "verb", [])


@jsii.interface(jsii_type="jsii-calc.IAnotherPublicInterface")
class IAnotherPublicInterface(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IAnotherPublicInterfaceProxy

    @builtins.property
    @jsii.member(jsii_name="a")
    def a(self) -> str:
        ...

    @a.setter
    def a(self, value: str) -> None:
        ...


class _IAnotherPublicInterfaceProxy:
    __jsii_type__ = "jsii-calc.IAnotherPublicInterface"

    @builtins.property
    @jsii.member(jsii_name="a")
    def a(self) -> str:
        return jsii.get(self, "a")

    @a.setter
    def a(self, value: str) -> None:
        jsii.set(self, "a", value)


@jsii.interface(jsii_type="jsii-calc.IBell")
class IBell(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IBellProxy

    @jsii.member(jsii_name="ring")
    def ring(self) -> None:
        ...


class _IBellProxy:
    __jsii_type__ = "jsii-calc.IBell"

    @jsii.member(jsii_name="ring")
    def ring(self) -> None:
        return jsii.invoke(self, "ring", [])


@jsii.interface(jsii_type="jsii-calc.IBellRinger")
class IBellRinger(jsii.compat.Protocol):
    """Takes the object parameter as an interface."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IBellRingerProxy

    @jsii.member(jsii_name="yourTurn")
    def your_turn(self, bell: "IBell") -> None:
        """
        :param bell: -
        """
        ...


class _IBellRingerProxy:
    """Takes the object parameter as an interface."""

    __jsii_type__ = "jsii-calc.IBellRinger"

    @jsii.member(jsii_name="yourTurn")
    def your_turn(self, bell: "IBell") -> None:
        """
        :param bell: -
        """
        return jsii.invoke(self, "yourTurn", [bell])


@jsii.interface(jsii_type="jsii-calc.IConcreteBellRinger")
class IConcreteBellRinger(jsii.compat.Protocol):
    """Takes the object parameter as a calss."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IConcreteBellRingerProxy

    @jsii.member(jsii_name="yourTurn")
    def your_turn(self, bell: "Bell") -> None:
        """
        :param bell: -
        """
        ...


class _IConcreteBellRingerProxy:
    """Takes the object parameter as a calss."""

    __jsii_type__ = "jsii-calc.IConcreteBellRinger"

    @jsii.member(jsii_name="yourTurn")
    def your_turn(self, bell: "Bell") -> None:
        """
        :param bell: -
        """
        return jsii.invoke(self, "yourTurn", [bell])


@jsii.interface(jsii_type="jsii-calc.IDeprecatedInterface")
class IDeprecatedInterface(jsii.compat.Protocol):
    """(deprecated)

    deprecated
    :deprecated: useless interface

    stability
    :stability: deprecated
    """

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IDeprecatedInterfaceProxy

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """(deprecated)

        deprecated
        :deprecated: could be better

        stability
        :stability: deprecated
        """
        ...

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]) -> None:
        ...

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """(deprecated)

        deprecated
        :deprecated: services no purpose

        stability
        :stability: deprecated
        """
        ...


class _IDeprecatedInterfaceProxy:
    """(deprecated)

    deprecated
    :deprecated: useless interface

    stability
    :stability: deprecated
    """

    __jsii_type__ = "jsii-calc.IDeprecatedInterface"

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """(deprecated)

        deprecated
        :deprecated: could be better

        stability
        :stability: deprecated
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]) -> None:
        jsii.set(self, "mutableProperty", value)

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """(deprecated)

        deprecated
        :deprecated: services no purpose

        stability
        :stability: deprecated
        """
        return jsii.invoke(self, "method", [])


@jsii.interface(jsii_type="jsii-calc.IExperimentalInterface")
class IExperimentalInterface(jsii.compat.Protocol):
    """(experimental)

    stability
    :stability: experimental
    """

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IExperimentalInterfaceProxy

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """(experimental)

        stability
        :stability: experimental
        """
        ...

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]) -> None:
        ...

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """(experimental)

        stability
        :stability: experimental
        """
        ...


class _IExperimentalInterfaceProxy:
    """(experimental)

    stability
    :stability: experimental
    """

    __jsii_type__ = "jsii-calc.IExperimentalInterface"

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """(experimental)

        stability
        :stability: experimental
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]) -> None:
        jsii.set(self, "mutableProperty", value)

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """(experimental)

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "method", [])


@jsii.interface(jsii_type="jsii-calc.IExtendsPrivateInterface")
class IExtendsPrivateInterface(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IExtendsPrivateInterfaceProxy

    @builtins.property
    @jsii.member(jsii_name="moreThings")
    def more_things(self) -> typing.List[str]:
        ...

    @builtins.property
    @jsii.member(jsii_name="private")
    def private(self) -> str:
        ...

    @private.setter
    def private(self, value: str) -> None:
        ...


class _IExtendsPrivateInterfaceProxy:
    __jsii_type__ = "jsii-calc.IExtendsPrivateInterface"

    @builtins.property
    @jsii.member(jsii_name="moreThings")
    def more_things(self) -> typing.List[str]:
        return jsii.get(self, "moreThings")

    @builtins.property
    @jsii.member(jsii_name="private")
    def private(self) -> str:
        return jsii.get(self, "private")

    @private.setter
    def private(self, value: str) -> None:
        jsii.set(self, "private", value)


@jsii.interface(jsii_type="jsii-calc.IExternalInterface")
class IExternalInterface(jsii.compat.Protocol):
    """
    external:
    :external:: true
    """

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IExternalInterfaceProxy

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        external:
        :external:: true
        """
        ...

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]) -> None:
        ...

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        external:
        :external:: true
        """
        ...


class _IExternalInterfaceProxy:
    """
    external:
    :external:: true
    """

    __jsii_type__ = "jsii-calc.IExternalInterface"

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        external:
        :external:: true
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]) -> None:
        jsii.set(self, "mutableProperty", value)

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        external:
        :external:: true
        """
        return jsii.invoke(self, "method", [])


@jsii.interface(jsii_type="jsii-calc.IFriendlier")
class IFriendlier(scope.jsii_calc_lib.IFriendly, jsii.compat.Protocol):
    """Even friendlier classes can implement this interface."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IFriendlierProxy

    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        """Say farewell."""
        ...

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        """Say goodbye.

        return
        :return: A goodbye blessing.
        """
        ...


class _IFriendlierProxy(jsii.proxy_for(scope.jsii_calc_lib.IFriendly)):
    """Even friendlier classes can implement this interface."""

    __jsii_type__ = "jsii-calc.IFriendlier"

    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        """Say farewell."""
        return jsii.invoke(self, "farewell", [])

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        """Say goodbye.

        return
        :return: A goodbye blessing.
        """
        return jsii.invoke(self, "goodbye", [])


@jsii.interface(jsii_type="jsii-calc.IInterfaceImplementedByAbstractClass")
class IInterfaceImplementedByAbstractClass(jsii.compat.Protocol):
    """awslabs/jsii#220 Abstract return type."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceImplementedByAbstractClassProxy

    @builtins.property
    @jsii.member(jsii_name="propFromInterface")
    def prop_from_interface(self) -> str:
        ...


class _IInterfaceImplementedByAbstractClassProxy:
    """awslabs/jsii#220 Abstract return type."""

    __jsii_type__ = "jsii-calc.IInterfaceImplementedByAbstractClass"

    @builtins.property
    @jsii.member(jsii_name="propFromInterface")
    def prop_from_interface(self) -> str:
        return jsii.get(self, "propFromInterface")


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithInternal")
class IInterfaceWithInternal(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithInternalProxy

    @jsii.member(jsii_name="visible")
    def visible(self) -> None:
        ...


class _IInterfaceWithInternalProxy:
    __jsii_type__ = "jsii-calc.IInterfaceWithInternal"

    @jsii.member(jsii_name="visible")
    def visible(self) -> None:
        return jsii.invoke(self, "visible", [])


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithMethods")
class IInterfaceWithMethods(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithMethodsProxy

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> str:
        ...

    @jsii.member(jsii_name="doThings")
    def do_things(self) -> None:
        ...


class _IInterfaceWithMethodsProxy:
    __jsii_type__ = "jsii-calc.IInterfaceWithMethods"

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> str:
        return jsii.get(self, "value")

    @jsii.member(jsii_name="doThings")
    def do_things(self) -> None:
        return jsii.invoke(self, "doThings", [])


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithOptionalMethodArguments")
class IInterfaceWithOptionalMethodArguments(jsii.compat.Protocol):
    """awslabs/jsii#175 Interface proxies (and builders) do not respect optional arguments in methods."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithOptionalMethodArgumentsProxy

    @jsii.member(jsii_name="hello")
    def hello(self, arg1: str, arg2: typing.Optional[jsii.Number] = None) -> None:
        """
        :param arg1: -
        :param arg2: -
        """
        ...


class _IInterfaceWithOptionalMethodArgumentsProxy:
    """awslabs/jsii#175 Interface proxies (and builders) do not respect optional arguments in methods."""

    __jsii_type__ = "jsii-calc.IInterfaceWithOptionalMethodArguments"

    @jsii.member(jsii_name="hello")
    def hello(self, arg1: str, arg2: typing.Optional[jsii.Number] = None) -> None:
        """
        :param arg1: -
        :param arg2: -
        """
        return jsii.invoke(self, "hello", [arg1, arg2])


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithProperties")
class IInterfaceWithProperties(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithPropertiesProxy

    @builtins.property
    @jsii.member(jsii_name="readOnlyString")
    def read_only_string(self) -> str:
        ...

    @builtins.property
    @jsii.member(jsii_name="readWriteString")
    def read_write_string(self) -> str:
        ...

    @read_write_string.setter
    def read_write_string(self, value: str) -> None:
        ...


class _IInterfaceWithPropertiesProxy:
    __jsii_type__ = "jsii-calc.IInterfaceWithProperties"

    @builtins.property
    @jsii.member(jsii_name="readOnlyString")
    def read_only_string(self) -> str:
        return jsii.get(self, "readOnlyString")

    @builtins.property
    @jsii.member(jsii_name="readWriteString")
    def read_write_string(self) -> str:
        return jsii.get(self, "readWriteString")

    @read_write_string.setter
    def read_write_string(self, value: str) -> None:
        jsii.set(self, "readWriteString", value)


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithPropertiesExtension")
class IInterfaceWithPropertiesExtension(IInterfaceWithProperties, jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithPropertiesExtensionProxy

    @builtins.property
    @jsii.member(jsii_name="foo")
    def foo(self) -> jsii.Number:
        ...

    @foo.setter
    def foo(self, value: jsii.Number) -> None:
        ...


class _IInterfaceWithPropertiesExtensionProxy(jsii.proxy_for(IInterfaceWithProperties)):
    __jsii_type__ = "jsii-calc.IInterfaceWithPropertiesExtension"

    @builtins.property
    @jsii.member(jsii_name="foo")
    def foo(self) -> jsii.Number:
        return jsii.get(self, "foo")

    @foo.setter
    def foo(self, value: jsii.Number) -> None:
        jsii.set(self, "foo", value)


@jsii.interface(jsii_type="jsii-calc.IJSII417PublicBaseOfBase")
class IJSII417PublicBaseOfBase(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IJSII417PublicBaseOfBaseProxy

    @builtins.property
    @jsii.member(jsii_name="hasRoot")
    def has_root(self) -> bool:
        ...

    @jsii.member(jsii_name="foo")
    def foo(self) -> None:
        ...


class _IJSII417PublicBaseOfBaseProxy:
    __jsii_type__ = "jsii-calc.IJSII417PublicBaseOfBase"

    @builtins.property
    @jsii.member(jsii_name="hasRoot")
    def has_root(self) -> bool:
        return jsii.get(self, "hasRoot")

    @jsii.member(jsii_name="foo")
    def foo(self) -> None:
        return jsii.invoke(self, "foo", [])


@jsii.interface(jsii_type="jsii-calc.IJsii487External")
class IJsii487External(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IJsii487ExternalProxy

    pass


class _IJsii487ExternalProxy:
    __jsii_type__ = "jsii-calc.IJsii487External"
    pass


@jsii.interface(jsii_type="jsii-calc.IJsii487External2")
class IJsii487External2(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IJsii487External2Proxy

    pass


class _IJsii487External2Proxy:
    __jsii_type__ = "jsii-calc.IJsii487External2"
    pass


@jsii.interface(jsii_type="jsii-calc.IJsii496")
class IJsii496(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IJsii496Proxy

    pass


class _IJsii496Proxy:
    __jsii_type__ = "jsii-calc.IJsii496"
    pass


@jsii.interface(jsii_type="jsii-calc.IMutableObjectLiteral")
class IMutableObjectLiteral(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IMutableObjectLiteralProxy

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> str:
        ...

    @value.setter
    def value(self, value: str) -> None:
        ...


class _IMutableObjectLiteralProxy:
    __jsii_type__ = "jsii-calc.IMutableObjectLiteral"

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> str:
        return jsii.get(self, "value")

    @value.setter
    def value(self, value: str) -> None:
        jsii.set(self, "value", value)


@jsii.interface(jsii_type="jsii-calc.INonInternalInterface")
class INonInternalInterface(IAnotherPublicInterface, jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _INonInternalInterfaceProxy

    @builtins.property
    @jsii.member(jsii_name="b")
    def b(self) -> str:
        ...

    @b.setter
    def b(self, value: str) -> None:
        ...

    @builtins.property
    @jsii.member(jsii_name="c")
    def c(self) -> str:
        ...

    @c.setter
    def c(self, value: str) -> None:
        ...


class _INonInternalInterfaceProxy(jsii.proxy_for(IAnotherPublicInterface)):
    __jsii_type__ = "jsii-calc.INonInternalInterface"

    @builtins.property
    @jsii.member(jsii_name="b")
    def b(self) -> str:
        return jsii.get(self, "b")

    @b.setter
    def b(self, value: str) -> None:
        jsii.set(self, "b", value)

    @builtins.property
    @jsii.member(jsii_name="c")
    def c(self) -> str:
        return jsii.get(self, "c")

    @c.setter
    def c(self, value: str) -> None:
        jsii.set(self, "c", value)


@jsii.interface(jsii_type="jsii-calc.IObjectWithProperty")
class IObjectWithProperty(jsii.compat.Protocol):
    """Make sure that setters are properly called on objects with interfaces."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IObjectWithPropertyProxy

    @builtins.property
    @jsii.member(jsii_name="property")
    def property(self) -> str:
        ...

    @property.setter
    def property(self, value: str) -> None:
        ...

    @jsii.member(jsii_name="wasSet")
    def was_set(self) -> bool:
        ...


class _IObjectWithPropertyProxy:
    """Make sure that setters are properly called on objects with interfaces."""

    __jsii_type__ = "jsii-calc.IObjectWithProperty"

    @builtins.property
    @jsii.member(jsii_name="property")
    def property(self) -> str:
        return jsii.get(self, "property")

    @property.setter
    def property(self, value: str) -> None:
        jsii.set(self, "property", value)

    @jsii.member(jsii_name="wasSet")
    def was_set(self) -> bool:
        return jsii.invoke(self, "wasSet", [])


@jsii.interface(jsii_type="jsii-calc.IOptionalMethod")
class IOptionalMethod(jsii.compat.Protocol):
    """Checks that optional result from interface method code generates correctly."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IOptionalMethodProxy

    @jsii.member(jsii_name="optional")
    def optional(self) -> typing.Optional[str]:
        ...


class _IOptionalMethodProxy:
    """Checks that optional result from interface method code generates correctly."""

    __jsii_type__ = "jsii-calc.IOptionalMethod"

    @jsii.member(jsii_name="optional")
    def optional(self) -> typing.Optional[str]:
        return jsii.invoke(self, "optional", [])


@jsii.interface(jsii_type="jsii-calc.IPrivatelyImplemented")
class IPrivatelyImplemented(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IPrivatelyImplementedProxy

    @builtins.property
    @jsii.member(jsii_name="success")
    def success(self) -> bool:
        ...


class _IPrivatelyImplementedProxy:
    __jsii_type__ = "jsii-calc.IPrivatelyImplemented"

    @builtins.property
    @jsii.member(jsii_name="success")
    def success(self) -> bool:
        return jsii.get(self, "success")


@jsii.interface(jsii_type="jsii-calc.IPublicInterface")
class IPublicInterface(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IPublicInterfaceProxy

    @jsii.member(jsii_name="bye")
    def bye(self) -> str:
        ...


class _IPublicInterfaceProxy:
    __jsii_type__ = "jsii-calc.IPublicInterface"

    @jsii.member(jsii_name="bye")
    def bye(self) -> str:
        return jsii.invoke(self, "bye", [])


@jsii.interface(jsii_type="jsii-calc.IPublicInterface2")
class IPublicInterface2(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IPublicInterface2Proxy

    @jsii.member(jsii_name="ciao")
    def ciao(self) -> str:
        ...


class _IPublicInterface2Proxy:
    __jsii_type__ = "jsii-calc.IPublicInterface2"

    @jsii.member(jsii_name="ciao")
    def ciao(self) -> str:
        return jsii.invoke(self, "ciao", [])


@jsii.interface(jsii_type="jsii-calc.IRandomNumberGenerator")
class IRandomNumberGenerator(jsii.compat.Protocol):
    """Generates random numbers."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IRandomNumberGeneratorProxy

    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        """Returns another random number.

        return
        :return: A random number.
        """
        ...


class _IRandomNumberGeneratorProxy:
    """Generates random numbers."""

    __jsii_type__ = "jsii-calc.IRandomNumberGenerator"

    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        """Returns another random number.

        return
        :return: A random number.
        """
        return jsii.invoke(self, "next", [])


@jsii.interface(jsii_type="jsii-calc.IReturnJsii976")
class IReturnJsii976(jsii.compat.Protocol):
    """Returns a subclass of a known class which implements an interface."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IReturnJsii976Proxy

    @builtins.property
    @jsii.member(jsii_name="foo")
    def foo(self) -> jsii.Number:
        ...


class _IReturnJsii976Proxy:
    """Returns a subclass of a known class which implements an interface."""

    __jsii_type__ = "jsii-calc.IReturnJsii976"

    @builtins.property
    @jsii.member(jsii_name="foo")
    def foo(self) -> jsii.Number:
        return jsii.get(self, "foo")


@jsii.interface(jsii_type="jsii-calc.IReturnsNumber")
class IReturnsNumber(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IReturnsNumberProxy

    @builtins.property
    @jsii.member(jsii_name="numberProp")
    def number_prop(self) -> scope.jsii_calc_lib.Number:
        ...

    @jsii.member(jsii_name="obtainNumber")
    def obtain_number(self) -> scope.jsii_calc_lib.IDoublable:
        ...


class _IReturnsNumberProxy:
    __jsii_type__ = "jsii-calc.IReturnsNumber"

    @builtins.property
    @jsii.member(jsii_name="numberProp")
    def number_prop(self) -> scope.jsii_calc_lib.Number:
        return jsii.get(self, "numberProp")

    @jsii.member(jsii_name="obtainNumber")
    def obtain_number(self) -> scope.jsii_calc_lib.IDoublable:
        return jsii.invoke(self, "obtainNumber", [])


@jsii.interface(jsii_type="jsii-calc.IStableInterface")
class IStableInterface(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IStableInterfaceProxy

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        ...

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]) -> None:
        ...

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        ...


class _IStableInterfaceProxy:
    __jsii_type__ = "jsii-calc.IStableInterface"

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]) -> None:
        jsii.set(self, "mutableProperty", value)

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        return jsii.invoke(self, "method", [])


@jsii.interface(jsii_type="jsii-calc.IStructReturningDelegate")
class IStructReturningDelegate(jsii.compat.Protocol):
    """Verifies that a "pure" implementation of an interface works correctly."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IStructReturningDelegateProxy

    @jsii.member(jsii_name="returnStruct")
    def return_struct(self) -> "StructB":
        ...


class _IStructReturningDelegateProxy:
    """Verifies that a "pure" implementation of an interface works correctly."""

    __jsii_type__ = "jsii-calc.IStructReturningDelegate"

    @jsii.member(jsii_name="returnStruct")
    def return_struct(self) -> "StructB":
        return jsii.invoke(self, "returnStruct", [])


class ImplementInternalInterface(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ImplementInternalInterface"
):
    def __init__(self) -> None:
        jsii.create(ImplementInternalInterface, self, [])

    @builtins.property
    @jsii.member(jsii_name="prop")
    def prop(self) -> str:
        return jsii.get(self, "prop")

    @prop.setter
    def prop(self, value: str) -> None:
        jsii.set(self, "prop", value)


class Implementation(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Implementation"):
    def __init__(self) -> None:
        jsii.create(Implementation, self, [])

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        return jsii.get(self, "value")


@jsii.implements(IInterfaceWithInternal)
class ImplementsInterfaceWithInternal(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ImplementsInterfaceWithInternal"
):
    def __init__(self) -> None:
        jsii.create(ImplementsInterfaceWithInternal, self, [])

    @jsii.member(jsii_name="visible")
    def visible(self) -> None:
        return jsii.invoke(self, "visible", [])


class ImplementsInterfaceWithInternalSubclass(
    ImplementsInterfaceWithInternal,
    metaclass=jsii.JSIIMeta,
    jsii_type="jsii-calc.ImplementsInterfaceWithInternalSubclass",
):
    def __init__(self) -> None:
        jsii.create(ImplementsInterfaceWithInternalSubclass, self, [])


class ImplementsPrivateInterface(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ImplementsPrivateInterface"
):
    def __init__(self) -> None:
        jsii.create(ImplementsPrivateInterface, self, [])

    @builtins.property
    @jsii.member(jsii_name="private")
    def private(self) -> str:
        return jsii.get(self, "private")

    @private.setter
    def private(self, value: str) -> None:
        jsii.set(self, "private", value)


@jsii.data_type(
    jsii_type="jsii-calc.ImplictBaseOfBase",
    jsii_struct_bases=[scope.jsii_calc_base.BaseProps],
    name_mapping={"foo": "foo", "bar": "bar", "goo": "goo"},
)
class ImplictBaseOfBase(scope.jsii_calc_base.BaseProps):
    def __init__(
        self,
        *,
        foo: scope.jsii_calc_base_of_base.Very,
        bar: str,
        goo: datetime.datetime,
    ) -> None:
        """
        :param foo: -
        :param bar: -
        :param goo: 
        """
        self._values = {
            "foo": foo,
            "bar": bar,
            "goo": goo,
        }

    @builtins.property
    def foo(self) -> scope.jsii_calc_base_of_base.Very:
        return self._values.get("foo")

    @builtins.property
    def bar(self) -> str:
        return self._values.get("bar")

    @builtins.property
    def goo(self) -> datetime.datetime:
        return self._values.get("goo")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "ImplictBaseOfBase(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class InterfaceCollections(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.InterfaceCollections"
):
    """Verifies that collections of interfaces or structs are correctly handled.

    See: https://github.com/aws/jsii/issues/1196
    """

    @jsii.member(jsii_name="listOfInterfaces")
    @builtins.classmethod
    def list_of_interfaces(cls) -> typing.List["IBell"]:
        return jsii.sinvoke(cls, "listOfInterfaces", [])

    @jsii.member(jsii_name="listOfStructs")
    @builtins.classmethod
    def list_of_structs(cls) -> typing.List["StructA"]:
        return jsii.sinvoke(cls, "listOfStructs", [])

    @jsii.member(jsii_name="mapOfInterfaces")
    @builtins.classmethod
    def map_of_interfaces(cls) -> typing.Mapping[str, "IBell"]:
        return jsii.sinvoke(cls, "mapOfInterfaces", [])

    @jsii.member(jsii_name="mapOfStructs")
    @builtins.classmethod
    def map_of_structs(cls) -> typing.Mapping[str, "StructA"]:
        return jsii.sinvoke(cls, "mapOfStructs", [])


class InterfacesMaker(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.InterfacesMaker"):
    """We can return arrays of interfaces See aws/aws-cdk#2362."""

    @jsii.member(jsii_name="makeInterfaces")
    @builtins.classmethod
    def make_interfaces(
        cls, count: jsii.Number
    ) -> typing.List[scope.jsii_calc_lib.IDoublable]:
        """
        :param count: -
        """
        return jsii.sinvoke(cls, "makeInterfaces", [count])


class Isomorphism(metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.Isomorphism"):
    """Checks the "same instance" isomorphism is preserved within the constructor.

    Create a subclass of this, and assert that ``this.myself()`` actually returns
    ``this`` from within the constructor.
    """

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IsomorphismProxy

    def __init__(self) -> None:
        jsii.create(Isomorphism, self, [])

    @jsii.member(jsii_name="myself")
    def myself(self) -> "Isomorphism":
        return jsii.invoke(self, "myself", [])


class _IsomorphismProxy(Isomorphism):
    pass


class JSII417PublicBaseOfBase(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JSII417PublicBaseOfBase"
):
    def __init__(self) -> None:
        jsii.create(JSII417PublicBaseOfBase, self, [])

    @jsii.member(jsii_name="makeInstance")
    @builtins.classmethod
    def make_instance(cls) -> "JSII417PublicBaseOfBase":
        return jsii.sinvoke(cls, "makeInstance", [])

    @jsii.member(jsii_name="foo")
    def foo(self) -> None:
        return jsii.invoke(self, "foo", [])

    @builtins.property
    @jsii.member(jsii_name="hasRoot")
    def has_root(self) -> bool:
        return jsii.get(self, "hasRoot")


class JSObjectLiteralForInterface(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JSObjectLiteralForInterface"
):
    def __init__(self) -> None:
        jsii.create(JSObjectLiteralForInterface, self, [])

    @jsii.member(jsii_name="giveMeFriendly")
    def give_me_friendly(self) -> scope.jsii_calc_lib.IFriendly:
        return jsii.invoke(self, "giveMeFriendly", [])

    @jsii.member(jsii_name="giveMeFriendlyGenerator")
    def give_me_friendly_generator(self) -> "IFriendlyRandomGenerator":
        return jsii.invoke(self, "giveMeFriendlyGenerator", [])


class JSObjectLiteralToNative(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JSObjectLiteralToNative"
):
    def __init__(self) -> None:
        jsii.create(JSObjectLiteralToNative, self, [])

    @jsii.member(jsii_name="returnLiteral")
    def return_literal(self) -> "JSObjectLiteralToNativeClass":
        return jsii.invoke(self, "returnLiteral", [])


class JSObjectLiteralToNativeClass(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JSObjectLiteralToNativeClass"
):
    def __init__(self) -> None:
        jsii.create(JSObjectLiteralToNativeClass, self, [])

    @builtins.property
    @jsii.member(jsii_name="propA")
    def prop_a(self) -> str:
        return jsii.get(self, "propA")

    @prop_a.setter
    def prop_a(self, value: str) -> None:
        jsii.set(self, "propA", value)

    @builtins.property
    @jsii.member(jsii_name="propB")
    def prop_b(self) -> jsii.Number:
        return jsii.get(self, "propB")

    @prop_b.setter
    def prop_b(self, value: jsii.Number) -> None:
        jsii.set(self, "propB", value)


class JavaReservedWords(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JavaReservedWords"
):
    def __init__(self) -> None:
        jsii.create(JavaReservedWords, self, [])

    @jsii.member(jsii_name="abstract")
    def abstract(self) -> None:
        return jsii.invoke(self, "abstract", [])

    @jsii.member(jsii_name="assert")
    def assert_(self) -> None:
        return jsii.invoke(self, "assert", [])

    @jsii.member(jsii_name="boolean")
    def boolean(self) -> None:
        return jsii.invoke(self, "boolean", [])

    @jsii.member(jsii_name="break")
    def break_(self) -> None:
        return jsii.invoke(self, "break", [])

    @jsii.member(jsii_name="byte")
    def byte(self) -> None:
        return jsii.invoke(self, "byte", [])

    @jsii.member(jsii_name="case")
    def case(self) -> None:
        return jsii.invoke(self, "case", [])

    @jsii.member(jsii_name="catch")
    def catch(self) -> None:
        return jsii.invoke(self, "catch", [])

    @jsii.member(jsii_name="char")
    def char(self) -> None:
        return jsii.invoke(self, "char", [])

    @jsii.member(jsii_name="class")
    def class_(self) -> None:
        return jsii.invoke(self, "class", [])

    @jsii.member(jsii_name="const")
    def const(self) -> None:
        return jsii.invoke(self, "const", [])

    @jsii.member(jsii_name="continue")
    def continue_(self) -> None:
        return jsii.invoke(self, "continue", [])

    @jsii.member(jsii_name="default")
    def default(self) -> None:
        return jsii.invoke(self, "default", [])

    @jsii.member(jsii_name="do")
    def do(self) -> None:
        return jsii.invoke(self, "do", [])

    @jsii.member(jsii_name="double")
    def double(self) -> None:
        return jsii.invoke(self, "double", [])

    @jsii.member(jsii_name="else")
    def else_(self) -> None:
        return jsii.invoke(self, "else", [])

    @jsii.member(jsii_name="enum")
    def enum(self) -> None:
        return jsii.invoke(self, "enum", [])

    @jsii.member(jsii_name="extends")
    def extends(self) -> None:
        return jsii.invoke(self, "extends", [])

    @jsii.member(jsii_name="false")
    def false(self) -> None:
        return jsii.invoke(self, "false", [])

    @jsii.member(jsii_name="final")
    def final(self) -> None:
        return jsii.invoke(self, "final", [])

    @jsii.member(jsii_name="finally")
    def finally_(self) -> None:
        return jsii.invoke(self, "finally", [])

    @jsii.member(jsii_name="float")
    def float(self) -> None:
        return jsii.invoke(self, "float", [])

    @jsii.member(jsii_name="for")
    def for_(self) -> None:
        return jsii.invoke(self, "for", [])

    @jsii.member(jsii_name="goto")
    def goto(self) -> None:
        return jsii.invoke(self, "goto", [])

    @jsii.member(jsii_name="if")
    def if_(self) -> None:
        return jsii.invoke(self, "if", [])

    @jsii.member(jsii_name="implements")
    def implements(self) -> None:
        return jsii.invoke(self, "implements", [])

    @jsii.member(jsii_name="import")
    def import_(self) -> None:
        return jsii.invoke(self, "import", [])

    @jsii.member(jsii_name="instanceof")
    def instanceof(self) -> None:
        return jsii.invoke(self, "instanceof", [])

    @jsii.member(jsii_name="int")
    def int(self) -> None:
        return jsii.invoke(self, "int", [])

    @jsii.member(jsii_name="interface")
    def interface(self) -> None:
        return jsii.invoke(self, "interface", [])

    @jsii.member(jsii_name="long")
    def long(self) -> None:
        return jsii.invoke(self, "long", [])

    @jsii.member(jsii_name="native")
    def native(self) -> None:
        return jsii.invoke(self, "native", [])

    @jsii.member(jsii_name="new")
    def new(self) -> None:
        return jsii.invoke(self, "new", [])

    @jsii.member(jsii_name="null")
    def null(self) -> None:
        return jsii.invoke(self, "null", [])

    @jsii.member(jsii_name="package")
    def package(self) -> None:
        return jsii.invoke(self, "package", [])

    @jsii.member(jsii_name="private")
    def private(self) -> None:
        return jsii.invoke(self, "private", [])

    @jsii.member(jsii_name="protected")
    def protected(self) -> None:
        return jsii.invoke(self, "protected", [])

    @jsii.member(jsii_name="public")
    def public(self) -> None:
        return jsii.invoke(self, "public", [])

    @jsii.member(jsii_name="return")
    def return_(self) -> None:
        return jsii.invoke(self, "return", [])

    @jsii.member(jsii_name="short")
    def short(self) -> None:
        return jsii.invoke(self, "short", [])

    @jsii.member(jsii_name="static")
    def static(self) -> None:
        return jsii.invoke(self, "static", [])

    @jsii.member(jsii_name="strictfp")
    def strictfp(self) -> None:
        return jsii.invoke(self, "strictfp", [])

    @jsii.member(jsii_name="super")
    def super(self) -> None:
        return jsii.invoke(self, "super", [])

    @jsii.member(jsii_name="switch")
    def switch(self) -> None:
        return jsii.invoke(self, "switch", [])

    @jsii.member(jsii_name="synchronized")
    def synchronized(self) -> None:
        return jsii.invoke(self, "synchronized", [])

    @jsii.member(jsii_name="this")
    def this(self) -> None:
        return jsii.invoke(self, "this", [])

    @jsii.member(jsii_name="throw")
    def throw(self) -> None:
        return jsii.invoke(self, "throw", [])

    @jsii.member(jsii_name="throws")
    def throws(self) -> None:
        return jsii.invoke(self, "throws", [])

    @jsii.member(jsii_name="transient")
    def transient(self) -> None:
        return jsii.invoke(self, "transient", [])

    @jsii.member(jsii_name="true")
    def true(self) -> None:
        return jsii.invoke(self, "true", [])

    @jsii.member(jsii_name="try")
    def try_(self) -> None:
        return jsii.invoke(self, "try", [])

    @jsii.member(jsii_name="void")
    def void(self) -> None:
        return jsii.invoke(self, "void", [])

    @jsii.member(jsii_name="volatile")
    def volatile(self) -> None:
        return jsii.invoke(self, "volatile", [])

    @builtins.property
    @jsii.member(jsii_name="while")
    def while_(self) -> str:
        return jsii.get(self, "while")

    @while_.setter
    def while_(self, value: str) -> None:
        jsii.set(self, "while", value)


@jsii.implements(IJsii487External2, IJsii487External)
class Jsii487Derived(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Jsii487Derived"):
    def __init__(self) -> None:
        jsii.create(Jsii487Derived, self, [])


@jsii.implements(IJsii496)
class Jsii496Derived(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Jsii496Derived"):
    def __init__(self) -> None:
        jsii.create(Jsii496Derived, self, [])


class JsiiAgent(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JsiiAgent"):
    """Host runtime version should be set via JSII_AGENT."""

    def __init__(self) -> None:
        jsii.create(JsiiAgent, self, [])

    @jsii.python.classproperty
    @jsii.member(jsii_name="jsiiAgent")
    def jsii_agent(cls) -> typing.Optional[str]:
        """Returns the value of the JSII_AGENT environment variable."""
        return jsii.sget(cls, "jsiiAgent")


class JsonFormatter(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JsonFormatter"):
    """Make sure structs are un-decorated on the way in.

    see
    :see: https://github.com/aws/aws-cdk/issues/5066
    """

    @jsii.member(jsii_name="anyArray")
    @builtins.classmethod
    def any_array(cls) -> typing.Any:
        return jsii.sinvoke(cls, "anyArray", [])

    @jsii.member(jsii_name="anyBooleanFalse")
    @builtins.classmethod
    def any_boolean_false(cls) -> typing.Any:
        return jsii.sinvoke(cls, "anyBooleanFalse", [])

    @jsii.member(jsii_name="anyBooleanTrue")
    @builtins.classmethod
    def any_boolean_true(cls) -> typing.Any:
        return jsii.sinvoke(cls, "anyBooleanTrue", [])

    @jsii.member(jsii_name="anyDate")
    @builtins.classmethod
    def any_date(cls) -> typing.Any:
        return jsii.sinvoke(cls, "anyDate", [])

    @jsii.member(jsii_name="anyEmptyString")
    @builtins.classmethod
    def any_empty_string(cls) -> typing.Any:
        return jsii.sinvoke(cls, "anyEmptyString", [])

    @jsii.member(jsii_name="anyFunction")
    @builtins.classmethod
    def any_function(cls) -> typing.Any:
        return jsii.sinvoke(cls, "anyFunction", [])

    @jsii.member(jsii_name="anyHash")
    @builtins.classmethod
    def any_hash(cls) -> typing.Any:
        return jsii.sinvoke(cls, "anyHash", [])

    @jsii.member(jsii_name="anyNull")
    @builtins.classmethod
    def any_null(cls) -> typing.Any:
        return jsii.sinvoke(cls, "anyNull", [])

    @jsii.member(jsii_name="anyNumber")
    @builtins.classmethod
    def any_number(cls) -> typing.Any:
        return jsii.sinvoke(cls, "anyNumber", [])

    @jsii.member(jsii_name="anyRef")
    @builtins.classmethod
    def any_ref(cls) -> typing.Any:
        return jsii.sinvoke(cls, "anyRef", [])

    @jsii.member(jsii_name="anyString")
    @builtins.classmethod
    def any_string(cls) -> typing.Any:
        return jsii.sinvoke(cls, "anyString", [])

    @jsii.member(jsii_name="anyUndefined")
    @builtins.classmethod
    def any_undefined(cls) -> typing.Any:
        return jsii.sinvoke(cls, "anyUndefined", [])

    @jsii.member(jsii_name="anyZero")
    @builtins.classmethod
    def any_zero(cls) -> typing.Any:
        return jsii.sinvoke(cls, "anyZero", [])

    @jsii.member(jsii_name="stringify")
    @builtins.classmethod
    def stringify(cls, value: typing.Any = None) -> typing.Optional[str]:
        """
        :param value: -
        """
        return jsii.sinvoke(cls, "stringify", [value])


@jsii.data_type(
    jsii_type="jsii-calc.LoadBalancedFargateServiceProps",
    jsii_struct_bases=[],
    name_mapping={
        "container_port": "containerPort",
        "cpu": "cpu",
        "memory_mib": "memoryMiB",
        "public_load_balancer": "publicLoadBalancer",
        "public_tasks": "publicTasks",
    },
)
class LoadBalancedFargateServiceProps:
    def __init__(
        self,
        *,
        container_port: typing.Optional[jsii.Number] = None,
        cpu: typing.Optional[str] = None,
        memory_mib: typing.Optional[str] = None,
        public_load_balancer: typing.Optional[bool] = None,
        public_tasks: typing.Optional[bool] = None,
    ) -> None:
        """jsii#298: show default values in sphinx documentation, and respect newlines.

        :param container_port: The container port of the application load balancer attached to your Fargate service. Corresponds to container port mapping. Default: 80
        :param cpu: The number of cpu units used by the task. Valid values, which determines your range of valid values for the memory parameter: 256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB 512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB 1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB 2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments 4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments This default is set in the underlying FargateTaskDefinition construct. Default: 256
        :param memory_mib: The amount (in MiB) of memory used by the task. This field is required and you must use one of the following values, which determines your range of valid values for the cpu parameter: 0.5GB, 1GB, 2GB - Available cpu values: 256 (.25 vCPU) 1GB, 2GB, 3GB, 4GB - Available cpu values: 512 (.5 vCPU) 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB - Available cpu values: 1024 (1 vCPU) Between 4GB and 16GB in 1GB increments - Available cpu values: 2048 (2 vCPU) Between 8GB and 30GB in 1GB increments - Available cpu values: 4096 (4 vCPU) This default is set in the underlying FargateTaskDefinition construct. Default: 512
        :param public_load_balancer: Determines whether the Application Load Balancer will be internet-facing. Default: true
        :param public_tasks: Determines whether your Fargate Service will be assigned a public IP address. Default: false
        """
        self._values = {}
        if container_port is not None:
            self._values["container_port"] = container_port
        if cpu is not None:
            self._values["cpu"] = cpu
        if memory_mib is not None:
            self._values["memory_mib"] = memory_mib
        if public_load_balancer is not None:
            self._values["public_load_balancer"] = public_load_balancer
        if public_tasks is not None:
            self._values["public_tasks"] = public_tasks

    @builtins.property
    def container_port(self) -> typing.Optional[jsii.Number]:
        """The container port of the application load balancer attached to your Fargate service.

        Corresponds to container port mapping.

        default
        :default: 80
        """
        return self._values.get("container_port")

    @builtins.property
    def cpu(self) -> typing.Optional[str]:
        """The number of cpu units used by the task.

        Valid values, which determines your range of valid values for the memory parameter:
        256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB
        512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB
        1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB
        2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments
        4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments

        This default is set in the underlying FargateTaskDefinition construct.

        default
        :default: 256
        """
        return self._values.get("cpu")

    @builtins.property
    def memory_mib(self) -> typing.Optional[str]:
        """The amount (in MiB) of memory used by the task.

        This field is required and you must use one of the following values, which determines your range of valid values
        for the cpu parameter:

        0.5GB, 1GB, 2GB - Available cpu values: 256 (.25 vCPU)

        1GB, 2GB, 3GB, 4GB - Available cpu values: 512 (.5 vCPU)

        2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB - Available cpu values: 1024 (1 vCPU)

        Between 4GB and 16GB in 1GB increments - Available cpu values: 2048 (2 vCPU)

        Between 8GB and 30GB in 1GB increments - Available cpu values: 4096 (4 vCPU)

        This default is set in the underlying FargateTaskDefinition construct.

        default
        :default: 512
        """
        return self._values.get("memory_mib")

    @builtins.property
    def public_load_balancer(self) -> typing.Optional[bool]:
        """Determines whether the Application Load Balancer will be internet-facing.

        default
        :default: true
        """
        return self._values.get("public_load_balancer")

    @builtins.property
    def public_tasks(self) -> typing.Optional[bool]:
        """Determines whether your Fargate Service will be assigned a public IP address.

        default
        :default: false
        """
        return self._values.get("public_tasks")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "LoadBalancedFargateServiceProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class MethodNamedProperty(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.MethodNamedProperty"
):
    def __init__(self) -> None:
        jsii.create(MethodNamedProperty, self, [])

    @jsii.member(jsii_name="property")
    def property(self) -> str:
        return jsii.invoke(self, "property", [])

    @builtins.property
    @jsii.member(jsii_name="elite")
    def elite(self) -> jsii.Number:
        return jsii.get(self, "elite")


@jsii.implements(IFriendlier, IRandomNumberGenerator)
class Multiply(
    BinaryOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Multiply"
):
    """The "*" binary operation."""

    def __init__(
        self, lhs: scope.jsii_calc_lib.Value, rhs: scope.jsii_calc_lib.Value
    ) -> None:
        """Creates a BinaryOperation.

        :param lhs: Left-hand side operand.
        :param rhs: Right-hand side operand.
        """
        jsii.create(Multiply, self, [lhs, rhs])

    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        """Say farewell."""
        return jsii.invoke(self, "farewell", [])

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        """Say goodbye."""
        return jsii.invoke(self, "goodbye", [])

    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        """Returns another random number."""
        return jsii.invoke(self, "next", [])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value.

        (deprecated)
        """
        return jsii.invoke(self, "toString", [])

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The value.

        (deprecated)
        """
        return jsii.get(self, "value")


@jsii.data_type(
    jsii_type="jsii-calc.NestedStruct",
    jsii_struct_bases=[],
    name_mapping={"number_prop": "numberProp"},
)
class NestedStruct:
    def __init__(self, *, number_prop: jsii.Number) -> None:
        """
        :param number_prop: When provided, must be > 0.
        """
        self._values = {
            "number_prop": number_prop,
        }

    @builtins.property
    def number_prop(self) -> jsii.Number:
        """When provided, must be > 0."""
        return self._values.get("number_prop")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "NestedStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class NodeStandardLibrary(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.NodeStandardLibrary"
):
    """Test fixture to verify that jsii modules can use the node standard library."""

    def __init__(self) -> None:
        jsii.create(NodeStandardLibrary, self, [])

    @jsii.member(jsii_name="cryptoSha256")
    def crypto_sha256(self) -> str:
        """Uses node.js "crypto" module to calculate sha256 of a string.

        return
        :return: "6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50"
        """
        return jsii.invoke(self, "cryptoSha256", [])

    @jsii.member(jsii_name="fsReadFile")
    def fs_read_file(self) -> str:
        """Reads a local resource file (resource.txt) asynchronously.

        return
        :return: "Hello, resource!"
        """
        return jsii.ainvoke(self, "fsReadFile", [])

    @jsii.member(jsii_name="fsReadFileSync")
    def fs_read_file_sync(self) -> str:
        """Sync version of fsReadFile.

        return
        :return: "Hello, resource! SYNC!"
        """
        return jsii.invoke(self, "fsReadFileSync", [])

    @builtins.property
    @jsii.member(jsii_name="osPlatform")
    def os_platform(self) -> str:
        """Returns the current os.platform() from the "os" node module."""
        return jsii.get(self, "osPlatform")


class NullShouldBeTreatedAsUndefined(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.NullShouldBeTreatedAsUndefined"
):
    """jsii#282, aws-cdk#157: null should be treated as "undefined"."""

    def __init__(self, _param1: str, optional: typing.Any = None) -> None:
        """
        :param _param1: -
        :param optional: -
        """
        jsii.create(NullShouldBeTreatedAsUndefined, self, [_param1, optional])

    @jsii.member(jsii_name="giveMeUndefined")
    def give_me_undefined(self, value: typing.Any = None) -> None:
        """
        :param value: -
        """
        return jsii.invoke(self, "giveMeUndefined", [value])

    @jsii.member(jsii_name="giveMeUndefinedInsideAnObject")
    def give_me_undefined_inside_an_object(
        self,
        *,
        array_with_three_elements_and_undefined_as_second_argument: typing.List[
            typing.Any
        ],
        this_should_be_undefined: typing.Any = None,
    ) -> None:
        """
        :param array_with_three_elements_and_undefined_as_second_argument: 
        :param this_should_be_undefined: 
        """
        input = NullShouldBeTreatedAsUndefinedData(
            array_with_three_elements_and_undefined_as_second_argument=array_with_three_elements_and_undefined_as_second_argument,
            this_should_be_undefined=this_should_be_undefined,
        )

        return jsii.invoke(self, "giveMeUndefinedInsideAnObject", [input])

    @jsii.member(jsii_name="verifyPropertyIsUndefined")
    def verify_property_is_undefined(self) -> None:
        return jsii.invoke(self, "verifyPropertyIsUndefined", [])

    @builtins.property
    @jsii.member(jsii_name="changeMeToUndefined")
    def change_me_to_undefined(self) -> typing.Optional[str]:
        return jsii.get(self, "changeMeToUndefined")

    @change_me_to_undefined.setter
    def change_me_to_undefined(self, value: typing.Optional[str]) -> None:
        jsii.set(self, "changeMeToUndefined", value)


@jsii.data_type(
    jsii_type="jsii-calc.NullShouldBeTreatedAsUndefinedData",
    jsii_struct_bases=[],
    name_mapping={
        "array_with_three_elements_and_undefined_as_second_argument": "arrayWithThreeElementsAndUndefinedAsSecondArgument",
        "this_should_be_undefined": "thisShouldBeUndefined",
    },
)
class NullShouldBeTreatedAsUndefinedData:
    def __init__(
        self,
        *,
        array_with_three_elements_and_undefined_as_second_argument: typing.List[
            typing.Any
        ],
        this_should_be_undefined: typing.Any = None,
    ) -> None:
        """
        :param array_with_three_elements_and_undefined_as_second_argument: 
        :param this_should_be_undefined: 
        """
        self._values = {
            "array_with_three_elements_and_undefined_as_second_argument": array_with_three_elements_and_undefined_as_second_argument,
        }
        if this_should_be_undefined is not None:
            self._values["this_should_be_undefined"] = this_should_be_undefined

    @builtins.property
    def array_with_three_elements_and_undefined_as_second_argument(
        self,
    ) -> typing.List[typing.Any]:
        return self._values.get(
            "array_with_three_elements_and_undefined_as_second_argument"
        )

    @builtins.property
    def this_should_be_undefined(self) -> typing.Any:
        return self._values.get("this_should_be_undefined")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "NullShouldBeTreatedAsUndefinedData(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class NumberGenerator(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.NumberGenerator"):
    """This allows us to test that a reference can be stored for objects that implement interfaces."""

    def __init__(self, generator: "IRandomNumberGenerator") -> None:
        """
        :param generator: -
        """
        jsii.create(NumberGenerator, self, [generator])

    @jsii.member(jsii_name="isSameGenerator")
    def is_same_generator(self, gen: "IRandomNumberGenerator") -> bool:
        """
        :param gen: -
        """
        return jsii.invoke(self, "isSameGenerator", [gen])

    @jsii.member(jsii_name="nextTimes100")
    def next_times100(self) -> jsii.Number:
        return jsii.invoke(self, "nextTimes100", [])

    @builtins.property
    @jsii.member(jsii_name="generator")
    def generator(self) -> "IRandomNumberGenerator":
        return jsii.get(self, "generator")

    @generator.setter
    def generator(self, value: "IRandomNumberGenerator") -> None:
        jsii.set(self, "generator", value)


class ObjectRefsInCollections(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ObjectRefsInCollections"
):
    """Verify that object references can be passed inside collections."""

    def __init__(self) -> None:
        jsii.create(ObjectRefsInCollections, self, [])

    @jsii.member(jsii_name="sumFromArray")
    def sum_from_array(
        self, values: typing.List[scope.jsii_calc_lib.Value]
    ) -> jsii.Number:
        """Returns the sum of all values.

        :param values: -
        """
        return jsii.invoke(self, "sumFromArray", [values])

    @jsii.member(jsii_name="sumFromMap")
    def sum_from_map(
        self, values: typing.Mapping[str, scope.jsii_calc_lib.Value]
    ) -> jsii.Number:
        """Returns the sum of all values in a map.

        :param values: -
        """
        return jsii.invoke(self, "sumFromMap", [values])


class ObjectWithPropertyProvider(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ObjectWithPropertyProvider"
):
    @jsii.member(jsii_name="provide")
    @builtins.classmethod
    def provide(cls) -> "IObjectWithProperty":
        return jsii.sinvoke(cls, "provide", [])


class Old(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Old"):
    """Old class. (deprecated)

    deprecated
    :deprecated: Use the new class

    stability
    :stability: deprecated
    """

    def __init__(self) -> None:
        jsii.create(Old, self, [])

    @jsii.member(jsii_name="doAThing")
    def do_a_thing(self) -> None:
        """Doo wop that thing. (deprecated)

        stability
        :stability: deprecated
        """
        return jsii.invoke(self, "doAThing", [])


class OptionalArgumentInvoker(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.OptionalArgumentInvoker"
):
    def __init__(self, delegate: "IInterfaceWithOptionalMethodArguments") -> None:
        """
        :param delegate: -
        """
        jsii.create(OptionalArgumentInvoker, self, [delegate])

    @jsii.member(jsii_name="invokeWithOptional")
    def invoke_with_optional(self) -> None:
        return jsii.invoke(self, "invokeWithOptional", [])

    @jsii.member(jsii_name="invokeWithoutOptional")
    def invoke_without_optional(self) -> None:
        return jsii.invoke(self, "invokeWithoutOptional", [])


class OptionalConstructorArgument(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.OptionalConstructorArgument"
):
    def __init__(
        self,
        arg1: jsii.Number,
        arg2: str,
        arg3: typing.Optional[datetime.datetime] = None,
    ) -> None:
        """
        :param arg1: -
        :param arg2: -
        :param arg3: -
        """
        jsii.create(OptionalConstructorArgument, self, [arg1, arg2, arg3])

    @builtins.property
    @jsii.member(jsii_name="arg1")
    def arg1(self) -> jsii.Number:
        return jsii.get(self, "arg1")

    @builtins.property
    @jsii.member(jsii_name="arg2")
    def arg2(self) -> str:
        return jsii.get(self, "arg2")

    @builtins.property
    @jsii.member(jsii_name="arg3")
    def arg3(self) -> typing.Optional[datetime.datetime]:
        return jsii.get(self, "arg3")


@jsii.data_type(
    jsii_type="jsii-calc.OptionalStruct",
    jsii_struct_bases=[],
    name_mapping={"field": "field"},
)
class OptionalStruct:
    def __init__(self, *, field: typing.Optional[str] = None) -> None:
        """
        :param field: 
        """
        self._values = {}
        if field is not None:
            self._values["field"] = field

    @builtins.property
    def field(self) -> typing.Optional[str]:
        return self._values.get("field")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "OptionalStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class OptionalStructConsumer(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.OptionalStructConsumer"
):
    def __init__(self, *, field: typing.Optional[str] = None) -> None:
        """
        :param field: 
        """
        optional_struct = OptionalStruct(field=field)

        jsii.create(OptionalStructConsumer, self, [optional_struct])

    @builtins.property
    @jsii.member(jsii_name="parameterWasUndefined")
    def parameter_was_undefined(self) -> bool:
        return jsii.get(self, "parameterWasUndefined")

    @builtins.property
    @jsii.member(jsii_name="fieldValue")
    def field_value(self) -> typing.Optional[str]:
        return jsii.get(self, "fieldValue")


class OverridableProtectedMember(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.OverridableProtectedMember"
):
    """
    see
    :see: https://github.com/aws/jsii/issues/903
    """

    def __init__(self) -> None:
        jsii.create(OverridableProtectedMember, self, [])

    @jsii.member(jsii_name="overrideMe")
    def _override_me(self) -> str:
        return jsii.invoke(self, "overrideMe", [])

    @jsii.member(jsii_name="switchModes")
    def switch_modes(self) -> None:
        return jsii.invoke(self, "switchModes", [])

    @jsii.member(jsii_name="valueFromProtected")
    def value_from_protected(self) -> str:
        return jsii.invoke(self, "valueFromProtected", [])

    @builtins.property
    @jsii.member(jsii_name="overrideReadOnly")
    def _override_read_only(self) -> str:
        return jsii.get(self, "overrideReadOnly")

    @builtins.property
    @jsii.member(jsii_name="overrideReadWrite")
    def _override_read_write(self) -> str:
        return jsii.get(self, "overrideReadWrite")

    @_override_read_write.setter
    def _override_read_write(self, value: str) -> None:
        jsii.set(self, "overrideReadWrite", value)


class OverrideReturnsObject(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.OverrideReturnsObject"
):
    def __init__(self) -> None:
        jsii.create(OverrideReturnsObject, self, [])

    @jsii.member(jsii_name="test")
    def test(self, obj: "IReturnsNumber") -> jsii.Number:
        """
        :param obj: -
        """
        return jsii.invoke(self, "test", [obj])


@jsii.data_type(
    jsii_type="jsii-calc.ParentStruct982",
    jsii_struct_bases=[],
    name_mapping={"foo": "foo"},
)
class ParentStruct982:
    def __init__(self, *, foo: str) -> None:
        """https://github.com/aws/jsii/issues/982.

        :param foo: 
        """
        self._values = {
            "foo": foo,
        }

    @builtins.property
    def foo(self) -> str:
        return self._values.get("foo")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "ParentStruct982(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class PartiallyInitializedThisConsumer(
    metaclass=jsii.JSIIAbstractClass,
    jsii_type="jsii-calc.PartiallyInitializedThisConsumer",
):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _PartiallyInitializedThisConsumerProxy

    def __init__(self) -> None:
        jsii.create(PartiallyInitializedThisConsumer, self, [])

    @jsii.member(jsii_name="consumePartiallyInitializedThis")
    @abc.abstractmethod
    def consume_partially_initialized_this(
        self, obj: "ConstructorPassesThisOut", dt: datetime.datetime, ev: "AllTypesEnum"
    ) -> str:
        """
        :param obj: -
        :param dt: -
        :param ev: -
        """
        ...


class _PartiallyInitializedThisConsumerProxy(PartiallyInitializedThisConsumer):
    @jsii.member(jsii_name="consumePartiallyInitializedThis")
    def consume_partially_initialized_this(
        self, obj: "ConstructorPassesThisOut", dt: datetime.datetime, ev: "AllTypesEnum"
    ) -> str:
        """
        :param obj: -
        :param dt: -
        :param ev: -
        """
        return jsii.invoke(self, "consumePartiallyInitializedThis", [obj, dt, ev])


class Polymorphism(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Polymorphism"):
    def __init__(self) -> None:
        jsii.create(Polymorphism, self, [])

    @jsii.member(jsii_name="sayHello")
    def say_hello(self, friendly: scope.jsii_calc_lib.IFriendly) -> str:
        """
        :param friendly: -
        """
        return jsii.invoke(self, "sayHello", [friendly])


class Power(
    _CompositeOperation_1c4d123b, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Power"
):
    """The power operation."""

    def __init__(
        self, base: scope.jsii_calc_lib.Value, pow: scope.jsii_calc_lib.Value
    ) -> None:
        """Creates a Power operation.

        :param base: The base of the power.
        :param pow: The number of times to multiply.
        """
        jsii.create(Power, self, [base, pow])

    @builtins.property
    @jsii.member(jsii_name="base")
    def base(self) -> scope.jsii_calc_lib.Value:
        """The base of the power."""
        return jsii.get(self, "base")

    @builtins.property
    @jsii.member(jsii_name="expression")
    def expression(self) -> scope.jsii_calc_lib.Value:
        """The expression that this operation consists of.

        Must be implemented by derived classes.
        """
        return jsii.get(self, "expression")

    @builtins.property
    @jsii.member(jsii_name="pow")
    def pow(self) -> scope.jsii_calc_lib.Value:
        """The number of times to multiply."""
        return jsii.get(self, "pow")


class PropertyNamedProperty(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.PropertyNamedProperty"
):
    """Reproduction for https://github.com/aws/jsii/issues/1113 Where a method or property named "property" would result in impossible to load Python code."""

    def __init__(self) -> None:
        jsii.create(PropertyNamedProperty, self, [])

    @builtins.property
    @jsii.member(jsii_name="property")
    def property(self) -> str:
        return jsii.get(self, "property")

    @builtins.property
    @jsii.member(jsii_name="yetAnoterOne")
    def yet_anoter_one(self) -> bool:
        return jsii.get(self, "yetAnoterOne")


class PublicClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.PublicClass"):
    def __init__(self) -> None:
        jsii.create(PublicClass, self, [])

    @jsii.member(jsii_name="hello")
    def hello(self) -> None:
        return jsii.invoke(self, "hello", [])


class PythonReservedWords(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.PythonReservedWords"
):
    def __init__(self) -> None:
        jsii.create(PythonReservedWords, self, [])

    @jsii.member(jsii_name="and")
    def and_(self) -> None:
        return jsii.invoke(self, "and", [])

    @jsii.member(jsii_name="as")
    def as_(self) -> None:
        return jsii.invoke(self, "as", [])

    @jsii.member(jsii_name="assert")
    def assert_(self) -> None:
        return jsii.invoke(self, "assert", [])

    @jsii.member(jsii_name="async")
    def async_(self) -> None:
        return jsii.invoke(self, "async", [])

    @jsii.member(jsii_name="await")
    def await_(self) -> None:
        return jsii.invoke(self, "await", [])

    @jsii.member(jsii_name="break")
    def break_(self) -> None:
        return jsii.invoke(self, "break", [])

    @jsii.member(jsii_name="class")
    def class_(self) -> None:
        return jsii.invoke(self, "class", [])

    @jsii.member(jsii_name="continue")
    def continue_(self) -> None:
        return jsii.invoke(self, "continue", [])

    @jsii.member(jsii_name="def")
    def def_(self) -> None:
        return jsii.invoke(self, "def", [])

    @jsii.member(jsii_name="del")
    def del_(self) -> None:
        return jsii.invoke(self, "del", [])

    @jsii.member(jsii_name="elif")
    def elif_(self) -> None:
        return jsii.invoke(self, "elif", [])

    @jsii.member(jsii_name="else")
    def else_(self) -> None:
        return jsii.invoke(self, "else", [])

    @jsii.member(jsii_name="except")
    def except_(self) -> None:
        return jsii.invoke(self, "except", [])

    @jsii.member(jsii_name="finally")
    def finally_(self) -> None:
        return jsii.invoke(self, "finally", [])

    @jsii.member(jsii_name="for")
    def for_(self) -> None:
        return jsii.invoke(self, "for", [])

    @jsii.member(jsii_name="from")
    def from_(self) -> None:
        return jsii.invoke(self, "from", [])

    @jsii.member(jsii_name="global")
    def global_(self) -> None:
        return jsii.invoke(self, "global", [])

    @jsii.member(jsii_name="if")
    def if_(self) -> None:
        return jsii.invoke(self, "if", [])

    @jsii.member(jsii_name="import")
    def import_(self) -> None:
        return jsii.invoke(self, "import", [])

    @jsii.member(jsii_name="in")
    def in_(self) -> None:
        return jsii.invoke(self, "in", [])

    @jsii.member(jsii_name="is")
    def is_(self) -> None:
        return jsii.invoke(self, "is", [])

    @jsii.member(jsii_name="lambda")
    def lambda_(self) -> None:
        return jsii.invoke(self, "lambda", [])

    @jsii.member(jsii_name="nonlocal")
    def nonlocal_(self) -> None:
        return jsii.invoke(self, "nonlocal", [])

    @jsii.member(jsii_name="not")
    def not_(self) -> None:
        return jsii.invoke(self, "not", [])

    @jsii.member(jsii_name="or")
    def or_(self) -> None:
        return jsii.invoke(self, "or", [])

    @jsii.member(jsii_name="pass")
    def pass_(self) -> None:
        return jsii.invoke(self, "pass", [])

    @jsii.member(jsii_name="raise")
    def raise_(self) -> None:
        return jsii.invoke(self, "raise", [])

    @jsii.member(jsii_name="return")
    def return_(self) -> None:
        return jsii.invoke(self, "return", [])

    @jsii.member(jsii_name="try")
    def try_(self) -> None:
        return jsii.invoke(self, "try", [])

    @jsii.member(jsii_name="while")
    def while_(self) -> None:
        return jsii.invoke(self, "while", [])

    @jsii.member(jsii_name="with")
    def with_(self) -> None:
        return jsii.invoke(self, "with", [])

    @jsii.member(jsii_name="yield")
    def yield_(self) -> None:
        return jsii.invoke(self, "yield", [])


class ReferenceEnumFromScopedPackage(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ReferenceEnumFromScopedPackage"
):
    """See awslabs/jsii#138."""

    def __init__(self) -> None:
        jsii.create(ReferenceEnumFromScopedPackage, self, [])

    @jsii.member(jsii_name="loadFoo")
    def load_foo(self) -> typing.Optional[scope.jsii_calc_lib.EnumFromScopedModule]:
        return jsii.invoke(self, "loadFoo", [])

    @jsii.member(jsii_name="saveFoo")
    def save_foo(self, value: scope.jsii_calc_lib.EnumFromScopedModule) -> None:
        """
        :param value: -
        """
        return jsii.invoke(self, "saveFoo", [value])

    @builtins.property
    @jsii.member(jsii_name="foo")
    def foo(self) -> typing.Optional[scope.jsii_calc_lib.EnumFromScopedModule]:
        return jsii.get(self, "foo")

    @foo.setter
    def foo(
        self, value: typing.Optional[scope.jsii_calc_lib.EnumFromScopedModule]
    ) -> None:
        jsii.set(self, "foo", value)


class ReturnsPrivateImplementationOfInterface(
    metaclass=jsii.JSIIMeta,
    jsii_type="jsii-calc.ReturnsPrivateImplementationOfInterface",
):
    """Helps ensure the JSII kernel & runtime cooperate correctly when an un-exported instance of a class is returned with a declared type that is an exported interface, and the instance inherits from an exported class.

    return
    :return: an instance of an un-exported class that extends ``ExportedBaseClass``, declared as ``IPrivatelyImplemented``.

    see
    :see: https://github.com/aws/jsii/issues/320
    """

    def __init__(self) -> None:
        jsii.create(ReturnsPrivateImplementationOfInterface, self, [])

    @builtins.property
    @jsii.member(jsii_name="privateImplementation")
    def private_implementation(self) -> "IPrivatelyImplemented":
        return jsii.get(self, "privateImplementation")


@jsii.data_type(
    jsii_type="jsii-calc.RootStruct",
    jsii_struct_bases=[],
    name_mapping={"string_prop": "stringProp", "nested_struct": "nestedStruct"},
)
class RootStruct:
    def __init__(
        self, *, string_prop: str, nested_struct: typing.Optional["NestedStruct"] = None
    ) -> None:
        """This is here to check that we can pass a nested struct into a kwargs by specifying it as an in-line dictionary.

        This is cheating with the (current) declared types, but this is the "more
        idiomatic" way for Pythonists.

        :param string_prop: May not be empty.
        :param nested_struct: 
        """
        if isinstance(nested_struct, dict):
            nested_struct = NestedStruct(**nested_struct)
        self._values = {
            "string_prop": string_prop,
        }
        if nested_struct is not None:
            self._values["nested_struct"] = nested_struct

    @builtins.property
    def string_prop(self) -> str:
        """May not be empty."""
        return self._values.get("string_prop")

    @builtins.property
    def nested_struct(self) -> typing.Optional["NestedStruct"]:
        return self._values.get("nested_struct")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "RootStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class RootStructValidator(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.RootStructValidator"
):
    @jsii.member(jsii_name="validate")
    @builtins.classmethod
    def validate(
        cls, *, string_prop: str, nested_struct: typing.Optional["NestedStruct"] = None
    ) -> None:
        """
        :param string_prop: May not be empty.
        :param nested_struct: 
        """
        struct = RootStruct(string_prop=string_prop, nested_struct=nested_struct)

        return jsii.sinvoke(cls, "validate", [struct])


class RuntimeTypeChecking(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.RuntimeTypeChecking"
):
    def __init__(self) -> None:
        jsii.create(RuntimeTypeChecking, self, [])

    @jsii.member(jsii_name="methodWithDefaultedArguments")
    def method_with_defaulted_arguments(
        self,
        arg1: typing.Optional[jsii.Number] = None,
        arg2: typing.Optional[str] = None,
        arg3: typing.Optional[datetime.datetime] = None,
    ) -> None:
        """
        :param arg1: -
        :param arg2: -
        :param arg3: -
        """
        return jsii.invoke(self, "methodWithDefaultedArguments", [arg1, arg2, arg3])

    @jsii.member(jsii_name="methodWithOptionalAnyArgument")
    def method_with_optional_any_argument(self, arg: typing.Any = None) -> None:
        """
        :param arg: -
        """
        return jsii.invoke(self, "methodWithOptionalAnyArgument", [arg])

    @jsii.member(jsii_name="methodWithOptionalArguments")
    def method_with_optional_arguments(
        self,
        arg1: jsii.Number,
        arg2: str,
        arg3: typing.Optional[datetime.datetime] = None,
    ) -> None:
        """Used to verify verification of number of method arguments.

        :param arg1: -
        :param arg2: -
        :param arg3: -
        """
        return jsii.invoke(self, "methodWithOptionalArguments", [arg1, arg2, arg3])


@jsii.data_type(
    jsii_type="jsii-calc.SecondLevelStruct",
    jsii_struct_bases=[],
    name_mapping={
        "deeper_required_prop": "deeperRequiredProp",
        "deeper_optional_prop": "deeperOptionalProp",
    },
)
class SecondLevelStruct:
    def __init__(
        self,
        *,
        deeper_required_prop: str,
        deeper_optional_prop: typing.Optional[str] = None,
    ) -> None:
        """
        :param deeper_required_prop: It's long and required.
        :param deeper_optional_prop: It's long, but you'll almost never pass it.
        """
        self._values = {
            "deeper_required_prop": deeper_required_prop,
        }
        if deeper_optional_prop is not None:
            self._values["deeper_optional_prop"] = deeper_optional_prop

    @builtins.property
    def deeper_required_prop(self) -> str:
        """It's long and required."""
        return self._values.get("deeper_required_prop")

    @builtins.property
    def deeper_optional_prop(self) -> typing.Optional[str]:
        """It's long, but you'll almost never pass it."""
        return self._values.get("deeper_optional_prop")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "SecondLevelStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class SingleInstanceTwoTypes(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.SingleInstanceTwoTypes"
):
    """Test that a single instance can be returned under two different FQNs.

    JSII clients can instantiate 2 different strongly-typed wrappers for the same
    object. Unfortunately, this will break object equality, but if we didn't do
    this it would break runtime type checks in the JVM or CLR.
    """

    def __init__(self) -> None:
        jsii.create(SingleInstanceTwoTypes, self, [])

    @jsii.member(jsii_name="interface1")
    def interface1(self) -> "InbetweenClass":
        return jsii.invoke(self, "interface1", [])

    @jsii.member(jsii_name="interface2")
    def interface2(self) -> "IPublicInterface":
        return jsii.invoke(self, "interface2", [])


class SingletonInt(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.SingletonInt"):
    """Verifies that singleton enums are handled correctly.

    https://github.com/aws/jsii/issues/231
    """

    @jsii.member(jsii_name="isSingletonInt")
    def is_singleton_int(self, value: jsii.Number) -> bool:
        """
        :param value: -
        """
        return jsii.invoke(self, "isSingletonInt", [value])


@jsii.enum(jsii_type="jsii-calc.SingletonIntEnum")
class SingletonIntEnum(enum.Enum):
    """A singleton integer."""

    SINGLETON_INT = "SINGLETON_INT"
    """Elite!"""


class SingletonString(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.SingletonString"):
    """Verifies that singleton enums are handled correctly.

    https://github.com/aws/jsii/issues/231
    """

    @jsii.member(jsii_name="isSingletonString")
    def is_singleton_string(self, value: str) -> bool:
        """
        :param value: -
        """
        return jsii.invoke(self, "isSingletonString", [value])


@jsii.enum(jsii_type="jsii-calc.SingletonStringEnum")
class SingletonStringEnum(enum.Enum):
    """A singleton string."""

    SINGLETON_STRING = "SINGLETON_STRING"
    """1337."""


@jsii.data_type(
    jsii_type="jsii-calc.SmellyStruct",
    jsii_struct_bases=[],
    name_mapping={"property": "property", "yet_anoter_one": "yetAnoterOne"},
)
class SmellyStruct:
    def __init__(self, *, property: str, yet_anoter_one: bool) -> None:
        """
        :param property: 
        :param yet_anoter_one: 
        """
        self._values = {
            "property": property,
            "yet_anoter_one": yet_anoter_one,
        }

    @builtins.property
    def property(self) -> str:
        return self._values.get("property")

    @builtins.property
    def yet_anoter_one(self) -> bool:
        return self._values.get("yet_anoter_one")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "SmellyStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class SomeTypeJsii976(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.SomeTypeJsii976"):
    def __init__(self) -> None:
        jsii.create(SomeTypeJsii976, self, [])

    @jsii.member(jsii_name="returnAnonymous")
    @builtins.classmethod
    def return_anonymous(cls) -> typing.Any:
        return jsii.sinvoke(cls, "returnAnonymous", [])

    @jsii.member(jsii_name="returnReturn")
    @builtins.classmethod
    def return_return(cls) -> "IReturnJsii976":
        return jsii.sinvoke(cls, "returnReturn", [])


class StableClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.StableClass"):
    def __init__(
        self, readonly_string: str, mutable_number: typing.Optional[jsii.Number] = None
    ) -> None:
        """
        :param readonly_string: -
        :param mutable_number: -
        """
        jsii.create(StableClass, self, [readonly_string, mutable_number])

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        return jsii.invoke(self, "method", [])

    @builtins.property
    @jsii.member(jsii_name="readonlyProperty")
    def readonly_property(self) -> str:
        return jsii.get(self, "readonlyProperty")

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]) -> None:
        jsii.set(self, "mutableProperty", value)


@jsii.enum(jsii_type="jsii-calc.StableEnum")
class StableEnum(enum.Enum):
    OPTION_A = "OPTION_A"
    OPTION_B = "OPTION_B"


@jsii.data_type(
    jsii_type="jsii-calc.StableStruct",
    jsii_struct_bases=[],
    name_mapping={"readonly_property": "readonlyProperty"},
)
class StableStruct:
    def __init__(self, *, readonly_property: str) -> None:
        """
        :param readonly_property: 
        """
        self._values = {
            "readonly_property": readonly_property,
        }

    @builtins.property
    def readonly_property(self) -> str:
        return self._values.get("readonly_property")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "StableStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class StaticContext(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.StaticContext"):
    """This is used to validate the ability to use ``this`` from within a static context.

    https://github.com/awslabs/aws-cdk/issues/2304
    """

    @jsii.member(jsii_name="canAccessStaticContext")
    @builtins.classmethod
    def can_access_static_context(cls) -> bool:
        return jsii.sinvoke(cls, "canAccessStaticContext", [])

    @jsii.python.classproperty
    @jsii.member(jsii_name="staticVariable")
    def static_variable(cls) -> bool:
        return jsii.sget(cls, "staticVariable")

    @static_variable.setter
    def static_variable(cls, value: bool) -> None:
        jsii.sset(cls, "staticVariable", value)


class Statics(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Statics"):
    def __init__(self, value: str) -> None:
        """
        :param value: -
        """
        jsii.create(Statics, self, [value])

    @jsii.member(jsii_name="staticMethod")
    @builtins.classmethod
    def static_method(cls, name: str) -> str:
        """Jsdocs for static method.

        :param name: The name of the person to say hello to.
        """
        return jsii.sinvoke(cls, "staticMethod", [name])

    @jsii.member(jsii_name="justMethod")
    def just_method(self) -> str:
        return jsii.invoke(self, "justMethod", [])

    @jsii.python.classproperty
    @jsii.member(jsii_name="BAR")
    def BAR(cls) -> jsii.Number:
        """Constants may also use all-caps."""
        return jsii.sget(cls, "BAR")

    @jsii.python.classproperty
    @jsii.member(jsii_name="ConstObj")
    def CONST_OBJ(cls) -> "DoubleTrouble":
        return jsii.sget(cls, "ConstObj")

    @jsii.python.classproperty
    @jsii.member(jsii_name="Foo")
    def FOO(cls) -> str:
        """Jsdocs for static property."""
        return jsii.sget(cls, "Foo")

    @jsii.python.classproperty
    @jsii.member(jsii_name="zooBar")
    def ZOO_BAR(cls) -> typing.Mapping[str, str]:
        """Constants can also use camelCase."""
        return jsii.sget(cls, "zooBar")

    @jsii.python.classproperty
    @jsii.member(jsii_name="instance")
    def instance(cls) -> "Statics":
        """Jsdocs for static getter.

        Jsdocs for static setter.
        """
        return jsii.sget(cls, "instance")

    @instance.setter
    def instance(cls, value: "Statics") -> None:
        jsii.sset(cls, "instance", value)

    @jsii.python.classproperty
    @jsii.member(jsii_name="nonConstStatic")
    def non_const_static(cls) -> jsii.Number:
        return jsii.sget(cls, "nonConstStatic")

    @non_const_static.setter
    def non_const_static(cls, value: jsii.Number) -> None:
        jsii.sset(cls, "nonConstStatic", value)

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> str:
        return jsii.get(self, "value")


@jsii.enum(jsii_type="jsii-calc.StringEnum")
class StringEnum(enum.Enum):
    A = "A"
    B = "B"
    C = "C"


class StripInternal(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.StripInternal"):
    def __init__(self) -> None:
        jsii.create(StripInternal, self, [])

    @builtins.property
    @jsii.member(jsii_name="youSeeMe")
    def you_see_me(self) -> str:
        return jsii.get(self, "youSeeMe")

    @you_see_me.setter
    def you_see_me(self, value: str) -> None:
        jsii.set(self, "youSeeMe", value)


@jsii.data_type(
    jsii_type="jsii-calc.StructA",
    jsii_struct_bases=[],
    name_mapping={
        "required_string": "requiredString",
        "optional_number": "optionalNumber",
        "optional_string": "optionalString",
    },
)
class StructA:
    def __init__(
        self,
        *,
        required_string: str,
        optional_number: typing.Optional[jsii.Number] = None,
        optional_string: typing.Optional[str] = None,
    ) -> None:
        """We can serialize and deserialize structs without silently ignoring optional fields.

        :param required_string: 
        :param optional_number: 
        :param optional_string: 
        """
        self._values = {
            "required_string": required_string,
        }
        if optional_number is not None:
            self._values["optional_number"] = optional_number
        if optional_string is not None:
            self._values["optional_string"] = optional_string

    @builtins.property
    def required_string(self) -> str:
        return self._values.get("required_string")

    @builtins.property
    def optional_number(self) -> typing.Optional[jsii.Number]:
        return self._values.get("optional_number")

    @builtins.property
    def optional_string(self) -> typing.Optional[str]:
        return self._values.get("optional_string")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "StructA(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.data_type(
    jsii_type="jsii-calc.StructB",
    jsii_struct_bases=[],
    name_mapping={
        "required_string": "requiredString",
        "optional_boolean": "optionalBoolean",
        "optional_struct_a": "optionalStructA",
    },
)
class StructB:
    def __init__(
        self,
        *,
        required_string: str,
        optional_boolean: typing.Optional[bool] = None,
        optional_struct_a: typing.Optional["StructA"] = None,
    ) -> None:
        """This intentionally overlaps with StructA (where only requiredString is provided) to test htat the kernel properly disambiguates those.

        :param required_string: 
        :param optional_boolean: 
        :param optional_struct_a: 
        """
        if isinstance(optional_struct_a, dict):
            optional_struct_a = StructA(**optional_struct_a)
        self._values = {
            "required_string": required_string,
        }
        if optional_boolean is not None:
            self._values["optional_boolean"] = optional_boolean
        if optional_struct_a is not None:
            self._values["optional_struct_a"] = optional_struct_a

    @builtins.property
    def required_string(self) -> str:
        return self._values.get("required_string")

    @builtins.property
    def optional_boolean(self) -> typing.Optional[bool]:
        return self._values.get("optional_boolean")

    @builtins.property
    def optional_struct_a(self) -> typing.Optional["StructA"]:
        return self._values.get("optional_struct_a")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "StructB(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.data_type(
    jsii_type="jsii-calc.StructParameterType",
    jsii_struct_bases=[],
    name_mapping={"scope": "scope", "props": "props"},
)
class StructParameterType:
    def __init__(self, *, scope: str, props: typing.Optional[bool] = None) -> None:
        """Verifies that, in languages that do keyword lifting (e.g: Python), having a struct member with the same name as a positional parameter results in the correct code being emitted.

        See: https://github.com/aws/aws-cdk/issues/4302

        :param scope: 
        :param props: 
        """
        self._values = {
            "scope": scope,
        }
        if props is not None:
            self._values["props"] = props

    @builtins.property
    def scope(self) -> str:
        return self._values.get("scope")

    @builtins.property
    def props(self) -> typing.Optional[bool]:
        return self._values.get("props")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "StructParameterType(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class StructPassing(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.StructPassing"):
    """Just because we can."""

    def __init__(self) -> None:
        jsii.create(StructPassing, self, [])

    @jsii.member(jsii_name="howManyVarArgsDidIPass")
    @builtins.classmethod
    def how_many_var_args_did_i_pass(
        cls, _positional: jsii.Number, *inputs: "TopLevelStruct"
    ) -> jsii.Number:
        """
        :param _positional: -
        :param inputs: -
        """
        return jsii.sinvoke(cls, "howManyVarArgsDidIPass", [_positional, *inputs])

    @jsii.member(jsii_name="roundTrip")
    @builtins.classmethod
    def round_trip(
        cls,
        _positional: jsii.Number,
        *,
        required: str,
        second_level: typing.Union[jsii.Number, "SecondLevelStruct"],
        optional: typing.Optional[str] = None,
    ) -> "TopLevelStruct":
        """
        :param _positional: -
        :param required: This is a required field.
        :param second_level: A union to really stress test our serialization.
        :param optional: You don't have to pass this.
        """
        input = TopLevelStruct(
            required=required, second_level=second_level, optional=optional
        )

        return jsii.sinvoke(cls, "roundTrip", [_positional, input])


class StructUnionConsumer(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.StructUnionConsumer"
):
    @jsii.member(jsii_name="isStructA")
    @builtins.classmethod
    def is_struct_a(cls, struct: typing.Union["StructA", "StructB"]) -> bool:
        """
        :param struct: -
        """
        return jsii.sinvoke(cls, "isStructA", [struct])

    @jsii.member(jsii_name="isStructB")
    @builtins.classmethod
    def is_struct_b(cls, struct: typing.Union["StructA", "StructB"]) -> bool:
        """
        :param struct: -
        """
        return jsii.sinvoke(cls, "isStructB", [struct])


@jsii.data_type(
    jsii_type="jsii-calc.StructWithJavaReservedWords",
    jsii_struct_bases=[],
    name_mapping={
        "default": "default",
        "assert_": "assert",
        "result": "result",
        "that": "that",
    },
)
class StructWithJavaReservedWords:
    def __init__(
        self,
        *,
        default: str,
        assert_: typing.Optional[str] = None,
        result: typing.Optional[str] = None,
        that: typing.Optional[str] = None,
    ) -> None:
        """
        :param default: 
        :param assert_: 
        :param result: 
        :param that: 
        """
        self._values = {
            "default": default,
        }
        if assert_ is not None:
            self._values["assert_"] = assert_
        if result is not None:
            self._values["result"] = result
        if that is not None:
            self._values["that"] = that

    @builtins.property
    def default(self) -> str:
        return self._values.get("default")

    @builtins.property
    def assert_(self) -> typing.Optional[str]:
        return self._values.get("assert_")

    @builtins.property
    def result(self) -> typing.Optional[str]:
        return self._values.get("result")

    @builtins.property
    def that(self) -> typing.Optional[str]:
        return self._values.get("that")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "StructWithJavaReservedWords(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class Sum(
    _CompositeOperation_1c4d123b, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Sum"
):
    """An operation that sums multiple values."""

    def __init__(self) -> None:
        jsii.create(Sum, self, [])

    @builtins.property
    @jsii.member(jsii_name="expression")
    def expression(self) -> scope.jsii_calc_lib.Value:
        """The expression that this operation consists of.

        Must be implemented by derived classes.
        """
        return jsii.get(self, "expression")

    @builtins.property
    @jsii.member(jsii_name="parts")
    def parts(self) -> typing.List[scope.jsii_calc_lib.Value]:
        """The parts to sum."""
        return jsii.get(self, "parts")

    @parts.setter
    def parts(self, value: typing.List[scope.jsii_calc_lib.Value]) -> None:
        jsii.set(self, "parts", value)


@jsii.data_type(
    jsii_type="jsii-calc.SupportsNiceJavaBuilderProps",
    jsii_struct_bases=[],
    name_mapping={"bar": "bar", "id": "id"},
)
class SupportsNiceJavaBuilderProps:
    def __init__(self, *, bar: jsii.Number, id: typing.Optional[str] = None) -> None:
        """
        :param bar: Some number, like 42.
        :param id: An ``id`` field here is terrible API design, because the constructor of ``SupportsNiceJavaBuilder`` already has a parameter named ``id``. But here we are, doing it like we didn't care.
        """
        self._values = {
            "bar": bar,
        }
        if id is not None:
            self._values["id"] = id

    @builtins.property
    def bar(self) -> jsii.Number:
        """Some number, like 42."""
        return self._values.get("bar")

    @builtins.property
    def id(self) -> typing.Optional[str]:
        """An ``id`` field here is terrible API design, because the constructor of ``SupportsNiceJavaBuilder`` already has a parameter named ``id``.

        But here we are, doing it like we didn't care.
        """
        return self._values.get("id")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "SupportsNiceJavaBuilderProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class SupportsNiceJavaBuilderWithRequiredProps(
    metaclass=jsii.JSIIMeta,
    jsii_type="jsii-calc.SupportsNiceJavaBuilderWithRequiredProps",
):
    """We can generate fancy builders in Java for classes which take a mix of positional & struct parameters."""

    def __init__(
        self, id_: jsii.Number, *, bar: jsii.Number, id: typing.Optional[str] = None
    ) -> None:
        """
        :param id_: some identifier of your choice.
        :param bar: Some number, like 42.
        :param id: An ``id`` field here is terrible API design, because the constructor of ``SupportsNiceJavaBuilder`` already has a parameter named ``id``. But here we are, doing it like we didn't care.
        """
        props = SupportsNiceJavaBuilderProps(bar=bar, id=id)

        jsii.create(SupportsNiceJavaBuilderWithRequiredProps, self, [id_, props])

    @builtins.property
    @jsii.member(jsii_name="bar")
    def bar(self) -> jsii.Number:
        return jsii.get(self, "bar")

    @builtins.property
    @jsii.member(jsii_name="id")
    def id(self) -> jsii.Number:
        """some identifier of your choice."""
        return jsii.get(self, "id")

    @builtins.property
    @jsii.member(jsii_name="propId")
    def prop_id(self) -> typing.Optional[str]:
        return jsii.get(self, "propId")


class SyncVirtualMethods(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.SyncVirtualMethods"
):
    def __init__(self) -> None:
        jsii.create(SyncVirtualMethods, self, [])

    @jsii.member(jsii_name="callerIsAsync")
    def caller_is_async(self) -> jsii.Number:
        return jsii.ainvoke(self, "callerIsAsync", [])

    @jsii.member(jsii_name="callerIsMethod")
    def caller_is_method(self) -> jsii.Number:
        return jsii.invoke(self, "callerIsMethod", [])

    @jsii.member(jsii_name="modifyOtherProperty")
    def modify_other_property(self, value: str) -> None:
        """
        :param value: -
        """
        return jsii.invoke(self, "modifyOtherProperty", [value])

    @jsii.member(jsii_name="modifyValueOfTheProperty")
    def modify_value_of_the_property(self, value: str) -> None:
        """
        :param value: -
        """
        return jsii.invoke(self, "modifyValueOfTheProperty", [value])

    @jsii.member(jsii_name="readA")
    def read_a(self) -> jsii.Number:
        return jsii.invoke(self, "readA", [])

    @jsii.member(jsii_name="retrieveOtherProperty")
    def retrieve_other_property(self) -> str:
        return jsii.invoke(self, "retrieveOtherProperty", [])

    @jsii.member(jsii_name="retrieveReadOnlyProperty")
    def retrieve_read_only_property(self) -> str:
        return jsii.invoke(self, "retrieveReadOnlyProperty", [])

    @jsii.member(jsii_name="retrieveValueOfTheProperty")
    def retrieve_value_of_the_property(self) -> str:
        return jsii.invoke(self, "retrieveValueOfTheProperty", [])

    @jsii.member(jsii_name="virtualMethod")
    def virtual_method(self, n: jsii.Number) -> jsii.Number:
        """
        :param n: -
        """
        return jsii.invoke(self, "virtualMethod", [n])

    @jsii.member(jsii_name="writeA")
    def write_a(self, value: jsii.Number) -> None:
        """
        :param value: -
        """
        return jsii.invoke(self, "writeA", [value])

    @builtins.property
    @jsii.member(jsii_name="readonlyProperty")
    def readonly_property(self) -> str:
        return jsii.get(self, "readonlyProperty")

    @builtins.property
    @jsii.member(jsii_name="a")
    def a(self) -> jsii.Number:
        return jsii.get(self, "a")

    @a.setter
    def a(self, value: jsii.Number) -> None:
        jsii.set(self, "a", value)

    @builtins.property
    @jsii.member(jsii_name="callerIsProperty")
    def caller_is_property(self) -> jsii.Number:
        return jsii.get(self, "callerIsProperty")

    @caller_is_property.setter
    def caller_is_property(self, value: jsii.Number) -> None:
        jsii.set(self, "callerIsProperty", value)

    @builtins.property
    @jsii.member(jsii_name="otherProperty")
    def other_property(self) -> str:
        return jsii.get(self, "otherProperty")

    @other_property.setter
    def other_property(self, value: str) -> None:
        jsii.set(self, "otherProperty", value)

    @builtins.property
    @jsii.member(jsii_name="theProperty")
    def the_property(self) -> str:
        return jsii.get(self, "theProperty")

    @the_property.setter
    def the_property(self, value: str) -> None:
        jsii.set(self, "theProperty", value)

    @builtins.property
    @jsii.member(jsii_name="valueOfOtherProperty")
    def value_of_other_property(self) -> str:
        return jsii.get(self, "valueOfOtherProperty")

    @value_of_other_property.setter
    def value_of_other_property(self, value: str) -> None:
        jsii.set(self, "valueOfOtherProperty", value)


class Thrower(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Thrower"):
    def __init__(self) -> None:
        jsii.create(Thrower, self, [])

    @jsii.member(jsii_name="throwError")
    def throw_error(self) -> None:
        return jsii.invoke(self, "throwError", [])


@jsii.data_type(
    jsii_type="jsii-calc.TopLevelStruct",
    jsii_struct_bases=[],
    name_mapping={
        "required": "required",
        "second_level": "secondLevel",
        "optional": "optional",
    },
)
class TopLevelStruct:
    def __init__(
        self,
        *,
        required: str,
        second_level: typing.Union[jsii.Number, "SecondLevelStruct"],
        optional: typing.Optional[str] = None,
    ) -> None:
        """
        :param required: This is a required field.
        :param second_level: A union to really stress test our serialization.
        :param optional: You don't have to pass this.
        """
        self._values = {
            "required": required,
            "second_level": second_level,
        }
        if optional is not None:
            self._values["optional"] = optional

    @builtins.property
    def required(self) -> str:
        """This is a required field."""
        return self._values.get("required")

    @builtins.property
    def second_level(self) -> typing.Union[jsii.Number, "SecondLevelStruct"]:
        """A union to really stress test our serialization."""
        return self._values.get("second_level")

    @builtins.property
    def optional(self) -> typing.Optional[str]:
        """You don't have to pass this."""
        return self._values.get("optional")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "TopLevelStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class UmaskCheck(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.UmaskCheck"):
    """Checks the current file permissions are cool (no funky UMASK down-scoping happened).

    see
    :see: https://github.com/aws/jsii/issues/1765
    """

    @jsii.member(jsii_name="mode")
    @builtins.classmethod
    def mode(cls) -> jsii.Number:
        """This should return 0o644 (-rw-r--r--)."""
        return jsii.sinvoke(cls, "mode", [])


class UnaryOperation(
    scope.jsii_calc_lib.Operation,
    metaclass=jsii.JSIIAbstractClass,
    jsii_type="jsii-calc.UnaryOperation",
):
    """An operation on a single operand."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _UnaryOperationProxy

    def __init__(self, operand: scope.jsii_calc_lib.Value) -> None:
        """
        :param operand: -
        """
        jsii.create(UnaryOperation, self, [operand])

    @builtins.property
    @jsii.member(jsii_name="operand")
    def operand(self) -> scope.jsii_calc_lib.Value:
        return jsii.get(self, "operand")


class _UnaryOperationProxy(
    UnaryOperation, jsii.proxy_for(scope.jsii_calc_lib.Operation)
):
    pass


@jsii.data_type(
    jsii_type="jsii-calc.UnionProperties",
    jsii_struct_bases=[],
    name_mapping={"bar": "bar", "foo": "foo"},
)
class UnionProperties:
    def __init__(
        self,
        *,
        bar: typing.Union[str, jsii.Number, "AllTypes"],
        foo: typing.Optional[typing.Union[str, jsii.Number]] = None,
    ) -> None:
        """
        :param bar: 
        :param foo: 
        """
        self._values = {
            "bar": bar,
        }
        if foo is not None:
            self._values["foo"] = foo

    @builtins.property
    def bar(self) -> typing.Union[str, jsii.Number, "AllTypes"]:
        return self._values.get("bar")

    @builtins.property
    def foo(self) -> typing.Optional[typing.Union[str, jsii.Number]]:
        return self._values.get("foo")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "UnionProperties(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.implements(scope.jsii_calc_lib.custom_submodule_name.IReflectable)
class UpcasingReflectable(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.UpcasingReflectable"
):
    """Ensures submodule-imported types from dependencies can be used correctly."""

    def __init__(self, delegate: typing.Mapping[str, typing.Any]) -> None:
        """
        :param delegate: -
        """
        jsii.create(UpcasingReflectable, self, [delegate])

    @jsii.python.classproperty
    @jsii.member(jsii_name="reflector")
    def REFLECTOR(cls) -> scope.jsii_calc_lib.custom_submodule_name.Reflector:
        return jsii.sget(cls, "reflector")

    @builtins.property
    @jsii.member(jsii_name="entries")
    def entries(
        self,
    ) -> typing.List[scope.jsii_calc_lib.custom_submodule_name.ReflectableEntry]:
        """(deprecated)."""
        return jsii.get(self, "entries")


class UseBundledDependency(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.UseBundledDependency"
):
    def __init__(self) -> None:
        jsii.create(UseBundledDependency, self, [])

    @jsii.member(jsii_name="value")
    def value(self) -> typing.Any:
        return jsii.invoke(self, "value", [])


class UseCalcBase(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.UseCalcBase"):
    """Depend on a type from jsii-calc-base as a test for awslabs/jsii#128."""

    def __init__(self) -> None:
        jsii.create(UseCalcBase, self, [])

    @jsii.member(jsii_name="hello")
    def hello(self) -> scope.jsii_calc_base.Base:
        return jsii.invoke(self, "hello", [])


class UsesInterfaceWithProperties(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.UsesInterfaceWithProperties"
):
    def __init__(self, obj: "IInterfaceWithProperties") -> None:
        """
        :param obj: -
        """
        jsii.create(UsesInterfaceWithProperties, self, [obj])

    @jsii.member(jsii_name="justRead")
    def just_read(self) -> str:
        return jsii.invoke(self, "justRead", [])

    @jsii.member(jsii_name="readStringAndNumber")
    def read_string_and_number(self, ext: "IInterfaceWithPropertiesExtension") -> str:
        """
        :param ext: -
        """
        return jsii.invoke(self, "readStringAndNumber", [ext])

    @jsii.member(jsii_name="writeAndRead")
    def write_and_read(self, value: str) -> str:
        """
        :param value: -
        """
        return jsii.invoke(self, "writeAndRead", [value])

    @builtins.property
    @jsii.member(jsii_name="obj")
    def obj(self) -> "IInterfaceWithProperties":
        return jsii.get(self, "obj")


class VariadicInvoker(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.VariadicInvoker"):
    def __init__(self, method: "VariadicMethod") -> None:
        """
        :param method: -
        """
        jsii.create(VariadicInvoker, self, [method])

    @jsii.member(jsii_name="asArray")
    def as_array(self, *values: jsii.Number) -> typing.List[jsii.Number]:
        """
        :param values: -
        """
        return jsii.invoke(self, "asArray", [*values])


class VariadicMethod(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.VariadicMethod"):
    def __init__(self, *prefix: jsii.Number) -> None:
        """
        :param prefix: a prefix that will be use for all values returned by ``#asArray``.
        """
        jsii.create(VariadicMethod, self, [*prefix])

    @jsii.member(jsii_name="asArray")
    def as_array(
        self, first: jsii.Number, *others: jsii.Number
    ) -> typing.List[jsii.Number]:
        """
        :param first: the first element of the array to be returned (after the ``prefix`` provided at construction time).
        :param others: other elements to be included in the array.
        """
        return jsii.invoke(self, "asArray", [first, *others])


class VirtualMethodPlayground(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.VirtualMethodPlayground"
):
    def __init__(self) -> None:
        jsii.create(VirtualMethodPlayground, self, [])

    @jsii.member(jsii_name="overrideMeAsync")
    def override_me_async(self, index: jsii.Number) -> jsii.Number:
        """
        :param index: -
        """
        return jsii.ainvoke(self, "overrideMeAsync", [index])

    @jsii.member(jsii_name="overrideMeSync")
    def override_me_sync(self, index: jsii.Number) -> jsii.Number:
        """
        :param index: -
        """
        return jsii.invoke(self, "overrideMeSync", [index])

    @jsii.member(jsii_name="parallelSumAsync")
    def parallel_sum_async(self, count: jsii.Number) -> jsii.Number:
        """
        :param count: -
        """
        return jsii.ainvoke(self, "parallelSumAsync", [count])

    @jsii.member(jsii_name="serialSumAsync")
    def serial_sum_async(self, count: jsii.Number) -> jsii.Number:
        """
        :param count: -
        """
        return jsii.ainvoke(self, "serialSumAsync", [count])

    @jsii.member(jsii_name="sumSync")
    def sum_sync(self, count: jsii.Number) -> jsii.Number:
        """
        :param count: -
        """
        return jsii.invoke(self, "sumSync", [count])


class VoidCallback(
    metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.VoidCallback"
):
    """This test is used to validate the runtimes can return correctly from a void callback.

    - Implement ``overrideMe`` (method does not have to do anything).
    - Invoke ``callMe``
    - Verify that ``methodWasCalled`` is ``true``.
    """

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _VoidCallbackProxy

    def __init__(self) -> None:
        jsii.create(VoidCallback, self, [])

    @jsii.member(jsii_name="callMe")
    def call_me(self) -> None:
        return jsii.invoke(self, "callMe", [])

    @jsii.member(jsii_name="overrideMe")
    @abc.abstractmethod
    def _override_me(self) -> None:
        ...

    @builtins.property
    @jsii.member(jsii_name="methodWasCalled")
    def method_was_called(self) -> bool:
        return jsii.get(self, "methodWasCalled")


class _VoidCallbackProxy(VoidCallback):
    @jsii.member(jsii_name="overrideMe")
    def _override_me(self) -> None:
        return jsii.invoke(self, "overrideMe", [])


class WithPrivatePropertyInConstructor(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.WithPrivatePropertyInConstructor"
):
    """Verifies that private property declarations in constructor arguments are hidden."""

    def __init__(self, private_field: typing.Optional[str] = None) -> None:
        """
        :param private_field: -
        """
        jsii.create(WithPrivatePropertyInConstructor, self, [private_field])

    @builtins.property
    @jsii.member(jsii_name="success")
    def success(self) -> bool:
        return jsii.get(self, "success")


@jsii.implements(IInterfaceImplementedByAbstractClass)
class AbstractClass(
    AbstractClassBase,
    metaclass=jsii.JSIIAbstractClass,
    jsii_type="jsii-calc.AbstractClass",
):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _AbstractClassProxy

    def __init__(self) -> None:
        jsii.create(AbstractClass, self, [])

    @jsii.member(jsii_name="abstractMethod")
    @abc.abstractmethod
    def abstract_method(self, name: str) -> str:
        """
        :param name: -
        """
        ...

    @jsii.member(jsii_name="nonAbstractMethod")
    def non_abstract_method(self) -> jsii.Number:
        return jsii.invoke(self, "nonAbstractMethod", [])

    @builtins.property
    @jsii.member(jsii_name="propFromInterface")
    def prop_from_interface(self) -> str:
        return jsii.get(self, "propFromInterface")


class _AbstractClassProxy(AbstractClass, jsii.proxy_for(AbstractClassBase)):
    @jsii.member(jsii_name="abstractMethod")
    def abstract_method(self, name: str) -> str:
        """
        :param name: -
        """
        return jsii.invoke(self, "abstractMethod", [name])


class Add(BinaryOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Add"):
    """The "+" binary operation."""

    def __init__(
        self, lhs: scope.jsii_calc_lib.Value, rhs: scope.jsii_calc_lib.Value
    ) -> None:
        """Creates a BinaryOperation.

        :param lhs: Left-hand side operand.
        :param rhs: Right-hand side operand.
        """
        jsii.create(Add, self, [lhs, rhs])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value.

        (deprecated)
        """
        return jsii.invoke(self, "toString", [])

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The value.

        (deprecated)
        """
        return jsii.get(self, "value")


@jsii.implements(IAnonymousImplementationProvider)
class AnonymousImplementationProvider(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AnonymousImplementationProvider"
):
    def __init__(self) -> None:
        jsii.create(AnonymousImplementationProvider, self, [])

    @jsii.member(jsii_name="provideAsClass")
    def provide_as_class(self) -> "Implementation":
        return jsii.invoke(self, "provideAsClass", [])

    @jsii.member(jsii_name="provideAsInterface")
    def provide_as_interface(self) -> "IAnonymouslyImplementMe":
        return jsii.invoke(self, "provideAsInterface", [])


@jsii.implements(IBell)
class Bell(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Bell"):
    def __init__(self) -> None:
        jsii.create(Bell, self, [])

    @jsii.member(jsii_name="ring")
    def ring(self) -> None:
        return jsii.invoke(self, "ring", [])

    @builtins.property
    @jsii.member(jsii_name="rung")
    def rung(self) -> bool:
        return jsii.get(self, "rung")

    @rung.setter
    def rung(self, value: bool) -> None:
        jsii.set(self, "rung", value)


@jsii.data_type(
    jsii_type="jsii-calc.ChildStruct982",
    jsii_struct_bases=[ParentStruct982],
    name_mapping={"foo": "foo", "bar": "bar"},
)
class ChildStruct982(ParentStruct982):
    def __init__(self, *, foo: str, bar: jsii.Number) -> None:
        """
        :param foo: 
        :param bar: 
        """
        self._values = {
            "foo": foo,
            "bar": bar,
        }

    @builtins.property
    def foo(self) -> str:
        return self._values.get("foo")

    @builtins.property
    def bar(self) -> jsii.Number:
        return self._values.get("bar")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "ChildStruct982(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.implements(INonInternalInterface)
class ClassThatImplementsTheInternalInterface(
    metaclass=jsii.JSIIMeta,
    jsii_type="jsii-calc.ClassThatImplementsTheInternalInterface",
):
    def __init__(self) -> None:
        jsii.create(ClassThatImplementsTheInternalInterface, self, [])

    @builtins.property
    @jsii.member(jsii_name="a")
    def a(self) -> str:
        return jsii.get(self, "a")

    @a.setter
    def a(self, value: str) -> None:
        jsii.set(self, "a", value)

    @builtins.property
    @jsii.member(jsii_name="b")
    def b(self) -> str:
        return jsii.get(self, "b")

    @b.setter
    def b(self, value: str) -> None:
        jsii.set(self, "b", value)

    @builtins.property
    @jsii.member(jsii_name="c")
    def c(self) -> str:
        return jsii.get(self, "c")

    @c.setter
    def c(self, value: str) -> None:
        jsii.set(self, "c", value)

    @builtins.property
    @jsii.member(jsii_name="d")
    def d(self) -> str:
        return jsii.get(self, "d")

    @d.setter
    def d(self, value: str) -> None:
        jsii.set(self, "d", value)


@jsii.implements(INonInternalInterface)
class ClassThatImplementsThePrivateInterface(
    metaclass=jsii.JSIIMeta,
    jsii_type="jsii-calc.ClassThatImplementsThePrivateInterface",
):
    def __init__(self) -> None:
        jsii.create(ClassThatImplementsThePrivateInterface, self, [])

    @builtins.property
    @jsii.member(jsii_name="a")
    def a(self) -> str:
        return jsii.get(self, "a")

    @a.setter
    def a(self, value: str) -> None:
        jsii.set(self, "a", value)

    @builtins.property
    @jsii.member(jsii_name="b")
    def b(self) -> str:
        return jsii.get(self, "b")

    @b.setter
    def b(self, value: str) -> None:
        jsii.set(self, "b", value)

    @builtins.property
    @jsii.member(jsii_name="c")
    def c(self) -> str:
        return jsii.get(self, "c")

    @c.setter
    def c(self, value: str) -> None:
        jsii.set(self, "c", value)

    @builtins.property
    @jsii.member(jsii_name="e")
    def e(self) -> str:
        return jsii.get(self, "e")

    @e.setter
    def e(self, value: str) -> None:
        jsii.set(self, "e", value)


@jsii.implements(IInterfaceWithProperties)
class ClassWithPrivateConstructorAndAutomaticProperties(
    metaclass=jsii.JSIIMeta,
    jsii_type="jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties",
):
    """Class that implements interface properties automatically, but using a private constructor."""

    @jsii.member(jsii_name="create")
    @builtins.classmethod
    def create(
        cls, read_only_string: str, read_write_string: str
    ) -> "ClassWithPrivateConstructorAndAutomaticProperties":
        """
        :param read_only_string: -
        :param read_write_string: -
        """
        return jsii.sinvoke(cls, "create", [read_only_string, read_write_string])

    @builtins.property
    @jsii.member(jsii_name="readOnlyString")
    def read_only_string(self) -> str:
        return jsii.get(self, "readOnlyString")

    @builtins.property
    @jsii.member(jsii_name="readWriteString")
    def read_write_string(self) -> str:
        return jsii.get(self, "readWriteString")

    @read_write_string.setter
    def read_write_string(self, value: str) -> None:
        jsii.set(self, "readWriteString", value)


@jsii.interface(jsii_type="jsii-calc.IFriendlyRandomGenerator")
class IFriendlyRandomGenerator(
    IRandomNumberGenerator, scope.jsii_calc_lib.IFriendly, jsii.compat.Protocol
):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IFriendlyRandomGeneratorProxy

    pass


class _IFriendlyRandomGeneratorProxy(
    jsii.proxy_for(IRandomNumberGenerator),
    jsii.proxy_for(scope.jsii_calc_lib.IFriendly),
):
    __jsii_type__ = "jsii-calc.IFriendlyRandomGenerator"
    pass


@jsii.interface(jsii_type="jsii-calc.IInterfaceThatShouldNotBeADataType")
class IInterfaceThatShouldNotBeADataType(IInterfaceWithMethods, jsii.compat.Protocol):
    """Even though this interface has only properties, it is disqualified from being a datatype because it inherits from an interface that is not a datatype."""

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceThatShouldNotBeADataTypeProxy

    @builtins.property
    @jsii.member(jsii_name="otherValue")
    def other_value(self) -> str:
        ...


class _IInterfaceThatShouldNotBeADataTypeProxy(jsii.proxy_for(IInterfaceWithMethods)):
    """Even though this interface has only properties, it is disqualified from being a datatype because it inherits from an interface that is not a datatype."""

    __jsii_type__ = "jsii-calc.IInterfaceThatShouldNotBeADataType"

    @builtins.property
    @jsii.member(jsii_name="otherValue")
    def other_value(self) -> str:
        return jsii.get(self, "otherValue")


@jsii.interface(jsii_type="jsii-calc.IJSII417Derived")
class IJSII417Derived(IJSII417PublicBaseOfBase, jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IJSII417DerivedProxy

    @builtins.property
    @jsii.member(jsii_name="property")
    def property(self) -> str:
        ...

    @jsii.member(jsii_name="bar")
    def bar(self) -> None:
        ...

    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        ...


class _IJSII417DerivedProxy(jsii.proxy_for(IJSII417PublicBaseOfBase)):
    __jsii_type__ = "jsii-calc.IJSII417Derived"

    @builtins.property
    @jsii.member(jsii_name="property")
    def property(self) -> str:
        return jsii.get(self, "property")

    @jsii.member(jsii_name="bar")
    def bar(self) -> None:
        return jsii.invoke(self, "bar", [])

    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        return jsii.invoke(self, "baz", [])


@jsii.implements(IPublicInterface2)
class InbetweenClass(
    PublicClass, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.InbetweenClass"
):
    def __init__(self) -> None:
        jsii.create(InbetweenClass, self, [])

    @jsii.member(jsii_name="ciao")
    def ciao(self) -> str:
        return jsii.invoke(self, "ciao", [])


class JSII417Derived(
    JSII417PublicBaseOfBase,
    metaclass=jsii.JSIIMeta,
    jsii_type="jsii-calc.JSII417Derived",
):
    def __init__(self, property: str) -> None:
        """
        :param property: -
        """
        jsii.create(JSII417Derived, self, [property])

    @jsii.member(jsii_name="bar")
    def bar(self) -> None:
        return jsii.invoke(self, "bar", [])

    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        return jsii.invoke(self, "baz", [])

    @builtins.property
    @jsii.member(jsii_name="property")
    def _property(self) -> str:
        return jsii.get(self, "property")


@jsii.implements(IFriendlier)
class Negate(UnaryOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Negate"):
    """The negation operation ("-value")."""

    def __init__(self, operand: scope.jsii_calc_lib.Value) -> None:
        """
        :param operand: -
        """
        jsii.create(Negate, self, [operand])

    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        """Say farewell."""
        return jsii.invoke(self, "farewell", [])

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        """Say goodbye."""
        return jsii.invoke(self, "goodbye", [])

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        """Say hello!

        (deprecated)
        """
        return jsii.invoke(self, "hello", [])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value.

        (deprecated)
        """
        return jsii.invoke(self, "toString", [])

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The value.

        (deprecated)
        """
        return jsii.get(self, "value")


class SupportsNiceJavaBuilder(
    SupportsNiceJavaBuilderWithRequiredProps,
    metaclass=jsii.JSIIMeta,
    jsii_type="jsii-calc.SupportsNiceJavaBuilder",
):
    def __init__(
        self,
        id: jsii.Number,
        default_bar: typing.Optional[jsii.Number] = None,
        props: typing.Optional["SupportsNiceJavaBuilderProps"] = None,
        *rest: str,
    ) -> None:
        """
        :param id: some identifier.
        :param default_bar: the default value of ``bar``.
        :param props: some props once can provide.
        :param rest: a variadic continuation.
        """
        jsii.create(SupportsNiceJavaBuilder, self, [id, default_bar, props, *rest])

    @builtins.property
    @jsii.member(jsii_name="id")
    def id(self) -> jsii.Number:
        """some identifier."""
        return jsii.get(self, "id")

    @builtins.property
    @jsii.member(jsii_name="rest")
    def rest(self) -> typing.List[str]:
        return jsii.get(self, "rest")


@jsii.implements(IFriendlyRandomGenerator)
class DoubleTrouble(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DoubleTrouble"):
    def __init__(self) -> None:
        jsii.create(DoubleTrouble, self, [])

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        """Say hello!

        (deprecated)
        """
        return jsii.invoke(self, "hello", [])

    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        """Returns another random number."""
        return jsii.invoke(self, "next", [])


__all__ = [
    "AbstractClass",
    "AbstractClassBase",
    "AbstractClassReturner",
    "AbstractSuite",
    "Add",
    "AllTypes",
    "AllTypesEnum",
    "AllowedMethodNames",
    "AmbiguousParameters",
    "AnonymousImplementationProvider",
    "AsyncVirtualMethods",
    "AugmentableClass",
    "BaseJsii976",
    "Bell",
    "BinaryOperation",
    "Calculator",
    "CalculatorProps",
    "ChildStruct982",
    "ClassThatImplementsTheInternalInterface",
    "ClassThatImplementsThePrivateInterface",
    "ClassWithCollections",
    "ClassWithDocs",
    "ClassWithJavaReservedWords",
    "ClassWithMutableObjectLiteralProperty",
    "ClassWithPrivateConstructorAndAutomaticProperties",
    "ConfusingToJackson",
    "ConfusingToJacksonStruct",
    "ConstructorPassesThisOut",
    "Constructors",
    "ConsumePureInterface",
    "ConsumerCanRingBell",
    "ConsumersOfThisCrazyTypeSystem",
    "DataRenderer",
    "DefaultedConstructorArgument",
    "Demonstrate982",
    "DeprecatedClass",
    "DeprecatedEnum",
    "DeprecatedStruct",
    "DerivedStruct",
    "DiamondInheritanceBaseLevelStruct",
    "DiamondInheritanceFirstMidLevelStruct",
    "DiamondInheritanceSecondMidLevelStruct",
    "DiamondInheritanceTopLevelStruct",
    "DisappointingCollectionSource",
    "DoNotOverridePrivates",
    "DoNotRecognizeAnyAsOptional",
    "DocumentedClass",
    "DontComplainAboutVariadicAfterOptional",
    "DoubleTrouble",
    "EnumDispenser",
    "EraseUndefinedHashValues",
    "EraseUndefinedHashValuesOptions",
    "ExperimentalClass",
    "ExperimentalEnum",
    "ExperimentalStruct",
    "ExportedBaseClass",
    "ExtendsInternalInterface",
    "ExternalClass",
    "ExternalEnum",
    "ExternalStruct",
    "GiveMeStructs",
    "Greetee",
    "GreetingAugmenter",
    "IAnonymousImplementationProvider",
    "IAnonymouslyImplementMe",
    "IAnotherPublicInterface",
    "IBell",
    "IBellRinger",
    "IConcreteBellRinger",
    "IDeprecatedInterface",
    "IExperimentalInterface",
    "IExtendsPrivateInterface",
    "IExternalInterface",
    "IFriendlier",
    "IFriendlyRandomGenerator",
    "IInterfaceImplementedByAbstractClass",
    "IInterfaceThatShouldNotBeADataType",
    "IInterfaceWithInternal",
    "IInterfaceWithMethods",
    "IInterfaceWithOptionalMethodArguments",
    "IInterfaceWithProperties",
    "IInterfaceWithPropertiesExtension",
    "IJSII417Derived",
    "IJSII417PublicBaseOfBase",
    "IJsii487External",
    "IJsii487External2",
    "IJsii496",
    "IMutableObjectLiteral",
    "INonInternalInterface",
    "IObjectWithProperty",
    "IOptionalMethod",
    "IPrivatelyImplemented",
    "IPublicInterface",
    "IPublicInterface2",
    "IRandomNumberGenerator",
    "IReturnJsii976",
    "IReturnsNumber",
    "IStableInterface",
    "IStructReturningDelegate",
    "ImplementInternalInterface",
    "Implementation",
    "ImplementsInterfaceWithInternal",
    "ImplementsInterfaceWithInternalSubclass",
    "ImplementsPrivateInterface",
    "ImplictBaseOfBase",
    "InbetweenClass",
    "InterfaceCollections",
    "InterfacesMaker",
    "Isomorphism",
    "JSII417Derived",
    "JSII417PublicBaseOfBase",
    "JSObjectLiteralForInterface",
    "JSObjectLiteralToNative",
    "JSObjectLiteralToNativeClass",
    "JavaReservedWords",
    "Jsii487Derived",
    "Jsii496Derived",
    "JsiiAgent",
    "JsonFormatter",
    "LoadBalancedFargateServiceProps",
    "MethodNamedProperty",
    "Multiply",
    "Negate",
    "NestedStruct",
    "NodeStandardLibrary",
    "NullShouldBeTreatedAsUndefined",
    "NullShouldBeTreatedAsUndefinedData",
    "NumberGenerator",
    "ObjectRefsInCollections",
    "ObjectWithPropertyProvider",
    "Old",
    "OptionalArgumentInvoker",
    "OptionalConstructorArgument",
    "OptionalStruct",
    "OptionalStructConsumer",
    "OverridableProtectedMember",
    "OverrideReturnsObject",
    "ParentStruct982",
    "PartiallyInitializedThisConsumer",
    "Polymorphism",
    "Power",
    "PropertyNamedProperty",
    "PublicClass",
    "PythonReservedWords",
    "ReferenceEnumFromScopedPackage",
    "ReturnsPrivateImplementationOfInterface",
    "RootStruct",
    "RootStructValidator",
    "RuntimeTypeChecking",
    "SecondLevelStruct",
    "SingleInstanceTwoTypes",
    "SingletonInt",
    "SingletonIntEnum",
    "SingletonString",
    "SingletonStringEnum",
    "SmellyStruct",
    "SomeTypeJsii976",
    "StableClass",
    "StableEnum",
    "StableStruct",
    "StaticContext",
    "Statics",
    "StringEnum",
    "StripInternal",
    "StructA",
    "StructB",
    "StructParameterType",
    "StructPassing",
    "StructUnionConsumer",
    "StructWithJavaReservedWords",
    "Sum",
    "SupportsNiceJavaBuilder",
    "SupportsNiceJavaBuilderProps",
    "SupportsNiceJavaBuilderWithRequiredProps",
    "SyncVirtualMethods",
    "Thrower",
    "TopLevelStruct",
    "UmaskCheck",
    "UnaryOperation",
    "UnionProperties",
    "UpcasingReflectable",
    "UseBundledDependency",
    "UseCalcBase",
    "UsesInterfaceWithProperties",
    "VariadicInvoker",
    "VariadicMethod",
    "VirtualMethodPlayground",
    "VoidCallback",
    "WithPrivatePropertyInConstructor",
]

publication.publish()
