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
    ClassWithCollections,
    ClassWithJavaReservedWords,
    ClassWithPrivateConstructorAndAutomaticProperties,
    ConfusingToJackson,
    ConsumePureInterface,
    ConsumerCanRingBell,
    ConstructorPassesThisOut,
    Constructors,
    DataRenderer,
    Demonstrate982,
    DerivedStruct,
    DiamondInheritanceTopLevelStruct,
    DisappointingCollectionSource,
    DoNotOverridePrivates,
    DoubleTrouble,
    Entropy,
    EnumDispenser,
    GiveMeStructs,
    GreetingAugmenter,
    IBellRinger,
    IFriendlier,
    IFriendlyRandomGenerator,
    IRandomNumberGenerator,
    InbetweenClass,
    InterfaceCollections,
    IInterfaceWithProperties,
    IStructReturningDelegate,
    IWallClock,
    JavaReservedWords,
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
    OverridableProtectedMember,
    PartiallyInitializedThisConsumer,
    Polymorphism,
    Power,
    PythonReservedWords,
    ReferenceEnumFromScopedPackage,
    ReturnsPrivateImplementationOfInterface,
    StaticPropertyAssignment,
    Statics,
    StructWithJavaReservedWords,
    Sum,
    SyncVirtualMethods,
    UsesInterfaceWithProperties,
    composition,
    EraseUndefinedHashValues,
    EraseUndefinedHashValuesOptions,
    VariadicMethod,
    StructA,
    StructB,
    StructUnionConsumer,
    StructPassing,
    SecondLevelStruct,
    TopLevelStruct,
    IReturnJsii976,
    SomeTypeJsii976,
    StructParameterType,
    AnonymousImplementationProvider,
    PromiseNothing,
    StaticAsyncMethods,
)
from jsii_calc.cdk16625 import Cdk16625
from jsii_calc.cdk22369 import AcceptsPath
from jsii_calc.submodule.child import OuterClass
from scope.jsii_calc_base_of_base import StaticConsumer
from scope.jsii_calc_lib import (
    IFriendly,
    EnumFromScopedModule,
    MyFirstStruct,
    Number,
    StructWithOnlyOptionals,
)
from scope.jsii_calc_lib.custom_submodule_name import NestingClass, ReflectableEntry
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


def test_primitives_round_trip():
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


def test_dates_round_trip():
    types = AllTypes()

    # strong type
    types.date_property = datetime.fromtimestamp(123 / 1000.0, tz=timezone.utc)
    assert types.date_property == datetime.fromtimestamp(123 / 1000.0, tz=timezone.utc)

    # weak type
    types.any_property = datetime.fromtimestamp(999 / 1000.0, tz=timezone.utc)
    assert types.any_property == datetime.fromtimestamp(999 / 1000.0, tz=timezone.utc)


def test_collection_properties_can_be_set_and_read():
    types = AllTypes()

    # array
    types.array_property = ["Hello", "World"]
    assert types.array_property[1] == "World"

    # map
    map_ = {}
    map_["Foo"] = Number(123)
    types.map_property = map_
    # TODO: No Assertion?


def test_any_values_keep_their_type():
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


def test_union_property_accepts_each_member_type():
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


def test_optional_constructor_parameters_can_be_omitted():
    Calculator()
    Calculator(maximum_value=10)


def test_primitive_properties_can_be_read():
    number = Number(20)

    assert number.value == 20
    assert number.double_value == 40
    assert Negate(Add(Number(20), Number(10))).value == -30
    assert Multiply(Add(Number(5), Number(5)), Number(2)).value == 20
    assert Power(Number(3), Number(4)).value == 3**4
    assert Power(Number(999), Number(1)).value == 999
    assert Power(Number(999), Number(0)).value == 1


def test_instance_methods_can_be_called():
    calc = Calculator()

    calc.add(10)
    assert calc.value == 10

    calc.mul(2)
    assert calc.value == 20

    calc.pow(5)
    assert calc.value == 20**5

    calc.neg()
    assert calc.value == -3_200_000


