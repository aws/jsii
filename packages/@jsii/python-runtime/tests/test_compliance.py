import platform

from datetime import datetime, timezone
from typing import cast, List

import pytest

import jsii

from json import loads

from jsii_calc import (
    AbstractClassReturner,
    AbstractSuite,
    Add,
    AllTypes,
    AllTypesEnum,
    AmbiguousParameters,
    AsyncVirtualMethods,
    Bell,
    Calculator,
    ClassWithPrivateConstructorAndAutomaticProperties,
    ConfusingToJackson,
    ConsumerCanRingBell,
    ConsumePureInterface,
    ConstructorPassesThisOut,
    DataRenderer,
    Demonstrate982,
    DisappointingCollectionSource,
    DoNotOverridePrivates,
    DoubleTrouble,
    Entropy,
    GreetingAugmenter,
    IBellRinger,
    IConcreteBellRinger,
    IFriendlier,
    IFriendlyRandomGenerator,
    IRandomNumberGenerator,
    InterfaceCollections,
    IInterfaceWithProperties,
    IStructReturningDelegate,
    IWallClock,
    Isomorphism,
    JsiiAgent,
    JSObjectLiteralForInterface,
    JSObjectLiteralToNative,
    JsonFormatter,
    Multiply,
    Negate,
    NodeStandardLibrary,
    NullShouldBeTreatedAsUndefined,
    NumberGenerator,
    ObjectWithPropertyProvider,
    PartiallyInitializedThisConsumer,
    Polymorphism,
    Power,
    PythonReservedWords,
    ReferenceEnumFromScopedPackage,
    ReturnsPrivateImplementationOfInterface,
    Statics,
    Sum,
    SyncVirtualMethods,
    UsesInterfaceWithProperties,
    composition,
    EraseUndefinedHashValues,
    EraseUndefinedHashValuesOptions,
    VariadicMethod,
    RootStructValidator,
    StructPassing,
    TopLevelStruct,
    SecondLevelStruct,
    StructA,
    StructB,
    StructUnionConsumer,
    SomeTypeJsii976,
    StructParameterType,
    AnonymousImplementationProvider,
    UpcasingReflectable,
    PromiseNothing,
)
from jsii_calc.cdk16625 import Cdk16625
from jsii_calc.cdk22369 import AcceptsPath
from jsii_calc.python_self import (
    ClassWithSelf,
    ClassWithSelfKwarg,
)
from jsii_calc.submodule.isolated import Kwargs
from jsii_calc.submodule.child import SomeEnum
from scope.jsii_calc_lib import IFriendly, EnumFromScopedModule, Number
from scope.jsii_calc_lib.custom_submodule_name import IReflectable, ReflectableEntry
from scope.jsii_calc_lib.deprecation_removal import InterfaceFactory

# Note: The names of these test functions have been chosen to map as closely to the
#       Java Compliance tests as possible.
# Note: While we could write more expressive and better tests using the functionality
#       provided to us by pytest, we are making these tests match the Java Compliance
#       Tests as closely as possible to make keeping them in sync easier.


class DerivedFromAllTypes(AllTypes):
    pass


class OverrideAsyncMethods(AsyncVirtualMethods):
    def override_me(self, mult):
        return self.foo() * 2

    def foo(self) -> int:
        """
        Implement another method, which doesn't override anything in the base class.
        This should obviously be possible.
        """
        return 2222


class OverrideAsyncMethodsByBaseClass(OverrideAsyncMethods):
    pass


class OverrideCallsSuper(AsyncVirtualMethods):
    def override_me(self, mult):
        super_ret = super().override_me(mult)
        return super_ret * 10 + 1


class TwoOverrides(AsyncVirtualMethods):
    def override_me(self, mult):
        return 666

    def override_me_too(self):
        return 10


class SyncOverrides(SyncVirtualMethods):
    multiplier = 1
    return_super = False
    call_async = False
    another_the_property = None

    def virtual_method(self, n):
        if self.return_super:
            return super().virtual_method(n)

        if self.call_async:
            obj = OverrideAsyncMethods()
            return obj.call_me()

        return 5 * n * self.multiplier

    @property
    def the_property(self):
        return "I am an override!"

    @the_property.setter
    def the_property(self, value):
        self.another_the_property = value


@jsii.implements(IFriendly)
@jsii.implements(IRandomNumberGenerator)
class SubclassNativeFriendlyRandom(Number):
    def __init__(self):
        super().__init__(908)
        self.next_number = 100

    def hello(self):
        return "SubclassNativeFriendlyRandom"

    def next(self):
        next_ = self.next_number
        self.next_number += 100
        return next_


@jsii.implements(IFriendlyRandomGenerator)
class PureNativeFriendlyRandom:
    """
    In this case, the class does not derive from the JsiiObject hierarchy. It means
    that when we pass it along to javascript, we won't have an objref. This should
    result in creating a new empty javascript object and applying the overrides.

    The newly created objref will need to be stored somewhere (in the engine's object
    map) so that subsequent calls won't create a new object every time.
    """

    next_number = 1000

    def next(self):
        n = self.next_number
        self.next_number += 1000
        return n

    def hello(self):
        return "I am a native!"


