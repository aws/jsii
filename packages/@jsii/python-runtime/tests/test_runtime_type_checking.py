import pytest
import re

from scope.jsii_calc_lib.custom_submodule_name import NestingClass
import jsii_calc


class TestRuntimeTypeChecking:
    """
    These tests verify that runtime type checking performs the necessary validations and produces error messages that
    are indicative of the error. There are #type:ignore annotations scattered everywhere as these tests are obviously
    attempting to demonstrate what happens when invalid calls are being made.
    """

    def test_constructor(self):
        with pytest.raises(
            TypeError,
            match=re.escape(
                "type of argument initial_value must be one of (int, float, NoneType); got str instead"
            ),
        ):
            jsii_calc.Calculator(initial_value="nope")  # type:ignore

    def test_struct(self):
        with pytest.raises(
            TypeError,
            match=re.escape(
                "type of argument foo must be jsii_calc.StringEnum; got int instead"
            ),
        ):
            jsii_calc.StructWithEnum(foo=1337)  # type:ignore

    def test_method_arg(self):
        subject = jsii_calc.Calculator()
        with pytest.raises(
            TypeError,
            match=re.escape(
                "type of argument value must be one of (int, float); got str instead"
            ),
        ):
            subject.mul("Not a Number")  # type:ignore

    def test_method_kwarg(self):
        subject = jsii_calc.DocumentedClass()
        with pytest.raises(
            TypeError,
            match=re.escape(
                "type of argument name must be one of (str, NoneType); got int instead"
            ),
        ):
            subject.greet(name=1337)  # type:ignore

    def test_method_vararg(self):
        subject = jsii_calc.StructPassing()
        with pytest.raises(
            TypeError,
            match=re.escape(
                "type of argument inputs[0] must be jsii_calc.TopLevelStruct; got int instead"
            ),
        ):
            subject.how_many_var_args_did_i_pass(1337, 42)  # type:ignore

    def test_setter_to_enum(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            TypeError,
            match=re.escape(
                "type of argument value must be jsii_calc.AllTypesEnum; got int instead"
            ),
        ):
            subject.enum_property = 1337  # type:ignore

    def test_setter_to_primitive(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            TypeError,
            match=re.escape("type of argument value must be str; got int instead"),
        ):
            subject.string_property = 1337  # type:ignore

    def test_setter_to_map(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            TypeError,
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
            TypeError,
            match=re.escape("type of argument value must be a list; got int instead"),
        ):
            subject.array_property = 1337  # type:ignore

    def test_setter_to_list_with_invalid_value(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            TypeError,
            match=re.escape("type of argument value[0] must be str; got int instead"),
        ):
            subject.array_property = [1337]  # type:ignore

    def test_setter_to_union(self):
        subject = jsii_calc.AllTypes()
        with pytest.raises(
            TypeError,
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
            TypeError,
            match=re.escape(
                "type of argument union_property[0] must be one of (Mapping[str, Union[jsii_calc.StructA, Dict[str, Any], jsii_calc.StructB]], Sequence[Union[jsii_calc.StructA, Dict[str, Any], jsii_calc.StructB]]); got float instead"
            ),
        ):
            jsii_calc.ClassWithNestedUnion([1337.42])  # type:ignore

    def test_variadic(self):
        with pytest.raises(
            TypeError,
            match=re.escape(
                "type of argument union[1] must be one of (jsii_calc.StructA, jsii_calc.StructB); got float instead"
            ),
        ):
            jsii_calc.VariadicTypeUnion(
                jsii_calc.StructA(required_string="present"), 1337.42  # type:ignore
            )

        jsii_calc.VariadicTypeUnion()
