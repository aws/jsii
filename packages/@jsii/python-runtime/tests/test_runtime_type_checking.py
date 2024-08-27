import pytest
import re
from typing import Optional, cast, Any

from scope.jsii_calc_lib.custom_submodule_name import NestingClass
from scope.jsii_calc_lib import Number
import jsii_calc
import jsii
import typeguard

from importlib.metadata import version

TYPEGUARD_MAJOR_VERSION = int(version("typeguard").split(".")[0])


@jsii.implements(jsii_calc.IBellRinger)
class PythonInvalidBellRinger:
    def your_invalid_turn(self, bell):
        bell.ring()


@pytest.mark.skipif(TYPEGUARD_MAJOR_VERSION != 2, reason="requires typeguard 2.x")
class TestRuntimeTypeCheckingTypeGuardV2:

    @property
    def check_type_error(self):
        return TypeError

    """
    These tests verify that runtime type checking performs the necessary validations and produces error messages that
    are indicative of the error. There are #type:ignore annotations scattered everywhere as these tests are obviously
    attempting to demonstrate what happens when invalid calls are being made.
    """

    def test_constructor(self):
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "type of argument initial_value must be one of (int, float, NoneType); got str instead"
            ),
        ):
            jsii_calc.Calculator(initial_value="nope")  # type:ignore

    def test_constructor_decorated(self):
        """
        This test verifies that runtime type checking is not broken when a function is wrapped with a decorator, as was
        the case with the original implementation (due to a dynamic access to type_hints for the method via the type).
        """

        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "type of argument maximum_value must be one of (int, float, NoneType); got str instead"
            ),
        ):
            orig_init = jsii_calc.Calculator.__init__

            # For toy, swap initial_value and maximum_values here
            def decorated(
                self,
                *,
                initial_value: Optional[jsii.Number] = None,
                maximum_value: Optional[jsii.Number] = None,
            ):
                orig_init(
                    self, initial_value=maximum_value, maximum_value=initial_value
                )

            jsii_calc.Calculator.__init__ = decorated
            try:
                jsii_calc.Calculator(initial_value="nope")  # type:ignore
            finally:
                jsii_calc.Calculator.__init__ = orig_init

    def test_struct(self):
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "type of argument foo must be jsii_calc.StringEnum; got int instead"
            ),
        ):
            jsii_calc.StructWithEnum(foo=1337)  # type:ignore

    def test_method_arg(self):
        subject = jsii_calc.Calculator()
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "type of argument value must be one of (int, float); got str instead"
            ),
        ):
            subject.mul("Not a Number")  # type:ignore

    def test_method_kwarg(self):
        subject = jsii_calc.DocumentedClass()
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "type of argument name must be one of (str, NoneType); got int instead"
            ),
        ):
            subject.greet(name=1337)  # type:ignore

    def test_method_vararg(self):
        subject = jsii_calc.StructPassing()
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "type of argument inputs[0] must be jsii_calc.TopLevelStruct; got int instead"
            ),
        ):
            subject.how_many_var_args_did_i_pass(1337, 42)  # type:ignore

    def test_setter_to_enum(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "type of argument value must be jsii_calc.AllTypesEnum; got int instead"
            ),
        ):
            subject.enum_property = 1337  # type:ignore

    def test_setter_to_primitive(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape("type of argument value must be str; got int instead"),
        ):
            subject.string_property = 1337  # type:ignore

    def test_setter_to_map(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "type of argument value must be collections.abc.Mapping; got jsii_calc.StructWithEnum instead"
            ),
        ):
            subject.map_property = jsii_calc.StructWithEnum(  # type:ignore
                foo=jsii_calc.StringEnum.A
            )

    def test_setter_to_list(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape("type of argument value must be a list; got int instead"),
        ):
            subject.array_property = 1337  # type:ignore

    def test_setter_to_list_with_invalid_value(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape("type of argument value[0] must be str; got int instead"),
        ):
            subject.array_property = [1337]  # type:ignore

    def test_setter_to_union(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "type of argument value must be one of (str, int, float, scope.jsii_calc_lib.Number, jsii_calc.Multiply); got jsii_calc.StringEnum instead"
            ),
        ):
            subject.union_property = jsii_calc.StringEnum.B  # type:ignore

    def test_nested_struct(self):
        # None of these should throw...
        NestingClass.NestedStruct(name="Queen B")

    def test_anonymous_object(self):
        struct = jsii_calc.StructUnionConsumer.provide_struct("A")
        assert jsii_calc.StructUnionConsumer.is_struct_a(struct)

        iface = jsii_calc.anonymous.UseOptions.provide("A")
        assert jsii_calc.anonymous.UseOptions.consume(iface) == "A"

    def test_nested_union(self):
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "type of argument union_property[0] must be one of (Mapping[str, Union[jsii_calc.StructA, Dict[str, Any], jsii_calc.StructB]], Sequence[Union[jsii_calc.StructA, Dict[str, Any], jsii_calc.StructB]]); got float instead"
            ),
        ):
            jsii_calc.ClassWithNestedUnion([1337.42])  # type:ignore

    def test_variadic(self):
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "type of argument union[1] must be one of (jsii_calc.StructA, jsii_calc.StructB); got float instead"
            ),
        ):
            jsii_calc.VariadicTypeUnion(
                jsii_calc.StructA(required_string="present"), 1337.42  # type:ignore
            )

        jsii_calc.VariadicTypeUnion()

    def test_homonymous_forward_references(self):
        """Verifies homonymous forward references don't trip the type checker

        This has been an issue when stub functions were introduced to create a reliable source for type checking
        information, which was reported in https://github.com/aws/jsii/issues/3818.
        """
        # This uses a ForwardRef["Homonymous"] that should resolve to jsii_calc.homonymous_forward_references.foo.Homonymous
        jsii_calc.homonymous_forward_references.foo.Consumer.consume(
            homonymous={"string_property": "Check!"}
        )
        # This uses a ForwardRef["Homonymous"] that should resolve to jsii_calc.homonymous_forward_references.bar.Homonymous
        jsii_calc.homonymous_forward_references.bar.Consumer.consume(
            homonymous={"numeric_property": 1337}
        )

    def test_shadowed_namespaces_are_not_a_problem(self):
        """Verifies that a parameter shadowing a namespace does not cause errors

        This has caused https://github.com/aws/aws-cdk/issues/22975.
        """

        subject = jsii_calc.ParamShadowsScope()
        num = Number(1337)
        # The parameter is named "scope" which shadows the "scope" module...
        assert num == subject.use_scope(num)

    def test_shadowed_builtins_are_not_a_problem(self):
        """Verifies that a parameter shadowing a built-in name does not cause errors"""

        jsii_calc.ParamShadowsBuiltins(
            "${not a Python type (builtins)}",
            "${not a Python type (str)}",
            string_property="Most definitely a string",
            boolean_property=True,
            struct_property={
                "required_string": "Present!",
            },
        )

    def test_descriptive_error_when_passing_function(self):
        obj = jsii_calc.Calculator()

        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "type of argument value must be one of (int, float); got method instead"
            ),
        ):
            obj.add(cast(Any, self.test_descriptive_error_when_passing_function))