class AddTen(Add):
    def __init__(self, value):
        super().__init__(Number(value), Number(10))


class MulTen(Multiply):
    def __init__(self, value):
        super().__init__(Number(value), Number(10))


def test_primitiveTypes():
    types = AllTypes()

    # boolean
    types.boolean_property = True
    assert types.boolean_property

    # string
    types.string_property = "foo"
    assert types.string_property == "foo"

    # number
    types.number_property = 1234
    assert types.number_property == 1234

    # date
    types.date_property = datetime.fromtimestamp(123 / 1000.0, tz=timezone.utc)
    assert types.date_property == datetime.fromtimestamp(123 / 1000.0, tz=timezone.utc)

    # json
    types.json_property = {"Foo": {"bar": 123}}
    assert types.json_property.get("Foo") == {"bar": 123}


def test_dates():
    types = AllTypes()

    # strong type
    types.date_property = datetime.fromtimestamp(123 / 1000.0, tz=timezone.utc)
    assert types.date_property == datetime.fromtimestamp(123 / 1000.0, tz=timezone.utc)

    # weak type
    types.any_property = datetime.fromtimestamp(999 / 1000.0, tz=timezone.utc)
    assert types.any_property == datetime.fromtimestamp(999 / 1000.0, tz=timezone.utc)


def test_collectionTypes():
    types = AllTypes()

    # array
    types.array_property = ["Hello", "World"]
    assert types.array_property[1] == "World"

    # map
    map_ = {}
    map_["Foo"] = Number(123)
    types.map_property = map_
    # TODO: No Assertion?


def test_dynamicTypes():
    types = AllTypes()

    # boolean
    types.any_property = False
    assert not types.any_property

    # string
    types.any_property = "String"
    assert types.any_property == "String"

    # number
    types.any_property = 12
    assert types.any_property == 12

    # date
    types.any_property = datetime.fromtimestamp(1234 / 1000.0, tz=timezone.utc)
    assert types.any_property == datetime.fromtimestamp(1234 / 1000.0, tz=timezone.utc)

    # json (notice that when deserialized, it is deserialized as a map).
    types.any_property = {"Goo": ["Hello", {"World": 123}]}
    got = types.any_property.get("Goo")
    assert got is not None
    assert got[1].get("World") == 123

    # array
    types.any_property = ["Hello", "World"]
    assert types.any_property[0] == "Hello"
    assert types.any_property[1] == "World"

    # array of any
    types.any_array_property = ["Hybrid", Number(12), 123, False]
    assert types.any_array_property[2] == 123

    # map
    map_ = {}
    map_["MapKey"] = "MapValue"
    types.any_property = map_
    assert types.any_property.get("MapKey") == "MapValue"

    # map of any
    map_["Goo"] = 19_289_812
    types.any_map_property = map_
    assert types.any_map_property.get("Goo") == 19_289_812

    # classes
    mult = Multiply(Number(10), Number(20))
    types.any_property = mult
    assert types.any_property is mult
    assert isinstance(types.any_property, Multiply)
    assert types.any_property.value == 200


def test_unionTypes():
    types = AllTypes()

    # single valued property
    types.union_property = 1234
    assert types.union_property == 1234

    types.union_property = "Hello"
    assert types.union_property == "Hello"

    types.union_property = Multiply(Number(2), Number(12))
    assert types.union_property.value == 24

    # map
    map_ = {}
    map_["Foo"] = Number(99)
    types.union_map_property = map_
    # TODO: No Assertion?

    # array
    types.union_array_property = [123, Number(33)]
    assert cast(Number, types.union_array_property[1]).value == 33


def test_createObjectAndCtorOverloads():
    Calculator()
    Calculator(maximum_value=10)


def test_getSetPrimitiveProperties():
    number = Number(20)

    assert number.value == 20
    assert number.double_value == 40
    assert Negate(Add(Number(20), Number(10))).value == -30
    assert Multiply(Add(Number(5), Number(5)), Number(2)).value == 20
    assert Power(Number(3), Number(4)).value == 3**4
    assert Power(Number(999), Number(1)).value == 999
    assert Power(Number(999), Number(0)).value == 1


def test_callMethods():
    calc = Calculator()

    calc.add(10)
    assert calc.value == 10

    calc.mul(2)
    assert calc.value == 20

    calc.pow(5)
    assert calc.value == 20**5

    calc.neg()
    assert calc.value == -3_200_000


def test_unmarshallIntoAbstractType():
    calc = Calculator()
    calc.add(120)

    assert calc.curr.value == 120


def test_getAndSetNonPrimitiveProperties():
    calc = Calculator()
    calc.add(3_200_000)
    calc.neg()
    calc.curr = Multiply(Number(2), calc.curr)

    assert calc.value == -6_400_000