def test_abstract_typed_value_received_as_reference():
    calc = Calculator()
    calc.add(120)

    assert calc.curr.value == 120


def test_object_properties_can_be_read_and_assigned():
    calc = Calculator()
    calc.add(3_200_000)
    calc.neg()
    calc.curr = Multiply(Number(2), calc.curr)

    assert calc.value == -6_400_000


def test_enum_properties_can_be_read_and_written():
    calc = Calculator()
    calc.add(9)
    calc.pow(3)

    CompositeOperation = composition.CompositeOperation

    assert calc.string_style == CompositeOperation.CompositionStringStyle.NORMAL

    calc.string_style = CompositeOperation.CompositionStringStyle.DECORATED

    assert calc.string_style == CompositeOperation.CompositionStringStyle.DECORATED
    assert calc.to_string() == "<<[[{{(((1 * (0 + 9)) * (0 + 9)) * (0 + 9))}}]]>>"


def test_enums_from_dependencies_cross_the_boundary():
    obj = ReferenceEnumFromScopedPackage()
    assert obj.foo == EnumFromScopedModule.VALUE2
    obj.foo = EnumFromScopedModule.VALUE1
    assert obj.load_foo() == EnumFromScopedModule.VALUE1
    obj.save_foo(EnumFromScopedModule.VALUE2)
    assert obj.foo == EnumFromScopedModule.VALUE2


def test_unset_optional_property_reads_as_absent():
    calc = Calculator()
    assert calc.max_value is None
    calc.max_value = None


def test_arrays_of_objects_preserve_order_and_type():
    sum_ = Sum()
    sum_.parts = [Number(5), Number(10), Multiply(Number(2), Number(3))]

    assert sum_.value == 5 + 10 + (2 * 3)
    assert sum_.parts[0].value == 5
    assert sum_.parts[2].value == 6
    assert sum_.to_string() == "(((0 + 5) + 10) + (2 * 3))"


def test_maps_of_objects_can_be_read():
    calc2 = Calculator()  # Initializer overload (props is optional)
    calc2.add(10)
    calc2.add(20)
    calc2.mul(2)

    assert len(cast(List, calc2.operations_map.get("add"))) == 2
    assert len(cast(List, calc2.operations_map.get("mul"))) == 1
    got = calc2.operations_map.get("add")
    assert got is not None
    assert got[1].value == 30


def test_kernel_errors_reach_the_host():
    calc3 = Calculator(initial_value=20, maximum_value=30)
    calc3.add(3)

    assert calc3.value == 23

    with pytest.raises(RuntimeError):
        calc3.add(10)

    calc3.max_value = 40
    calc3.add(10)

    assert calc3.value == 33


def test_union_property_returns_concrete_type():
    calc3 = Calculator()
    calc3.union_property = Multiply(Number(9), Number(3))

    assert isinstance(calc3.union_property, Multiply)
    assert calc3.read_union_value() == 9 * 3

    calc3.union_property = Power(Number(10), Number(3))

    assert isinstance(calc3.union_property, Power)
    assert calc3.read_union_value() == 10**3


def test_host_subclass_can_be_used():
    calc = Calculator()
    calc.curr = AddTen(33)
    calc.neg()

    assert calc.value == -43


def test_object_literal_returned_as_class_is_usable():
    obj = JSObjectLiteralToNative()
    obj2 = obj.return_literal()

    assert obj2.prop_a == "Hello"
    assert obj2.prop_b == 102


def test_inherited_properties_usable_on_host_subclass():
    # make sure that fluent API can be assigned to objects from derived classes
    obj = DerivedFromAllTypes()
    obj.string_property = "Hello"
    obj.number_property = 12

    assert obj.string_property == "Hello"
    assert obj.number_property == 12


def test_object_references_round_trip_through_any():
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


def test_async_methods_can_be_called():
    obj = AsyncVirtualMethods()
    assert obj.call_me() == 128
    assert obj.override_me(44) == 528


def test_async_method_can_be_overridden():
    obj = OverrideAsyncMethods()
    assert obj.call_me() == 4452


