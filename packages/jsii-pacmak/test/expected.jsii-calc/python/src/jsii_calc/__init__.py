import abc
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from jsii.python import classproperty

import scope.jsii_calc_base
import scope.jsii_calc_base_of_base
import scope.jsii_calc_lib
__jsii_assembly__ = jsii.JSIIAssembly.load("jsii-calc", "0.11.1", __name__, "jsii-calc@0.11.1.jsii.tgz")
class AbstractClassBase(metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.AbstractClassBase"):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _AbstractClassBaseProxy

    def __init__(self) -> None:
        jsii.create(AbstractClassBase, self, [])

    @property
    @jsii.member(jsii_name="abstractProperty")
    @abc.abstractmethod
    def abstract_property(self) -> str:
        """
        Stability:
            experimental
        """
        ...


class _AbstractClassBaseProxy(AbstractClassBase):
    @property
    @jsii.member(jsii_name="abstractProperty")
    def abstract_property(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "abstractProperty")


class AbstractClassReturner(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AbstractClassReturner"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(AbstractClassReturner, self, [])

    @jsii.member(jsii_name="giveMeAbstract")
    def give_me_abstract(self) -> "AbstractClass":
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "giveMeAbstract", [])

    @jsii.member(jsii_name="giveMeInterface")
    def give_me_interface(self) -> "IInterfaceImplementedByAbstractClass":
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "giveMeInterface", [])

    @property
    @jsii.member(jsii_name="returnAbstractFromProperty")
    def return_abstract_from_property(self) -> "AbstractClassBase":
        """
        Stability:
            experimental
        """
        return jsii.get(self, "returnAbstractFromProperty")


class AllTypes(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AllTypes"):
    """This class includes property for all types supported by jsii.

    The setters will validate
    that the value set is of the expected type and throw otherwise.

    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(AllTypes, self, [])

    @jsii.member(jsii_name="anyIn")
    def any_in(self, inp: typing.Any) -> None:
        """
        Arguments:
            inp: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "anyIn", [inp])

    @jsii.member(jsii_name="anyOut")
    def any_out(self) -> typing.Any:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "anyOut", [])

    @jsii.member(jsii_name="enumMethod")
    def enum_method(self, value: "StringEnum") -> "StringEnum":
        """
        Arguments:
            value: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "enumMethod", [value])

    @property
    @jsii.member(jsii_name="enumPropertyValue")
    def enum_property_value(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "enumPropertyValue")

    @property
    @jsii.member(jsii_name="anyArrayProperty")
    def any_array_property(self) -> typing.List[typing.Any]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "anyArrayProperty")

    @any_array_property.setter
    def any_array_property(self, value: typing.List[typing.Any]):
        return jsii.set(self, "anyArrayProperty", value)

    @property
    @jsii.member(jsii_name="anyMapProperty")
    def any_map_property(self) -> typing.Mapping[str,typing.Any]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "anyMapProperty")

    @any_map_property.setter
    def any_map_property(self, value: typing.Mapping[str,typing.Any]):
        return jsii.set(self, "anyMapProperty", value)

    @property
    @jsii.member(jsii_name="anyProperty")
    def any_property(self) -> typing.Any:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "anyProperty")

    @any_property.setter
    def any_property(self, value: typing.Any):
        return jsii.set(self, "anyProperty", value)

    @property
    @jsii.member(jsii_name="arrayProperty")
    def array_property(self) -> typing.List[str]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "arrayProperty")

    @array_property.setter
    def array_property(self, value: typing.List[str]):
        return jsii.set(self, "arrayProperty", value)

    @property
    @jsii.member(jsii_name="booleanProperty")
    def boolean_property(self) -> bool:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "booleanProperty")

    @boolean_property.setter
    def boolean_property(self, value: bool):
        return jsii.set(self, "booleanProperty", value)

    @property
    @jsii.member(jsii_name="dateProperty")
    def date_property(self) -> datetime.datetime:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "dateProperty")

    @date_property.setter
    def date_property(self, value: datetime.datetime):
        return jsii.set(self, "dateProperty", value)

    @property
    @jsii.member(jsii_name="enumProperty")
    def enum_property(self) -> "AllTypesEnum":
        """
        Stability:
            experimental
        """
        return jsii.get(self, "enumProperty")

    @enum_property.setter
    def enum_property(self, value: "AllTypesEnum"):
        return jsii.set(self, "enumProperty", value)

    @property
    @jsii.member(jsii_name="jsonProperty")
    def json_property(self) -> typing.Mapping[typing.Any, typing.Any]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "jsonProperty")

    @json_property.setter
    def json_property(self, value: typing.Mapping[typing.Any, typing.Any]):
        return jsii.set(self, "jsonProperty", value)

    @property
    @jsii.member(jsii_name="mapProperty")
    def map_property(self) -> typing.Mapping[str,scope.jsii_calc_lib.Number]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "mapProperty")

    @map_property.setter
    def map_property(self, value: typing.Mapping[str,scope.jsii_calc_lib.Number]):
        return jsii.set(self, "mapProperty", value)

    @property
    @jsii.member(jsii_name="numberProperty")
    def number_property(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "numberProperty")

    @number_property.setter
    def number_property(self, value: jsii.Number):
        return jsii.set(self, "numberProperty", value)

    @property
    @jsii.member(jsii_name="stringProperty")
    def string_property(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "stringProperty")

    @string_property.setter
    def string_property(self, value: str):
        return jsii.set(self, "stringProperty", value)

    @property
    @jsii.member(jsii_name="unionArrayProperty")
    def union_array_property(self) -> typing.List[typing.Union[jsii.Number, scope.jsii_calc_lib.Value]]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "unionArrayProperty")

    @union_array_property.setter
    def union_array_property(self, value: typing.List[typing.Union[jsii.Number, scope.jsii_calc_lib.Value]]):
        return jsii.set(self, "unionArrayProperty", value)

    @property
    @jsii.member(jsii_name="unionMapProperty")
    def union_map_property(self) -> typing.Mapping[str,typing.Union[str, jsii.Number, scope.jsii_calc_lib.Number]]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "unionMapProperty")

    @union_map_property.setter
    def union_map_property(self, value: typing.Mapping[str,typing.Union[str, jsii.Number, scope.jsii_calc_lib.Number]]):
        return jsii.set(self, "unionMapProperty", value)

    @property
    @jsii.member(jsii_name="unionProperty")
    def union_property(self) -> typing.Union[str, jsii.Number, "Multiply", scope.jsii_calc_lib.Number]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "unionProperty")

    @union_property.setter
    def union_property(self, value: typing.Union[str, jsii.Number, "Multiply", scope.jsii_calc_lib.Number]):
        return jsii.set(self, "unionProperty", value)

    @property
    @jsii.member(jsii_name="unknownArrayProperty")
    def unknown_array_property(self) -> typing.List[typing.Any]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "unknownArrayProperty")

    @unknown_array_property.setter
    def unknown_array_property(self, value: typing.List[typing.Any]):
        return jsii.set(self, "unknownArrayProperty", value)

    @property
    @jsii.member(jsii_name="unknownMapProperty")
    def unknown_map_property(self) -> typing.Mapping[str,typing.Any]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "unknownMapProperty")

    @unknown_map_property.setter
    def unknown_map_property(self, value: typing.Mapping[str,typing.Any]):
        return jsii.set(self, "unknownMapProperty", value)

    @property
    @jsii.member(jsii_name="unknownProperty")
    def unknown_property(self) -> typing.Any:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "unknownProperty")

    @unknown_property.setter
    def unknown_property(self, value: typing.Any):
        return jsii.set(self, "unknownProperty", value)

    @property
    @jsii.member(jsii_name="optionalEnumValue")
    def optional_enum_value(self) -> typing.Optional["StringEnum"]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "optionalEnumValue")

    @optional_enum_value.setter
    def optional_enum_value(self, value: typing.Optional["StringEnum"]):
        return jsii.set(self, "optionalEnumValue", value)


@jsii.enum(jsii_type="jsii-calc.AllTypesEnum")
class AllTypesEnum(enum.Enum):
    """
    Stability:
        experimental
    """
    MyEnumValue = "MyEnumValue"
    """
    Stability:
        experimental
    """
    YourEnumValue = "YourEnumValue"
    """
    Stability:
        experimental
    """
    ThisIsGreat = "ThisIsGreat"
    """
    Stability:
        experimental
    """

class AllowedMethodNames(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AllowedMethodNames"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(AllowedMethodNames, self, [])

    @jsii.member(jsii_name="getBar")
    def get_bar(self, _p1: str, _p2: jsii.Number) -> None:
        """
        Arguments:
            _p1: -
            _p2: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "getBar", [_p1, _p2])

    @jsii.member(jsii_name="getFoo")
    def get_foo(self, with_param: str) -> str:
        """getXxx() is not allowed (see negatives), but getXxx(a, ...) is okay.

        Arguments:
            withParam: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "getFoo", [with_param])

    @jsii.member(jsii_name="setBar")
    def set_bar(self, _x: str, _y: jsii.Number, _z: bool) -> None:
        """
        Arguments:
            _x: -
            _y: -
            _z: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "setBar", [_x, _y, _z])

    @jsii.member(jsii_name="setFoo")
    def set_foo(self, _x: str, _y: jsii.Number) -> None:
        """setFoo(x) is not allowed (see negatives), but setXxx(a, b, ...) is okay.

        Arguments:
            _x: -
            _y: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "setFoo", [_x, _y])


class AsyncVirtualMethods(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AsyncVirtualMethods"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(AsyncVirtualMethods, self, [])

    @jsii.member(jsii_name="callMe")
    def call_me(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.ainvoke(self, "callMe", [])

    @jsii.member(jsii_name="callMe2")
    def call_me2(self) -> jsii.Number:
        """Just calls "overrideMeToo".

        Stability:
            experimental
        """
        return jsii.ainvoke(self, "callMe2", [])

    @jsii.member(jsii_name="callMeDoublePromise")
    def call_me_double_promise(self) -> jsii.Number:
        """This method calls the "callMe" async method indirectly, which will then invoke a virtual method.

        This is a "double promise" situation, which
        means that callbacks are not going to be available immediate, but only
        after an "immediates" cycle.

        Stability:
            experimental
        """
        return jsii.ainvoke(self, "callMeDoublePromise", [])

    @jsii.member(jsii_name="dontOverrideMe")
    def dont_override_me(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "dontOverrideMe", [])

    @jsii.member(jsii_name="overrideMe")
    def override_me(self, mult: jsii.Number) -> jsii.Number:
        """
        Arguments:
            mult: -

        Stability:
            experimental
        """
        return jsii.ainvoke(self, "overrideMe", [mult])

    @jsii.member(jsii_name="overrideMeToo")
    def override_me_too(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.ainvoke(self, "overrideMeToo", [])


class AugmentableClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AugmentableClass"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(AugmentableClass, self, [])

    @jsii.member(jsii_name="methodOne")
    def method_one(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "methodOne", [])

    @jsii.member(jsii_name="methodTwo")
    def method_two(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "methodTwo", [])


@jsii.implements(scope.jsii_calc_lib.IFriendly)
class BinaryOperation(scope.jsii_calc_lib.Operation, metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.BinaryOperation"):
    """Represents an operation with two operands.

    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _BinaryOperationProxy

    def __init__(self, lhs: scope.jsii_calc_lib.Value, rhs: scope.jsii_calc_lib.Value) -> None:
        """Creates a BinaryOperation.

        Arguments:
            lhs: Left-hand side operand.
            rhs: Right-hand side operand.

        Stability:
            experimental
        """
        jsii.create(BinaryOperation, self, [lhs, rhs])

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        """Say hello!

        Stability:
            experimental
        """
        return jsii.invoke(self, "hello", [])

    @property
    @jsii.member(jsii_name="lhs")
    def lhs(self) -> scope.jsii_calc_lib.Value:
        """Left-hand side operand.

        Stability:
            experimental
        """
        return jsii.get(self, "lhs")

    @property
    @jsii.member(jsii_name="rhs")
    def rhs(self) -> scope.jsii_calc_lib.Value:
        """Right-hand side operand.

        Stability:
            experimental
        """
        return jsii.get(self, "rhs")


class _BinaryOperationProxy(BinaryOperation, jsii.proxy_for(scope.jsii_calc_lib.Operation)):
    pass