def test_getAndSetEnumValues():
    calc = Calculator()
    calc.add(9)
    calc.pow(3)

    CompositeOperation = composition.CompositeOperation

    assert calc.string_style == CompositeOperation.CompositionStringStyle.NORMAL

    calc.string_style = CompositeOperation.CompositionStringStyle.DECORATED

    assert calc.string_style == CompositeOperation.CompositionStringStyle.DECORATED
    assert calc.to_string() == "<<[[{{(((1 * (0 + 9)) * (0 + 9)) * (0 + 9))}}]]>>"


def test_useEnumFromScopedModule():
    obj = ReferenceEnumFromScopedPackage()
    assert obj.foo == EnumFromScopedModule.VALUE2
    obj.foo = EnumFromScopedModule.VALUE1
    assert obj.load_foo() == EnumFromScopedModule.VALUE1
    obj.save_foo(EnumFromScopedModule.VALUE2)
    assert obj.foo == EnumFromScopedModule.VALUE2


def test_undefinedAndNull():
    calc = Calculator()
    assert calc.max_value is None
    calc.max_value = None


def test_arrays():
    sum_ = Sum()
    sum_.parts = [Number(5), Number(10), Multiply(Number(2), Number(3))]

    assert sum_.value == 5 + 10 + (2 * 3)
    assert sum_.parts[0].value == 5
    assert sum_.parts[2].value == 6
    assert sum_.to_string() == "(((0 + 5) + 10) + (2 * 3))"


def test_maps():
    calc2 = Calculator()  # Initializer overload (props is optional)
    calc2.add(10)
    calc2.add(20)
    calc2.mul(2)

    assert len(cast(List, calc2.operations_map.get("add"))) == 2
    assert len(cast(List, calc2.operations_map.get("mul"))) == 1
    got = calc2.operations_map.get("add")
    assert got is not None
    assert got[1].value == 30


def test_exceptions():
    calc3 = Calculator(initial_value=20, maximum_value=30)
    calc3.add(3)

    assert calc3.value == 23

    with pytest.raises(RuntimeError):
        calc3.add(10)

    calc3.max_value = 40
    calc3.add(10)

    assert calc3.value == 33


def test_unionProperties():
    calc3 = Calculator()
    calc3.union_property = Multiply(Number(9), Number(3))

    assert isinstance(calc3.union_property, Multiply)
    assert calc3.read_union_value() == 9 * 3

    calc3.union_property = Power(Number(10), Number(3))

    assert isinstance(calc3.union_property, Power)
    assert calc3.read_union_value() == 10**3


def test_subclassing():
    calc = Calculator()
    calc.curr = AddTen(33)
    calc.neg()

    assert calc.value == -43


def test_testJSObjectLiteralToNative():
    obj = JSObjectLiteralToNative()
    obj2 = obj.return_literal()

    assert obj2.prop_a == "Hello"
    assert obj2.prop_b == 102


def test_testFluentApiWithDerivedClasses():
    # make sure that fluent API can be assigned to objects from derived classes
    obj = DerivedFromAllTypes()
    obj.string_property = "Hello"
    obj.number_property = 12

    assert obj.string_property == "Hello"
    assert obj.number_property == 12


def test_creationOfNativeObjectsFromJavaScriptObjects():
    """
    See that we can create a native object, pass it JS and then unmarshal
    back without type information.
    """
    types = AllTypes()

    js_obj = Number(44)
    types.any_property = js_obj
    unmarshalled_js_obj = types.any_property
    assert unmarshalled_js_obj.__class__ == Number

    native_obj = AddTen(10)
    types.any_property = native_obj

    result1 = types.any_property
    assert result1 is native_obj

    native_obj2 = MulTen(20)
    types.any_property = native_obj2
    unmarshalled_native_obj = types.any_property
    assert unmarshalled_native_obj.__class__ == MulTen


def test_asyncOverrides_callAsyncMethod():
    obj = AsyncVirtualMethods()
    assert obj.call_me() == 128
    assert obj.override_me(44) == 528


def test_asyncOverrides_overrideAsyncMethod():
    obj = OverrideAsyncMethods()
    assert obj.call_me() == 4452


def test_asyncOverrides_overrideAsyncMethodByParentClass():
    obj = OverrideAsyncMethodsByBaseClass()
    assert obj.call_me() == 4452


def test_asyncOverrides_overrideCallsSuper():
    obj = OverrideCallsSuper()
    assert obj.override_me(12) == 1441
    assert obj.call_me() == 1209


def test_asyncOverrides_twoOverrides():
    obj = TwoOverrides()
    assert obj.call_me() == 684


def test_asyncOverrides_overrideThrows():
    class ThrowingAsyncVirtualMethods(AsyncVirtualMethods):
        def override_me(self, mult):
            raise RuntimeError("Thrown by native code")

    obj = ThrowingAsyncVirtualMethods()

    with pytest.raises(RuntimeError, match="Thrown by native code"):
        obj.call_me()