def test_async_override_can_be_inherited():
    obj = OverrideAsyncMethodsByBaseClass()
    assert obj.call_me() == 4452


def test_async_override_can_call_super():
    obj = OverrideCallsSuper()
    assert obj.override_me(12) == 1441
    assert obj.call_me() == 1209


def test_multiple_async_methods_can_be_overridden():
    obj = TwoOverrides()
    assert obj.call_me() == 684


def test_async_override_error_propagates():
    class ThrowingAsyncVirtualMethods(AsyncVirtualMethods):
        def override_me(self, mult):
            raise RuntimeError("Thrown by native code")

    obj = ThrowingAsyncVirtualMethods()

    with pytest.raises(RuntimeError, match="Thrown by native code"):
        obj.call_me()


def test_method_calls_use_host_override():
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


def test_property_accesses_use_host_overrides():
    so = SyncOverrides()
    assert so.retrieve_value_of_the_property() == "I am an override!"
    so.modify_value_of_the_property("New Value")
    assert so.another_the_property == "New Value"


def test_getter_override_can_call_super():
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


def test_setter_override_can_call_super():
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


def test_getter_override_error_propagates():
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


def test_setter_override_error_propagates():
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


def test_kernel_uses_host_interface_accessors():
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


def test_method_override_can_call_super():
    obj = SyncOverrides()
    assert obj.caller_is_property == 10 * 5
    obj.return_super = True
    assert obj.caller_is_property == 10 * 2


def test_sync_method_override_calling_async_fails():
    obj = SyncOverrides()
    obj.call_async = True

    # TODO: Error Handling
    with pytest.raises(RuntimeError):
        obj.caller_is_method()


def test_sync_getter_override_calling_async_fails():
    obj = SyncOverrides()
    obj.call_async = True

    # TODO: Error Handling
    with pytest.raises(RuntimeError):
        obj.caller_is_property


def test_sync_setter_override_calling_async_fails():
    obj = SyncOverrides()
    obj.call_async = True

    # TODO: Error Handling
    with pytest.raises(RuntimeError):
        obj.caller_is_property = 12


def test_objects_usable_through_every_interface() -> None:
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


def test_host_objects_keep_identity_across_the_boundary():
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


def test_object_literal_returned_as_interface_is_usable():
    obj = JSObjectLiteralForInterface()
    friendly = obj.give_me_friendly()
    gen = obj.give_me_friendly_generator()

    assert friendly.hello() == "I am literally friendly!"
    assert gen.hello() == "giveMeFriendlyGenerator"
    assert gen.next() == 42


def test_interface_value_can_be_passed_back():
    obj = JSObjectLiteralForInterface()
    friendly = obj.give_me_friendly()
    greeting_augmenter = GreetingAugmenter()

    assert friendly.hello() == "I am literally friendly!"
    assert (
        greeting_augmenter.better_greeting(friendly)
        == "I am literally friendly! Let me buy you a drink!"
    )


def test_static_members_can_be_used():
    assert Statics.static_method("Yoyo") == "hello ,Yoyo!"
    assert Statics.instance.value == "default"

    new_statics = Statics("new value")
    Statics.instance = new_statics

    assert Statics.instance is new_statics
    assert Statics.instance.value == "new value"

    assert Statics.non_const_static == 100


def test_static_property_assignment_updates_java_script():
    assert StaticPropertyAssignment.read_value() == "default"
    try:
        StaticPropertyAssignment.value = "assigned"

        assert StaticPropertyAssignment.read_value() == "assigned"
        assert StaticPropertyAssignment.value == "assigned"
    finally:
        StaticPropertyAssignment.value = "default"

    assert StaticPropertyAssignment.read_value() == "default"


def test_constants_can_be_read():
    obj = Statics.CONST_OBJ

    assert Statics.FOO == "hello"
    assert obj.hello() == "world"
    assert Statics.BAR == 1234
    assert Statics.ZOO_BAR.get("hello") == "world"


def test_reserved_word_methods_are_callable():
    obj = PythonReservedWords()
    obj.import_()
    obj.return_()


