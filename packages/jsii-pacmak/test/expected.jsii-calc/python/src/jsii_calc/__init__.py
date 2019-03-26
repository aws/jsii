import abc
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from jsii.python import classproperty

import scope.jsii_calc_base
import scope.jsii_calc_lib
__jsii_assembly__ = jsii.JSIIAssembly.load("jsii-calc", "0.8.0", __name__, "jsii-calc@0.8.0.jsii.tgz")
class AbstractClassBase(metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.AbstractClassBase"):
    @staticmethod
    def __jsii_proxy_class__():
        return _AbstractClassBaseProxy

    def __init__(self) -> None:
        jsii.create(AbstractClassBase, self, [])

    @property
    @jsii.member(jsii_name="abstractProperty")
    @abc.abstractmethod
    def abstract_property(self) -> str:
        ...


class _AbstractClassBaseProxy(AbstractClassBase):
    @property
    @jsii.member(jsii_name="abstractProperty")
    def abstract_property(self) -> str:
        return jsii.get(self, "abstractProperty")


class AbstractClassReturner(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AbstractClassReturner"):
    def __init__(self) -> None:
        jsii.create(AbstractClassReturner, self, [])

    @jsii.member(jsii_name="giveMeAbstract")
    def give_me_abstract(self) -> "AbstractClass":
        return jsii.invoke(self, "giveMeAbstract", [])

    @jsii.member(jsii_name="giveMeInterface")
    def give_me_interface(self) -> "InterfaceImplementedByAbstractClass":
        return jsii.invoke(self, "giveMeInterface", [])

    @property
    @jsii.member(jsii_name="returnAbstractFromProperty")
    def return_abstract_from_property(self) -> "AbstractClassBase":
        return jsii.get(self, "returnAbstractFromProperty")


class AllTypes(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AllTypes"):
    def __init__(self) -> None:
        jsii.create(AllTypes, self, [])

    @jsii.member(jsii_name="enumMethod")
    def enum_method(self, value: "StringEnum") -> "StringEnum":
        return jsii.invoke(self, "enumMethod", [value])

    @property
    @jsii.member(jsii_name="enumPropertyValue")
    def enum_property_value(self) -> jsii.Number:
        return jsii.get(self, "enumPropertyValue")

    @property
    @jsii.member(jsii_name="anyArrayProperty")
    def any_array_property(self) -> typing.List[typing.Any]:
        return jsii.get(self, "anyArrayProperty")

    @any_array_property.setter
    def any_array_property(self, value: typing.List[typing.Any]):
        return jsii.set(self, "anyArrayProperty", value)

    @property
    @jsii.member(jsii_name="anyMapProperty")
    def any_map_property(self) -> typing.Mapping[str,typing.Any]:
        return jsii.get(self, "anyMapProperty")

    @any_map_property.setter
    def any_map_property(self, value: typing.Mapping[str,typing.Any]):
        return jsii.set(self, "anyMapProperty", value)

    @property
    @jsii.member(jsii_name="anyProperty")
    def any_property(self) -> typing.Any:
        return jsii.get(self, "anyProperty")

    @any_property.setter
    def any_property(self, value: typing.Any):
        return jsii.set(self, "anyProperty", value)

    @property
    @jsii.member(jsii_name="arrayProperty")
    def array_property(self) -> typing.List[str]:
        return jsii.get(self, "arrayProperty")

    @array_property.setter
    def array_property(self, value: typing.List[str]):
        return jsii.set(self, "arrayProperty", value)

    @property
    @jsii.member(jsii_name="booleanProperty")
    def boolean_property(self) -> bool:
        return jsii.get(self, "booleanProperty")

    @boolean_property.setter
    def boolean_property(self, value: bool):
        return jsii.set(self, "booleanProperty", value)

    @property
    @jsii.member(jsii_name="dateProperty")
    def date_property(self) -> datetime.datetime:
        return jsii.get(self, "dateProperty")

    @date_property.setter
    def date_property(self, value: datetime.datetime):
        return jsii.set(self, "dateProperty", value)

    @property
    @jsii.member(jsii_name="enumProperty")
    def enum_property(self) -> "AllTypesEnum":
        return jsii.get(self, "enumProperty")

    @enum_property.setter
    def enum_property(self, value: "AllTypesEnum"):
        return jsii.set(self, "enumProperty", value)

    @property
    @jsii.member(jsii_name="jsonProperty")
    def json_property(self) -> typing.Mapping[typing.Any, typing.Any]:
        return jsii.get(self, "jsonProperty")

    @json_property.setter
    def json_property(self, value: typing.Mapping[typing.Any, typing.Any]):
        return jsii.set(self, "jsonProperty", value)

    @property
    @jsii.member(jsii_name="mapProperty")
    def map_property(self) -> typing.Mapping[str,scope.jsii_calc_lib.Number]:
        return jsii.get(self, "mapProperty")

    @map_property.setter
    def map_property(self, value: typing.Mapping[str,scope.jsii_calc_lib.Number]):
        return jsii.set(self, "mapProperty", value)

    @property
    @jsii.member(jsii_name="numberProperty")
    def number_property(self) -> jsii.Number:
        return jsii.get(self, "numberProperty")

    @number_property.setter
    def number_property(self, value: jsii.Number):
        return jsii.set(self, "numberProperty", value)

    @property
    @jsii.member(jsii_name="stringProperty")
    def string_property(self) -> str:
        return jsii.get(self, "stringProperty")

    @string_property.setter
    def string_property(self, value: str):
        return jsii.set(self, "stringProperty", value)

    @property
    @jsii.member(jsii_name="unionArrayProperty")
    def union_array_property(self) -> typing.List[typing.Union[jsii.Number, "composition.CompositeOperation"]]:
        return jsii.get(self, "unionArrayProperty")

    @union_array_property.setter
    def union_array_property(self, value: typing.List[typing.Union[jsii.Number, "composition.CompositeOperation"]]):
        return jsii.set(self, "unionArrayProperty", value)

    @property
    @jsii.member(jsii_name="unionMapProperty")
    def union_map_property(self) -> typing.Mapping[str,typing.Union[str, jsii.Number, scope.jsii_calc_lib.Number]]:
        return jsii.get(self, "unionMapProperty")

    @union_map_property.setter
    def union_map_property(self, value: typing.Mapping[str,typing.Union[str, jsii.Number, scope.jsii_calc_lib.Number]]):
        return jsii.set(self, "unionMapProperty", value)

    @property
    @jsii.member(jsii_name="unionProperty")
    def union_property(self) -> typing.Union[str, jsii.Number, "Multiply", scope.jsii_calc_lib.Number]:
        return jsii.get(self, "unionProperty")

    @union_property.setter
    def union_property(self, value: typing.Union[str, jsii.Number, "Multiply", scope.jsii_calc_lib.Number]):
        return jsii.set(self, "unionProperty", value)

    @property
    @jsii.member(jsii_name="unknownArrayProperty")
    def unknown_array_property(self) -> typing.List[typing.Any]:
        return jsii.get(self, "unknownArrayProperty")

    @unknown_array_property.setter
    def unknown_array_property(self, value: typing.List[typing.Any]):
        return jsii.set(self, "unknownArrayProperty", value)

    @property
    @jsii.member(jsii_name="unknownMapProperty")
    def unknown_map_property(self) -> typing.Mapping[str,typing.Any]:
        return jsii.get(self, "unknownMapProperty")

    @unknown_map_property.setter
    def unknown_map_property(self, value: typing.Mapping[str,typing.Any]):
        return jsii.set(self, "unknownMapProperty", value)

    @property
    @jsii.member(jsii_name="unknownProperty")
    def unknown_property(self) -> typing.Any:
        return jsii.get(self, "unknownProperty")

    @unknown_property.setter
    def unknown_property(self, value: typing.Any):
        return jsii.set(self, "unknownProperty", value)

    @property
    @jsii.member(jsii_name="optionalEnumValue")
    def optional_enum_value(self) -> typing.Optional["StringEnum"]:
        return jsii.get(self, "optionalEnumValue")

    @optional_enum_value.setter
    def optional_enum_value(self, value: typing.Optional["StringEnum"]):
        return jsii.set(self, "optionalEnumValue", value)


@jsii.enum(jsii_type="jsii-calc.AllTypesEnum")
class AllTypesEnum(enum.Enum):
    MyEnumValue = "MyEnumValue"
    YourEnumValue = "YourEnumValue"
    ThisIsGreat = "ThisIsGreat"

class AllowedMethodNames(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AllowedMethodNames"):
    def __init__(self) -> None:
        jsii.create(AllowedMethodNames, self, [])

    @jsii.member(jsii_name="getBar")
    def get_bar(self, _p1: str, _p2: jsii.Number) -> None:
        return jsii.invoke(self, "getBar", [_p1, _p2])

    @jsii.member(jsii_name="getFoo")
    def get_foo(self, with_param: str) -> str:
        return jsii.invoke(self, "getFoo", [with_param])

    @jsii.member(jsii_name="setBar")
    def set_bar(self, _x: str, _y: jsii.Number, _z: bool) -> None:
        return jsii.invoke(self, "setBar", [_x, _y, _z])

    @jsii.member(jsii_name="setFoo")
    def set_foo(self, _x: str, _y: jsii.Number) -> None:
        return jsii.invoke(self, "setFoo", [_x, _y])


class AsyncVirtualMethods(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.AsyncVirtualMethods"):
    def __init__(self) -> None:
        jsii.create(AsyncVirtualMethods, self, [])

    @jsii.member(jsii_name="callMe")
    def call_me(self) -> jsii.Number:
        return jsii.ainvoke(self, "callMe", [])

    @jsii.member(jsii_name="callMe2")
    def call_me2(self) -> jsii.Number:
        return jsii.ainvoke(self, "callMe2", [])

    @jsii.member(jsii_name="callMeDoublePromise")
    def call_me_double_promise(self) -> jsii.Number:
        return jsii.ainvoke(self, "callMeDoublePromise", [])

    @jsii.member(jsii_name="dontOverrideMe")
    def dont_override_me(self) -> jsii.Number:
        return jsii.invoke(self, "dontOverrideMe", [])

    @jsii.member(jsii_name="overrideMe")
    def override_me(self, mult: jsii.Number) -> jsii.Number:
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


@jsii.implements(scope.jsii_calc_lib.IFriendly)
class BinaryOperation(scope.jsii_calc_lib.Operation, metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.BinaryOperation"):
    @staticmethod
    def __jsii_proxy_class__():
        return _BinaryOperationProxy

    def __init__(self, lhs: scope.jsii_calc_lib.Value, rhs: scope.jsii_calc_lib.Value) -> None:
        jsii.create(BinaryOperation, self, [lhs, rhs])

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        return jsii.invoke(self, "hello", [])

    @property
    @jsii.member(jsii_name="lhs")
    def lhs(self) -> scope.jsii_calc_lib.Value:
        return jsii.get(self, "lhs")

    @property
    @jsii.member(jsii_name="rhs")
    def rhs(self) -> scope.jsii_calc_lib.Value:
        return jsii.get(self, "rhs")


class _BinaryOperationProxy(BinaryOperation, jsii.proxy_for(scope.jsii_calc_lib.Operation)):
    pass

class Add(BinaryOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Add"):
    def __init__(self, lhs: scope.jsii_calc_lib.Value, rhs: scope.jsii_calc_lib.Value) -> None:
        jsii.create(Add, self, [lhs, rhs])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        return jsii.invoke(self, "toString", [])

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        return jsii.get(self, "value")


@jsii.data_type(jsii_type="jsii-calc.CalculatorProps")
class CalculatorProps(jsii.compat.TypedDict, total=False):
    initialValue: jsii.Number
    maximumValue: jsii.Number

class ClassWithMutableObjectLiteralProperty(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ClassWithMutableObjectLiteralProperty"):
    def __init__(self) -> None:
        jsii.create(ClassWithMutableObjectLiteralProperty, self, [])

    @property
    @jsii.member(jsii_name="mutableObject")
    def mutable_object(self) -> "IMutableObjectLiteral":
        return jsii.get(self, "mutableObject")

    @mutable_object.setter
    def mutable_object(self, value: "IMutableObjectLiteral"):
        return jsii.set(self, "mutableObject", value)


class Constructors(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Constructors"):
    def __init__(self) -> None:
        jsii.create(Constructors, self, [])

    @jsii.member(jsii_name="makeClass")
    @classmethod
    def make_class(cls) -> "PublicClass":
        return jsii.sinvoke(cls, "makeClass", [])

    @jsii.member(jsii_name="makeInterface")
    @classmethod
    def make_interface(cls) -> "IPublicInterface":
        return jsii.sinvoke(cls, "makeInterface", [])


class ConsumersOfThisCrazyTypeSystem(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ConsumersOfThisCrazyTypeSystem"):
    def __init__(self) -> None:
        jsii.create(ConsumersOfThisCrazyTypeSystem, self, [])

    @jsii.member(jsii_name="consumeAnotherPublicInterface")
    def consume_another_public_interface(self, obj: "IAnotherPublicInterface") -> str:
        return jsii.invoke(self, "consumeAnotherPublicInterface", [obj])

    @jsii.member(jsii_name="consumeNonInternalInterface")
    def consume_non_internal_interface(self, obj: "INonInternalInterface") -> typing.Any:
        return jsii.invoke(self, "consumeNonInternalInterface", [obj])


class DefaultedConstructorArgument(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DefaultedConstructorArgument"):
    def __init__(self, arg1: typing.Optional[jsii.Number]=None, arg2: typing.Optional[str]=None, arg3: typing.Optional[datetime.datetime]=None) -> None:
        jsii.create(DefaultedConstructorArgument, self, [arg1, arg2, arg3])

    @property
    @jsii.member(jsii_name="arg1")
    def arg1(self) -> jsii.Number:
        return jsii.get(self, "arg1")

    @property
    @jsii.member(jsii_name="arg3")
    def arg3(self) -> datetime.datetime:
        return jsii.get(self, "arg3")

    @property
    @jsii.member(jsii_name="arg2")
    def arg2(self) -> typing.Optional[str]:
        return jsii.get(self, "arg2")


class DerivedClassHasNoProperties:
    class Base(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DerivedClassHasNoProperties.Base"):
        def __init__(self) -> None:
            jsii.create(DerivedClassHasNoProperties.Base, self, [])

        @property
        @jsii.member(jsii_name="prop")
        def prop(self) -> str:
            return jsii.get(self, "prop")

        @prop.setter
        def prop(self, value: str):
            return jsii.set(self, "prop", value)


    class Derived(Base, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DerivedClassHasNoProperties.Derived"):
        def __init__(self) -> None:
            jsii.create(DerivedClassHasNoProperties.Derived, self, [])



class _DerivedStruct(scope.jsii_calc_lib.MyFirstStruct, jsii.compat.TypedDict, total=False):
    anotherOptional: typing.Mapping[str,scope.jsii_calc_lib.Value]
    optionalAny: typing.Any
    optionalArray: typing.List[str]

@jsii.data_type(jsii_type="jsii-calc.DerivedStruct")
class DerivedStruct(_DerivedStruct):
    anotherRequired: datetime.datetime
    bool: bool
    nonPrimitive: "DoubleTrouble"

class DoNotOverridePrivates(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DoNotOverridePrivates"):
    def __init__(self) -> None:
        jsii.create(DoNotOverridePrivates, self, [])

    @jsii.member(jsii_name="changePrivatePropertyValue")
    def change_private_property_value(self, new_value: str) -> None:
        return jsii.invoke(self, "changePrivatePropertyValue", [new_value])

    @jsii.member(jsii_name="privateMethodValue")
    def private_method_value(self) -> str:
        return jsii.invoke(self, "privateMethodValue", [])

    @jsii.member(jsii_name="privatePropertyValue")
    def private_property_value(self) -> str:
        return jsii.invoke(self, "privatePropertyValue", [])


class DoNotRecognizeAnyAsOptional(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DoNotRecognizeAnyAsOptional"):
    def __init__(self) -> None:
        jsii.create(DoNotRecognizeAnyAsOptional, self, [])

    @jsii.member(jsii_name="method")
    def method(self, _required_any: typing.Any, _optional_any: typing.Any=None, _optional_string: typing.Optional[str]=None) -> None:
        return jsii.invoke(self, "method", [_required_any, _optional_any, _optional_string])


class DontComplainAboutVariadicAfterOptional(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DontComplainAboutVariadicAfterOptional"):
    def __init__(self) -> None:
        jsii.create(DontComplainAboutVariadicAfterOptional, self, [])

    @jsii.member(jsii_name="optionalAndVariadic")
    def optional_and_variadic(self, optional: typing.Optional[str], *things: str) -> str:
        return jsii.invoke(self, "optionalAndVariadic", [optional, things])


class EraseUndefinedHashValues(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.EraseUndefinedHashValues"):
    def __init__(self) -> None:
        jsii.create(EraseUndefinedHashValues, self, [])

    @jsii.member(jsii_name="doesKeyExist")
    @classmethod
    def does_key_exist(cls, opts: "EraseUndefinedHashValuesOptions", key: str) -> bool:
        return jsii.sinvoke(cls, "doesKeyExist", [opts, key])

    @jsii.member(jsii_name="prop1IsNull")
    @classmethod
    def prop1_is_null(cls) -> typing.Any:
        return jsii.sinvoke(cls, "prop1IsNull", [])

    @jsii.member(jsii_name="prop2IsUndefined")
    @classmethod
    def prop2_is_undefined(cls) -> typing.Any:
        return jsii.sinvoke(cls, "prop2IsUndefined", [])


@jsii.data_type(jsii_type="jsii-calc.EraseUndefinedHashValuesOptions")
class EraseUndefinedHashValuesOptions(jsii.compat.TypedDict, total=False):
    option1: str
    option2: str

class ExportedBaseClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ExportedBaseClass"):
    def __init__(self, success: bool) -> None:
        jsii.create(ExportedBaseClass, self, [success])

    @property
    @jsii.member(jsii_name="success")
    def success(self) -> bool:
        return jsii.get(self, "success")


@jsii.data_type(jsii_type="jsii-calc.ExtendsInternalInterface")
class ExtendsInternalInterface(jsii.compat.TypedDict):
    boom: bool

@jsii.data_type(jsii_type="jsii-calc.ExtendsPrivateInterface")
class ExtendsPrivateInterface(jsii.compat.TypedDict):
    moreThings: typing.List[str]

class GiveMeStructs(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.GiveMeStructs"):
    def __init__(self) -> None:
        jsii.create(GiveMeStructs, self, [])

    @jsii.member(jsii_name="derivedToFirst")
    def derived_to_first(self, *, another_required: datetime.datetime, bool: bool, non_primitive: "DoubleTrouble", another_optional: typing.Optional[typing.Mapping[str,scope.jsii_calc_lib.Value]]=None, optional_any: typing.Any=None, optional_array: typing.Optional[typing.List[str]]=None) -> scope.jsii_calc_lib.MyFirstStruct:
        derived: DerivedStruct = {"anotherRequired": another_required, "bool": bool, "nonPrimitive": non_primitive}

        if another_optional is not None:
            derived["anotherOptional"] = another_optional

        if optional_any is not None:
            derived["optionalAny"] = optional_any

        if optional_array is not None:
            derived["optionalArray"] = optional_array

        return jsii.invoke(self, "derivedToFirst", [derived])

    @jsii.member(jsii_name="readDerivedNonPrimitive")
    def read_derived_non_primitive(self, *, another_required: datetime.datetime, bool: bool, non_primitive: "DoubleTrouble", another_optional: typing.Optional[typing.Mapping[str,scope.jsii_calc_lib.Value]]=None, optional_any: typing.Any=None, optional_array: typing.Optional[typing.List[str]]=None) -> "DoubleTrouble":
        derived: DerivedStruct = {"anotherRequired": another_required, "bool": bool, "nonPrimitive": non_primitive}

        if another_optional is not None:
            derived["anotherOptional"] = another_optional

        if optional_any is not None:
            derived["optionalAny"] = optional_any

        if optional_array is not None:
            derived["optionalArray"] = optional_array

        return jsii.invoke(self, "readDerivedNonPrimitive", [derived])

    @jsii.member(jsii_name="readFirstNumber")
    def read_first_number(self, *, anumber: jsii.Number, astring: str, first_optional: typing.Optional[typing.List[str]]=None) -> jsii.Number:
        first: scope.jsii_calc_lib.MyFirstStruct = {"anumber": anumber, "astring": astring}

        if first_optional is not None:
            first["firstOptional"] = first_optional

        return jsii.invoke(self, "readFirstNumber", [first])

    @property
    @jsii.member(jsii_name="structLiteral")
    def struct_literal(self) -> scope.jsii_calc_lib.StructWithOnlyOptionals:
        return jsii.get(self, "structLiteral")


class GreetingAugmenter(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.GreetingAugmenter"):
    def __init__(self) -> None:
        jsii.create(GreetingAugmenter, self, [])

    @jsii.member(jsii_name="betterGreeting")
    def better_greeting(self, friendly: scope.jsii_calc_lib.IFriendly) -> str:
        return jsii.invoke(self, "betterGreeting", [friendly])


@jsii.interface(jsii_type="jsii-calc.IAnotherPublicInterface")
class IAnotherPublicInterface(jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IAnotherPublicInterfaceProxy

    @property
    @jsii.member(jsii_name="a")
    def a(self) -> str:
        ...

    @a.setter
    def a(self, value: str):
        ...


class _IAnotherPublicInterfaceProxy():
    __jsii_type__ = "jsii-calc.IAnotherPublicInterface"
    @property
    @jsii.member(jsii_name="a")
    def a(self) -> str:
        return jsii.get(self, "a")

    @a.setter
    def a(self, value: str):
        return jsii.set(self, "a", value)


@jsii.interface(jsii_type="jsii-calc.IFriendlier")
class IFriendlier(scope.jsii_calc_lib.IFriendly, jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IFriendlierProxy

    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        ...

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        ...


class _IFriendlierProxy(jsii.proxy_for(scope.jsii_calc_lib.IFriendly)):
    __jsii_type__ = "jsii-calc.IFriendlier"
    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        return jsii.invoke(self, "farewell", [])

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        return jsii.invoke(self, "goodbye", [])


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithInternal")
class IInterfaceWithInternal(jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithInternalProxy

    @jsii.member(jsii_name="visible")
    def visible(self) -> None:
        ...


class _IInterfaceWithInternalProxy():
    __jsii_type__ = "jsii-calc.IInterfaceWithInternal"
    @jsii.member(jsii_name="visible")
    def visible(self) -> None:
        return jsii.invoke(self, "visible", [])


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithMethods")
class IInterfaceWithMethods(jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithMethodsProxy

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> str:
        ...

    @jsii.member(jsii_name="doThings")
    def do_things(self) -> None:
        ...


class _IInterfaceWithMethodsProxy():
    __jsii_type__ = "jsii-calc.IInterfaceWithMethods"
    @property
    @jsii.member(jsii_name="value")
    def value(self) -> str:
        return jsii.get(self, "value")

    @jsii.member(jsii_name="doThings")
    def do_things(self) -> None:
        return jsii.invoke(self, "doThings", [])


@jsii.interface(jsii_type="jsii-calc.IInterfaceThatShouldNotBeADataType")
class IInterfaceThatShouldNotBeADataType(IInterfaceWithMethods, jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceThatShouldNotBeADataTypeProxy

    @property
    @jsii.member(jsii_name="otherValue")
    def other_value(self) -> str:
        ...


class _IInterfaceThatShouldNotBeADataTypeProxy(jsii.proxy_for(IInterfaceWithMethods)):
    __jsii_type__ = "jsii-calc.IInterfaceThatShouldNotBeADataType"
    @property
    @jsii.member(jsii_name="otherValue")
    def other_value(self) -> str:
        return jsii.get(self, "otherValue")


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithOptionalMethodArguments")
class IInterfaceWithOptionalMethodArguments(jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithOptionalMethodArgumentsProxy

    @jsii.member(jsii_name="hello")
    def hello(self, arg1: str, arg2: typing.Optional[jsii.Number]=None) -> None:
        ...


class _IInterfaceWithOptionalMethodArgumentsProxy():
    __jsii_type__ = "jsii-calc.IInterfaceWithOptionalMethodArguments"
    @jsii.member(jsii_name="hello")
    def hello(self, arg1: str, arg2: typing.Optional[jsii.Number]=None) -> None:
        return jsii.invoke(self, "hello", [arg1, arg2])


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithProperties")
class IInterfaceWithProperties(jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithPropertiesProxy

    @property
    @jsii.member(jsii_name="readOnlyString")
    def read_only_string(self) -> str:
        ...

    @property
    @jsii.member(jsii_name="readWriteString")
    def read_write_string(self) -> str:
        ...

    @read_write_string.setter
    def read_write_string(self, value: str):
        ...


class _IInterfaceWithPropertiesProxy():
    __jsii_type__ = "jsii-calc.IInterfaceWithProperties"
    @property
    @jsii.member(jsii_name="readOnlyString")
    def read_only_string(self) -> str:
        return jsii.get(self, "readOnlyString")

    @property
    @jsii.member(jsii_name="readWriteString")
    def read_write_string(self) -> str:
        return jsii.get(self, "readWriteString")

    @read_write_string.setter
    def read_write_string(self, value: str):
        return jsii.set(self, "readWriteString", value)


@jsii.implements(IInterfaceWithProperties)
class ClassWithPrivateConstructorAndAutomaticProperties(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties"):
    @jsii.member(jsii_name="create")
    @classmethod
    def create(cls, read_only_string: str, read_write_string: str) -> "ClassWithPrivateConstructorAndAutomaticProperties":
        return jsii.sinvoke(cls, "create", [read_only_string, read_write_string])

    @property
    @jsii.member(jsii_name="readOnlyString")
    def read_only_string(self) -> str:
        return jsii.get(self, "readOnlyString")

    @property
    @jsii.member(jsii_name="readWriteString")
    def read_write_string(self) -> str:
        return jsii.get(self, "readWriteString")

    @read_write_string.setter
    def read_write_string(self, value: str):
        return jsii.set(self, "readWriteString", value)


@jsii.interface(jsii_type="jsii-calc.IInterfaceWithPropertiesExtension")
class IInterfaceWithPropertiesExtension(IInterfaceWithProperties, jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithPropertiesExtensionProxy

    @property
    @jsii.member(jsii_name="foo")
    def foo(self) -> jsii.Number:
        ...

    @foo.setter
    def foo(self, value: jsii.Number):
        ...


class _IInterfaceWithPropertiesExtensionProxy(jsii.proxy_for(IInterfaceWithProperties)):
    __jsii_type__ = "jsii-calc.IInterfaceWithPropertiesExtension"
    @property
    @jsii.member(jsii_name="foo")
    def foo(self) -> jsii.Number:
        return jsii.get(self, "foo")

    @foo.setter
    def foo(self, value: jsii.Number):
        return jsii.set(self, "foo", value)


@jsii.interface(jsii_type="jsii-calc.IMutableObjectLiteral")
class IMutableObjectLiteral(jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IMutableObjectLiteralProxy

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> str:
        ...

    @value.setter
    def value(self, value: str):
        ...


class _IMutableObjectLiteralProxy():
    __jsii_type__ = "jsii-calc.IMutableObjectLiteral"
    @property
    @jsii.member(jsii_name="value")
    def value(self) -> str:
        return jsii.get(self, "value")

    @value.setter
    def value(self, value: str):
        return jsii.set(self, "value", value)


@jsii.interface(jsii_type="jsii-calc.INonInternalInterface")
class INonInternalInterface(IAnotherPublicInterface, jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _INonInternalInterfaceProxy

    @property
    @jsii.member(jsii_name="c")
    def c(self) -> str:
        ...

    @c.setter
    def c(self, value: str):
        ...


class _INonInternalInterfaceProxy(jsii.proxy_for(IAnotherPublicInterface)):
    __jsii_type__ = "jsii-calc.INonInternalInterface"
    @property
    @jsii.member(jsii_name="c")
    def c(self) -> str:
        return jsii.get(self, "c")

    @c.setter
    def c(self, value: str):
        return jsii.set(self, "c", value)


@jsii.implements(INonInternalInterface)
class ClassThatImplementsTheInternalInterface(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ClassThatImplementsTheInternalInterface"):
    def __init__(self) -> None:
        jsii.create(ClassThatImplementsTheInternalInterface, self, [])

    @property
    @jsii.member(jsii_name="a")
    def a(self) -> str:
        return jsii.get(self, "a")

    @a.setter
    def a(self, value: str):
        return jsii.set(self, "a", value)

    @property
    @jsii.member(jsii_name="b")
    def b(self) -> str:
        return jsii.get(self, "b")

    @b.setter
    def b(self, value: str):
        return jsii.set(self, "b", value)

    @property
    @jsii.member(jsii_name="c")
    def c(self) -> str:
        return jsii.get(self, "c")

    @c.setter
    def c(self, value: str):
        return jsii.set(self, "c", value)

    @property
    @jsii.member(jsii_name="d")
    def d(self) -> str:
        return jsii.get(self, "d")

    @d.setter
    def d(self, value: str):
        return jsii.set(self, "d", value)


@jsii.implements(INonInternalInterface)
class ClassThatImplementsThePrivateInterface(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ClassThatImplementsThePrivateInterface"):
    def __init__(self) -> None:
        jsii.create(ClassThatImplementsThePrivateInterface, self, [])

    @property
    @jsii.member(jsii_name="a")
    def a(self) -> str:
        return jsii.get(self, "a")

    @a.setter
    def a(self, value: str):
        return jsii.set(self, "a", value)

    @property
    @jsii.member(jsii_name="b")
    def b(self) -> str:
        return jsii.get(self, "b")

    @b.setter
    def b(self, value: str):
        return jsii.set(self, "b", value)

    @property
    @jsii.member(jsii_name="c")
    def c(self) -> str:
        return jsii.get(self, "c")

    @c.setter
    def c(self, value: str):
        return jsii.set(self, "c", value)

    @property
    @jsii.member(jsii_name="e")
    def e(self) -> str:
        return jsii.get(self, "e")

    @e.setter
    def e(self, value: str):
        return jsii.set(self, "e", value)


@jsii.interface(jsii_type="jsii-calc.IPrivatelyImplemented")
class IPrivatelyImplemented(jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IPrivatelyImplementedProxy

    @property
    @jsii.member(jsii_name="success")
    def success(self) -> bool:
        ...


class _IPrivatelyImplementedProxy():
    __jsii_type__ = "jsii-calc.IPrivatelyImplemented"
    @property
    @jsii.member(jsii_name="success")
    def success(self) -> bool:
        return jsii.get(self, "success")


@jsii.interface(jsii_type="jsii-calc.IPublicInterface")
class IPublicInterface(jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IPublicInterfaceProxy

    @jsii.member(jsii_name="bye")
    def bye(self) -> None:
        ...


class _IPublicInterfaceProxy():
    __jsii_type__ = "jsii-calc.IPublicInterface"
    @jsii.member(jsii_name="bye")
    def bye(self) -> None:
        return jsii.invoke(self, "bye", [])


@jsii.interface(jsii_type="jsii-calc.IRandomNumberGenerator")
class IRandomNumberGenerator(jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IRandomNumberGeneratorProxy

    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        ...


class _IRandomNumberGeneratorProxy():
    __jsii_type__ = "jsii-calc.IRandomNumberGenerator"
    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        return jsii.invoke(self, "next", [])


@jsii.interface(jsii_type="jsii-calc.IFriendlyRandomGenerator")
class IFriendlyRandomGenerator(IRandomNumberGenerator, scope.jsii_calc_lib.IFriendly, jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IFriendlyRandomGeneratorProxy

    pass

class _IFriendlyRandomGeneratorProxy(jsii.proxy_for(IRandomNumberGenerator), jsii.proxy_for(scope.jsii_calc_lib.IFriendly)):
    __jsii_type__ = "jsii-calc.IFriendlyRandomGenerator"
    pass

@jsii.implements(IFriendlyRandomGenerator)
class DoubleTrouble(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DoubleTrouble"):
    def __init__(self) -> None:
        jsii.create(DoubleTrouble, self, [])

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        return jsii.invoke(self, "hello", [])

    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        return jsii.invoke(self, "next", [])


@jsii.interface(jsii_type="jsii-calc.IReturnsNumber")
class IReturnsNumber(jsii.compat.Protocol):
    @staticmethod
    def __jsii_proxy_class__():
        return _IReturnsNumberProxy

    @property
    @jsii.member(jsii_name="numberProp")
    def number_prop(self) -> scope.jsii_calc_lib.Number:
        ...

    @jsii.member(jsii_name="obtainNumber")
    def obtain_number(self) -> scope.jsii_calc_lib.IDoublable:
        ...


class _IReturnsNumberProxy():
    __jsii_type__ = "jsii-calc.IReturnsNumber"
    @property
    @jsii.member(jsii_name="numberProp")
    def number_prop(self) -> scope.jsii_calc_lib.Number:
        return jsii.get(self, "numberProp")

    @jsii.member(jsii_name="obtainNumber")
    def obtain_number(self) -> scope.jsii_calc_lib.IDoublable:
        return jsii.invoke(self, "obtainNumber", [])


class ImplementInternalInterface(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ImplementInternalInterface"):
    def __init__(self) -> None:
        jsii.create(ImplementInternalInterface, self, [])

    @property
    @jsii.member(jsii_name="prop")
    def prop(self) -> str:
        return jsii.get(self, "prop")

    @prop.setter
    def prop(self, value: str):
        return jsii.set(self, "prop", value)


@jsii.implements(IInterfaceWithInternal)
class ImplementsInterfaceWithInternal(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ImplementsInterfaceWithInternal"):
    def __init__(self) -> None:
        jsii.create(ImplementsInterfaceWithInternal, self, [])

    @jsii.member(jsii_name="visible")
    def visible(self) -> None:
        return jsii.invoke(self, "visible", [])


class ImplementsInterfaceWithInternalSubclass(ImplementsInterfaceWithInternal, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ImplementsInterfaceWithInternalSubclass"):
    def __init__(self) -> None:
        jsii.create(ImplementsInterfaceWithInternalSubclass, self, [])


class ImplementsPrivateInterface(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ImplementsPrivateInterface"):
    def __init__(self) -> None:
        jsii.create(ImplementsPrivateInterface, self, [])

    @property
    @jsii.member(jsii_name="private")
    def private(self) -> str:
        return jsii.get(self, "private")

    @private.setter
    def private(self, value: str):
        return jsii.set(self, "private", value)


@jsii.data_type(jsii_type="jsii-calc.ImplictBaseOfBase")
class ImplictBaseOfBase(scope.jsii_calc_base.BaseProps, jsii.compat.TypedDict):
    goo: datetime.datetime

@jsii.data_type(jsii_type="jsii-calc.InterfaceImplementedByAbstractClass")
class InterfaceImplementedByAbstractClass(jsii.compat.TypedDict):
    propFromInterface: str

@jsii.implements(InterfaceImplementedByAbstractClass)
class AbstractClass(AbstractClassBase, metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.AbstractClass"):
    @staticmethod
    def __jsii_proxy_class__():
        return _AbstractClassProxy

    def __init__(self) -> None:
        jsii.create(AbstractClass, self, [])

    @jsii.member(jsii_name="abstractMethod")
    @abc.abstractmethod
    def abstract_method(self, name: str) -> str:
        ...

    @jsii.member(jsii_name="nonAbstractMethod")
    def non_abstract_method(self) -> jsii.Number:
        return jsii.invoke(self, "nonAbstractMethod", [])

    @property
    @jsii.member(jsii_name="propFromInterface")
    def prop_from_interface(self) -> str:
        return jsii.get(self, "propFromInterface")


class _AbstractClassProxy(AbstractClass, jsii.proxy_for(AbstractClassBase)):
    @jsii.member(jsii_name="abstractMethod")
    def abstract_method(self, name: str) -> str:
        return jsii.invoke(self, "abstractMethod", [name])


class InterfaceInNamespaceIncludesClasses:
    class Foo(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.InterfaceInNamespaceIncludesClasses.Foo"):
        def __init__(self) -> None:
            jsii.create(InterfaceInNamespaceIncludesClasses.Foo, self, [])

        @property
        @jsii.member(jsii_name="bar")
        def bar(self) -> typing.Optional[str]:
            return jsii.get(self, "bar")

        @bar.setter
        def bar(self, value: typing.Optional[str]):
            return jsii.set(self, "bar", value)


    @jsii.data_type(jsii_type="jsii-calc.InterfaceInNamespaceIncludesClasses.Hello")
    class Hello(jsii.compat.TypedDict):
        foo: jsii.Number


class InterfaceInNamespaceOnlyInterface:
    @jsii.data_type(jsii_type="jsii-calc.InterfaceInNamespaceOnlyInterface.Hello")
    class Hello(jsii.compat.TypedDict):
        foo: jsii.Number


class JSObjectLiteralForInterface(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JSObjectLiteralForInterface"):
    def __init__(self) -> None:
        jsii.create(JSObjectLiteralForInterface, self, [])

    @jsii.member(jsii_name="giveMeFriendly")
    def give_me_friendly(self) -> scope.jsii_calc_lib.IFriendly:
        return jsii.invoke(self, "giveMeFriendly", [])

    @jsii.member(jsii_name="giveMeFriendlyGenerator")
    def give_me_friendly_generator(self) -> "IFriendlyRandomGenerator":
        return jsii.invoke(self, "giveMeFriendlyGenerator", [])


class JSObjectLiteralToNative(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JSObjectLiteralToNative"):
    def __init__(self) -> None:
        jsii.create(JSObjectLiteralToNative, self, [])

    @jsii.member(jsii_name="returnLiteral")
    def return_literal(self) -> "JSObjectLiteralToNativeClass":
        return jsii.invoke(self, "returnLiteral", [])


class JSObjectLiteralToNativeClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JSObjectLiteralToNativeClass"):
    def __init__(self) -> None:
        jsii.create(JSObjectLiteralToNativeClass, self, [])

    @property
    @jsii.member(jsii_name="propA")
    def prop_a(self) -> str:
        return jsii.get(self, "propA")

    @prop_a.setter
    def prop_a(self, value: str):
        return jsii.set(self, "propA", value)

    @property
    @jsii.member(jsii_name="propB")
    def prop_b(self) -> jsii.Number:
        return jsii.get(self, "propB")

    @prop_b.setter
    def prop_b(self, value: jsii.Number):
        return jsii.set(self, "propB", value)


class JavaReservedWords(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JavaReservedWords"):
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

    @property
    @jsii.member(jsii_name="while")
    def while_(self) -> str:
        return jsii.get(self, "while")

    @while_.setter
    def while_(self, value: str):
        return jsii.set(self, "while", value)


class JsiiAgent(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.JsiiAgent"):
    def __init__(self) -> None:
        jsii.create(JsiiAgent, self, [])

    @classproperty
    @jsii.member(jsii_name="jsiiAgent")
    def jsii_agent(cls) -> typing.Optional[str]:
        return jsii.sget(cls, "jsiiAgent")


@jsii.data_type(jsii_type="jsii-calc.LoadBalancedFargateServiceProps")
class LoadBalancedFargateServiceProps(jsii.compat.TypedDict, total=False):
    containerPort: jsii.Number
    cpu: str
    memoryMiB: str
    publicLoadBalancer: bool
    publicTasks: bool

@jsii.implements(IFriendlier, IRandomNumberGenerator)
class Multiply(BinaryOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Multiply"):
    def __init__(self, lhs: scope.jsii_calc_lib.Value, rhs: scope.jsii_calc_lib.Value) -> None:
        jsii.create(Multiply, self, [lhs, rhs])

    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        return jsii.invoke(self, "farewell", [])

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        return jsii.invoke(self, "goodbye", [])

    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        return jsii.invoke(self, "next", [])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        return jsii.invoke(self, "toString", [])

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        return jsii.get(self, "value")


class NodeStandardLibrary(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.NodeStandardLibrary"):
    def __init__(self) -> None:
        jsii.create(NodeStandardLibrary, self, [])

    @jsii.member(jsii_name="cryptoSha256")
    def crypto_sha256(self) -> str:
        return jsii.invoke(self, "cryptoSha256", [])

    @jsii.member(jsii_name="fsReadFile")
    def fs_read_file(self) -> str:
        return jsii.ainvoke(self, "fsReadFile", [])

    @jsii.member(jsii_name="fsReadFileSync")
    def fs_read_file_sync(self) -> str:
        return jsii.invoke(self, "fsReadFileSync", [])

    @property
    @jsii.member(jsii_name="osPlatform")
    def os_platform(self) -> str:
        return jsii.get(self, "osPlatform")


class NullShouldBeTreatedAsUndefined(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.NullShouldBeTreatedAsUndefined"):
    def __init__(self, _param1: str, optional: typing.Any=None) -> None:
        jsii.create(NullShouldBeTreatedAsUndefined, self, [_param1, optional])

    @jsii.member(jsii_name="giveMeUndefined")
    def give_me_undefined(self, value: typing.Any=None) -> None:
        return jsii.invoke(self, "giveMeUndefined", [value])

    @jsii.member(jsii_name="giveMeUndefinedInsideAnObject")
    def give_me_undefined_inside_an_object(self, *, array_with_three_elements_and_undefined_as_second_argument: typing.List[typing.Any], this_should_be_undefined: typing.Any=None) -> None:
        input: NullShouldBeTreatedAsUndefinedData = {"arrayWithThreeElementsAndUndefinedAsSecondArgument": array_with_three_elements_and_undefined_as_second_argument}

        if this_should_be_undefined is not None:
            input["thisShouldBeUndefined"] = this_should_be_undefined

        return jsii.invoke(self, "giveMeUndefinedInsideAnObject", [input])

    @jsii.member(jsii_name="verifyPropertyIsUndefined")
    def verify_property_is_undefined(self) -> None:
        return jsii.invoke(self, "verifyPropertyIsUndefined", [])

    @property
    @jsii.member(jsii_name="changeMeToUndefined")
    def change_me_to_undefined(self) -> typing.Optional[str]:
        return jsii.get(self, "changeMeToUndefined")

    @change_me_to_undefined.setter
    def change_me_to_undefined(self, value: typing.Optional[str]):
        return jsii.set(self, "changeMeToUndefined", value)


class _NullShouldBeTreatedAsUndefinedData(jsii.compat.TypedDict, total=False):
    thisShouldBeUndefined: typing.Any

@jsii.data_type(jsii_type="jsii-calc.NullShouldBeTreatedAsUndefinedData")
class NullShouldBeTreatedAsUndefinedData(_NullShouldBeTreatedAsUndefinedData):
    arrayWithThreeElementsAndUndefinedAsSecondArgument: typing.List[typing.Any]

class NumberGenerator(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.NumberGenerator"):
    def __init__(self, generator: "IRandomNumberGenerator") -> None:
        jsii.create(NumberGenerator, self, [generator])

    @jsii.member(jsii_name="isSameGenerator")
    def is_same_generator(self, gen: "IRandomNumberGenerator") -> bool:
        return jsii.invoke(self, "isSameGenerator", [gen])

    @jsii.member(jsii_name="nextTimes100")
    def next_times100(self) -> jsii.Number:
        return jsii.invoke(self, "nextTimes100", [])

    @property
    @jsii.member(jsii_name="generator")
    def generator(self) -> "IRandomNumberGenerator":
        return jsii.get(self, "generator")

    @generator.setter
    def generator(self, value: "IRandomNumberGenerator"):
        return jsii.set(self, "generator", value)


class ObjectRefsInCollections(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ObjectRefsInCollections"):
    def __init__(self) -> None:
        jsii.create(ObjectRefsInCollections, self, [])

    @jsii.member(jsii_name="sumFromArray")
    def sum_from_array(self, values: typing.List[scope.jsii_calc_lib.Value]) -> jsii.Number:
        return jsii.invoke(self, "sumFromArray", [values])

    @jsii.member(jsii_name="sumFromMap")
    def sum_from_map(self, values: typing.Mapping[str,scope.jsii_calc_lib.Value]) -> jsii.Number:
        return jsii.invoke(self, "sumFromMap", [values])


class OptionalConstructorArgument(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.OptionalConstructorArgument"):
    def __init__(self, arg1: jsii.Number, arg2: str, arg3: typing.Optional[datetime.datetime]=None) -> None:
        jsii.create(OptionalConstructorArgument, self, [arg1, arg2, arg3])

    @property
    @jsii.member(jsii_name="arg1")
    def arg1(self) -> jsii.Number:
        return jsii.get(self, "arg1")

    @property
    @jsii.member(jsii_name="arg2")
    def arg2(self) -> str:
        return jsii.get(self, "arg2")

    @property
    @jsii.member(jsii_name="arg3")
    def arg3(self) -> typing.Optional[datetime.datetime]:
        return jsii.get(self, "arg3")


class OverrideReturnsObject(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.OverrideReturnsObject"):
    def __init__(self) -> None:
        jsii.create(OverrideReturnsObject, self, [])

    @jsii.member(jsii_name="test")
    def test(self, obj: "IReturnsNumber") -> jsii.Number:
        return jsii.invoke(self, "test", [obj])


class Polymorphism(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Polymorphism"):
    def __init__(self) -> None:
        jsii.create(Polymorphism, self, [])

    @jsii.member(jsii_name="sayHello")
    def say_hello(self, friendly: scope.jsii_calc_lib.IFriendly) -> str:
        return jsii.invoke(self, "sayHello", [friendly])


class PublicClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.PublicClass"):
    def __init__(self) -> None:
        jsii.create(PublicClass, self, [])

    @jsii.member(jsii_name="hello")
    def hello(self) -> None:
        return jsii.invoke(self, "hello", [])


class InbetweenClass(PublicClass, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.InbetweenClass"):
    def __init__(self) -> None:
        jsii.create(InbetweenClass, self, [])


class PythonReservedWords(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.PythonReservedWords"):
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


class ReferenceEnumFromScopedPackage(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ReferenceEnumFromScopedPackage"):
    def __init__(self) -> None:
        jsii.create(ReferenceEnumFromScopedPackage, self, [])

    @jsii.member(jsii_name="loadFoo")
    def load_foo(self) -> typing.Optional[scope.jsii_calc_lib.EnumFromScopedModule]:
        return jsii.invoke(self, "loadFoo", [])

    @jsii.member(jsii_name="saveFoo")
    def save_foo(self, value: scope.jsii_calc_lib.EnumFromScopedModule) -> None:
        return jsii.invoke(self, "saveFoo", [value])

    @property
    @jsii.member(jsii_name="foo")
    def foo(self) -> typing.Optional[scope.jsii_calc_lib.EnumFromScopedModule]:
        return jsii.get(self, "foo")

    @foo.setter
    def foo(self, value: typing.Optional[scope.jsii_calc_lib.EnumFromScopedModule]):
        return jsii.set(self, "foo", value)


class ReturnsPrivateImplementationOfInterface(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.ReturnsPrivateImplementationOfInterface"):
    def __init__(self) -> None:
        jsii.create(ReturnsPrivateImplementationOfInterface, self, [])

    @property
    @jsii.member(jsii_name="privateImplementation")
    def private_implementation(self) -> "IPrivatelyImplemented":
        return jsii.get(self, "privateImplementation")


class RuntimeTypeChecking(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.RuntimeTypeChecking"):
    def __init__(self) -> None:
        jsii.create(RuntimeTypeChecking, self, [])

    @jsii.member(jsii_name="methodWithDefaultedArguments")
    def method_with_defaulted_arguments(self, arg1: typing.Optional[jsii.Number]=None, arg2: typing.Optional[str]=None, arg3: typing.Optional[datetime.datetime]=None) -> None:
        return jsii.invoke(self, "methodWithDefaultedArguments", [arg1, arg2, arg3])

    @jsii.member(jsii_name="methodWithOptionalAnyArgument")
    def method_with_optional_any_argument(self, arg: typing.Any=None) -> None:
        return jsii.invoke(self, "methodWithOptionalAnyArgument", [arg])

    @jsii.member(jsii_name="methodWithOptionalArguments")
    def method_with_optional_arguments(self, arg1: jsii.Number, arg2: str, arg3: typing.Optional[datetime.datetime]=None) -> None:
        return jsii.invoke(self, "methodWithOptionalArguments", [arg1, arg2, arg3])


class Statics(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Statics"):
    def __init__(self, value: str) -> None:
        jsii.create(Statics, self, [value])

    @jsii.member(jsii_name="staticMethod")
    @classmethod
    def static_method(cls, name: str) -> str:
        return jsii.sinvoke(cls, "staticMethod", [name])

    @jsii.member(jsii_name="justMethod")
    def just_method(self) -> str:
        return jsii.invoke(self, "justMethod", [])

    @classproperty
    @jsii.member(jsii_name="BAR")
    def BAR(cls) -> jsii.Number:
        return jsii.sget(cls, "BAR")

    @classproperty
    @jsii.member(jsii_name="ConstObj")
    def CONST_OBJ(cls) -> "DoubleTrouble":
        return jsii.sget(cls, "ConstObj")

    @classproperty
    @jsii.member(jsii_name="Foo")
    def FOO(cls) -> str:
        return jsii.sget(cls, "Foo")

    @classproperty
    @jsii.member(jsii_name="zooBar")
    def ZOO_BAR(cls) -> typing.Mapping[str,str]:
        return jsii.sget(cls, "zooBar")

    @classproperty
    @jsii.member(jsii_name="instance")
    def instance(cls) -> "Statics":
        return jsii.sget(cls, "instance")

    @instance.setter
    def instance(cls, value: "Statics"):
        return jsii.sset(cls, "instance", value)

    @classproperty
    @jsii.member(jsii_name="nonConstStatic")
    def non_const_static(cls) -> jsii.Number:
        return jsii.sget(cls, "nonConstStatic")

    @non_const_static.setter
    def non_const_static(cls, value: jsii.Number):
        return jsii.sset(cls, "nonConstStatic", value)

    @property
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

    @property
    @jsii.member(jsii_name="youSeeMe")
    def you_see_me(self) -> str:
        return jsii.get(self, "youSeeMe")

    @you_see_me.setter
    def you_see_me(self, value: str):
        return jsii.set(self, "youSeeMe", value)


class SyncVirtualMethods(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.SyncVirtualMethods"):
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
        return jsii.invoke(self, "modifyOtherProperty", [value])

    @jsii.member(jsii_name="modifyValueOfTheProperty")
    def modify_value_of_the_property(self, value: str) -> None:
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
        return jsii.invoke(self, "virtualMethod", [n])

    @jsii.member(jsii_name="writeA")
    def write_a(self, value: jsii.Number) -> None:
        return jsii.invoke(self, "writeA", [value])

    @property
    @jsii.member(jsii_name="readonlyProperty")
    def readonly_property(self) -> str:
        return jsii.get(self, "readonlyProperty")

    @property
    @jsii.member(jsii_name="a")
    def a(self) -> jsii.Number:
        return jsii.get(self, "a")

    @a.setter
    def a(self, value: jsii.Number):
        return jsii.set(self, "a", value)

    @property
    @jsii.member(jsii_name="callerIsProperty")
    def caller_is_property(self) -> jsii.Number:
        return jsii.get(self, "callerIsProperty")

    @caller_is_property.setter
    def caller_is_property(self, value: jsii.Number):
        return jsii.set(self, "callerIsProperty", value)

    @property
    @jsii.member(jsii_name="otherProperty")
    def other_property(self) -> str:
        return jsii.get(self, "otherProperty")

    @other_property.setter
    def other_property(self, value: str):
        return jsii.set(self, "otherProperty", value)

    @property
    @jsii.member(jsii_name="theProperty")
    def the_property(self) -> str:
        return jsii.get(self, "theProperty")

    @the_property.setter
    def the_property(self, value: str):
        return jsii.set(self, "theProperty", value)

    @property
    @jsii.member(jsii_name="valueOfOtherProperty")
    def value_of_other_property(self) -> str:
        return jsii.get(self, "valueOfOtherProperty")

    @value_of_other_property.setter
    def value_of_other_property(self, value: str):
        return jsii.set(self, "valueOfOtherProperty", value)


class Thrower(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Thrower"):
    def __init__(self) -> None:
        jsii.create(Thrower, self, [])

    @jsii.member(jsii_name="throwError")
    def throw_error(self) -> None:
        return jsii.invoke(self, "throwError", [])


class UnaryOperation(scope.jsii_calc_lib.Operation, metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.UnaryOperation"):
    @staticmethod
    def __jsii_proxy_class__():
        return _UnaryOperationProxy

    def __init__(self, operand: scope.jsii_calc_lib.Value) -> None:
        jsii.create(UnaryOperation, self, [operand])

    @property
    @jsii.member(jsii_name="operand")
    def operand(self) -> scope.jsii_calc_lib.Value:
        return jsii.get(self, "operand")


class _UnaryOperationProxy(UnaryOperation, jsii.proxy_for(scope.jsii_calc_lib.Operation)):
    pass

@jsii.implements(IFriendlier)
class Negate(UnaryOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Negate"):
    def __init__(self, operand: scope.jsii_calc_lib.Value) -> None:
        jsii.create(Negate, self, [operand])

    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        return jsii.invoke(self, "farewell", [])

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        return jsii.invoke(self, "goodbye", [])

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        return jsii.invoke(self, "hello", [])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        return jsii.invoke(self, "toString", [])

    @property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        return jsii.get(self, "value")


class _UnionProperties(jsii.compat.TypedDict, total=False):
    foo: typing.Union[str, jsii.Number]

@jsii.data_type(jsii_type="jsii-calc.UnionProperties")
class UnionProperties(_UnionProperties):
    bar: typing.Union[str, jsii.Number, "AllTypes"]

class UseBundledDependency(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.UseBundledDependency"):
    def __init__(self) -> None:
        jsii.create(UseBundledDependency, self, [])

    @jsii.member(jsii_name="value")
    def value(self) -> typing.Any:
        return jsii.invoke(self, "value", [])


class UseCalcBase(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.UseCalcBase"):
    def __init__(self) -> None:
        jsii.create(UseCalcBase, self, [])

    @jsii.member(jsii_name="hello")
    def hello(self) -> scope.jsii_calc_base.Base:
        return jsii.invoke(self, "hello", [])


class UsesInterfaceWithProperties(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.UsesInterfaceWithProperties"):
    def __init__(self, obj: "IInterfaceWithProperties") -> None:
        jsii.create(UsesInterfaceWithProperties, self, [obj])

    @jsii.member(jsii_name="justRead")
    def just_read(self) -> str:
        return jsii.invoke(self, "justRead", [])

    @jsii.member(jsii_name="readStringAndNumber")
    def read_string_and_number(self, ext: "IInterfaceWithPropertiesExtension") -> str:
        return jsii.invoke(self, "readStringAndNumber", [ext])

    @jsii.member(jsii_name="writeAndRead")
    def write_and_read(self, value: str) -> str:
        return jsii.invoke(self, "writeAndRead", [value])

    @property
    @jsii.member(jsii_name="obj")
    def obj(self) -> "IInterfaceWithProperties":
        return jsii.get(self, "obj")


class VariadicMethod(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.VariadicMethod"):
    def __init__(self, *prefix: jsii.Number) -> None:
        jsii.create(VariadicMethod, self, [prefix])

    @jsii.member(jsii_name="asArray")
    def as_array(self, first: jsii.Number, *others: jsii.Number) -> typing.List[jsii.Number]:
        return jsii.invoke(self, "asArray", [first, others])


class VirtualMethodPlayground(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.VirtualMethodPlayground"):
    def __init__(self) -> None:
        jsii.create(VirtualMethodPlayground, self, [])

    @jsii.member(jsii_name="overrideMeAsync")
    def override_me_async(self, index: jsii.Number) -> jsii.Number:
        return jsii.ainvoke(self, "overrideMeAsync", [index])

    @jsii.member(jsii_name="overrideMeSync")
    def override_me_sync(self, index: jsii.Number) -> jsii.Number:
        return jsii.invoke(self, "overrideMeSync", [index])

    @jsii.member(jsii_name="parallelSumAsync")
    def parallel_sum_async(self, count: jsii.Number) -> jsii.Number:
        return jsii.ainvoke(self, "parallelSumAsync", [count])

    @jsii.member(jsii_name="serialSumAsync")
    def serial_sum_async(self, count: jsii.Number) -> jsii.Number:
        return jsii.ainvoke(self, "serialSumAsync", [count])

    @jsii.member(jsii_name="sumSync")
    def sum_sync(self, count: jsii.Number) -> jsii.Number:
        return jsii.invoke(self, "sumSync", [count])


class composition:
    class CompositeOperation(scope.jsii_calc_lib.Operation, metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.composition.CompositeOperation"):
        @staticmethod
        def __jsii_proxy_class__():
            return _CompositeOperationProxy

        def __init__(self) -> None:
            jsii.create(composition.CompositeOperation, self, [])

        @jsii.member(jsii_name="toString")
        def to_string(self) -> str:
            return jsii.invoke(self, "toString", [])

        @property
        @jsii.member(jsii_name="expression")
        @abc.abstractmethod
        def expression(self) -> scope.jsii_calc_lib.Value:
            ...

        @property
        @jsii.member(jsii_name="value")
        def value(self) -> jsii.Number:
            return jsii.get(self, "value")

        @property
        @jsii.member(jsii_name="decorationPostfixes")
        def decoration_postfixes(self) -> typing.List[str]:
            return jsii.get(self, "decorationPostfixes")

        @decoration_postfixes.setter
        def decoration_postfixes(self, value: typing.List[str]):
            return jsii.set(self, "decorationPostfixes", value)

        @property
        @jsii.member(jsii_name="decorationPrefixes")
        def decoration_prefixes(self) -> typing.List[str]:
            return jsii.get(self, "decorationPrefixes")

        @decoration_prefixes.setter
        def decoration_prefixes(self, value: typing.List[str]):
            return jsii.set(self, "decorationPrefixes", value)

        @property
        @jsii.member(jsii_name="stringStyle")
        def string_style(self) -> "CompositionStringStyle":
            return jsii.get(self, "stringStyle")

        @string_style.setter
        def string_style(self, value: "CompositionStringStyle"):
            return jsii.set(self, "stringStyle", value)

        @jsii.enum(jsii_type="jsii-calc.composition.CompositeOperation.CompositionStringStyle")
        class CompositionStringStyle(enum.Enum):
            Normal = "Normal"
            Decorated = "Decorated"


    class _CompositeOperationProxy(CompositeOperation, jsii.proxy_for(scope.jsii_calc_lib.Operation)):
        @property
        @jsii.member(jsii_name="expression")
        def expression(self) -> scope.jsii_calc_lib.Value:
            return jsii.get(self, "expression")



class Calculator(composition.CompositeOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Calculator"):
    def __init__(self, *, initial_value: typing.Optional[jsii.Number]=None, maximum_value: typing.Optional[jsii.Number]=None) -> None:
        props: CalculatorProps = {}

        if initial_value is not None:
            props["initialValue"] = initial_value

        if maximum_value is not None:
            props["maximumValue"] = maximum_value

        jsii.create(Calculator, self, [props])

    @jsii.member(jsii_name="add")
    def add(self, value: jsii.Number) -> None:
        return jsii.invoke(self, "add", [value])

    @jsii.member(jsii_name="mul")
    def mul(self, value: jsii.Number) -> None:
        return jsii.invoke(self, "mul", [value])

    @jsii.member(jsii_name="neg")
    def neg(self) -> None:
        return jsii.invoke(self, "neg", [])

    @jsii.member(jsii_name="pow")
    def pow(self, value: jsii.Number) -> None:
        return jsii.invoke(self, "pow", [value])

    @jsii.member(jsii_name="readUnionValue")
    def read_union_value(self) -> jsii.Number:
        return jsii.invoke(self, "readUnionValue", [])

    @property
    @jsii.member(jsii_name="expression")
    def expression(self) -> scope.jsii_calc_lib.Value:
        return jsii.get(self, "expression")

    @property
    @jsii.member(jsii_name="operationsLog")
    def operations_log(self) -> typing.List[scope.jsii_calc_lib.Value]:
        return jsii.get(self, "operationsLog")

    @property
    @jsii.member(jsii_name="operationsMap")
    def operations_map(self) -> typing.Mapping[str,typing.List[scope.jsii_calc_lib.Value]]:
        return jsii.get(self, "operationsMap")

    @property
    @jsii.member(jsii_name="curr")
    def curr(self) -> scope.jsii_calc_lib.Value:
        return jsii.get(self, "curr")

    @curr.setter
    def curr(self, value: scope.jsii_calc_lib.Value):
        return jsii.set(self, "curr", value)

    @property
    @jsii.member(jsii_name="maxValue")
    def max_value(self) -> typing.Optional[jsii.Number]:
        return jsii.get(self, "maxValue")

    @max_value.setter
    def max_value(self, value: typing.Optional[jsii.Number]):
        return jsii.set(self, "maxValue", value)

    @property
    @jsii.member(jsii_name="unionProperty")
    def union_property(self) -> typing.Optional[typing.Union["Add", "Multiply", "Power"]]:
        return jsii.get(self, "unionProperty")

    @union_property.setter
    def union_property(self, value: typing.Optional[typing.Union["Add", "Multiply", "Power"]]):
        return jsii.set(self, "unionProperty", value)


class Power(composition.CompositeOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Power"):
    def __init__(self, base: scope.jsii_calc_lib.Value, pow: scope.jsii_calc_lib.Value) -> None:
        jsii.create(Power, self, [base, pow])

    @property
    @jsii.member(jsii_name="base")
    def base(self) -> scope.jsii_calc_lib.Value:
        return jsii.get(self, "base")

    @property
    @jsii.member(jsii_name="expression")
    def expression(self) -> scope.jsii_calc_lib.Value:
        return jsii.get(self, "expression")

    @property
    @jsii.member(jsii_name="pow")
    def pow(self) -> scope.jsii_calc_lib.Value:
        return jsii.get(self, "pow")


class Sum(composition.CompositeOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Sum"):
    def __init__(self) -> None:
        jsii.create(Sum, self, [])

    @property
    @jsii.member(jsii_name="expression")
    def expression(self) -> scope.jsii_calc_lib.Value:
        return jsii.get(self, "expression")

    @property
    @jsii.member(jsii_name="parts")
    def parts(self) -> typing.List[scope.jsii_calc_lib.Value]:
        return jsii.get(self, "parts")

    @parts.setter
    def parts(self, value: typing.List[scope.jsii_calc_lib.Value]):
        return jsii.set(self, "parts", value)


__all__ = ["AbstractClass", "AbstractClassBase", "AbstractClassReturner", "Add", "AllTypes", "AllTypesEnum", "AllowedMethodNames", "AsyncVirtualMethods", "AugmentableClass", "BinaryOperation", "Calculator", "CalculatorProps", "ClassThatImplementsTheInternalInterface", "ClassThatImplementsThePrivateInterface", "ClassWithMutableObjectLiteralProperty", "ClassWithPrivateConstructorAndAutomaticProperties", "Constructors", "ConsumersOfThisCrazyTypeSystem", "DefaultedConstructorArgument", "DerivedClassHasNoProperties", "DerivedStruct", "DoNotOverridePrivates", "DoNotRecognizeAnyAsOptional", "DontComplainAboutVariadicAfterOptional", "DoubleTrouble", "EraseUndefinedHashValues", "EraseUndefinedHashValuesOptions", "ExportedBaseClass", "ExtendsInternalInterface", "ExtendsPrivateInterface", "GiveMeStructs", "GreetingAugmenter", "IAnotherPublicInterface", "IFriendlier", "IFriendlyRandomGenerator", "IInterfaceThatShouldNotBeADataType", "IInterfaceWithInternal", "IInterfaceWithMethods", "IInterfaceWithOptionalMethodArguments", "IInterfaceWithProperties", "IInterfaceWithPropertiesExtension", "IMutableObjectLiteral", "INonInternalInterface", "IPrivatelyImplemented", "IPublicInterface", "IRandomNumberGenerator", "IReturnsNumber", "ImplementInternalInterface", "ImplementsInterfaceWithInternal", "ImplementsInterfaceWithInternalSubclass", "ImplementsPrivateInterface", "ImplictBaseOfBase", "InbetweenClass", "InterfaceImplementedByAbstractClass", "InterfaceInNamespaceIncludesClasses", "InterfaceInNamespaceOnlyInterface", "JSObjectLiteralForInterface", "JSObjectLiteralToNative", "JSObjectLiteralToNativeClass", "JavaReservedWords", "JsiiAgent", "LoadBalancedFargateServiceProps", "Multiply", "Negate", "NodeStandardLibrary", "NullShouldBeTreatedAsUndefined", "NullShouldBeTreatedAsUndefinedData", "NumberGenerator", "ObjectRefsInCollections", "OptionalConstructorArgument", "OverrideReturnsObject", "Polymorphism", "Power", "PublicClass", "PythonReservedWords", "ReferenceEnumFromScopedPackage", "ReturnsPrivateImplementationOfInterface", "RuntimeTypeChecking", "Statics", "StringEnum", "StripInternal", "Sum", "SyncVirtualMethods", "Thrower", "UnaryOperation", "UnionProperties", "UseBundledDependency", "UseCalcBase", "UsesInterfaceWithProperties", "VariadicMethod", "VirtualMethodPlayground", "__jsii_assembly__", "composition"]

publication.publish()