def test_syncOverrides():
    obj = SyncOverrides()
    assert obj.caller_is_method() == 10 * 5

    # affect the result
    obj.multiplier = 5
    assert obj.caller_is_method() == 10 * 5 * 5

    # verify callbacks are invoked from a property
    assert obj.caller_is_property == 10 * 5 * 5

    # and from an async method
    obj.multiplier = 3
    assert obj.caller_is_async() == 10 * 5 * 3


def test_propertyOverrides_get_set():
    so = SyncOverrides()
    assert so.retrieve_value_of_the_property() == "I am an override!"
    so.modify_value_of_the_property("New Value")
    assert so.another_the_property == "New Value"


def test_propertyOverrides_get_calls_super():
    class SuperSyncVirtualMethods(SyncVirtualMethods):
        @property
        def the_property(self):
            return f"super:{super().the_property}"

        @the_property.setter
        def the_property(self, value):
            super().the_property = value

    so = SuperSyncVirtualMethods()

    assert so.retrieve_value_of_the_property() == "super:initial value"
    assert so.the_property == "super:initial value"


def test_propertyOverrides_set_calls_super():
    class SuperSyncVirtualMethods(SyncVirtualMethods):
        @property
        def the_property(self):
            return super().the_property

        @the_property.setter
        def the_property(self, value):
            #
            # This is the way this was originally coded:
            #   super().the_property = f"{value}:by override"
            # but this causes a problem because of:
            #   https://bugs.python.org/issue14965
            # so now we have this more convoluted form.
            super(self.__class__, self.__class__).the_property.__set__(  # type: ignore
                self, f"{value}:by override"
            )

    so = SuperSyncVirtualMethods()
    so.modify_value_of_the_property("New Value")

    assert so.the_property == "New Value:by override"


def test_propertyOverrides_get_throws():
    class ThrowingSyncVirtualMethods(SyncVirtualMethods):
        @property
        def the_property(self):
            raise RuntimeError("Oh no, this is bad")

        @the_property.setter
        def the_property(self, value):
            super().the_property = value

    so = ThrowingSyncVirtualMethods()

    with pytest.raises(RuntimeError, match="Oh no, this is bad"):
        so.retrieve_value_of_the_property()


def test_propertyOverrides_set_throws():
    class ThrowingSyncVirtualMethods(SyncVirtualMethods):
        @property
        def the_property(self):
            return super().the_property

        @the_property.setter
        def the_property(self, value):
            raise RuntimeError("Exception from overloaded setter")

    so = ThrowingSyncVirtualMethods()

    with pytest.raises(RuntimeError, match="Exception from overloaded setter"):
        so.modify_value_of_the_property("Hii")


def test_propertyOverrides_interfaces():
    @jsii.implements(IInterfaceWithProperties)
    class TInterfaceWithProperties:
        x = None

        @property
        def read_only_string(self):
            return "READ_ONLY_STRING"

        @property
        def read_write_string(self):
            return f"{self.x}?"

        @read_write_string.setter
        def read_write_string(self, value):
            self.x = f"{value}!"

    obj = TInterfaceWithProperties()
    interact = UsesInterfaceWithProperties(obj)

    assert interact.just_read() == "READ_ONLY_STRING"
    assert interact.write_and_read("Hello") == "Hello!?"


def test_interfaceBuilder():
    @jsii.implements(IInterfaceWithProperties)
    class TInterfaceWithProperties:
        x = "READ_WRITE"

        @property
        def read_only_string(self):
            return "READ_ONLY"

        @property
        def read_write_string(self):
            return self.x

        @read_write_string.setter
        def read_write_string(self, value):
            self.x = value

    obj = TInterfaceWithProperties()
    interact = UsesInterfaceWithProperties(obj)
    assert interact.just_read() == "READ_ONLY"
    assert interact.write_and_read("Hello") == "Hello"


def test_syncOverrides_callsSuper():
    obj = SyncOverrides()
    assert obj.caller_is_property == 10 * 5
    obj.return_super = True
    assert obj.caller_is_property == 10 * 2


def test_fail_syncOverrides_callsDoubleAsync_method():
    obj = SyncOverrides()
    obj.call_async = True

    # TODO: Error Handling
    with pytest.raises(RuntimeError):
        obj.caller_is_method()


def test_fail_syncOverrides_callsDoubleAsync_propertyGetter():
    obj = SyncOverrides()
    obj.call_async = True

    # TODO: Error Handling
    with pytest.raises(RuntimeError):
        obj.caller_is_property


@pytest.mark.skip
def test_fail_syncOverrides_callsDoubleAsync_propertySetter():
    obj = SyncOverrides()
    obj.call_async = True

    # TODO: Error Handling
    with pytest.raises(RuntimeError):
        obj.caller_is_property = 12