@pytest.mark.skipif(TYPEGUARD_MAJOR_VERSION != 3, reason="requires typeguard 3.x")
class TestRuntimeTypeCheckingTypeGuardV3:

    @property
    def check_type_error(self):
        return typeguard.TypeCheckError  # type:ignore

    """
    These tests verify that runtime type checking performs the necessary validations and produces error messages that
    are indicative of the error. There are #type:ignore annotations scattered everywhere as these tests are obviously
    attempting to demonstrate what happens when invalid calls are being made.
    """

    def test_constructor(self):
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "str did not match any element in the union:\n  int: is not an instance of int\n  float: is neither float or int\n  NoneType: is not an instance of NoneType"
            ),
        ):
            jsii_calc.Calculator(initial_value="nope")  # type:ignore

    def test_constructor_decorated(self):
        """
        This test verifies that runtime type checking is not broken when a function is wrapped with a decorator, as was
        the case with the original implementation (due to a dynamic access to type_hints for the method via the type).
        """

        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "str did not match any element in the union:\n  int: is not an instance of int\n  float: is neither float or int\n  NoneType: is not an instance of NoneType"
            ),
        ):
            orig_init = jsii_calc.Calculator.__init__

            # For toy, swap initial_value and maximum_values here
            def decorated(
                self,
                *,
                initial_value: Optional[jsii.Number] = None,
                maximum_value: Optional[jsii.Number] = None,
            ):
                orig_init(
                    self, initial_value=maximum_value, maximum_value=initial_value
                )

            jsii_calc.Calculator.__init__ = decorated
            try:
                jsii_calc.Calculator(initial_value="nope")  # type:ignore
            finally:
                jsii_calc.Calculator.__init__ = orig_init

    def test_struct(self):
        with pytest.raises(
            self.check_type_error,
            match=re.escape("int is not an instance of jsii_calc.StringEnum"),
        ):
            jsii_calc.StructWithEnum(foo=1337)  # type:ignore

    def test_method_arg(self):
        subject = jsii_calc.Calculator()
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "str did not match any element in the union:\n  int: is not an instance of int\n  float: is neither float or int"
            ),
        ):
            subject.mul("Not a Number")  # type:ignore

    def test_method_kwarg(self):
        subject = jsii_calc.DocumentedClass()
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "int did not match any element in the union:\n  str: is not an instance of str\n  NoneType: is not an instance of NoneType"
            ),
        ):
            subject.greet(name=1337)  # type:ignore

    def test_method_vararg(self):
        subject = jsii_calc.StructPassing()
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "item 0 of tuple is not an instance of jsii_calc.TopLevelStruct"
            ),
        ):
            subject.how_many_var_args_did_i_pass(1337, 42)  # type:ignore

    def test_setter_to_enum(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape("int is not an instance of jsii_calc.AllTypesEnum"),
        ):
            subject.enum_property = 1337  # type:ignore

    def test_setter_to_primitive(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape("int is not an instance of str"),
        ):
            subject.string_property = 1337  # type:ignore

    def test_setter_to_map(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape("jsii_calc.StructWithEnum is not a mapping"),
        ):
            subject.map_property = jsii_calc.StructWithEnum(  # type:ignore
                foo=jsii_calc.StringEnum.A
            )

    def test_setter_to_list(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape("int is not a list"),
        ):
            subject.array_property = 1337  # type:ignore

    def test_setter_to_list_with_invalid_value(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape("item 0 of list is not an instance of str"),
        ):
            subject.array_property = [1337]  # type:ignore

    def test_setter_to_union(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "jsii_calc.StringEnum did not match any element in the union:\n  str: is not an instance of str\n  int: is not an instance of int\n  float: is neither float or int\n  scope.jsii_calc_lib.Number: is not an instance of scope.jsii_calc_lib.Number\n  jsii_calc.Multiply: is not an instance of jsii_calc.Multiply"
            ),
        ):
            subject.union_property = jsii_calc.StringEnum.B  # type:ignore

    def test_nested_struct(self):
        # None of these should throw...
        NestingClass.NestedStruct(name="Queen B")

    def test_anonymous_object(self):
        struct = jsii_calc.StructUnionConsumer.provide_struct("A")
        assert jsii_calc.StructUnionConsumer.is_struct_a(struct)

        iface = jsii_calc.anonymous.UseOptions.provide("A")
        assert jsii_calc.anonymous.UseOptions.consume(iface) == "A"

    def test_nested_union(self):
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "item 0 of list did not match any element in the union:\n  Mapping[str, Union[jsii_calc.StructA, Dict[str, Any], jsii_calc.StructB]]: is not a mapping\n  Sequence[Union[jsii_calc.StructA, Dict[str, Any], jsii_calc.StructB]]: is not a sequence"
            ),
        ):
            jsii_calc.ClassWithNestedUnion([1337.42])  # type:ignore

    def test_variadic(self):
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "item 1 of tuple did not match any element in the union:\n  jsii_calc.StructA: is not an instance of jsii_calc.StructA\n  jsii_calc.StructB: is not an instance of jsii_calc.StructB"
            ),
        ):
            jsii_calc.VariadicTypeUnion(
                jsii_calc.StructA(required_string="present"), 1337.42  # type:ignore
            )

        jsii_calc.VariadicTypeUnion()

    def test_homonymous_forward_references(self):
        """Verifies homonymous forward references don't trip the type checker

        This has been an issue when stub functions were introduced to create a reliable source for type checking
        information, which was reported in https://github.com/aws/jsii/issues/3818.
        """
        # This uses a ForwardRef["Homonymous"] that should resolve to jsii_calc.homonymous_forward_references.foo.Homonymous
        jsii_calc.homonymous_forward_references.foo.Consumer.consume(
            homonymous={"string_property": "Check!"}
        )
        # This uses a ForwardRef["Homonymous"] that should resolve to jsii_calc.homonymous_forward_references.bar.Homonymous
        jsii_calc.homonymous_forward_references.bar.Consumer.consume(
            homonymous={"numeric_property": 1337}
        )

    def test_shadowed_namespaces_are_not_a_problem(self):
        """Verifies that a parameter shadowing a namespace does not cause errors

        This has caused https://github.com/aws/aws-cdk/issues/22975.
        """

        subject = jsii_calc.ParamShadowsScope()
        num = Number(1337)
        # The parameter is named "scope" which shadows the "scope" module...
        assert num == subject.use_scope(num)

    def test_shadowed_builtins_are_not_a_problem(self):
        """Verifies that a parameter shadowing a built-in name does not cause errors"""

        jsii_calc.ParamShadowsBuiltins(
            "${not a Python type (builtins)}",
            "${not a Python type (str)}",
            string_property="Most definitely a string",
            boolean_property=True,
            struct_property={
                "required_string": "Present!",
            },
        )

    def test_descriptive_error_when_passing_function(self):
        obj = jsii_calc.Calculator()

        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "method did not match any element in the union:\n  int: is not an instance of int\n  float: is neither float or int"
            ),
        ):
            obj.add(cast(Any, self.test_descriptive_error_when_passing_function))