def test_node_standard_library_is_available():
    obj = NodeStandardLibrary()

    assert obj.fs_read_file() == "Hello, resource!"
    assert obj.fs_read_file_sync() == "Hello, resource! SYNC!"
    assert len(obj.os_platform) > 0
    assert (
        obj.crypto_sha256()
        == "6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50"
    )


def test_objects_returned_as_abstract_type_are_usable():
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


def test_host_method_does_not_override_private_method():
    class TDoNotOverridePrivates(DoNotOverridePrivates):
        def private_method(self):
            return "privateMethod-Override"

    obj = TDoNotOverridePrivates()

    assert obj.private_method_value() == "privateMethod"


def test_host_method_does_not_override_private_property():
    class TDoNotOverridePrivates(DoNotOverridePrivates):
        def private_property(self):
            return "privateProperty-Override"

    obj = TDoNotOverridePrivates()

    assert obj.private_property_value() == "privateProperty"


def test_host_accessor_does_not_override_private_property():
    class TDoNotOverridePrivates(DoNotOverridePrivates):
        @property
        def private_property(self) -> str:
            return "privateProperty-Override"

        @private_property.setter
        def private_property(self, _: str):
            raise RuntimeError("Boom")

    obj = TDoNotOverridePrivates()

    assert obj.private_property_value() == "privateProperty"

    # verify the setter override is not invoked.
    obj.change_private_property_value("MyNewValue")
    assert obj.private_property_value() == "MyNewValue"


def test_private_constructor_class_from_static_factory():
    obj = ClassWithPrivateConstructorAndAutomaticProperties.create("Hello", "Bye")
    assert obj.read_write_string == "Bye"
    assert obj.read_only_string == "Hello"


def test_host_null_is_sent_as_undefined():
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


def test_kernel_knows_the_host_runtime():
    assert JsiiAgent.value == f"Python/{platform.python_version()}"


def test_non_exported_class_received_as_interface():
    assert ReturnsPrivateImplementationOfInterface().private_implementation.success


def test_unset_struct_properties_are_omitted():
    opts = EraseUndefinedHashValuesOptions(option1="option1")
    assert EraseUndefinedHashValues.does_key_exist(opts, "option1")
    assert not EraseUndefinedHashValues.does_key_exist(opts, "option2")


def test_constructor_can_pass_this_to_the_host():
    class PartiallyInitializedThisConsumerImpl(PartiallyInitializedThisConsumer):
        def consume_partially_initialized_this(self, obj, dt, ev):
            assert obj is not None
            assert isinstance(dt, datetime)
            assert ev == AllTypesEnum.THIS_IS_GREAT
            return "OK"

    reflector = PartiallyInitializedThisConsumerImpl()
    obj = ConstructorPassesThisOut(reflector)
    assert obj is not None


def test_variadic_arguments_are_forwarded():
    variadic = VariadicMethod(1)
    assert variadic.as_array(3, 4, 5, 6) == [1, 3, 4, 5, 6]


def test_override_receives_deserialized_arguments():
    class DataRendererSubclass(DataRenderer):
        def render_map(self, map):
            return super().render_map(map)

    renderer = DataRendererSubclass()
    assert (
        renderer.render(anumber=42, astring="bazinga!")
        == '{\n  "anumber": 42,\n  "astring": "bazinga!"\n}'
    )


def test_overlapping_struct_unions_are_disambiguated():
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


def test_interface_value_with_private_type_is_usable():
    provider = AnonymousImplementationProvider()
    assert provider.provide_as_class().value == 1337
    assert provider.provide_as_interface().value == 1337
    assert provider.provide_as_interface().verb() == "to implement"


def test_objects_usable_through_implemented_interface():
    obj = SomeTypeJsii976.return_return()
    assert obj.foo == 333

    # `return_anonymous()` is declared as `any` and returns an instance of a private
    # class, so the kernel doesn't know which interface it implements.
    anonymous = jsii.unsafe_cast(SomeTypeJsii976.return_anonymous(), IReturnJsii976)
    assert anonymous.foo == 1337