def test_testInterfaces() -> None:
    friendly: IFriendly
    friendlier: IFriendlier
    random_number_generator: IRandomNumberGenerator
    friendly_random_generator: IFriendlyRandomGenerator

    add = Add(Number(10), Number(20))
    friendly = add
    assert friendly.hello() == "Hello, I am a binary operation. What's your name?"

    multiply = Multiply(Number(10), Number(30))
    friendly = multiply
    friendlier = multiply
    random_number_generator = multiply
    assert friendly.hello() == "Hello, I am a binary operation. What's your name?"
    assert friendlier.goodbye() == "Goodbye from Multiply!"
    assert random_number_generator.next() == 89

    friendly_random_generator = DoubleTrouble()
    assert friendly_random_generator.hello() == "world"
    assert friendly_random_generator.next() == 12

    poly = Polymorphism()
    assert (
        poly.say_hello(friendly)
        == "oh, Hello, I am a binary operation. What's your name?"
    )
    assert poly.say_hello(friendly_random_generator) == "oh, world"
    assert (
        poly.say_hello(SubclassNativeFriendlyRandom())
        == "oh, SubclassNativeFriendlyRandom"
    )
    assert poly.say_hello(PureNativeFriendlyRandom()) == "oh, I am a native!"


def test_testNativeObjectsWithInterfaces():
    # create a pure and native object, not part of the jsii hierarchy, only implements
    # a jsii interface
    pure_native = PureNativeFriendlyRandom()
    subclassed_native = SubclassNativeFriendlyRandom()
    generator_bound_to_p_subclassed_object = NumberGenerator(subclassed_native)
    generator_bound_to_pure_native = NumberGenerator(pure_native)

    assert generator_bound_to_p_subclassed_object.generator is subclassed_native
    generator_bound_to_p_subclassed_object.is_same_generator(subclassed_native)
    assert generator_bound_to_p_subclassed_object.next_times100() == 10000

    # When we invoke nextTimes100 again, it will use the objref and call into the same
    # object.
    assert generator_bound_to_p_subclassed_object.next_times100() == 20000

    assert generator_bound_to_pure_native.generator is pure_native
    generator_bound_to_pure_native.is_same_generator(pure_native)
    assert generator_bound_to_pure_native.next_times100() == 100_000
    assert generator_bound_to_pure_native.next_times100() == 200_000


def test_testLiteralInterface():
    obj = JSObjectLiteralForInterface()
    friendly = obj.give_me_friendly()
    gen = obj.give_me_friendly_generator()

    assert friendly.hello() == "I am literally friendly!"
    assert gen.hello() == "giveMeFriendlyGenerator"
    assert gen.next() == 42


def test_testInterfaceParameter():
    obj = JSObjectLiteralForInterface()
    friendly = obj.give_me_friendly()
    greeting_augmenter = GreetingAugmenter()

    assert friendly.hello() == "I am literally friendly!"
    assert (
        greeting_augmenter.better_greeting(friendly)
        == "I am literally friendly! Let me buy you a drink!"
    )


def test_statics():
    assert Statics.static_method("Yoyo") == "hello ,Yoyo!"
    assert Statics.instance.value == "default"

    new_statics = Statics("new value")
    Statics.instance = new_statics

    assert Statics.instance is new_statics
    assert Statics.instance.value == "new value"

    assert Statics.non_const_static == 100


def test_consts():
    obj = Statics.CONST_OBJ

    assert Statics.FOO == "hello"
    assert obj.hello() == "world"
    assert Statics.BAR == 1234
    assert Statics.ZOO_BAR.get("hello") == "world"


def test_reservedKeywordsAreSlugifiedInMethodNames():
    obj = PythonReservedWords()
    obj.import_()
    obj.return_()


def test_nodeStandardLibrary():
    obj = NodeStandardLibrary()

    assert obj.fs_read_file() == "Hello, resource!"
    assert obj.fs_read_file_sync() == "Hello, resource! SYNC!"
    assert len(obj.os_platform) > 0
    assert (
        obj.crypto_sha256()
        == "6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50"
    )


def test_returnAbstract():
    obj = AbstractClassReturner()
    obj2 = obj.give_me_abstract()

    assert obj2.abstract_method("John") == "Hello, John!!"
    assert obj2.prop_from_interface == "propFromInterfaceValue"
    assert obj2.non_abstract_method() == 42

    iface = obj.give_me_interface()
    assert iface.prop_from_interface == "propFromInterfaceValue"

    assert (
        obj.return_abstract_from_property.abstract_property == "hello-abstract-property"
    )


def test_doNotOverridePrivates_method():
    class TDoNotOverridePrivates(DoNotOverridePrivates):
        def private_method(self):
            return "privateMethod-Override"

    obj = TDoNotOverridePrivates()

    assert obj.private_method_value() == "privateMethod"


def test_doNotOverridePrivates_property_by_name():
    class TDoNotOverridePrivates(DoNotOverridePrivates):
        def private_property(self):
            return "privateProperty-Override"

    obj = TDoNotOverridePrivates()

    assert obj.private_property_value() == "privateProperty"