@pytest.mark.skipif(TYPEGUARD_MAJOR_VERSION != 4, reason="requires typeguard 4.x")
class TestRuntimeTypeCheckingTypeGuardV4:

    @property
    def check_type_error(self):
        return typeguard.TypeCheckError  # type:ignore

    """
    These tests verify that runtime type checking performs the necessary validations and produces error messages that
    are indicative of the error. There are #type:ignore annotations scattered everywhere as these tests are obviously
    attempting to demonstrate what happens when invalid calls are being made.
    """

    def test_constructor(self):
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "str did not match any element in the union:\n  int: is not an instance of int\n  float: is neither float or int\n  NoneType: is not an instance of NoneType"
            ),
        ):
            jsii_calc.Calculator(initial_value="nope")  # type:ignore

    def test_constructor_decorated(self):
        """
        This test verifies that runtime type checking is not broken when a function is wrapped with a decorator, as was
        the case with the original implementation (due to a dynamic access to type_hints for the method via the type).
        """

        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "str did not match any element in the union:\n  int: is not an instance of int\n  float: is neither float or int\n  NoneType: is not an instance of NoneType"
            ),
        ):
            orig_init = jsii_calc.Calculator.__init__

            # For toy, swap initial_value and maximum_values here
            def decorated(
                self,
                *,
                initial_value: Optional[jsii.Number] = None,
                maximum_value: Optional[jsii.Number] = None,
            ):
                orig_init(
                    self, initial_value=maximum_value, maximum_value=initial_value
                )

            jsii_calc.Calculator.__init__ = decorated
            try:
                jsii_calc.Calculator(initial_value="nope")  # type:ignore
            finally:
                jsii_calc.Calculator.__init__ = orig_init

    def test_struct(self):
        with pytest.raises(
            self.check_type_error,
            match=re.escape("int is not an instance of jsii_calc.StringEnum"),
        ):
            jsii_calc.StructWithEnum(foo=1337)  # type:ignore

    def test_method_arg(self):
        subject = jsii_calc.Calculator()
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "str did not match any element in the union:\n  int: is not an instance of int\n  float: is neither float or int"
            ),
        ):
            subject.mul("Not a Number")  # type:ignore

    def test_method_kwarg(self):
        subject = jsii_calc.DocumentedClass()
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "int did not match any element in the union:\n  str: is not an instance of str\n  NoneType: is not an instance of NoneType"
            ),
        ):
            subject.greet(name=1337)  # type:ignore

    def test_method_vararg(self):
        subject = jsii_calc.StructPassing()
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "item 0 of tuple is not an instance of jsii_calc.TopLevelStruct"
            ),
        ):
            subject.how_many_var_args_did_i_pass(1337, 42)  # type:ignore

    def test_setter_to_enum(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape("int is not an instance of jsii_calc.AllTypesEnum"),
        ):
            subject.enum_property = 1337  # type:ignore

    def test_setter_to_primitive(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape("int is not an instance of str"),
        ):
            subject.string_property = 1337  # type:ignore

    def test_setter_to_map(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape("jsii_calc.StructWithEnum is not a mapping"),
        ):
            subject.map_property = jsii_calc.StructWithEnum(  # type:ignore
                foo=jsii_calc.StringEnum.A
            )

    def test_setter_to_list(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape("int is not a list"),
        ):
            subject.array_property = 1337  # type:ignore

    def test_setter_to_list_with_invalid_value(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape("item 0 of list is not an instance of str"),
        ):
            subject.array_property = [1337]  # type:ignore

    def test_setter_to_union(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "jsii_calc.StringEnum did not match any element in the union:\n  str: is not an instance of str\n  int: is not an instance of int\n  float: is neither float or int\n  scope.jsii_calc_lib.Number: is not an instance of scope.jsii_calc_lib.Number\n  jsii_calc.Multiply: is not an instance of jsii_calc.Multiply"
            ),
        ):
            subject.union_property = jsii_calc.StringEnum.B  # type:ignore

    def test_nested_struct(self):
        # None of these should throw...
        NestingClass.NestedStruct(name="Queen B")

    def test_anonymous_object(self):
        struct = jsii_calc.StructUnionConsumer.provide_struct("A")
        assert jsii_calc.StructUnionConsumer.is_struct_a(struct)

        iface = jsii_calc.anonymous.UseOptions.provide("A")
        assert jsii_calc.anonymous.UseOptions.consume(iface) == "A"

    def test_nested_union(self):
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "item 0 of list did not match any element in the union:\n  Mapping[str, Union[jsii_calc.StructA, Dict[str, Any], jsii_calc.StructB]]: is not a mapping\n  Sequence[Union[jsii_calc.StructA, Dict[str, Any], jsii_calc.StructB]]: is not a sequence"
            ),
        ):
            jsii_calc.ClassWithNestedUnion([1337.42])  # type:ignore

    def test_variadic(self):
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "item 1 of tuple did not match any element in the union:\n  jsii_calc.StructA: is not an instance of jsii_calc.StructA\n  jsii_calc.StructB: is not an instance of jsii_calc.StructB"
            ),
        ):
            jsii_calc.VariadicTypeUnion(
                jsii_calc.StructA(required_string="present"), 1337.42  # type:ignore
            )

        jsii_calc.VariadicTypeUnion()

    def test_homonymous_forward_references(self):
        """Verifies homonymous forward references don't trip the type checker

        This has been an issue when stub functions were introduced to create a reliable source for type checking
        information, which was reported in https://github.com/aws/jsii/issues/3818.
        """
        # This uses a ForwardRef["Homonymous"] that should resolve to jsii_calc.homonymous_forward_references.foo.Homonymous
        jsii_calc.homonymous_forward_references.foo.Consumer.consume(
            homonymous={"string_property": "Check!"}
        )
        # This uses a ForwardRef["Homonymous"] that should resolve to jsii_calc.homonymous_forward_references.bar.Homonymous
        jsii_calc.homonymous_forward_references.bar.Consumer.consume(
            homonymous={"numeric_property": 1337}
        )

    def test_shadowed_namespaces_are_not_a_problem(self):
        """Verifies that a parameter shadowing a namespace does not cause errors

        This has caused https://github.com/aws/aws-cdk/issues/22975.
        """

        subject = jsii_calc.ParamShadowsScope()
        num = Number(1337)
        # The parameter is named "scope" which shadows the "scope" module...
        assert num == subject.use_scope(num)

    def test_shadowed_builtins_are_not_a_problem(self):
        """Verifies that a parameter shadowing a built-in name does not cause errors"""

        jsii_calc.ParamShadowsBuiltins(
            "${not a Python type (builtins)}",
            "${not a Python type (str)}",
            string_property="Most definitely a string",
            boolean_property=True,
            struct_property={
                "required_string": "Present!",
            },
        )

    def test_descriptive_error_when_passing_function(self):
        obj = jsii_calc.Calculator()

        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "method did not match any element in the union:\n  int: is not an instance of int\n  float: is neither float or int"
            ),
        ):
            obj.add(cast(Any, self.test_descriptive_error_when_passing_function))

    def test_protocol(self):
        with pytest.raises(
            self.check_type_error,
            match=re.escape(
                "tests.test_runtime_type_checking.PythonInvalidBellRinger is not compatible with the IBellRinger protocol because it has no method named 'your_turn'"
            ),
        ):
            jsii_calc.ConsumerCanRingBell().implemented_by_object_literal(
                PythonInvalidBellRinger()  # type:ignore
            )