def test_struct_received_as_parent_struct_type():
    assert Demonstrate982.take_this() is not None
    assert Demonstrate982.take_this_too() is not None


def test_undefined_optional_list_reads_as_absent():
    assert DisappointingCollectionSource.MAYBE_LIST is None


def test_undefined_optional_map_reads_as_absent():
    assert DisappointingCollectionSource.MAYBE_MAP is None


def test_interface_property_can_be_set():
    obj = ObjectWithPropertyProvider.provide()
    obj.property = "New Value"
    assert obj.was_set()


def test_structs_are_sent_as_plain_data():
    json = JsonFormatter.stringify(
        StructB(required_string="Bazinga!", optional_boolean=False)
    )
    assert loads(cast(str, json)) == {
        "requiredString": "Bazinga!",
        "optionalBoolean": False,
    }


def test_class_with_union_property_can_be_received():
    assert ConfusingToJackson.make_instance() is not None


def test_host_can_implement_interface():
    expected = StructB(required_string="It's Britney b**ch!")

    @jsii.implements(IStructReturningDelegate)
    class StructReturningDelegate:
        def return_struct(self):
            return expected

    delegate = StructReturningDelegate()
    consumer = ConsumePureInterface(delegate)
    assert consumer.work_it_baby() == expected


def test_host_can_implement_interface_through_superclass():
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


def test_host_subclass_can_implement_additional_interface():
    expected = StructB(required_string="It's Britney b**ch!")

    @jsii.implements(IStructReturningDelegate)
    class ImplementsAdditionalInterface(AllTypes):
        def return_struct(self):
            return expected

    delegate = ImplementsAdditionalInterface()
    consumer = ConsumePureInterface(delegate)
    assert consumer.work_it_baby() == expected


def test_positional_argument_and_struct_property_with_same_name():
    bell = Bell()
    amb = AmbiguousParameters(bell, scope="Driiiing!")

    assert amb.scope == bell
    assert amb.props == StructParameterType(scope="Driiiing!")


def test_host_implements_abstract_members():
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


def test_list_of_structs_elements_have_struct_type():
    for elt in InterfaceCollections.list_of_structs():
        assert getattr(elt, "required_string") is not None


def test_list_of_interfaces_elements_are_usable():
    for elt in InterfaceCollections.list_of_interfaces():
        assert getattr(elt, "ring") is not None


def test_map_of_structs_values_have_struct_type():
    for elt in InterfaceCollections.map_of_structs().values():
        assert getattr(elt, "required_string") is not None


def test_map_of_interfaces_values_are_usable():
    for elt in InterfaceCollections.map_of_interfaces().values():
        assert getattr(elt, "ring") is not None


def test_iso_date_strings_stay_strings():
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


def test_types_not_loaded_by_the_host_can_be_received():
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


def test_stripped_deprecated_type_can_be_received():
    assert InterfaceFactory.create() is not None


def test_kernel_error_message_reaches_the_host():
    with pytest.raises(RuntimeError, match="Cannot find asset"):
        AcceptsPath(source_path="A Bad Path")


def test_async_method_returning_nothing():
    """Verifies it's okay to return a Promise<void>."""

    assert PromiseNothing().instance_promise_it() is None
    assert PromiseNothing.promise_it() is None


def test_static_async_methods_can_be_called():
    assert StaticAsyncMethods.add_one(41) == 42


def test_submodule_struct_can_be_passed():
    StaticConsumer.consume(NestingClass.NestedStruct(name="Bond, James Bond"))


def test_enum_values_returned_by_the_kernel():
    assert EnumDispenser.random_string_like_enum() is not None
    assert EnumDispenser.random_integer_like_enum() is not None


def test_objects_received_as_most_derived_public_type():
    class_ref = Constructors.make_class()
    iface_ref = Constructors.make_interface()

    assert isinstance(class_ref, InbetweenClass)
    assert iface_ref is not None


def test_classes_can_reference_each_other_during_initialization():
    outer_class = OuterClass()
    assert outer_class.inner_class is not None


#
# Collections returned from the kernel
#