def test_doNotOverridePrivates_property_getter():
    class TDoNotOverridePrivates(DoNotOverridePrivates):
        @property
        def private_property(self):
            return "privateProperty-Override"

        @private_property.setter
        def private_property(self):
            raise RuntimeError("Boom")

    obj = TDoNotOverridePrivates()

    assert obj.private_property_value() == "privateProperty"

    # verify the setter override is not invoked.
    obj.change_private_property_value("MyNewValue")
    assert obj.private_property_value() == "MyNewValue"


def test_classWithPrivateConstructorAndAutomaticProperties():
    obj = ClassWithPrivateConstructorAndAutomaticProperties.create("Hello", "Bye")
    assert obj.read_write_string == "Bye"
    assert obj.read_only_string == "Hello"


def test_nullShouldBeTreatedAsUndefined():
    obj = NullShouldBeTreatedAsUndefined("hello", None)
    obj.give_me_undefined(None)
    obj.give_me_undefined_inside_an_object(
        this_should_be_undefined=None,
        array_with_three_elements_and_undefined_as_second_argument=[
            "hello",
            None,
            "boom",
        ],
    )
    obj.change_me_to_undefined = None
    obj.verify_property_is_undefined()


def test_testJsiiAgent():
    assert JsiiAgent.value == f"Python/{platform.python_version()}"


def test_receiveInstanceOfPrivateClass():
    assert ReturnsPrivateImplementationOfInterface().private_implementation.success


def test_eraseUnsetDataValues():
    opts = EraseUndefinedHashValuesOptions(option1="option1")
    assert EraseUndefinedHashValues.does_key_exist(opts, "option1")
    assert not EraseUndefinedHashValues.does_key_exist(opts, "option2")


def test_objectIdDoesNotGetReallocatedWhenTheConstructorPassesThisOut():
    class PartiallyInitializedThisConsumerImpl(PartiallyInitializedThisConsumer):
        def consume_partially_initialized_this(self, obj, dt, ev):
            assert obj is not None
            assert isinstance(dt, datetime)
            assert ev == AllTypesEnum.THIS_IS_GREAT
            return "OK"

    reflector = PartiallyInitializedThisConsumerImpl()
    obj = ConstructorPassesThisOut(reflector)
    assert obj is not None


def test_variadicMethodCanBeInvoked():
    variadic = VariadicMethod(1)
    assert variadic.as_array(3, 4, 5, 6) == [1, 3, 4, 5, 6]


def test_callbacksCorrectlyDeserializeArguments():
    class DataRendererSubclass(DataRenderer):
        def render_map(self, map):
            return super().render_map(map)

    renderer = DataRendererSubclass()
    assert (
        renderer.render(anumber=42, astring="bazinga!")
        == '{\n  "anumber": 42,\n  "astring": "bazinga!"\n}'
    )


def test_passNestedStruct():
    output = StructPassing.round_trip(
        123,
        required="hello",
        second_level=SecondLevelStruct(deeper_required_prop="exists"),
    )

    assert output.required == "hello"
    assert output.optional is None
    assert cast(SecondLevelStruct, output.second_level).deeper_required_prop == "exists"

    # Test stringification
    # Dicts are ordered in Python 3.7+, so this is fine: https://mail.python.org/pipermail/python-dev/2017-December/151283.html
    assert (
        str(output)
        == "TopLevelStruct(required='hello', second_level=SecondLevelStruct(deeper_required_prop='exists'))"
    )


def test_passNestedScalar():
    output = StructPassing.round_trip(123, required="hello", second_level=5)

    assert output.required == "hello"
    assert output.optional is None
    assert output.second_level == 5


def test_passStructsInVariadic():
    output = StructPassing.how_many_var_args_did_i_pass(
        123,
        TopLevelStruct(required="hello", second_level=1),
        TopLevelStruct(
            required="bye", second_level=SecondLevelStruct(deeper_required_prop="ciao")
        ),
    )
    assert output == 2


def test_structEquality():
    a = TopLevelStruct(
        required="bye", second_level=SecondLevelStruct(deeper_required_prop="ciao")
    )
    b = (TopLevelStruct(required="hello", second_level=1),)
    c = (TopLevelStruct(required="hello", second_level=1),)
    d = SecondLevelStruct(deeper_required_prop="exists")

    assert a != b
    assert b == c
    assert a != 5
    assert a != d


def test_correctly_handling_struct_unions():
    a0 = StructA(required_string="Present!", optional_string="Bazinga!")
    a1 = StructA(required_string="Present!", optional_number=1337)
    b0 = StructB(required_string="Present!", optional_boolean=True)
    b1 = StructB(required_string="Present!", optional_struct_a=a1)

    assert StructUnionConsumer.is_struct_a(a0)
    assert StructUnionConsumer.is_struct_a(a1)
    assert not StructUnionConsumer.is_struct_a(b0)
    assert not StructUnionConsumer.is_struct_a(b1)

    assert not StructUnionConsumer.is_struct_b(a0)
    assert not StructUnionConsumer.is_struct_b(a1)
    assert StructUnionConsumer.is_struct_b(b0)
    assert StructUnionConsumer.is_struct_b(b1)