class Add(BinaryOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Add"):
    """The "+" binary operation.

    Stability:
        experimental
    """
    def __init__(self, lhs: scope.jsii_calc_lib.Value, rhs: scope.jsii_calc_lib.Value) -> None:
        """Creates a BinaryOperation.

        Arguments:
            lhs: Left-hand side operand.
            rhs: Right-hand side operand.

        Stability:
            experimental
        """
        jsii.create(Add, self, [lhs, rhs])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value.

        Stability:
            experimental
        """
        return jsii.invoke(self, "toString", [])

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The value.

        Stability:
            experimental
        """
        return jsii.get(self, "value")


@jsii.data_type(jsii_type="jsii-calc.CalculatorProps", jsii_struct_bases=[])
class CalculatorProps(jsii.compat.TypedDict, total=False):
    """Properties for Calculator.

    Stability:
        experimental
    """
    initialValue: jsii.Number
    """
    Stability:
        experimental
    """

    maximumValue: jsii.Number
    """
    Stability:
        experimental
    """

class ClassWithDocs(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ClassWithDocs"):
    """This class has docs.

    The docs are great. They're a bunch of tags.

    See:
        https://aws.amazon.com/
    Stability:
        stable
    customAttribute:
        hasAValue

    Example::
        function anExample() {
        }
    """
    def __init__(self) -> None:
        jsii.create(ClassWithDocs, self, [])


class ClassWithMutableObjectLiteralProperty(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ClassWithMutableObjectLiteralProperty"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(ClassWithMutableObjectLiteralProperty, self, [])

    @property
    @jsii.member(jsii_name="mutableObject")
    def mutable_object(self) -> "IMutableObjectLiteral":
        """
        Stability:
            experimental
        """
        return jsii.get(self, "mutableObject")

    @mutable_object.setter
    def mutable_object(self, value: "IMutableObjectLiteral"):
        return jsii.set(self, "mutableObject", value)


class ConstructorPassesThisOut(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ConstructorPassesThisOut"):
    """
    Stability:
        experimental
    """
    def __init__(self, consumer: "PartiallyInitializedThisConsumer") -> None:
        """
        Arguments:
            consumer: -

        Stability:
            experimental
        """
        jsii.create(ConstructorPassesThisOut, self, [consumer])


class Constructors(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Constructors"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(Constructors, self, [])

    @jsii.member(jsii_name="hiddenInterface")
    @classmethod
    def hidden_interface(cls) -> "IPublicInterface":
        """
        Stability:
            experimental
        """
        return jsii.sinvoke(cls, "hiddenInterface", [])

    @jsii.member(jsii_name="hiddenInterfaces")
    @classmethod
    def hidden_interfaces(cls) -> typing.List["IPublicInterface"]:
        """
        Stability:
            experimental
        """
        return jsii.sinvoke(cls, "hiddenInterfaces", [])

    @jsii.member(jsii_name="hiddenSubInterfaces")
    @classmethod
    def hidden_sub_interfaces(cls) -> typing.List["IPublicInterface"]:
        """
        Stability:
            experimental
        """
        return jsii.sinvoke(cls, "hiddenSubInterfaces", [])

    @jsii.member(jsii_name="makeClass")
    @classmethod
    def make_class(cls) -> "PublicClass":
        """
        Stability:
            experimental
        """
        return jsii.sinvoke(cls, "makeClass", [])

    @jsii.member(jsii_name="makeInterface")
    @classmethod
    def make_interface(cls) -> "IPublicInterface":
        """
        Stability:
            experimental
        """
        return jsii.sinvoke(cls, "makeInterface", [])

    @jsii.member(jsii_name="makeInterface2")
    @classmethod
    def make_interface2(cls) -> "IPublicInterface2":
        """
        Stability:
            experimental
        """
        return jsii.sinvoke(cls, "makeInterface2", [])

    @jsii.member(jsii_name="makeInterfaces")
    @classmethod
    def make_interfaces(cls) -> typing.List["IPublicInterface"]:
        """
        Stability:
            experimental
        """
        return jsii.sinvoke(cls, "makeInterfaces", [])


class ConsumersOfThisCrazyTypeSystem(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ConsumersOfThisCrazyTypeSystem"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(ConsumersOfThisCrazyTypeSystem, self, [])

    @jsii.member(jsii_name="consumeAnotherPublicInterface")
    def consume_another_public_interface(self, obj: "IAnotherPublicInterface") -> str:
        """
        Arguments:
            obj: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "consumeAnotherPublicInterface", [obj])

    @jsii.member(jsii_name="consumeNonInternalInterface")
    def consume_non_internal_interface(self, obj: "INonInternalInterface") -> typing.Any:
        """
        Arguments:
            obj: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "consumeNonInternalInterface", [obj])


class DefaultedConstructorArgument(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DefaultedConstructorArgument"):
    """
    Stability:
        experimental
    """
    def __init__(self, arg1: typing.Optional[jsii.Number]=None, arg2: typing.Optional[str]=None, arg3: typing.Optional[datetime.datetime]=None) -> None:
        """
        Arguments:
            arg1: -
            arg2: -
            arg3: -

        Stability:
            experimental
        """
        jsii.create(DefaultedConstructorArgument, self, [arg1, arg2, arg3])

    @property
    @jsii.member(jsii_name="arg1")
    def arg1(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "arg1")

    @property
    @jsii.member(jsii_name="arg3")
    def arg3(self) -> datetime.datetime:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "arg3")

    @property
    @jsii.member(jsii_name="arg2")
    def arg2(self) -> typing.Optional[str]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "arg2")


class DeprecatedClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DeprecatedClass"):
    """
    Deprecated:
        a pretty boring class

    Stability:
        deprecated
    """
    def __init__(self, readonly_string: str, mutable_number: typing.Optional[jsii.Number]=None) -> None:
        """
        Arguments:
            readonlyString: -
            mutableNumber: -

        Deprecated:
            this constructor is "just" okay

        Stability:
            deprecated
        """
        jsii.create(DeprecatedClass, self, [readonly_string, mutable_number])

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        Deprecated:
            it was a bad idea

        Stability:
            deprecated
        """
        return jsii.invoke(self, "method", [])

    @property
    @jsii.member(jsii_name="readonlyProperty")
    def readonly_property(self) -> str:
        """
        Deprecated:
            this is not always "wazoo", be ready to be disappointed

        Stability:
            deprecated
        """
        return jsii.get(self, "readonlyProperty")

    @property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        Deprecated:
            shouldn't have been mutable

        Stability:
            deprecated
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        return jsii.set(self, "mutableProperty", value)


@jsii.enum(jsii_type="jsii-calc.DeprecatedEnum")
class DeprecatedEnum(enum.Enum):
    """
    Deprecated:
        your deprecated selection of bad options

    Stability:
        deprecated
    """
    OptionA = "OptionA"
    """
    Deprecated:
        option A is not great

    Stability:
        deprecated
    """
    OptionB = "OptionB"
    """
    Deprecated:
        option B is kinda bad, too

    Stability:
        deprecated
    """

@jsii.data_type(jsii_type="jsii-calc.DeprecatedStruct", jsii_struct_bases=[])
class DeprecatedStruct(jsii.compat.TypedDict):
    """
    Deprecated:
        it just wraps a string

    Stability:
        deprecated
    """
    readonlyProperty: str
    """
    Deprecated:
        well, yeah

    Stability:
        deprecated
    """

class DerivedClassHasNoProperties:
    class Base(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DerivedClassHasNoProperties.Base"):
        """
        Stability:
            experimental
        """
        def __init__(self) -> None:
            jsii.create(DerivedClassHasNoProperties.Base, self, [])

        @property
        @jsii.member(jsii_name="prop")
        def prop(self) -> str:
            """
            Stability:
                experimental
            """
            return jsii.get(self, "prop")

        @prop.setter
        def prop(self, value: str):
            return jsii.set(self, "prop", value)


    class Derived(Base, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DerivedClassHasNoProperties.Derived"):
        """
        Stability:
            experimental
        """
        def __init__(self) -> None:
            jsii.create(DerivedClassHasNoProperties.Derived, self, [])



@jsii.data_type_optionals(jsii_struct_bases=[scope.jsii_calc_lib.MyFirstStruct])
class _DerivedStruct(scope.jsii_calc_lib.MyFirstStruct, jsii.compat.TypedDict, total=False):
    anotherOptional: typing.Mapping[str,scope.jsii_calc_lib.Value]
    """This is optional.

    Stability:
        experimental
    """
    optionalAny: typing.Any
    """
    Stability:
        experimental
    """
    optionalArray: typing.List[str]
    """
    Stability:
        experimental
    """

@jsii.data_type(jsii_type="jsii-calc.DerivedStruct", jsii_struct_bases=[_DerivedStruct])
class DerivedStruct(_DerivedStruct):
    """A struct which derives from another struct.

    Stability:
        experimental
    """
    anotherRequired: datetime.datetime
    """
    Stability:
        experimental
    """

    bool: bool
    """
    Stability:
        experimental
    """

    nonPrimitive: "DoubleTrouble"
    """An example of a non primitive property.

    Stability:
        experimental
    """

class DoNotOverridePrivates(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DoNotOverridePrivates"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(DoNotOverridePrivates, self, [])

    @jsii.member(jsii_name="changePrivatePropertyValue")
    def change_private_property_value(self, new_value: str) -> None:
        """
        Arguments:
            newValue: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "changePrivatePropertyValue", [new_value])

    @jsii.member(jsii_name="privateMethodValue")
    def private_method_value(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "privateMethodValue", [])

    @jsii.member(jsii_name="privatePropertyValue")
    def private_property_value(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "privatePropertyValue", [])


class DoNotRecognizeAnyAsOptional(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DoNotRecognizeAnyAsOptional"):
    """jsii#284: do not recognize "any" as an optional argument.

    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(DoNotRecognizeAnyAsOptional, self, [])

    @jsii.member(jsii_name="method")
    def method(self, _required_any: typing.Any, _optional_any: typing.Any=None, _optional_string: typing.Optional[str]=None) -> None:
        """
        Arguments:
            _requiredAny: -
            _optionalAny: -
            _optionalString: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "method", [_required_any, _optional_any, _optional_string])


class DocumentedClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DocumentedClass"):
    """Here's the first line of the TSDoc comment.

    This is the meat of the TSDoc comment. It may contain
    multiple lines and multiple paragraphs.

    Multiple paragraphs are separated by an empty line.

    Stability:
        stable
    """
    def __init__(self) -> None:
        jsii.create(DocumentedClass, self, [])

    @jsii.member(jsii_name="greet")
    def greet(self, *, name: typing.Optional[str]=None) -> jsii.Number:
        """Greet the indicated person.

        This will print out a friendly greeting intended for
        the indicated person.

        Arguments:
            greetee: The person to be greeted.
            name: The name of the greetee. Default: world

        Returns:
            A number that everyone knows very well

        Stability:
            stable
        """
        greetee: Greetee = {}

        if name is not None:
            greetee["name"] = name

        return jsii.invoke(self, "greet", [greetee])

    @jsii.member(jsii_name="hola")
    def hola(self) -> None:
        """Say ¡Hola!

        Stability:
            experimental
        """
        return jsii.invoke(self, "hola", [])


class DontComplainAboutVariadicAfterOptional(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DontComplainAboutVariadicAfterOptional"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(DontComplainAboutVariadicAfterOptional, self, [])

    @jsii.member(jsii_name="optionalAndVariadic")
    def optional_and_variadic(self, optional: typing.Optional[str]=None, *things: str) -> str:
        """
        Arguments:
            optional: -
            things: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "optionalAndVariadic", [optional, *things])


class EraseUndefinedHashValues(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.EraseUndefinedHashValues"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(EraseUndefinedHashValues, self, [])

    @jsii.member(jsii_name="doesKeyExist")
    @classmethod
    def does_key_exist(cls, opts: "EraseUndefinedHashValuesOptions", key: str) -> bool:
        """Returns ``true`` if ``key`` is defined in ``opts``.

        Used to check that undefined/null hash values
        are being erased when sending values from native code to JS.

        Arguments:
            opts: -
            key: -

        Stability:
            experimental
        """
        return jsii.sinvoke(cls, "doesKeyExist", [opts, key])

    @jsii.member(jsii_name="prop1IsNull")
    @classmethod
    def prop1_is_null(cls) -> typing.Any:
        """We expect "prop1" to be erased.

        Stability:
            experimental
        """
        return jsii.sinvoke(cls, "prop1IsNull", [])

    @jsii.member(jsii_name="prop2IsUndefined")
    @classmethod
    def prop2_is_undefined(cls) -> typing.Any:
        """We expect "prop2" to be erased.

        Stability:
            experimental
        """
        return jsii.sinvoke(cls, "prop2IsUndefined", [])


@jsii.data_type(jsii_type="jsii-calc.EraseUndefinedHashValuesOptions", jsii_struct_bases=[])
class EraseUndefinedHashValuesOptions(jsii.compat.TypedDict, total=False):
    """
    Stability:
        experimental
    """
    option1: str
    """
    Stability:
        experimental
    """

    option2: str
    """
    Stability:
        experimental
    """

class ExperimentalClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ExperimentalClass"):
    """
    Stability:
        experimental
    """
    def __init__(self, readonly_string: str, mutable_number: typing.Optional[jsii.Number]=None) -> None:
        """
        Arguments:
            readonlyString: -
            mutableNumber: -

        Stability:
            experimental
        """
        jsii.create(ExperimentalClass, self, [readonly_string, mutable_number])

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "method", [])

    @property
    @jsii.member(jsii_name="readonlyProperty")
    def readonly_property(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "readonlyProperty")

    @property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        return jsii.set(self, "mutableProperty", value)


@jsii.enum(jsii_type="jsii-calc.ExperimentalEnum")
class ExperimentalEnum(enum.Enum):
    """
    Stability:
        experimental
    """
    OptionA = "OptionA"
    """
    Stability:
        experimental
    """
    OptionB = "OptionB"
    """
    Stability:
        experimental
    """

@jsii.data_type(jsii_type="jsii-calc.ExperimentalStruct", jsii_struct_bases=[])
class ExperimentalStruct(jsii.compat.TypedDict):
    """
    Stability:
        experimental
    """
    readonlyProperty: str
    """
    Stability:
        experimental
    """

class ExportedBaseClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ExportedBaseClass"):
    """
    Stability:
        experimental
    """
    def __init__(self, success: bool) -> None:
        """
        Arguments:
            success: -

        Stability:
            experimental
        """
        jsii.create(ExportedBaseClass, self, [success])

    @property
    @jsii.member(jsii_name="success")
    def success(self) -> bool:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "success")


@jsii.data_type(jsii_type="jsii-calc.ExtendsInternalInterface", jsii_struct_bases=[])
class ExtendsInternalInterface(jsii.compat.TypedDict):
    """
    Stability:
        experimental
    """
    boom: bool
    """
    Stability:
        experimental
    """

    prop: str
    """
    Stability:
        experimental
    """

class GiveMeStructs(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.GiveMeStructs"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(GiveMeStructs, self, [])

    @jsii.member(jsii_name="derivedToFirst")
    def derived_to_first(self, *, another_required: datetime.datetime, bool: bool, non_primitive: "DoubleTrouble", another_optional: typing.Optional[typing.Mapping[str,scope.jsii_calc_lib.Value]]=None, optional_any: typing.Any=None, optional_array: typing.Optional[typing.List[str]]=None, anumber: jsii.Number, astring: str, first_optional: typing.Optional[typing.List[str]]=None) -> scope.jsii_calc_lib.MyFirstStruct:
        """Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.

        Arguments:
            derived: -
            anotherRequired: 
            bool: 
            nonPrimitive: An example of a non primitive property.
            anotherOptional: This is optional.
            optionalAny: 
            optionalArray: 
            anumber: An awesome number value.
            astring: A string value.
            firstOptional: 

        Stability:
            experimental
        """
        derived: DerivedStruct = {"anotherRequired": another_required, "bool": bool, "nonPrimitive": non_primitive, "anumber": anumber, "astring": astring}

        if another_optional is not None:
            derived["anotherOptional"] = another_optional

        if optional_any is not None:
            derived["optionalAny"] = optional_any

        if optional_array is not None:
            derived["optionalArray"] = optional_array

        if first_optional is not None:
            derived["firstOptional"] = first_optional

        return jsii.invoke(self, "derivedToFirst", [derived])

    @jsii.member(jsii_name="readDerivedNonPrimitive")
    def read_derived_non_primitive(self, *, another_required: datetime.datetime, bool: bool, non_primitive: "DoubleTrouble", another_optional: typing.Optional[typing.Mapping[str,scope.jsii_calc_lib.Value]]=None, optional_any: typing.Any=None, optional_array: typing.Optional[typing.List[str]]=None, anumber: jsii.Number, astring: str, first_optional: typing.Optional[typing.List[str]]=None) -> "DoubleTrouble":
        """Returns the boolean from a DerivedStruct struct.

        Arguments:
            derived: -
            anotherRequired: 
            bool: 
            nonPrimitive: An example of a non primitive property.
            anotherOptional: This is optional.
            optionalAny: 
            optionalArray: 
            anumber: An awesome number value.
            astring: A string value.
            firstOptional: 

        Stability:
            experimental
        """
        derived: DerivedStruct = {"anotherRequired": another_required, "bool": bool, "nonPrimitive": non_primitive, "anumber": anumber, "astring": astring}

        if another_optional is not None:
            derived["anotherOptional"] = another_optional

        if optional_any is not None:
            derived["optionalAny"] = optional_any

        if optional_array is not None:
            derived["optionalArray"] = optional_array

        if first_optional is not None:
            derived["firstOptional"] = first_optional

        return jsii.invoke(self, "readDerivedNonPrimitive", [derived])

    @jsii.member(jsii_name="readFirstNumber")
    def read_first_number(self, *, anumber: jsii.Number, astring: str, first_optional: typing.Optional[typing.List[str]]=None) -> jsii.Number:
        """Returns the "anumber" from a MyFirstStruct struct;

        Arguments:
            first: -
            anumber: An awesome number value.
            astring: A string value.
            firstOptional: 

        Stability:
            experimental
        """
        first: scope.jsii_calc_lib.MyFirstStruct = {"anumber": anumber, "astring": astring}

        if first_optional is not None:
            first["firstOptional"] = first_optional

        return jsii.invoke(self, "readFirstNumber", [first])

    @property
    @jsii.member(jsii_name="structLiteral")
    def struct_literal(self) -> scope.jsii_calc_lib.StructWithOnlyOptionals:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "structLiteral")


@jsii.data_type(jsii_type="jsii-calc.Greetee", jsii_struct_bases=[])
class Greetee(jsii.compat.TypedDict, total=False):
    """These are some arguments you can pass to a method.

    Stability:
        experimental
    """
    name: str
    """The name of the greetee.

    Default:
        world

    Stability:
        experimental
    """

class GreetingAugmenter(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.GreetingAugmenter"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(GreetingAugmenter, self, [])

    @jsii.member(jsii_name="betterGreeting")
    def better_greeting(self, friendly: scope.jsii_calc_lib.IFriendly) -> str:
        """
        Arguments:
            friendly: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "betterGreeting", [friendly])


@jsii.interface(jsii_type="jsii-calc.IAnotherPublicInterface")
class IAnotherPublicInterface(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IAnotherPublicInterfaceProxy

    @property
    @jsii.member(jsii_name="a")
    def a(self) -> str:
        """
        Stability:
            experimental
        """
        ...

    @a.setter
    def a(self, value: str):
        ...


class _IAnotherPublicInterfaceProxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IAnotherPublicInterface"
    @property
    @jsii.member(jsii_name="a")
    def a(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "a")

    @a.setter
    def a(self, value: str):
        return jsii.set(self, "a", value)


@jsii.interface(jsii_type="jsii-calc.IDeprecatedInterface")
class IDeprecatedInterface(jsii.compat.Protocol):
    """
    Deprecated:
        useless interface

    Stability:
        deprecated
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IDeprecatedInterfaceProxy

    @property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        Deprecated:
            could be better

        Stability:
            deprecated
        """
        ...

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        ...

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        Deprecated:
            services no purpose

        Stability:
            deprecated
        """
        ...


class _IDeprecatedInterfaceProxy():
    """
    Deprecated:
        useless interface

    Stability:
        deprecated
    """
    __jsii_type__ = "jsii-calc.IDeprecatedInterface"
    @property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        Deprecated:
            could be better

        Stability:
            deprecated
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        return jsii.set(self, "mutableProperty", value)

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        Deprecated:
            services no purpose

        Stability:
            deprecated
        """
        return jsii.invoke(self, "method", [])


@jsii.interface(jsii_type="jsii-calc.IExperimentalInterface")
class IExperimentalInterface(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IExperimentalInterfaceProxy

    @property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        Stability:
            experimental
        """
        ...

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        ...

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        Stability:
            experimental
        """
        ...


class _IExperimentalInterfaceProxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IExperimentalInterface"
    @property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        return jsii.set(self, "mutableProperty", value)

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "method", [])


@jsii.interface(jsii_type="jsii-calc.IExtendsPrivateInterface")
class IExtendsPrivateInterface(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IExtendsPrivateInterfaceProxy

    @property
    @jsii.member(jsii_name="moreThings")
    def more_things(self) -> typing.List[str]:
        """
        Stability:
            experimental
        """
        ...

    @property
    @jsii.member(jsii_name="private")
    def private(self) -> str:
        """
        Stability:
            experimental
        """
        ...

    @private.setter
    def private(self, value: str):
        ...


class _IExtendsPrivateInterfaceProxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IExtendsPrivateInterface"
    @property
    @jsii.member(jsii_name="moreThings")
    def more_things(self) -> typing.List[str]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "moreThings")

    @property
    @jsii.member(jsii_name="private")
    def private(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "private")

    @private.setter
    def private(self, value: str):
        return jsii.set(self, "private", value)


@jsii.interface(jsii_type="jsii-calc.IFriendlier")
class IFriendlier(scope.jsii_calc_lib.IFriendly, jsii.compat.Protocol):
    """Even friendlier classes can implement this interface.

    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IFriendlierProxy

    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        """Say farewell.

        Stability:
            experimental
        """
        ...

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        """Say goodbye.

        Returns:
            A goodbye blessing.

        Stability:
            experimental
        """
        ...


class _IFriendlierProxy(jsii.proxy_for(scope.jsii_calc_lib.IFriendly)):
    """Even friendlier classes can implement this interface.

    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IFriendlier"
    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        """Say farewell.

        Stability:
            experimental
        """
        return jsii.invoke(self, "farewell", [])

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        """Say goodbye.

        Returns:
            A goodbye blessing.

        Stability:
            experimental
        """
        return jsii.invoke(self, "goodbye", [])


@jsii.interface(jsii_type="jsii-calc.IInterfaceImplementedByAbstractClass")
class IInterfaceImplementedByAbstractClass(jsii.compat.Protocol):
    """awslabs/jsii#220 Abstract return type.

    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceImplementedByAbstractClassProxy

    @property
    @jsii.member(jsii_name="propFromInterface")
    def prop_from_interface(self) -> str:
        """
        Stability:
            experimental
        """
        ...


class _IInterfaceImplementedByAbstractClassProxy():
    """awslabs/jsii#220 Abstract return type.

    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IInterfaceImplementedByAbstractClass"
    @property
    @jsii.member(jsii_name="propFromInterface")
    def prop_from_interface(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "propFromInterface")


@jsii.implements(IInterfaceImplementedByAbstractClass)
class AbstractClass(AbstractClassBase, metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.AbstractClass"):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _AbstractClassProxy

    def __init__(self) -> None:
        jsii.create(AbstractClass, self, [])

    @jsii.member(jsii_name="abstractMethod")
    @abc.abstractmethod
    def abstract_method(self, name: str) -> str:
        """
        Arguments:
            name: -

        Stability:
            experimental
        """
        ...

    @jsii.member(jsii_name="nonAbstractMethod")
    def non_abstract_method(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "nonAbstractMethod", [])

    @property
    @jsii.member(jsii_name="propFromInterface")
    def prop_from_interface(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "propFromInterface")


class _AbstractClassProxy(AbstractClass, jsii.proxy_for(AbstractClassBase)):
    @jsii.member(jsii_name="abstractMethod")
    def abstract_method(self, name: str) -> str:
        """
        Arguments:
            name: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "abstractMethod", [name])


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithInternal")
class IInterfaceWithInternal(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithInternalProxy

    @jsii.member(jsii_name="visible")
    def visible(self) -> None:
        """
        Stability:
            experimental
        """
        ...


class _IInterfaceWithInternalProxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IInterfaceWithInternal"
    @jsii.member(jsii_name="visible")
    def visible(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "visible", [])


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithMethods")
class IInterfaceWithMethods(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithMethodsProxy

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> str:
        """
        Stability:
            experimental
        """
        ...

    @jsii.member(jsii_name="doThings")
    def do_things(self) -> None:
        """
        Stability:
            experimental
        """
        ...


class _IInterfaceWithMethodsProxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IInterfaceWithMethods"
    @property
    @jsii.member(jsii_name="value")
    def value(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "value")

    @jsii.member(jsii_name="doThings")
    def do_things(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "doThings", [])


@jsii.interface(jsii_type="jsii-calc.IInterfaceThatShouldNotBeADataType")
class IInterfaceThatShouldNotBeADataType(IInterfaceWithMethods, jsii.compat.Protocol):
    """Even though this interface has only properties, it is disqualified from being a datatype because it inherits from an interface that is not a datatype.

    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceThatShouldNotBeADataTypeProxy

    @property
    @jsii.member(jsii_name="otherValue")
    def other_value(self) -> str:
        """
        Stability:
            experimental
        """
        ...


class _IInterfaceThatShouldNotBeADataTypeProxy(jsii.proxy_for(IInterfaceWithMethods)):
    """Even though this interface has only properties, it is disqualified from being a datatype because it inherits from an interface that is not a datatype.

    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IInterfaceThatShouldNotBeADataType"
    @property
    @jsii.member(jsii_name="otherValue")
    def other_value(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "otherValue")


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithOptionalMethodArguments")
class IInterfaceWithOptionalMethodArguments(jsii.compat.Protocol):
    """awslabs/jsii#175 Interface proxies (and builders) do not respect optional arguments in methods.

    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithOptionalMethodArgumentsProxy

    @jsii.member(jsii_name="hello")
    def hello(self, arg1: str, arg2: typing.Optional[jsii.Number]=None) -> None:
        """
        Arguments:
            arg1: -
            arg2: -

        Stability:
            experimental
        """
        ...


class _IInterfaceWithOptionalMethodArgumentsProxy():
    """awslabs/jsii#175 Interface proxies (and builders) do not respect optional arguments in methods.

    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IInterfaceWithOptionalMethodArguments"
    @jsii.member(jsii_name="hello")
    def hello(self, arg1: str, arg2: typing.Optional[jsii.Number]=None) -> None:
        """
        Arguments:
            arg1: -
            arg2: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "hello", [arg1, arg2])


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithProperties")
class IInterfaceWithProperties(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithPropertiesProxy

    @property
    @jsii.member(jsii_name="readOnlyString")
    def read_only_string(self) -> str:
        """
        Stability:
            experimental
        """
        ...

    @property
    @jsii.member(jsii_name="readWriteString")
    def read_write_string(self) -> str:
        """
        Stability:
            experimental
        """
        ...

    @read_write_string.setter
    def read_write_string(self, value: str):
        ...


class _IInterfaceWithPropertiesProxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IInterfaceWithProperties"
    @property
    @jsii.member(jsii_name="readOnlyString")
    def read_only_string(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "readOnlyString")

    @property
    @jsii.member(jsii_name="readWriteString")
    def read_write_string(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "readWriteString")

    @read_write_string.setter
    def read_write_string(self, value: str):
        return jsii.set(self, "readWriteString", value)


@jsii.implements(IInterfaceWithProperties)
class ClassWithPrivateConstructorAndAutomaticProperties(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties"):
    """Class that implements interface properties automatically, but using a private constructor.

    Stability:
        experimental
    """
    @jsii.member(jsii_name="create")
    @classmethod
    def create(cls, read_only_string: str, read_write_string: str) -> "ClassWithPrivateConstructorAndAutomaticProperties":
        """
        Arguments:
            readOnlyString: -
            readWriteString: -

        Stability:
            experimental
        """
        return jsii.sinvoke(cls, "create", [read_only_string, read_write_string])

    @property
    @jsii.member(jsii_name="readOnlyString")
    def read_only_string(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "readOnlyString")

    @property
    @jsii.member(jsii_name="readWriteString")
    def read_write_string(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "readWriteString")

    @read_write_string.setter
    def read_write_string(self, value: str):
        return jsii.set(self, "readWriteString", value)


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithPropertiesExtension")
class IInterfaceWithPropertiesExtension(IInterfaceWithProperties, jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithPropertiesExtensionProxy

    @property
    @jsii.member(jsii_name="foo")
    def foo(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        ...

    @foo.setter
    def foo(self, value: jsii.Number):
        ...


class _IInterfaceWithPropertiesExtensionProxy(jsii.proxy_for(IInterfaceWithProperties)):
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IInterfaceWithPropertiesExtension"
    @property
    @jsii.member(jsii_name="foo")
    def foo(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "foo")

    @foo.setter
    def foo(self, value: jsii.Number):
        return jsii.set(self, "foo", value)


@jsii.interface(jsii_type="jsii-calc.IJSII417PublicBaseOfBase")
class IJSII417PublicBaseOfBase(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IJSII417PublicBaseOfBaseProxy

    @property
    @jsii.member(jsii_name="hasRoot")
    def has_root(self) -> bool:
        """
        Stability:
            experimental
        """
        ...

    @jsii.member(jsii_name="foo")
    def foo(self) -> None:
        """
        Stability:
            experimental
        """
        ...


class _IJSII417PublicBaseOfBaseProxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IJSII417PublicBaseOfBase"
    @property
    @jsii.member(jsii_name="hasRoot")
    def has_root(self) -> bool:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "hasRoot")

    @jsii.member(jsii_name="foo")
    def foo(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "foo", [])


@jsii.interface(jsii_type="jsii-calc.IJSII417Derived")
class IJSII417Derived(IJSII417PublicBaseOfBase, jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IJSII417DerivedProxy

    @property
    @jsii.member(jsii_name="property")
    def property(self) -> str:
        """
        Stability:
            experimental
        """
        ...

    @jsii.member(jsii_name="bar")
    def bar(self) -> None:
        """
        Stability:
            experimental
        """
        ...

    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        """
        Stability:
            experimental
        """
        ...


class _IJSII417DerivedProxy(jsii.proxy_for(IJSII417PublicBaseOfBase)):
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IJSII417Derived"
    @property
    @jsii.member(jsii_name="property")
    def property(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "property")

    @jsii.member(jsii_name="bar")
    def bar(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "bar", [])

    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "baz", [])


@jsii.interface(jsii_type="jsii-calc.IJsii487External")
class IJsii487External(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IJsii487ExternalProxy

    pass

class _IJsii487ExternalProxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IJsii487External"
    pass

@jsii.interface(jsii_type="jsii-calc.IJsii487External2")
class IJsii487External2(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IJsii487External2Proxy

    pass

class _IJsii487External2Proxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IJsii487External2"
    pass

@jsii.interface(jsii_type="jsii-calc.IJsii496")
class IJsii496(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IJsii496Proxy

    pass

class _IJsii496Proxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IJsii496"
    pass

@jsii.interface(jsii_type="jsii-calc.IMutableObjectLiteral")
class IMutableObjectLiteral(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IMutableObjectLiteralProxy

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> str:
        """
        Stability:
            experimental
        """
        ...

    @value.setter
    def value(self, value: str):
        ...


class _IMutableObjectLiteralProxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IMutableObjectLiteral"
    @property
    @jsii.member(jsii_name="value")
    def value(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "value")

    @value.setter
    def value(self, value: str):
        return jsii.set(self, "value", value)


@jsii.interface(jsii_type="jsii-calc.INonInternalInterface")
class INonInternalInterface(IAnotherPublicInterface, jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _INonInternalInterfaceProxy

    @property
    @jsii.member(jsii_name="b")
    def b(self) -> str:
        """
        Stability:
            experimental
        """
        ...

    @b.setter
    def b(self, value: str):
        ...

    @property
    @jsii.member(jsii_name="c")
    def c(self) -> str:
        """
        Stability:
            experimental
        """
        ...

    @c.setter
    def c(self, value: str):
        ...


class _INonInternalInterfaceProxy(jsii.proxy_for(IAnotherPublicInterface)):
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.INonInternalInterface"
    @property
    @jsii.member(jsii_name="b")
    def b(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "b")

    @b.setter
    def b(self, value: str):
        return jsii.set(self, "b", value)

    @property
    @jsii.member(jsii_name="c")
    def c(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "c")

    @c.setter
    def c(self, value: str):
        return jsii.set(self, "c", value)


@jsii.implements(INonInternalInterface)
class ClassThatImplementsTheInternalInterface(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ClassThatImplementsTheInternalInterface"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(ClassThatImplementsTheInternalInterface, self, [])

    @property
    @jsii.member(jsii_name="a")
    def a(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "a")

    @a.setter
    def a(self, value: str):
        return jsii.set(self, "a", value)

    @property
    @jsii.member(jsii_name="b")
    def b(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "b")

    @b.setter
    def b(self, value: str):
        return jsii.set(self, "b", value)

    @property
    @jsii.member(jsii_name="c")
    def c(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "c")

    @c.setter
    def c(self, value: str):
        return jsii.set(self, "c", value)

    @property
    @jsii.member(jsii_name="d")
    def d(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "d")

    @d.setter
    def d(self, value: str):
        return jsii.set(self, "d", value)


@jsii.implements(INonInternalInterface)
class ClassThatImplementsThePrivateInterface(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ClassThatImplementsThePrivateInterface"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(ClassThatImplementsThePrivateInterface, self, [])

    @property
    @jsii.member(jsii_name="a")
    def a(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "a")

    @a.setter
    def a(self, value: str):
        return jsii.set(self, "a", value)

    @property
    @jsii.member(jsii_name="b")
    def b(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "b")

    @b.setter
    def b(self, value: str):
        return jsii.set(self, "b", value)

    @property
    @jsii.member(jsii_name="c")
    def c(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "c")

    @c.setter
    def c(self, value: str):
        return jsii.set(self, "c", value)

    @property
    @jsii.member(jsii_name="e")
    def e(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "e")

    @e.setter
    def e(self, value: str):
        return jsii.set(self, "e", value)


@jsii.interface(jsii_type="jsii-calc.IPrivatelyImplemented")
class IPrivatelyImplemented(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IPrivatelyImplementedProxy

    @property
    @jsii.member(jsii_name="success")
    def success(self) -> bool:
        """
        Stability:
            experimental
        """
        ...


class _IPrivatelyImplementedProxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IPrivatelyImplemented"
    @property
    @jsii.member(jsii_name="success")
    def success(self) -> bool:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "success")


@jsii.interface(jsii_type="jsii-calc.IPublicInterface")
class IPublicInterface(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IPublicInterfaceProxy

    @jsii.member(jsii_name="bye")
    def bye(self) -> str:
        """
        Stability:
            experimental
        """
        ...


class _IPublicInterfaceProxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IPublicInterface"
    @jsii.member(jsii_name="bye")
    def bye(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "bye", [])


@jsii.interface(jsii_type="jsii-calc.IPublicInterface2")
class IPublicInterface2(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IPublicInterface2Proxy

    @jsii.member(jsii_name="ciao")
    def ciao(self) -> str:
        """
        Stability:
            experimental
        """
        ...


class _IPublicInterface2Proxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IPublicInterface2"
    @jsii.member(jsii_name="ciao")
    def ciao(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "ciao", [])


@jsii.interface(jsii_type="jsii-calc.IRandomNumberGenerator")
class IRandomNumberGenerator(jsii.compat.Protocol):
    """Generates random numbers.

    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IRandomNumberGeneratorProxy

    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        """Returns another random number.

        Returns:
            A random number.

        Stability:
            experimental
        """
        ...


class _IRandomNumberGeneratorProxy():
    """Generates random numbers.

    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IRandomNumberGenerator"
    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        """Returns another random number.

        Returns:
            A random number.

        Stability:
            experimental
        """
        return jsii.invoke(self, "next", [])


@jsii.interface(jsii_type="jsii-calc.IFriendlyRandomGenerator")
class IFriendlyRandomGenerator(IRandomNumberGenerator, scope.jsii_calc_lib.IFriendly, jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IFriendlyRandomGeneratorProxy

    pass

class _IFriendlyRandomGeneratorProxy(jsii.proxy_for(IRandomNumberGenerator), jsii.proxy_for(scope.jsii_calc_lib.IFriendly)):
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IFriendlyRandomGenerator"
    pass

@jsii.implements(IFriendlyRandomGenerator)
class DoubleTrouble(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DoubleTrouble"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(DoubleTrouble, self, [])

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        """Say hello!

        Stability:
            experimental
        """
        return jsii.invoke(self, "hello", [])

    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        """Returns another random number.

        Stability:
            experimental
        """
        return jsii.invoke(self, "next", [])


@jsii.interface(jsii_type="jsii-calc.IReturnsNumber")
class IReturnsNumber(jsii.compat.Protocol):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IReturnsNumberProxy

    @property
    @jsii.member(jsii_name="numberProp")
    def number_prop(self) -> scope.jsii_calc_lib.Number:
        """
        Stability:
            experimental
        """
        ...

    @jsii.member(jsii_name="obtainNumber")
    def obtain_number(self) -> scope.jsii_calc_lib.IDoublable:
        """
        Stability:
            experimental
        """
        ...


class _IReturnsNumberProxy():
    """
    Stability:
        experimental
    """
    __jsii_type__ = "jsii-calc.IReturnsNumber"
    @property
    @jsii.member(jsii_name="numberProp")
    def number_prop(self) -> scope.jsii_calc_lib.Number:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "numberProp")

    @jsii.member(jsii_name="obtainNumber")
    def obtain_number(self) -> scope.jsii_calc_lib.IDoublable:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "obtainNumber", [])


@jsii.interface(jsii_type="jsii-calc.IStableInterface")
class IStableInterface(jsii.compat.Protocol):
    """
    Stability:
        stable
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _IStableInterfaceProxy

    @property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        Stability:
            stable
        """
        ...

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        ...

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        Stability:
            stable
        """
        ...


class _IStableInterfaceProxy():
    """
    Stability:
        stable
    """
    __jsii_type__ = "jsii-calc.IStableInterface"
    @property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        Stability:
            stable
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        return jsii.set(self, "mutableProperty", value)

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        Stability:
            stable
        """
        return jsii.invoke(self, "method", [])


class ImplementInternalInterface(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ImplementInternalInterface"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(ImplementInternalInterface, self, [])

    @property
    @jsii.member(jsii_name="prop")
    def prop(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "prop")

    @prop.setter
    def prop(self, value: str):
        return jsii.set(self, "prop", value)


@jsii.implements(IInterfaceWithInternal)
class ImplementsInterfaceWithInternal(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ImplementsInterfaceWithInternal"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(ImplementsInterfaceWithInternal, self, [])

    @jsii.member(jsii_name="visible")
    def visible(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "visible", [])


class ImplementsInterfaceWithInternalSubclass(ImplementsInterfaceWithInternal, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ImplementsInterfaceWithInternalSubclass"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(ImplementsInterfaceWithInternalSubclass, self, [])


class ImplementsPrivateInterface(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ImplementsPrivateInterface"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(ImplementsPrivateInterface, self, [])

    @property
    @jsii.member(jsii_name="private")
    def private(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "private")

    @private.setter
    def private(self, value: str):
        return jsii.set(self, "private", value)


@jsii.data_type(jsii_type="jsii-calc.ImplictBaseOfBase", jsii_struct_bases=[scope.jsii_calc_base.BaseProps])
class ImplictBaseOfBase(scope.jsii_calc_base.BaseProps, jsii.compat.TypedDict):
    """
    Stability:
        experimental
    """
    goo: datetime.datetime
    """
    Stability:
        experimental
    """

class InterfaceInNamespaceIncludesClasses:
    class Foo(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.InterfaceInNamespaceIncludesClasses.Foo"):
        """
        Stability:
            experimental
        """
        def __init__(self) -> None:
            jsii.create(InterfaceInNamespaceIncludesClasses.Foo, self, [])

        @property
        @jsii.member(jsii_name="bar")
        def bar(self) -> typing.Optional[str]:
            """
            Stability:
                experimental
            """
            return jsii.get(self, "bar")

        @bar.setter
        def bar(self, value: typing.Optional[str]):
            return jsii.set(self, "bar", value)


    @jsii.data_type(jsii_type="jsii-calc.InterfaceInNamespaceIncludesClasses.Hello", jsii_struct_bases=[])
    class Hello(jsii.compat.TypedDict):
        """
        Stability:
            experimental
        """
        foo: jsii.Number
        """
        Stability:
            experimental
        """


class InterfaceInNamespaceOnlyInterface:
    @jsii.data_type(jsii_type="jsii-calc.InterfaceInNamespaceOnlyInterface.Hello", jsii_struct_bases=[])
    class Hello(jsii.compat.TypedDict):
        """
        Stability:
            experimental
        """
        foo: jsii.Number
        """
        Stability:
            experimental
        """


class JSII417PublicBaseOfBase(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JSII417PublicBaseOfBase"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(JSII417PublicBaseOfBase, self, [])

    @jsii.member(jsii_name="makeInstance")
    @classmethod
    def make_instance(cls) -> "JSII417PublicBaseOfBase":
        """
        Stability:
            experimental
        """
        return jsii.sinvoke(cls, "makeInstance", [])

    @jsii.member(jsii_name="foo")
    def foo(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "foo", [])

    @property
    @jsii.member(jsii_name="hasRoot")
    def has_root(self) -> bool:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "hasRoot")


class JSII417Derived(JSII417PublicBaseOfBase, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JSII417Derived"):
    """
    Stability:
        experimental
    """
    def __init__(self, property: str) -> None:
        """
        Arguments:
            property: -

        Stability:
            experimental
        """
        jsii.create(JSII417Derived, self, [property])

    @jsii.member(jsii_name="bar")
    def bar(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "bar", [])

    @jsii.member(jsii_name="baz")
    def baz(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "baz", [])

    @property
    @jsii.member(jsii_name="property")
    def _property(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "property")


class JSObjectLiteralForInterface(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JSObjectLiteralForInterface"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(JSObjectLiteralForInterface, self, [])

    @jsii.member(jsii_name="giveMeFriendly")
    def give_me_friendly(self) -> scope.jsii_calc_lib.IFriendly:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "giveMeFriendly", [])

    @jsii.member(jsii_name="giveMeFriendlyGenerator")
    def give_me_friendly_generator(self) -> "IFriendlyRandomGenerator":
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "giveMeFriendlyGenerator", [])


class JSObjectLiteralToNative(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JSObjectLiteralToNative"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(JSObjectLiteralToNative, self, [])

    @jsii.member(jsii_name="returnLiteral")
    def return_literal(self) -> "JSObjectLiteralToNativeClass":
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "returnLiteral", [])


class JSObjectLiteralToNativeClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JSObjectLiteralToNativeClass"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(JSObjectLiteralToNativeClass, self, [])

    @property
    @jsii.member(jsii_name="propA")
    def prop_a(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "propA")

    @prop_a.setter
    def prop_a(self, value: str):
        return jsii.set(self, "propA", value)

    @property
    @jsii.member(jsii_name="propB")
    def prop_b(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "propB")

    @prop_b.setter
    def prop_b(self, value: jsii.Number):
        return jsii.set(self, "propB", value)


class JavaReservedWords(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JavaReservedWords"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(JavaReservedWords, self, [])

    @jsii.member(jsii_name="abstract")
    def abstract(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "abstract", [])

    @jsii.member(jsii_name="assert")
    def assert_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "assert", [])

    @jsii.member(jsii_name="boolean")
    def boolean(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "boolean", [])

    @jsii.member(jsii_name="break")
    def break_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "break", [])

    @jsii.member(jsii_name="byte")
    def byte(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "byte", [])

    @jsii.member(jsii_name="case")
    def case(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "case", [])

    @jsii.member(jsii_name="catch")
    def catch(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "catch", [])

    @jsii.member(jsii_name="char")
    def char(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "char", [])

    @jsii.member(jsii_name="class")
    def class_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "class", [])

    @jsii.member(jsii_name="const")
    def const(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "const", [])

    @jsii.member(jsii_name="continue")
    def continue_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "continue", [])

    @jsii.member(jsii_name="default")
    def default(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "default", [])

    @jsii.member(jsii_name="do")
    def do(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "do", [])

    @jsii.member(jsii_name="double")
    def double(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "double", [])

    @jsii.member(jsii_name="else")
    def else_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "else", [])

    @jsii.member(jsii_name="enum")
    def enum(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "enum", [])

    @jsii.member(jsii_name="extends")
    def extends(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "extends", [])

    @jsii.member(jsii_name="false")
    def false(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "false", [])

    @jsii.member(jsii_name="final")
    def final(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "final", [])

    @jsii.member(jsii_name="finally")
    def finally_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "finally", [])

    @jsii.member(jsii_name="float")
    def float(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "float", [])

    @jsii.member(jsii_name="for")
    def for_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "for", [])

    @jsii.member(jsii_name="goto")
    def goto(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "goto", [])

    @jsii.member(jsii_name="if")
    def if_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "if", [])

    @jsii.member(jsii_name="implements")
    def implements(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "implements", [])

    @jsii.member(jsii_name="import")
    def import_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "import", [])

    @jsii.member(jsii_name="instanceof")
    def instanceof(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "instanceof", [])

    @jsii.member(jsii_name="int")
    def int(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "int", [])

    @jsii.member(jsii_name="interface")
    def interface(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "interface", [])

    @jsii.member(jsii_name="long")
    def long(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "long", [])

    @jsii.member(jsii_name="native")
    def native(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "native", [])

    @jsii.member(jsii_name="new")
    def new(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "new", [])

    @jsii.member(jsii_name="null")
    def null(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "null", [])

    @jsii.member(jsii_name="package")
    def package(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "package", [])

    @jsii.member(jsii_name="private")
    def private(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "private", [])

    @jsii.member(jsii_name="protected")
    def protected(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "protected", [])

    @jsii.member(jsii_name="public")
    def public(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "public", [])

    @jsii.member(jsii_name="return")
    def return_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "return", [])

    @jsii.member(jsii_name="short")
    def short(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "short", [])

    @jsii.member(jsii_name="static")
    def static(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "static", [])

    @jsii.member(jsii_name="strictfp")
    def strictfp(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "strictfp", [])

    @jsii.member(jsii_name="super")
    def super(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "super", [])

    @jsii.member(jsii_name="switch")
    def switch(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "switch", [])

    @jsii.member(jsii_name="synchronized")
    def synchronized(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "synchronized", [])

    @jsii.member(jsii_name="this")
    def this(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "this", [])

    @jsii.member(jsii_name="throw")
    def throw(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "throw", [])

    @jsii.member(jsii_name="throws")
    def throws(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "throws", [])

    @jsii.member(jsii_name="transient")
    def transient(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "transient", [])

    @jsii.member(jsii_name="true")
    def true(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "true", [])

    @jsii.member(jsii_name="try")
    def try_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "try", [])

    @jsii.member(jsii_name="void")
    def void(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "void", [])

    @jsii.member(jsii_name="volatile")
    def volatile(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "volatile", [])

    @property
    @jsii.member(jsii_name="while")
    def while_(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "while")

    @while_.setter
    def while_(self, value: str):
        return jsii.set(self, "while", value)


@jsii.implements(IJsii487External2, IJsii487External)
class Jsii487Derived(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Jsii487Derived"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(Jsii487Derived, self, [])


@jsii.implements(IJsii496)
class Jsii496Derived(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Jsii496Derived"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(Jsii496Derived, self, [])


class JsiiAgent(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JsiiAgent"):
    """Host runtime version should be set via JSII_AGENT.

    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(JsiiAgent, self, [])

    @classproperty
    @jsii.member(jsii_name="jsiiAgent")
    def jsii_agent(cls) -> typing.Optional[str]:
        """Returns the value of the JSII_AGENT environment variable.

        Stability:
            experimental
        """
        return jsii.sget(cls, "jsiiAgent")


@jsii.data_type(jsii_type="jsii-calc.LoadBalancedFargateServiceProps", jsii_struct_bases=[])
class LoadBalancedFargateServiceProps(jsii.compat.TypedDict, total=False):
    """jsii#298: show default values in sphinx documentation, and respect newlines.

    Stability:
        experimental
    """
    containerPort: jsii.Number
    """The container port of the application load balancer attached to your Fargate service.

    Corresponds to container port mapping.

    Default:
        80

    Stability:
        experimental
    """

    cpu: str
    """The number of cpu units used by the task. Valid values, which determines your range of valid values for the memory parameter: 256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB 512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB 1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB 2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments 4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments.

    This default is set in the underlying FargateTaskDefinition construct.

    Default:
        256

    Stability:
        experimental
    """

    memoryMiB: str
    """The amount (in MiB) of memory used by the task.

    This field is required and you must use one of the following values, which determines your range of valid values
    for the cpu parameter:

    0.5GB, 1GB, 2GB - Available cpu values: 256 (.25 vCPU)

    1GB, 2GB, 3GB, 4GB - Available cpu values: 512 (.5 vCPU)

    2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB - Available cpu values: 1024 (1 vCPU)

    Between 4GB and 16GB in 1GB increments - Available cpu values: 2048 (2 vCPU)

    Between 8GB and 30GB in 1GB increments - Available cpu values: 4096 (4 vCPU)

    This default is set in the underlying FargateTaskDefinition construct.

    Default:
        512

    Stability:
        experimental
    """

    publicLoadBalancer: bool
    """Determines whether the Application Load Balancer will be internet-facing.

    Default:
        true

    Stability:
        experimental
    """

    publicTasks: bool
    """Determines whether your Fargate Service will be assigned a public IP address.

    Default:
        false

    Stability:
        experimental
    """

@jsii.implements(IFriendlier, IRandomNumberGenerator)
class Multiply(BinaryOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Multiply"):
    """The "*" binary operation.

    Stability:
        experimental
    """
    def __init__(self, lhs: scope.jsii_calc_lib.Value, rhs: scope.jsii_calc_lib.Value) -> None:
        """Creates a BinaryOperation.

        Arguments:
            lhs: Left-hand side operand.
            rhs: Right-hand side operand.

        Stability:
            experimental
        """
        jsii.create(Multiply, self, [lhs, rhs])

    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        """Say farewell.

        Stability:
            experimental
        """
        return jsii.invoke(self, "farewell", [])

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        """Say goodbye.

        Stability:
            experimental
        """
        return jsii.invoke(self, "goodbye", [])

    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        """Returns another random number.

        Stability:
            experimental
        """
        return jsii.invoke(self, "next", [])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value.

        Stability:
            experimental
        """
        return jsii.invoke(self, "toString", [])

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The value.

        Stability:
            experimental
        """
        return jsii.get(self, "value")


class NodeStandardLibrary(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.NodeStandardLibrary"):
    """Test fixture to verify that jsii modules can use the node standard library.

    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(NodeStandardLibrary, self, [])

    @jsii.member(jsii_name="cryptoSha256")
    def crypto_sha256(self) -> str:
        """Uses node.js "crypto" module to calculate sha256 of a string.

        Returns:
            "6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50"

        Stability:
            experimental
        """
        return jsii.invoke(self, "cryptoSha256", [])

    @jsii.member(jsii_name="fsReadFile")
    def fs_read_file(self) -> str:
        """Reads a local resource file (resource.txt) asynchronously.

        Returns:
            "Hello, resource!"

        Stability:
            experimental
        """
        return jsii.ainvoke(self, "fsReadFile", [])

    @jsii.member(jsii_name="fsReadFileSync")
    def fs_read_file_sync(self) -> str:
        """Sync version of fsReadFile.

        Returns:
            "Hello, resource! SYNC!"

        Stability:
            experimental
        """
        return jsii.invoke(self, "fsReadFileSync", [])

    @property
    @jsii.member(jsii_name="osPlatform")
    def os_platform(self) -> str:
        """Returns the current os.platform() from the "os" node module.

        Stability:
            experimental
        """
        return jsii.get(self, "osPlatform")


class NullShouldBeTreatedAsUndefined(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.NullShouldBeTreatedAsUndefined"):
    """jsii#282, aws-cdk#157: null should be treated as "undefined".

    Stability:
        experimental
    """
    def __init__(self, _param1: str, optional: typing.Any=None) -> None:
        """
        Arguments:
            _param1: -
            optional: -

        Stability:
            experimental
        """
        jsii.create(NullShouldBeTreatedAsUndefined, self, [_param1, optional])

    @jsii.member(jsii_name="giveMeUndefined")
    def give_me_undefined(self, value: typing.Any=None) -> None:
        """
        Arguments:
            value: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "giveMeUndefined", [value])

    @jsii.member(jsii_name="giveMeUndefinedInsideAnObject")
    def give_me_undefined_inside_an_object(self, *, array_with_three_elements_and_undefined_as_second_argument: typing.List[typing.Any], this_should_be_undefined: typing.Any=None) -> None:
        """
        Arguments:
            input: -
            arrayWithThreeElementsAndUndefinedAsSecondArgument: 
            thisShouldBeUndefined: 

        Stability:
            experimental
        """
        input: NullShouldBeTreatedAsUndefinedData = {"arrayWithThreeElementsAndUndefinedAsSecondArgument": array_with_three_elements_and_undefined_as_second_argument}

        if this_should_be_undefined is not None:
            input["thisShouldBeUndefined"] = this_should_be_undefined

        return jsii.invoke(self, "giveMeUndefinedInsideAnObject", [input])

    @jsii.member(jsii_name="verifyPropertyIsUndefined")
    def verify_property_is_undefined(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "verifyPropertyIsUndefined", [])

    @property
    @jsii.member(jsii_name="changeMeToUndefined")
    def change_me_to_undefined(self) -> typing.Optional[str]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "changeMeToUndefined")

    @change_me_to_undefined.setter
    def change_me_to_undefined(self, value: typing.Optional[str]):
        return jsii.set(self, "changeMeToUndefined", value)


@jsii.data_type_optionals(jsii_struct_bases=[])
class _NullShouldBeTreatedAsUndefinedData(jsii.compat.TypedDict, total=False):
    thisShouldBeUndefined: typing.Any
    """
    Stability:
        experimental
    """

@jsii.data_type(jsii_type="jsii-calc.NullShouldBeTreatedAsUndefinedData", jsii_struct_bases=[_NullShouldBeTreatedAsUndefinedData])
class NullShouldBeTreatedAsUndefinedData(_NullShouldBeTreatedAsUndefinedData):
    """
    Stability:
        experimental
    """
    arrayWithThreeElementsAndUndefinedAsSecondArgument: typing.List[typing.Any]
    """
    Stability:
        experimental
    """

class NumberGenerator(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.NumberGenerator"):
    """This allows us to test that a reference can be stored for objects that implement interfaces.

    Stability:
        experimental
    """
    def __init__(self, generator: "IRandomNumberGenerator") -> None:
        """
        Arguments:
            generator: -

        Stability:
            experimental
        """
        jsii.create(NumberGenerator, self, [generator])

    @jsii.member(jsii_name="isSameGenerator")
    def is_same_generator(self, gen: "IRandomNumberGenerator") -> bool:
        """
        Arguments:
            gen: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "isSameGenerator", [gen])

    @jsii.member(jsii_name="nextTimes100")
    def next_times100(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "nextTimes100", [])

    @property
    @jsii.member(jsii_name="generator")
    def generator(self) -> "IRandomNumberGenerator":
        """
        Stability:
            experimental
        """
        return jsii.get(self, "generator")

    @generator.setter
    def generator(self, value: "IRandomNumberGenerator"):
        return jsii.set(self, "generator", value)


class ObjectRefsInCollections(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ObjectRefsInCollections"):
    """Verify that object references can be passed inside collections.

    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(ObjectRefsInCollections, self, [])

    @jsii.member(jsii_name="sumFromArray")
    def sum_from_array(self, values: typing.List[scope.jsii_calc_lib.Value]) -> jsii.Number:
        """Returns the sum of all values.

        Arguments:
            values: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "sumFromArray", [values])

    @jsii.member(jsii_name="sumFromMap")
    def sum_from_map(self, values: typing.Mapping[str,scope.jsii_calc_lib.Value]) -> jsii.Number:
        """Returns the sum of all values in a map.

        Arguments:
            values: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "sumFromMap", [values])


class Old(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Old"):
    """Old class.

    Deprecated:
        Use the new class

    Stability:
        deprecated
    """
    def __init__(self) -> None:
        jsii.create(Old, self, [])

    @jsii.member(jsii_name="doAThing")
    def do_a_thing(self) -> None:
        """Doo wop that thing.

        Stability:
            deprecated
        """
        return jsii.invoke(self, "doAThing", [])


class OptionalConstructorArgument(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.OptionalConstructorArgument"):
    """
    Stability:
        experimental
    """
    def __init__(self, arg1: jsii.Number, arg2: str, arg3: typing.Optional[datetime.datetime]=None) -> None:
        """
        Arguments:
            arg1: -
            arg2: -
            arg3: -

        Stability:
            experimental
        """
        jsii.create(OptionalConstructorArgument, self, [arg1, arg2, arg3])

    @property
    @jsii.member(jsii_name="arg1")
    def arg1(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "arg1")

    @property
    @jsii.member(jsii_name="arg2")
    def arg2(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "arg2")

    @property
    @jsii.member(jsii_name="arg3")
    def arg3(self) -> typing.Optional[datetime.datetime]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "arg3")


@jsii.data_type(jsii_type="jsii-calc.OptionalStruct", jsii_struct_bases=[])
class OptionalStruct(jsii.compat.TypedDict, total=False):
    """
    Stability:
        experimental
    """
    field: str
    """
    Stability:
        experimental
    """

class OptionalStructConsumer(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.OptionalStructConsumer"):
    """
    Stability:
        experimental
    """
    def __init__(self, *, field: typing.Optional[str]=None) -> None:
        """
        Arguments:
            optionalStruct: -
            field: 

        Stability:
            experimental
        """
        optional_struct: OptionalStruct = {}

        if field is not None:
            optional_struct["field"] = field

        jsii.create(OptionalStructConsumer, self, [optional_struct])

    @property
    @jsii.member(jsii_name="parameterWasUndefined")
    def parameter_was_undefined(self) -> bool:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "parameterWasUndefined")

    @property
    @jsii.member(jsii_name="fieldValue")
    def field_value(self) -> typing.Optional[str]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "fieldValue")


class OverrideReturnsObject(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.OverrideReturnsObject"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(OverrideReturnsObject, self, [])

    @jsii.member(jsii_name="test")
    def test(self, obj: "IReturnsNumber") -> jsii.Number:
        """
        Arguments:
            obj: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "test", [obj])


class PartiallyInitializedThisConsumer(metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.PartiallyInitializedThisConsumer"):
    """
    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _PartiallyInitializedThisConsumerProxy

    def __init__(self) -> None:
        jsii.create(PartiallyInitializedThisConsumer, self, [])

    @jsii.member(jsii_name="consumePartiallyInitializedThis")
    @abc.abstractmethod
    def consume_partially_initialized_this(self, obj: "ConstructorPassesThisOut", dt: datetime.datetime, ev: "AllTypesEnum") -> str:
        """
        Arguments:
            obj: -
            dt: -
            ev: -

        Stability:
            experimental
        """
        ...


class _PartiallyInitializedThisConsumerProxy(PartiallyInitializedThisConsumer):
    @jsii.member(jsii_name="consumePartiallyInitializedThis")
    def consume_partially_initialized_this(self, obj: "ConstructorPassesThisOut", dt: datetime.datetime, ev: "AllTypesEnum") -> str:
        """
        Arguments:
            obj: -
            dt: -
            ev: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "consumePartiallyInitializedThis", [obj, dt, ev])


class Polymorphism(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Polymorphism"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(Polymorphism, self, [])

    @jsii.member(jsii_name="sayHello")
    def say_hello(self, friendly: scope.jsii_calc_lib.IFriendly) -> str:
        """
        Arguments:
            friendly: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "sayHello", [friendly])


class PublicClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.PublicClass"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(PublicClass, self, [])

    @jsii.member(jsii_name="hello")
    def hello(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "hello", [])


@jsii.implements(IPublicInterface2)
class InbetweenClass(PublicClass, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.InbetweenClass"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(InbetweenClass, self, [])

    @jsii.member(jsii_name="ciao")
    def ciao(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "ciao", [])


class PythonReservedWords(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.PythonReservedWords"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(PythonReservedWords, self, [])

    @jsii.member(jsii_name="and")
    def and_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "and", [])

    @jsii.member(jsii_name="as")
    def as_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "as", [])

    @jsii.member(jsii_name="assert")
    def assert_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "assert", [])

    @jsii.member(jsii_name="async")
    def async_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "async", [])

    @jsii.member(jsii_name="await")
    def await_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "await", [])

    @jsii.member(jsii_name="break")
    def break_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "break", [])

    @jsii.member(jsii_name="class")
    def class_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "class", [])

    @jsii.member(jsii_name="continue")
    def continue_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "continue", [])

    @jsii.member(jsii_name="def")
    def def_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "def", [])

    @jsii.member(jsii_name="del")
    def del_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "del", [])

    @jsii.member(jsii_name="elif")
    def elif_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "elif", [])

    @jsii.member(jsii_name="else")
    def else_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "else", [])

    @jsii.member(jsii_name="except")
    def except_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "except", [])

    @jsii.member(jsii_name="finally")
    def finally_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "finally", [])

    @jsii.member(jsii_name="for")
    def for_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "for", [])

    @jsii.member(jsii_name="from")
    def from_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "from", [])

    @jsii.member(jsii_name="global")
    def global_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "global", [])

    @jsii.member(jsii_name="if")
    def if_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "if", [])

    @jsii.member(jsii_name="import")
    def import_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "import", [])

    @jsii.member(jsii_name="in")
    def in_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "in", [])

    @jsii.member(jsii_name="is")
    def is_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "is", [])

    @jsii.member(jsii_name="lambda")
    def lambda_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "lambda", [])

    @jsii.member(jsii_name="nonlocal")
    def nonlocal_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "nonlocal", [])

    @jsii.member(jsii_name="not")
    def not_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "not", [])

    @jsii.member(jsii_name="or")
    def or_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "or", [])

    @jsii.member(jsii_name="pass")
    def pass_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "pass", [])

    @jsii.member(jsii_name="raise")
    def raise_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "raise", [])

    @jsii.member(jsii_name="return")
    def return_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "return", [])

    @jsii.member(jsii_name="try")
    def try_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "try", [])

    @jsii.member(jsii_name="while")
    def while_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "while", [])

    @jsii.member(jsii_name="with")
    def with_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "with", [])

    @jsii.member(jsii_name="yield")
    def yield_(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "yield", [])


class ReferenceEnumFromScopedPackage(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ReferenceEnumFromScopedPackage"):
    """See awslabs/jsii#138.

    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(ReferenceEnumFromScopedPackage, self, [])

    @jsii.member(jsii_name="loadFoo")
    def load_foo(self) -> typing.Optional[scope.jsii_calc_lib.EnumFromScopedModule]:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "loadFoo", [])

    @jsii.member(jsii_name="saveFoo")
    def save_foo(self, value: scope.jsii_calc_lib.EnumFromScopedModule) -> None:
        """
        Arguments:
            value: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "saveFoo", [value])

    @property
    @jsii.member(jsii_name="foo")
    def foo(self) -> typing.Optional[scope.jsii_calc_lib.EnumFromScopedModule]:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "foo")

    @foo.setter
    def foo(self, value: typing.Optional[scope.jsii_calc_lib.EnumFromScopedModule]):
        return jsii.set(self, "foo", value)


class ReturnsPrivateImplementationOfInterface(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ReturnsPrivateImplementationOfInterface"):
    """Helps ensure the JSII kernel & runtime cooperate correctly when an un-exported instance of a class is returned with a declared type that is an exported interface, and the instance inherits from an exported class.

    Returns:
        an instance of an un-exported class that extends ``ExportedBaseClass``, declared as ``IPrivatelyImplemented``.

    See:
        https://github.com/awslabs/jsii/issues/320
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(ReturnsPrivateImplementationOfInterface, self, [])

    @property
    @jsii.member(jsii_name="privateImplementation")
    def private_implementation(self) -> "IPrivatelyImplemented":
        """
        Stability:
            experimental
        """
        return jsii.get(self, "privateImplementation")


class RuntimeTypeChecking(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.RuntimeTypeChecking"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(RuntimeTypeChecking, self, [])

    @jsii.member(jsii_name="methodWithDefaultedArguments")
    def method_with_defaulted_arguments(self, arg1: typing.Optional[jsii.Number]=None, arg2: typing.Optional[str]=None, arg3: typing.Optional[datetime.datetime]=None) -> None:
        """
        Arguments:
            arg1: -
            arg2: -
            arg3: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "methodWithDefaultedArguments", [arg1, arg2, arg3])

    @jsii.member(jsii_name="methodWithOptionalAnyArgument")
    def method_with_optional_any_argument(self, arg: typing.Any=None) -> None:
        """
        Arguments:
            arg: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "methodWithOptionalAnyArgument", [arg])

    @jsii.member(jsii_name="methodWithOptionalArguments")
    def method_with_optional_arguments(self, arg1: jsii.Number, arg2: str, arg3: typing.Optional[datetime.datetime]=None) -> None:
        """Used to verify verification of number of method arguments.

        Arguments:
            arg1: -
            arg2: -
            arg3: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "methodWithOptionalArguments", [arg1, arg2, arg3])


class SingleInstanceTwoTypes(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.SingleInstanceTwoTypes"):
    """Test that a single instance can be returned under two different FQNs.

    JSII clients can instantiate 2 different strongly-typed wrappers for the same
    object. Unfortunately, this will break object equality, but if we didn't do
    this it would break runtime type checks in the JVM or CLR.

    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(SingleInstanceTwoTypes, self, [])

    @jsii.member(jsii_name="interface1")
    def interface1(self) -> "InbetweenClass":
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "interface1", [])

    @jsii.member(jsii_name="interface2")
    def interface2(self) -> "IPublicInterface":
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "interface2", [])


class StableClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.StableClass"):
    """
    Stability:
        stable
    """
    def __init__(self, readonly_string: str, mutable_number: typing.Optional[jsii.Number]=None) -> None:
        """
        Arguments:
            readonlyString: -
            mutableNumber: -

        Stability:
            stable
        """
        jsii.create(StableClass, self, [readonly_string, mutable_number])

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        Stability:
            stable
        """
        return jsii.invoke(self, "method", [])

    @property
    @jsii.member(jsii_name="readonlyProperty")
    def readonly_property(self) -> str:
        """
        Stability:
            stable
        """
        return jsii.get(self, "readonlyProperty")

    @property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        Stability:
            stable
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        return jsii.set(self, "mutableProperty", value)


@jsii.enum(jsii_type="jsii-calc.StableEnum")
class StableEnum(enum.Enum):
    """
    Stability:
        stable
    """
    OptionA = "OptionA"
    """
    Stability:
        stable
    """
    OptionB = "OptionB"
    """
    Stability:
        stable
    """

@jsii.data_type(jsii_type="jsii-calc.StableStruct", jsii_struct_bases=[])
class StableStruct(jsii.compat.TypedDict):
    """
    Stability:
        stable
    """
    readonlyProperty: str
    """
    Stability:
        stable
    """

class StaticContext(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.StaticContext"):
    """This is used to validate the ability to use ``this`` from within a static context.

    https://github.com/awslabs/aws-cdk/issues/2304

    Stability:
        experimental
    """
    @jsii.member(jsii_name="canAccessStaticContext")
    @classmethod
    def can_access_static_context(cls) -> bool:
        """
        Stability:
            experimental
        """
        return jsii.sinvoke(cls, "canAccessStaticContext", [])

    @classproperty
    @jsii.member(jsii_name="staticVariable")
    def static_variable(cls) -> bool:
        """
        Stability:
            experimental
        """
        return jsii.sget(cls, "staticVariable")

    @static_variable.setter
    def static_variable(cls, value: bool):
        return jsii.sset(cls, "staticVariable", value)


class Statics(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Statics"):
    """
    Stability:
        experimental
    """
    def __init__(self, value: str) -> None:
        """
        Arguments:
            value: -

        Stability:
            experimental
        """
        jsii.create(Statics, self, [value])

    @jsii.member(jsii_name="staticMethod")
    @classmethod
    def static_method(cls, name: str) -> str:
        """Jsdocs for static method.

        Arguments:
            name: The name of the person to say hello to.

        Stability:
            experimental
        """
        return jsii.sinvoke(cls, "staticMethod", [name])

    @jsii.member(jsii_name="justMethod")
    def just_method(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "justMethod", [])

    @classproperty
    @jsii.member(jsii_name="BAR")
    def BAR(cls) -> jsii.Number:
        """Constants may also use all-caps.

        Stability:
            experimental
        """
        return jsii.sget(cls, "BAR")

    @classproperty
    @jsii.member(jsii_name="ConstObj")
    def CONST_OBJ(cls) -> "DoubleTrouble":
        """
        Stability:
            experimental
        """
        return jsii.sget(cls, "ConstObj")

    @classproperty
    @jsii.member(jsii_name="Foo")
    def FOO(cls) -> str:
        """Jsdocs for static property.

        Stability:
            experimental
        """
        return jsii.sget(cls, "Foo")

    @classproperty
    @jsii.member(jsii_name="zooBar")
    def ZOO_BAR(cls) -> typing.Mapping[str,str]:
        """Constants can also use camelCase.

        Stability:
            experimental
        """
        return jsii.sget(cls, "zooBar")

    @classproperty
    @jsii.member(jsii_name="instance")
    def instance(cls) -> "Statics":
        """Jsdocs for static getter. Jsdocs for static setter.

        Stability:
            experimental
        """
        return jsii.sget(cls, "instance")

    @instance.setter
    def instance(cls, value: "Statics"):
        return jsii.sset(cls, "instance", value)

    @classproperty
    @jsii.member(jsii_name="nonConstStatic")
    def non_const_static(cls) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.sget(cls, "nonConstStatic")

    @non_const_static.setter
    def non_const_static(cls, value: jsii.Number):
        return jsii.sset(cls, "nonConstStatic", value)

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "value")


@jsii.enum(jsii_type="jsii-calc.StringEnum")
class StringEnum(enum.Enum):
    """
    Stability:
        experimental
    """
    A = "A"
    """
    Stability:
        experimental
    """
    B = "B"
    """
    Stability:
        experimental
    """
    C = "C"
    """
    Stability:
        experimental
    """

class StripInternal(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.StripInternal"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(StripInternal, self, [])

    @property
    @jsii.member(jsii_name="youSeeMe")
    def you_see_me(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "youSeeMe")

    @you_see_me.setter
    def you_see_me(self, value: str):
        return jsii.set(self, "youSeeMe", value)


class SyncVirtualMethods(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.SyncVirtualMethods"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(SyncVirtualMethods, self, [])

    @jsii.member(jsii_name="callerIsAsync")
    def caller_is_async(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.ainvoke(self, "callerIsAsync", [])

    @jsii.member(jsii_name="callerIsMethod")
    def caller_is_method(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "callerIsMethod", [])

    @jsii.member(jsii_name="modifyOtherProperty")
    def modify_other_property(self, value: str) -> None:
        """
        Arguments:
            value: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "modifyOtherProperty", [value])

    @jsii.member(jsii_name="modifyValueOfTheProperty")
    def modify_value_of_the_property(self, value: str) -> None:
        """
        Arguments:
            value: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "modifyValueOfTheProperty", [value])

    @jsii.member(jsii_name="readA")
    def read_a(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "readA", [])

    @jsii.member(jsii_name="retrieveOtherProperty")
    def retrieve_other_property(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "retrieveOtherProperty", [])

    @jsii.member(jsii_name="retrieveReadOnlyProperty")
    def retrieve_read_only_property(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "retrieveReadOnlyProperty", [])

    @jsii.member(jsii_name="retrieveValueOfTheProperty")
    def retrieve_value_of_the_property(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "retrieveValueOfTheProperty", [])

    @jsii.member(jsii_name="virtualMethod")
    def virtual_method(self, n: jsii.Number) -> jsii.Number:
        """
        Arguments:
            n: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "virtualMethod", [n])

    @jsii.member(jsii_name="writeA")
    def write_a(self, value: jsii.Number) -> None:
        """
        Arguments:
            value: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "writeA", [value])

    @property
    @jsii.member(jsii_name="readonlyProperty")
    def readonly_property(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "readonlyProperty")

    @property
    @jsii.member(jsii_name="a")
    def a(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "a")

    @a.setter
    def a(self, value: jsii.Number):
        return jsii.set(self, "a", value)

    @property
    @jsii.member(jsii_name="callerIsProperty")
    def caller_is_property(self) -> jsii.Number:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "callerIsProperty")

    @caller_is_property.setter
    def caller_is_property(self, value: jsii.Number):
        return jsii.set(self, "callerIsProperty", value)

    @property
    @jsii.member(jsii_name="otherProperty")
    def other_property(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "otherProperty")

    @other_property.setter
    def other_property(self, value: str):
        return jsii.set(self, "otherProperty", value)

    @property
    @jsii.member(jsii_name="theProperty")
    def the_property(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "theProperty")

    @the_property.setter
    def the_property(self, value: str):
        return jsii.set(self, "theProperty", value)

    @property
    @jsii.member(jsii_name="valueOfOtherProperty")
    def value_of_other_property(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "valueOfOtherProperty")

    @value_of_other_property.setter
    def value_of_other_property(self, value: str):
        return jsii.set(self, "valueOfOtherProperty", value)


class Thrower(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Thrower"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(Thrower, self, [])

    @jsii.member(jsii_name="throwError")
    def throw_error(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "throwError", [])


class UnaryOperation(scope.jsii_calc_lib.Operation, metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.UnaryOperation"):
    """An operation on a single operand.

    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _UnaryOperationProxy

    def __init__(self, operand: scope.jsii_calc_lib.Value) -> None:
        """
        Arguments:
            operand: -

        Stability:
            experimental
        """
        jsii.create(UnaryOperation, self, [operand])

    @property
    @jsii.member(jsii_name="operand")
    def operand(self) -> scope.jsii_calc_lib.Value:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "operand")


class _UnaryOperationProxy(UnaryOperation, jsii.proxy_for(scope.jsii_calc_lib.Operation)):
    pass

@jsii.implements(IFriendlier)
class Negate(UnaryOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Negate"):
    """The negation operation ("-value").

    Stability:
        experimental
    """
    def __init__(self, operand: scope.jsii_calc_lib.Value) -> None:
        """
        Arguments:
            operand: -

        Stability:
            experimental
        """
        jsii.create(Negate, self, [operand])

    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        """Say farewell.

        Stability:
            experimental
        """
        return jsii.invoke(self, "farewell", [])

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        """Say goodbye.

        Stability:
            experimental
        """
        return jsii.invoke(self, "goodbye", [])

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        """Say hello!

        Stability:
            experimental
        """
        return jsii.invoke(self, "hello", [])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value.

        Stability:
            experimental
        """
        return jsii.invoke(self, "toString", [])

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The value.

        Stability:
            experimental
        """
        return jsii.get(self, "value")


@jsii.data_type_optionals(jsii_struct_bases=[])
class _UnionProperties(jsii.compat.TypedDict, total=False):
    foo: typing.Union[str, jsii.Number]
    """
    Stability:
        experimental
    """

@jsii.data_type(jsii_type="jsii-calc.UnionProperties", jsii_struct_bases=[_UnionProperties])
class UnionProperties(_UnionProperties):
    """
    Stability:
        experimental
    """
    bar: typing.Union[str, jsii.Number, "AllTypes"]
    """
    Stability:
        experimental
    """

class UseBundledDependency(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.UseBundledDependency"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(UseBundledDependency, self, [])

    @jsii.member(jsii_name="value")
    def value(self) -> typing.Any:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "value", [])


class UseCalcBase(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.UseCalcBase"):
    """Depend on a type from jsii-calc-base as a test for awslabs/jsii#128.

    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(UseCalcBase, self, [])

    @jsii.member(jsii_name="hello")
    def hello(self) -> scope.jsii_calc_base.Base:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "hello", [])


class UsesInterfaceWithProperties(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.UsesInterfaceWithProperties"):
    """
    Stability:
        experimental
    """
    def __init__(self, obj: "IInterfaceWithProperties") -> None:
        """
        Arguments:
            obj: -

        Stability:
            experimental
        """
        jsii.create(UsesInterfaceWithProperties, self, [obj])

    @jsii.member(jsii_name="justRead")
    def just_read(self) -> str:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "justRead", [])

    @jsii.member(jsii_name="readStringAndNumber")
    def read_string_and_number(self, ext: "IInterfaceWithPropertiesExtension") -> str:
        """
        Arguments:
            ext: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "readStringAndNumber", [ext])

    @jsii.member(jsii_name="writeAndRead")
    def write_and_read(self, value: str) -> str:
        """
        Arguments:
            value: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "writeAndRead", [value])

    @property
    @jsii.member(jsii_name="obj")
    def obj(self) -> "IInterfaceWithProperties":
        """
        Stability:
            experimental
        """
        return jsii.get(self, "obj")


class VariadicMethod(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.VariadicMethod"):
    """
    Stability:
        experimental
    """
    def __init__(self, *prefix: jsii.Number) -> None:
        """
        Arguments:
            prefix: a prefix that will be use for all values returned by ``#asArray``.

        Stability:
            experimental
        """
        jsii.create(VariadicMethod, self, [*prefix])

    @jsii.member(jsii_name="asArray")
    def as_array(self, first: jsii.Number, *others: jsii.Number) -> typing.List[jsii.Number]:
        """
        Arguments:
            first: the first element of the array to be returned (after the ``prefix`` provided at construction time).
            others: other elements to be included in the array.

        Stability:
            experimental
        """
        return jsii.invoke(self, "asArray", [first, *others])


class VirtualMethodPlayground(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.VirtualMethodPlayground"):
    """
    Stability:
        experimental
    """
    def __init__(self) -> None:
        jsii.create(VirtualMethodPlayground, self, [])

    @jsii.member(jsii_name="overrideMeAsync")
    def override_me_async(self, index: jsii.Number) -> jsii.Number:
        """
        Arguments:
            index: -

        Stability:
            experimental
        """
        return jsii.ainvoke(self, "overrideMeAsync", [index])

    @jsii.member(jsii_name="overrideMeSync")
    def override_me_sync(self, index: jsii.Number) -> jsii.Number:
        """
        Arguments:
            index: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "overrideMeSync", [index])

    @jsii.member(jsii_name="parallelSumAsync")
    def parallel_sum_async(self, count: jsii.Number) -> jsii.Number:
        """
        Arguments:
            count: -

        Stability:
            experimental
        """
        return jsii.ainvoke(self, "parallelSumAsync", [count])

    @jsii.member(jsii_name="serialSumAsync")
    def serial_sum_async(self, count: jsii.Number) -> jsii.Number:
        """
        Arguments:
            count: -

        Stability:
            experimental
        """
        return jsii.ainvoke(self, "serialSumAsync", [count])

    @jsii.member(jsii_name="sumSync")
    def sum_sync(self, count: jsii.Number) -> jsii.Number:
        """
        Arguments:
            count: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "sumSync", [count])


class VoidCallback(metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.VoidCallback"):
    """This test is used to validate the runtimes can return correctly from a void callback.

    - Implement ``overrideMe`` (method does not have to do anything).
    - Invoke ``callMe``
    - Verify that ``methodWasCalled`` is ``true``.

    Stability:
        experimental
    """
    @staticmethod
    def __jsii_proxy_class__():
        return _VoidCallbackProxy

    def __init__(self) -> None:
        jsii.create(VoidCallback, self, [])

    @jsii.member(jsii_name="callMe")
    def call_me(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "callMe", [])

    @jsii.member(jsii_name="overrideMe")
    @abc.abstractmethod
    def _override_me(self) -> None:
        """
        Stability:
            experimental
        """
        ...

    @property
    @jsii.member(jsii_name="methodWasCalled")
    def method_was_called(self) -> bool:
        """
        Stability:
            experimental
        """
        return jsii.get(self, "methodWasCalled")


class _VoidCallbackProxy(VoidCallback):
    @jsii.member(jsii_name="overrideMe")
    def _override_me(self) -> None:
        """
        Stability:
            experimental
        """
        return jsii.invoke(self, "overrideMe", [])


class composition:
    class CompositeOperation(scope.jsii_calc_lib.Operation, metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.composition.CompositeOperation"):
        """Abstract operation composed from an expression of other operations.

        Stability:
            experimental
        """
        @staticmethod
        def __jsii_proxy_class__():
            return _CompositeOperationProxy

        def __init__(self) -> None:
            jsii.create(composition.CompositeOperation, self, [])

        @jsii.member(jsii_name="toString")
        def to_string(self) -> str:
            """String representation of the value.

            Stability:
                experimental
            """
            return jsii.invoke(self, "toString", [])

        @property
        @jsii.member(jsii_name="expression")
        @abc.abstractmethod
        def expression(self) -> scope.jsii_calc_lib.Value:
            """The expression that this operation consists of. Must be implemented by derived classes.

            Stability:
                experimental
            """
            ...

        @property
        @jsii.member(jsii_name="value")
        def value(self) -> jsii.Number:
            """The value.

            Stability:
                experimental
            """
            return jsii.get(self, "value")

        @property
        @jsii.member(jsii_name="decorationPostfixes")
        def decoration_postfixes(self) -> typing.List[str]:
            """A set of postfixes to include in a decorated .toString().

            Stability:
                experimental
            """
            return jsii.get(self, "decorationPostfixes")

        @decoration_postfixes.setter
        def decoration_postfixes(self, value: typing.List[str]):
            return jsii.set(self, "decorationPostfixes", value)

        @property
        @jsii.member(jsii_name="decorationPrefixes")
        def decoration_prefixes(self) -> typing.List[str]:
            """A set of prefixes to include in a decorated .toString().

            Stability:
                experimental
            """
            return jsii.get(self, "decorationPrefixes")

        @decoration_prefixes.setter
        def decoration_prefixes(self, value: typing.List[str]):
            return jsii.set(self, "decorationPrefixes", value)

        @property
        @jsii.member(jsii_name="stringStyle")
        def string_style(self) -> "CompositionStringStyle":
            """The .toString() style.

            Stability:
                experimental
            """
            return jsii.get(self, "stringStyle")

        @string_style.setter
        def string_style(self, value: "CompositionStringStyle"):
            return jsii.set(self, "stringStyle", value)

        @jsii.enum(jsii_type="jsii-calc.composition.CompositeOperation.CompositionStringStyle")
        class CompositionStringStyle(enum.Enum):
            """Style of .toString() output for CompositeOperation.

            Stability:
                experimental
            """
            Normal = "Normal"
            """Normal string expression.

            Stability:
                experimental
            """
            Decorated = "Decorated"
            """Decorated string expression.

            Stability:
                experimental
            """


    class _CompositeOperationProxy(CompositeOperation, jsii.proxy_for(scope.jsii_calc_lib.Operation)):
        @property
        @jsii.member(jsii_name="expression")
        def expression(self) -> scope.jsii_calc_lib.Value:
            """The expression that this operation consists of. Must be implemented by derived classes.

            Stability:
                experimental
            """
            return jsii.get(self, "expression")



class Calculator(composition.CompositeOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Calculator"):
    """A calculator which maintains a current value and allows adding operations.

    Stability:
        experimental
    """
    def __init__(self, *, initial_value: typing.Optional[jsii.Number]=None, maximum_value: typing.Optional[jsii.Number]=None) -> None:
        """Creates a Calculator object.

        Arguments:
            props: Initialization properties.
            initialValue: 
            maximumValue: 

        Stability:
            experimental
        """
        props: CalculatorProps = {}

        if initial_value is not None:
            props["initialValue"] = initial_value

        if maximum_value is not None:
            props["maximumValue"] = maximum_value

        jsii.create(Calculator, self, [props])

    @jsii.member(jsii_name="add")
    def add(self, value: jsii.Number) -> None:
        """Adds a number to the current value.

        Arguments:
            value: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "add", [value])

    @jsii.member(jsii_name="mul")
    def mul(self, value: jsii.Number) -> None:
        """Multiplies the current value by a number.

        Arguments:
            value: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "mul", [value])

    @jsii.member(jsii_name="neg")
    def neg(self) -> None:
        """Negates the current value.

        Stability:
            experimental
        """
        return jsii.invoke(self, "neg", [])

    @jsii.member(jsii_name="pow")
    def pow(self, value: jsii.Number) -> None:
        """Raises the current value by a power.

        Arguments:
            value: -

        Stability:
            experimental
        """
        return jsii.invoke(self, "pow", [value])

    @jsii.member(jsii_name="readUnionValue")
    def read_union_value(self) -> jsii.Number:
        """Returns teh value of the union property (if defined).

        Stability:
            experimental
        """
        return jsii.invoke(self, "readUnionValue", [])

    @property
    @jsii.member(jsii_name="expression")
    def expression(self) -> scope.jsii_calc_lib.Value:
        """Returns the expression.

        Stability:
            experimental
        """
        return jsii.get(self, "expression")

    @property
    @jsii.member(jsii_name="operationsLog")
    def operations_log(self) -> typing.List[scope.jsii_calc_lib.Value]:
        """A log of all operations.

        Stability:
            experimental
        """
        return jsii.get(self, "operationsLog")

    @property
    @jsii.member(jsii_name="operationsMap")
    def operations_map(self) -> typing.Mapping[str,typing.List[scope.jsii_calc_lib.Value]]:
        """A map of per operation name of all operations performed.

        Stability:
            experimental
        """
        return jsii.get(self, "operationsMap")

    @property
    @jsii.member(jsii_name="curr")
    def curr(self) -> scope.jsii_calc_lib.Value:
        """The current value.

        Stability:
            experimental
        """
        return jsii.get(self, "curr")

    @curr.setter
    def curr(self, value: scope.jsii_calc_lib.Value):
        return jsii.set(self, "curr", value)

    @property
    @jsii.member(jsii_name="maxValue")
    def max_value(self) -> typing.Optional[jsii.Number]:
        """The maximum value allows in this calculator.

        Stability:
            experimental
        """
        return jsii.get(self, "maxValue")

    @max_value.setter
    def max_value(self, value: typing.Optional[jsii.Number]):
        return jsii.set(self, "maxValue", value)

    @property
    @jsii.member(jsii_name="unionProperty")
    def union_property(self) -> typing.Optional[typing.Union[typing.Optional["Add"], typing.Optional["Multiply"], typing.Optional["Power"]]]:
        """Example of a property that accepts a union of types.

        Stability:
            experimental
        """
        return jsii.get(self, "unionProperty")

    @union_property.setter
    def union_property(self, value: typing.Optional[typing.Union[typing.Optional["Add"], typing.Optional["Multiply"], typing.Optional["Power"]]]):
        return jsii.set(self, "unionProperty", value)


class Power(composition.CompositeOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Power"):
    """The power operation.

    Stability:
        experimental
    """
    def __init__(self, base: scope.jsii_calc_lib.Value, pow: scope.jsii_calc_lib.Value) -> None:
        """Creates a Power operation.

        Arguments:
            base: The base of the power.
            pow: The number of times to multiply.

        Stability:
            experimental
        """
        jsii.create(Power, self, [base, pow])

    @property
    @jsii.member(jsii_name="base")
    def base(self) -> scope.jsii_calc_lib.Value:
        """The base of the power.

        Stability:
            experimental
        """
        return jsii.get(self, "base")

    @property
    @jsii.member(jsii_name="expression")
    def expression(self) -> scope.jsii_calc_lib.Value:
        """The expression that this operation consists of. Must be implemented by derived classes.

        Stability:
            experimental
        """
        return jsii.get(self, "expression")

    @property
    @jsii.member(jsii_name="pow")
    def pow(self) -> scope.jsii_calc_lib.Value:
        """The number of times to multiply.

        Stability:
            experimental
        """
        return jsii.get(self, "pow")


class Sum(composition.CompositeOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Sum"):
    """An operation that sums multiple values.

    Stability:
        experimental
    """
    def __init__(self) -> None:
        """
        Stability:
            experimental
        """
        jsii.create(Sum, self, [])

    @property
    @jsii.member(jsii_name="expression")
    def expression(self) -> scope.jsii_calc_lib.Value:
        """The expression that this operation consists of. Must be implemented by derived classes.

        Stability:
            experimental
        """
        return jsii.get(self, "expression")

    @property
    @jsii.member(jsii_name="parts")
    def parts(self) -> typing.List[scope.jsii_calc_lib.Value]:
        """The parts to sum.

        Stability:
            experimental
        """
        return jsii.get(self, "parts")

    @parts.setter
    def parts(self, value: typing.List[scope.jsii_calc_lib.Value]):
        return jsii.set(self, "parts", value)


__all__ = ["AbstractClass", "AbstractClassBase", "AbstractClassReturner", "Add", "AllTypes", "AllTypesEnum", "AllowedMethodNames", "AsyncVirtualMethods", "AugmentableClass", "BinaryOperation", "Calculator", "CalculatorProps", "ClassThatImplementsTheInternalInterface", "ClassThatImplementsThePrivateInterface", "ClassWithDocs", "ClassWithMutableObjectLiteralProperty", "ClassWithPrivateConstructorAndAutomaticProperties", "ConstructorPassesThisOut", "Constructors", "ConsumersOfThisCrazyTypeSystem", "DefaultedConstructorArgument", "DeprecatedClass", "DeprecatedEnum", "DeprecatedStruct", "DerivedClassHasNoProperties", "DerivedStruct", "DoNotOverridePrivates", "DoNotRecognizeAnyAsOptional", "DocumentedClass", "DontComplainAboutVariadicAfterOptional", "DoubleTrouble", "EraseUndefinedHashValues", "EraseUndefinedHashValuesOptions", "ExperimentalClass", "ExperimentalEnum", "ExperimentalStruct", "ExportedBaseClass", "ExtendsInternalInterface", "GiveMeStructs", "Greetee", "GreetingAugmenter", "IAnotherPublicInterface", "IDeprecatedInterface", "IExperimentalInterface", "IExtendsPrivateInterface", "IFriendlier", "IFriendlyRandomGenerator", "IInterfaceImplementedByAbstractClass", "IInterfaceThatShouldNotBeADataType", "IInterfaceWithInternal", "IInterfaceWithMethods", "IInterfaceWithOptionalMethodArguments", "IInterfaceWithProperties", "IInterfaceWithPropertiesExtension", "IJSII417Derived", "IJSII417PublicBaseOfBase", "IJsii487External", "IJsii487External2", "IJsii496", "IMutableObjectLiteral", "INonInternalInterface", "IPrivatelyImplemented", "IPublicInterface", "IPublicInterface2", "IRandomNumberGenerator", "IReturnsNumber", "IStableInterface", "ImplementInternalInterface", "ImplementsInterfaceWithInternal", "ImplementsInterfaceWithInternalSubclass", "ImplementsPrivateInterface", "ImplictBaseOfBase", "InbetweenClass", "InterfaceInNamespaceIncludesClasses", "InterfaceInNamespaceOnlyInterface", "JSII417Derived", "JSII417PublicBaseOfBase", "JSObjectLiteralForInterface", "JSObjectLiteralToNative", "JSObjectLiteralToNativeClass", "JavaReservedWords", "Jsii487Derived", "Jsii496Derived", "JsiiAgent", "LoadBalancedFargateServiceProps", "Multiply", "Negate", "NodeStandardLibrary", "NullShouldBeTreatedAsUndefined", "NullShouldBeTreatedAsUndefinedData", "NumberGenerator", "ObjectRefsInCollections", "Old", "OptionalConstructorArgument", "OptionalStruct", "OptionalStructConsumer", "OverrideReturnsObject", "PartiallyInitializedThisConsumer", "Polymorphism", "Power", "PublicClass", "PythonReservedWords", "ReferenceEnumFromScopedPackage", "ReturnsPrivateImplementationOfInterface", "RuntimeTypeChecking", "SingleInstanceTwoTypes", "StableClass", "StableEnum", "StableStruct", "StaticContext", "Statics", "StringEnum", "StripInternal", "Sum", "SyncVirtualMethods", "Thrower", "UnaryOperation", "UnionProperties", "UseBundledDependency", "UseCalcBase", "UsesInterfaceWithProperties", "VariadicMethod", "VirtualMethodPlayground", "VoidCallback", "__jsii_assembly__", "composition"]

publication.publish()