def test_returned_array_can_be_read():
    assert ClassWithCollections.create_a_list() == ["one", "two"]


@pytest.mark.skip(
    reason="Not applicable: Python returns a plain, mutable list (not an immutable view)"
)
def test_returned_array_rejects_mutation():
    pass


def test_returned_map_can_be_read():
    result = ClassWithCollections.create_a_map()
    assert result == {"key1": "value1", "key2": "value2"}
    assert len(result) == 2


@pytest.mark.skip(
    reason="Not applicable: Python returns a plain, mutable dict (not an immutable view)"
)
def test_returned_map_rejects_mutation():
    pass


def test_array_property_can_be_read():
    obj = ClassWithCollections({}, ["one", "two"])
    assert obj.array == ["one", "two"]


def test_map_property_can_be_read():
    obj = ClassWithCollections({"key": "value"}, [])
    result = obj.map
    assert result == {"key": "value"}
    assert len(result) == 1


@pytest.mark.skip(
    reason="Not applicable: Python returns a plain, mutable dict (not an immutable view)"
)
def test_map_property_rejects_mutation():
    pass


def test_static_array_property_can_be_read():
    assert ClassWithCollections.static_array == ["one", "two"]


@pytest.mark.skip(
    reason="Not applicable: Python returns a plain, mutable list (not an immutable view)"
)
def test_static_array_property_rejects_mutation():
    pass


def test_static_map_property_can_be_read():
    result = ClassWithCollections.static_map
    assert result == {"key1": "value1", "key2": "value2"}
    assert len(result) == 2


@pytest.mark.skip(
    reason="Not applicable: Python returns a plain, mutable dict (not an immutable view)"
)
def test_static_map_property_rejects_mutation():
    pass


#
# Overriding protected members
#


def test_protected_method_can_be_overridden():
    challenge = "Cthulhu Fhtagn!"

    class Overridden(OverridableProtectedMember):
        def _override_me(self):
            return challenge

    assert Overridden().value_from_protected() == challenge


def test_protected_getter_can_be_overridden():
    class Overridden(OverridableProtectedMember):
        @property
        def _override_read_only(self):
            return "Cthulhu "

        @property  # type: ignore[misc]
        def _override_read_write(  # pyright: ignore[reportIncompatibleMethodOverride]
            self,
        ):
            return "Fhtagn!"

    assert Overridden().value_from_protected() == "Cthulhu Fhtagn!"


def test_protected_setter_can_be_overridden():
    challenge = "Bazzzzzzzzzzzaar..."

    class Overridden(OverridableProtectedMember):
        @property
        def _override_read_write(self):
            return super()._override_read_write

        @_override_read_write.setter
        def _override_read_write(self, value):
            # See test_propertyOverrides_set_calls_super for why this
            # convoluted super().__set__ form is required.
            super(
                self.__class__, self.__class__
            )._override_read_write.__set__(  # type: ignore
                self, f"zzzzzzzzz{value}"
            )

    overridden = Overridden()
    overridden.switch_modes()
    assert overridden.value_from_protected() == challenge


#
# Other struct behaviours
#


def test_diamond_inherited_struct_properties_appear_once():
    struct = DiamondInheritanceTopLevelStruct(
        base_level_property="base",
        first_mid_level_property="mid1",
        second_mid_level_property="mid2",
        top_level_property="top",
    )

    assert struct.base_level_property == "base"
    assert struct.first_mid_level_property == "mid1"
    assert struct.second_mid_level_property == "mid2"
    assert struct.top_level_property == "top"


def test_incomplete_struct_is_rejected():
    # Required struct properties have no default, so omitting them raises.
    with pytest.raises(TypeError):
        MyFirstStruct()  # type: ignore[call-arg]


def test_received_struct_equals_host_built_struct():
    gms = GiveMeStructs()
    returned_literal = gms.struct_literal
    native_built = StructWithOnlyOptionals(
        optional1="optional1FromStructLiteral",
        optional3=False,
    )

    assert native_built.optional1 == returned_literal.optional1
    assert native_built.optional2 == returned_literal.optional2
    assert native_built.optional3 == returned_literal.optional3
    assert native_built == returned_literal
    assert returned_literal == native_built