def test_consumer_calls_method_static_objliteral():
    assert ConsumerCanRingBell.static_implemented_by_object_literal(PythonBellRinger())


def test_consumer_calls_method_static_publicclass():
    assert ConsumerCanRingBell.static_implemented_by_public_class(PythonBellRinger())


def test_consumer_calls_method_static_privateclass():
    assert ConsumerCanRingBell.static_implemented_by_private_class(PythonBellRinger())


def test_consumer_calls_method_static_typed_as_class():
    assert ConsumerCanRingBell.static_when_typed_as_class(PythonConcreteBellRinger())


def test_consumer_calls_method_objliteral():
    assert ConsumerCanRingBell().implemented_by_object_literal(PythonBellRinger())


def test_consumer_calls_method_publicclass():
    assert ConsumerCanRingBell().implemented_by_public_class(PythonBellRinger())


def test_consumer_calls_method_privateclass():
    assert ConsumerCanRingBell().implemented_by_private_class(PythonBellRinger())


def test_consumer_calls_method_typed_as_class():
    assert ConsumerCanRingBell().when_typed_as_class(PythonConcreteBellRinger())


def test_can_pass_nested_struct_as_dict():
    # Those shouldn't raise:
    RootStructValidator.validate(string_prop="Pickle Rick!!!")
    RootStructValidator.validate(string_prop="Pickle Rick!!!", nested_struct=None)
    RootStructValidator.validate(
        string_prop="Pickle Rick!!!", nested_struct={"number_prop": 1337}
    )


def test_can_leverage_indirect_interface_polymorphism():
    provider = AnonymousImplementationProvider()
    assert provider.provide_as_class().value == 1337
    assert provider.provide_as_interface().value == 1337
    assert provider.provide_as_interface().verb() == "to implement"


# https://github.com/aws/jsii/issues/976
def test_return_subclass_that_implements_interface_976():
    obj = SomeTypeJsii976.return_return()
    assert obj.foo == 333


def test_return_subclass_that_implements_interface_976_raises_attributeerror_when_using_non_existent_method():
    obj = SomeTypeJsii976.return_return()
    try:
        print(obj.not_a_real_method_I_swear)  # type:ignore
        failed = False
    except AttributeError as err:
        failed = True
        assert (
            err.args[0]
            == "'<class 'jsii_calc.BaseJsii976'>+<class 'jsii_calc._IReturnJsii976Proxy'>' object has no attribute 'not_a_real_method_I_swear'"
        )
    assert failed


def test_return_anonymous_implementation_of_interface():
    assert SomeTypeJsii976.return_anonymous() is not None


def test_structs_can_be_downcasted_to_parent_type():
    assert Demonstrate982.take_this() is not None
    assert Demonstrate982.take_this_too() is not None


@jsii.implements(IBellRinger)
class PythonBellRinger:
    def your_turn(self, bell):
        bell.ring()


@jsii.implements(IConcreteBellRinger)
class PythonConcreteBellRinger:
    def your_turn(self, bell):
        bell.ring()


def test_null_is_a_valid_optional_list():
    assert DisappointingCollectionSource.MAYBE_LIST is None


def test_null_is_a_valid_optional_map():
    assert DisappointingCollectionSource.MAYBE_MAP is None


def test_can_use_interface_setters():
    obj = ObjectWithPropertyProvider.provide()
    obj.property = "New Value"
    assert obj.was_set()


def test_structs_are_undecorated_on_the_way_to_kernel():
    json = JsonFormatter.stringify(
        StructB(required_string="Bazinga!", optional_boolean=False)
    )
    assert loads(cast(str, json)) == {
        "requiredString": "Bazinga!",
        "optionalBoolean": False,
    }


def test_can_obtain_reference_with_overloaded_setter():
    assert ConfusingToJackson.make_instance() is not None


def test_can_obtain_struct_reference_with_overloaded_setter():
    assert ConfusingToJackson.make_struct_instance() is not None


def test_pure_interfaces_can_be_used_transparently():
    expected = StructB(required_string="It's Britney b**ch!")

    @jsii.implements(IStructReturningDelegate)
    class StructReturningDelegate:
        def return_struct(self):
            return expected

    delegate = StructReturningDelegate()
    consumer = ConsumePureInterface(delegate)
    assert consumer.work_it_baby() == expected


def test_pure_interfaces_can_be_used_transparently_when_transitively_implementing():
    expected = StructB(required_string="It's Britney b**ch!")

    @jsii.implements(IStructReturningDelegate)
    class ImplementsStructReturningDelegate:
        def return_struct(self):
            return expected

    class IndirectlyImplementsStructReturningDelegate(
        ImplementsStructReturningDelegate
    ): ...

    delegate = IndirectlyImplementsStructReturningDelegate()
    consumer = ConsumePureInterface(delegate)
    assert consumer.work_it_baby() == expected


def test_pure_interfaces_can_be_used_transparently_when_added_to_jsii_type():
    expected = StructB(required_string="It's Britney b**ch!")

    @jsii.implements(IStructReturningDelegate)
    class ImplementsAdditionalInterface(AllTypes):
        def return_struct(self):
            return expected

    delegate = ImplementsAdditionalInterface()
    consumer = ConsumePureInterface(delegate)
    assert consumer.work_it_baby() == expected


def test_lifted_kwarg_with_same_name_as_positional_arg():
    bell = Bell()
    amb = AmbiguousParameters(bell, scope="Driiiing!")

    assert amb.scope == bell
    assert amb.props == StructParameterType(scope="Driiiing!")


def test_abstract_members_are_correctly_handled():
    class AbstractSuiteImpl(AbstractSuite):
        @property
        def _property(self):
            return self.property

        @_property.setter
        def _property(self, value):
            self.property = "String<%s>" % value

        def _some_method(self, str):
            return "Wrapped<%s>" % str

    abstract_suite = AbstractSuiteImpl()
    assert "Wrapped<String<Oomf!>>" == abstract_suite.work_it_all("Oomf!")


def test_collection_of_interfaces_list_of_structs():
    for elt in InterfaceCollections.list_of_structs():
        assert getattr(elt, "required_string") is not None


def test_collection_of_interfaces_list_of_interfaces():
    for elt in InterfaceCollections.list_of_interfaces():
        assert getattr(elt, "ring") is not None


def test_collection_of_interfaces_map_of_structs():
    for elt in InterfaceCollections.map_of_structs().values():
        assert getattr(elt, "required_string") is not None


def test_collection_of_interfaces_map_of_interfaces():
    for elt in InterfaceCollections.map_of_interfaces().values():
        assert getattr(elt, "ring") is not None


def test_dependency_submodule_types_are_usable():
    subject = UpcasingReflectable({"foo": "bar"})

    assert UpcasingReflectable.REFLECTOR.as_map(subject) == {"FOO": "bar"}


def test_load_submodules():
    from jsii_calc.submodule import nested_submodule
    import jsii_calc.submodule


def test_parameter_named_self_ClassWithSelf():
    subject = ClassWithSelf("Howdy!")
    assert subject.self == "Howdy!"
    assert subject.method(1337) == "1337"


def test_parameter_named_self_ClassWithSelfKwarg():
    subject = ClassWithSelfKwarg(self="Howdy!")
    assert subject.props.self == "Howdy!"


def test_isomorphism_within_constructor():
    class Subject(Isomorphism):
        def __init__(self):
            super().__init__()
            assert self == self.myself()

    Subject()


def test_kwargs_from_superinterface_are_working():
    assert Kwargs.method(extra="ordinary", prop=SomeEnum.SOME)


def test_iso8601_does_not_deserialize_to_date():
    @jsii.implements(IWallClock)
    class WallClock:
        def __init__(self, now: str):
            self.now = now

        def iso8601_now(self) -> str:
            return self.now

    class MildEntropy(Entropy):
        def repeat(self, word: str) -> str:
            return word

    now = datetime.utcnow().isoformat() + "Z"
    wall_clock = WallClock(now)
    entropy = MildEntropy(wall_clock)

    assert now == entropy.increase()


def test_class_can_extend_and_implement_from_jsii():
    """
    This test is identical to test_iso8601_does_not_deserialize_to_date, except
    the WallCloc class extends ClassWithSelf (a well-known jsii type), to
    demonstrate it is possible to both extend a jsii type, and implement a
    supplemental interface at the same time.

    See also https://github.com/aws/jsii/issues/2963
    """

    @jsii.implements(IWallClock)
    class WallClock(ClassWithSelf):
        def __init__(self, now: str):
            super().__init__(now)
            self.now = now

        def iso8601_now(self) -> str:
            return self.now

    class MildEntropy(Entropy):
        def repeat(self, word: str) -> str:
            return word

    now = datetime.utcnow().isoformat() + "Z"
    wall_clock = WallClock(now)
    entropy = MildEntropy(wall_clock)

    assert now == entropy.increase()


def test_class_can_be_used_when_not_expressedly_loaded():
    """
    This test verifies that it is possible to receive instances of classes that
    belong to submodules that have not been explicitly imported. This implies
    the types are registered with the runtime even though the submodule has
    never been mentioned in userland.
    """

    class Subject(Cdk16625):
        def _unwrap(self, gen: IRandomNumberGenerator):
            return gen.next()

    # This should NOT throw
    Subject().test()


def test_stripped_deprecated_member_can_be_received():
    assert InterfaceFactory.create() is not None


def test_exception_message():
    with pytest.raises(RuntimeError, match="Cannot find asset"):
        AcceptsPath(source_path="A Bad Path")


def test_void_returning_async():
    """Verifies it's okay to return a Promise<void>."""

    assert PromiseNothing().instance_promise_it() is None
    ## TODO: This is currently broken as code-gen is incorrect for static async.
    # assert PromiseNothing.promise_it() is None