def test_structs_are_passed_by_value():
    first_struct = MyFirstStruct(
        astring="FirstString",
        anumber=999,
        first_optional=["First", "Optional"],
    )

    double_trouble = DoubleTrouble()

    derived_struct = DerivedStruct(
        non_primitive=double_trouble,
        bool=False,
        another_required=datetime.now(tz=timezone.utc),
        astring="String",
        anumber=1234,
        first_optional=["one", "two"],
    )

    gms = GiveMeStructs()
    assert gms.read_first_number(astring="FirstString", anumber=999) == 999
    # since derived inherits from first
    assert (
        gms.read_first_number(
            astring=derived_struct.astring,
            anumber=derived_struct.anumber,
            first_optional=derived_struct.first_optional,
        )
        == 1234
    )
    assert (
        gms.read_derived_non_primitive(
            non_primitive=derived_struct.non_primitive,
            bool=derived_struct.bool,
            another_required=derived_struct.another_required,
            astring=derived_struct.astring,
            anumber=derived_struct.anumber,
            first_optional=derived_struct.first_optional,
        )
        is double_trouble
    )

    literal = gms.struct_literal
    assert literal.optional1 == "optional1FromStructLiteral"
    assert literal.optional3 is False
    assert literal.optional2 is None


#
# Reserved keywords
#


def test_reserved_word_struct_properties_are_usable():
    # `assert` is a Python reserved word and gets slugified to `assert_`.
    struct = StructWithJavaReservedWords(assert_="one", default="two")

    assert struct.assert_ == "one"
    assert struct.default == "two"


def test_reserved_word_class_properties_are_accessible():
    obj = ClassWithJavaReservedWords("one")

    result = obj.import_("two")

    assert result == "onetwo"

    # `while` is a Python reserved word and gets slugified to `while_`.
    words = JavaReservedWords()
    assert words.while_ == "hello"


#
# Callbacks and casting
#


def test_callback_receives_interface_arguments():
    @jsii.implements(IBellRinger)
    class BellRinger:
        def your_turn(self, bell):
            bell.ring()

    ringer = BellRinger()
    assert ConsumerCanRingBell.static_implemented_by_object_literal(ringer)
    assert ConsumerCanRingBell.static_implemented_by_public_class(ringer)
    assert ConsumerCanRingBell.static_implemented_by_private_class(ringer)


#
# Struct union round-trips
#


def test_union_struct_property_keeps_concrete_type():
    with_struct = StructPassing.round_trip(
        123,
        required="hello",
        second_level=SecondLevelStruct(deeper_required_prop="exists"),
    )

    assert with_struct.required == "hello"
    assert with_struct.optional is None
    assert (
        cast(SecondLevelStruct, with_struct.second_level).deeper_required_prop
        == "exists"
    )

    # Test stringification.
    # Dicts are ordered in Python 3.7+, so this is deterministic:
    # https://mail.python.org/pipermail/python-dev/2017-December/151283.html
    assert (
        str(with_struct)
        == "TopLevelStruct(required='hello', second_level=SecondLevelStruct(deeper_required_prop='exists'))"
    )

    with_number = StructPassing.round_trip(123, required="hello", second_level=5)

    assert with_number.required == "hello"
    assert with_number.optional is None
    assert with_number.second_level == 5


def test_union_of_list_and_object_struct_property_round_trips():
    friendly = Add(Number(1), Number(2))

    # A single object reference is received back as that same object reference.
    single = ConfusingToJackson.round_trip_struct(union_property=friendly)
    assert single.union_property is friendly

    # A list is received back as a list with the same (identical) elements.
    listed = ConfusingToJackson.round_trip_struct(union_property=[friendly])
    assert listed.union_property == [friendly]
    assert cast(List[IFriendly], listed.union_property)[0] is friendly

    # A property the host did not set is received as unset.
    unset = ConfusingToJackson.round_trip_struct()
    assert unset.union_property is None
