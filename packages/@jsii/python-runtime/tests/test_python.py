from datetime import datetime
from typing import cast, Any, Optional
import jsii
import pytest
import re

from jsii.errors import JSIIError
import jsii_calc
from jsii_calc.module2702 import IVpc, Vpc, IBaz, Baz
from jsii_calc.jsii3656 import OverrideMe
from jsii_calc import (
    ConsumerCanRingBell,
    Entropy,
    HostStackTraceReader,
    IBellRinger,
    IConcreteBellRinger,
    IWallClock,
    Isomorphism,
    RootStructValidator,
    SecondLevelStruct,
    SomeTypeJsii976,
    StructPassing,
    TopLevelStruct,
    UpcasingReflectable,
)
from jsii_calc.python_self import ClassWithSelf, ClassWithSelfKwarg
from jsii_calc.submodule.child import SomeEnum
from jsii_calc.submodule.isolated import Kwargs
from jsii_calc.union import Resolvable
from scope.jsii_calc_lib.custom_submodule_name import IReflectable
from jsii._reference_map import InterfaceDynamicProxy


class TestErrorHandling:
    def test_jsii_error(self):
        obj = jsii_calc.Calculator()

        with pytest.raises(
            JSIIError, match="Class jsii-calc.Calculator doesn't have a method"
        ):
            jsii.kernel.invoke(obj, "nonexistentMethod")

    def test_inheritance_maintained(self):
        """Check that for JSII struct types we can get the inheritance tree in some way."""
        # inspect.getmro() won't work because of TypedDict, but we add another annotation
        bases = find_struct_bases(jsii_calc.DerivedStruct)

        base_names = [b.__name__ for b in bases]

        assert base_names == ["DerivedStruct", "MyFirstStruct"]


class TestImplementsInterface:

    def test_jsii_proxy_class_defaults_to_none(self) -> None:
        @jsii.implements(IBaz)
        class MyBaz:
            pass

        klass = getattr(MyBaz, "__jsii_proxy_class__")()
        assert klass == None

    def test_jsii_proxy_class_preserves_user_defined_attribute(self) -> None:

        class _MyBazProxy:
            def baz_method(self) -> str:
                return "_MyBazProxy"

        @jsii.implements(IBaz)
        class MyBaz:

            @staticmethod
            def __jsii_proxy_class__():
                return _MyBazProxy

            def baz_method(self) -> str:
                return "MyBaz"

        klass = getattr(MyBaz, "__jsii_proxy_class__")()
        instance = klass()
        assert instance.baz_method() == "_MyBazProxy"

    def test_implements_interface(self) -> None:
        """Checks that jsii-generated classes correctly implement the relevant jsii-generated interfaces."""

        def vpc_interface_func(v: IVpc) -> None:
            assert v is not None

        vpc = Vpc()
        vpc_interface_func(vpc)

        def baz_interface_func(b: IBaz) -> None:
            assert b is not None

        baz = Baz()
        baz_interface_func(baz)


def test_overrides_method_with_kwargs() -> None:
    class Overridden(OverrideMe):
        def implement_me(
            self, *, name: str, count: Optional[jsii.Number] = None
        ) -> bool:
            return name == "John Doe" and count is None

    assert OverrideMe.call_abstract(Overridden())


def find_struct_bases(x):
    ret = []
    seen = set([])

    def recurse(s):
        if s not in seen:
            ret.append(s)
            seen.add(s)
            bases = getattr(s, "__jsii_struct_bases__", [])
            for base in bases:
                recurse(base)

    recurse(x)
    return ret


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


def test_return_subclass_that_implements_interface_976_raises_attributeerror_when_using_non_existent_method():
    obj = SomeTypeJsii976.return_return()
    try:
        print(obj.not_a_real_method_I_swear)  # type: ignore
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


@jsii.implements(IBellRinger)
class PythonBellRinger:
    def your_turn(self, bell):
        bell.ring()


@jsii.implements(IConcreteBellRinger)
class PythonConcreteBellRinger:
    def your_turn(self, bell):
        bell.ring()


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


def test_interface_can_be_used_when_not_expressedly_loaded():
    """
    Verifies that a value whose dynamic type is a *behavioral interface* from a
    submodule that was never explicitly imported can be resolved by the runtime.

    With lazy cross-module imports (see jsii-pacmak), a submodule is not loaded
    until first accessed, so its interfaces are not registered with the runtime.
    When the kernel returns an object tagged with such an interface FQN, the
    reference map must import the containing submodule on demand to resolve the
    interface proxy. Previously ``build_interface_proxies_for_ref`` did a bare
    ``_interfaces[fqn]`` lookup and raised ``KeyError`` for unregistered
    interfaces (mirrors the aws-cdk-lib shape where, e.g., ``aws_codebuild``
    returns an ``aws_codestarnotifications`` interface).

    The ``jsii_calc.module2700`` submodule (which declares the behavioral
    interface ``IFoo``) must NEVER be explicitly imported by this test,
    otherwise it is void.
    """
    import sys
    from jsii import _reference_map
    from jsii._kernel.types import ObjRef

    iface_fqn = "jsii-calc.module2700.IFoo"
    submodule = "jsii_calc.module2700"

    # Precondition: the submodule has not been imported, so its interface is
    # not yet registered. (Other tests run in the same process, so only assert
    # the registration state, which is what the code path depends on.)
    assert iface_fqn not in _reference_map._interfaces

    # Simulate the kernel returning an anonymous object that implements a
    # behavioral interface from the un-imported submodule.
    ref = ObjRef(ref="Object@90125", interfaces=[iface_fqn])

    # This must NOT raise: the runtime imports jsii_calc.module2700 on demand,
    # which registers IFoo, then builds the interface proxy.
    proxy = _reference_map.resolve_reference(jsii.kernel, ref)
    assert proxy is not None

    # The on-demand import should have registered the interface.
    assert iface_fqn in _reference_map._interfaces
    assert submodule in sys.modules


def test_byref_struct_can_be_used_when_not_expressedly_loaded():
    """
    Verifies that a struct (data type) serialized by-reference, whose type lives
    in a submodule that was never explicitly imported, can be resolved by the
    runtime.

    Data types are sometimes serialized by-reference (see aws/jsii#400), in
    which case they arrive as an anonymous ``Object`` whose ``ref.interfaces``
    names the struct's FQN. ``resolve()`` decides between the struct path and
    the behavioral-interface path by checking ``fqn in _data_types``. With lazy
    loading, a struct from an un-imported submodule is not registered there yet,
    so without an on-demand import the check is False, execution wrongly falls
    into the interface branch, and resolution fails with
    ``ValueError: Unknown interface: <struct fqn>``. ``resolve()`` now imports
    unregistered ``ref.interfaces`` FQNs before that decision.

    The ``jsii_calc.module2692.submodule1`` submodule (which declares the struct
    ``Bar``) must NEVER be explicitly imported by this test, otherwise it is
    void.
    """
    import sys
    from jsii import _reference_map
    from jsii._kernel.types import ObjRef

    struct_fqn = "jsii-calc.module2692.submodule1.Bar"
    submodule = "jsii_calc.module2692.submodule1"

    # Precondition: the submodule has not been imported, so the struct is not
    # yet registered as a data type.
    assert struct_fqn not in _reference_map._data_types

    # A by-reference struct's properties are read back from the kernel via
    # kernel.get(). The bug under test is in resolve()'s struct-vs-interface
    # decision (whether the submodule is imported on demand BEFORE that
    # decision), which happens before any property read, so a minimal fake
    # kernel that returns property values is sufficient to exercise it without
    # standing up a real kernel-backed object.
    class _FakeKernel:
        def get(self, _ref, _name):
            return "value-from-kernel"

    # Simulate the kernel returning a by-reference struct: an anonymous object
    # whose interfaces names the struct FQN.
    ref = ObjRef(ref="Object@90126", interfaces=[struct_fqn])

    # This must NOT raise ValueError("Unknown interface: ..."): the runtime
    # imports the submodule on demand (registering Bar as a data type),
    # recognizes it as a struct, and rebuilds it by reading its properties.
    result = _reference_map.resolve_reference(_FakeKernel(), ref)
    assert result is not None

    # The on-demand import should have registered the struct as a data type, and
    # the resolved value should be an instance of it (not an interface proxy).
    assert struct_fqn in _reference_map._data_types
    assert submodule in sys.modules
    assert isinstance(result, _reference_map._data_types[struct_fqn])


def test_known_class_ref_with_struct_in_interfaces_resolves():
    """
    Verifies resolving an object reference whose primary type is a known
    class, but whose ``interfaces`` list contains an unrelated struct
    FQN, does not raise an Unknown interface exception. And that the known
    class instance ends up as the proxy's primary delegate.

    This shape occurs for properties typed as a union of a behavioral
    interface and a struct, such as ``ConsumesUnion.union_property``
    (``IResolvable | UnionResolvableStruct`` below), which mirrors AWS CDK
    shapes like ``CfnLaunchTemplate.launchTemplateData: IResolvable |
    LaunchTemplateDataProperty``.

    The shape is produced by the kernel as follows:

    - The kernel tries each union member's serializer in a fixed
      priority order and uses the first one that doesn't throw an exception.

        - SerializationClass.Void,
        - SerializationClass.Date,
        - SerializationClass.Scalar,
        - SerializationClass.Json,
        - SerializationClass.Enum,
        - SerializationClass.Array,
        - SerializationClass.Map,
        - SerializationClass.Struct,
        - SerializationClass.ReferenceType,
        - SerializationClass.Any,

      ``Struct`` serialization checks that the value is a non-null,
      non-array, non-``Date`` object. Any object value matching that
      criteria is serialized as a struct even if the real type is actually
      the ``interface`` half of the union. From the example above, setting
      the ``launchTemplateData`` property to ``Fn.condition_if`` sets the true
      class as ``Intrinsic`` which implements the ``IResolvable`` interface.

    - When Struct.serialize calls registerObject(value, "Object", ["...SomeDataProperty"]),
      and the value was already registered under it's true class (``Intrinsic``), the identity
      cache merges interfaces into the existing entry instead of creating a new one. That is
      how a reference whose primary type is a known class ends up with a unrelated struct
      FQN riding along in ``ref.interfaces``.

      class_fqn='aws-cdk-lib.Intrinsic' ref.interfaces=['aws-cdk-lib.ICfnRuleConditionExpression']
      ...
      class_fqn='aws-cdk-lib.Intrinsic' ref.interfaces=['aws-cdk-lib.ICfnRuleConditionExpression', 'aws-cdk-lib.aws_ec2.CfnLaunchTemplate.LaunchTemplateDataProperty']

    ``resolve()``'s "known class" branch (``class_fqn in _types``) used to
    invoke ``_obtain_interface`` for every item in ``ref.interfaces``. If
    ``ref.interfaces`` contained an entry for a struct registered in
    ``_data_types``, then ``_obtain_interface`` would be unable to find
    the interace and raise a ``ValueError``. To avoid the issue, the logic
    now filters out any FQN in the ``_data_types`` map before invoking
    ``_obtain_interface``.

    This test simulates that exact shape with a synthetic ``ObjRef`` (a known
    class FQN as the primary type, an unrelated struct FQN in ``interfaces``)
    and checks not just that resolution succeeds, but that it produces the
    *correct* result: the known ``Resolvable`` instance as the proxy's
    primary delegate, and the struct FQN represented by an opaque fallback
    delegate rather than being dropped, misidentified, or raising.
    """
    from jsii import _reference_map
    from jsii._kernel.types import ObjRef

    # FQNs of ConsumesUnion.union_property's `IResolvable | UnionResolvableStruct`
    # union members (see packages/jsii-calc/lib/union.ts).
    class_fqn = "jsii-calc.union.Resolvable"
    struct_fqn = "jsii-calc.union.UnionResolvableStruct"

    # Simulate the kernel returning a reference to a known Resolvable instance
    # that also lists the struct's FQN in its interfaces -- the shape produced
    # for union-typed values.
    ref = ObjRef(ref=f"{class_fqn}@90127", interfaces=[struct_fqn])

    # This must NOT raise: the struct FQN is recognized and skipped rather
    # than treated as an (unknown) behavioral interface.
    result = _reference_map.resolve_reference(jsii.kernel, ref)
    assert result is not None
    assert isinstance(result, InterfaceDynamicProxy)

    # The known Resolvable instance should be the proxy's
    # primary delegate, with the struct FQN represented as
    # an opaque fallback rather than an (unknown) behavioral
    # interface.
    assert isinstance(result._delegates[0], Resolvable)
    assert isinstance(result._delegates[1], _reference_map.Opaque)
    assert result._delegates[1].__jsii_ref__ == ref


def test_lazy_submodule_access():
    """Verifies that submodules can be accessed as attributes without explicit import.

    With PEP 562 lazy loading, submodules are loaded on first attribute access
    rather than eagerly at package import time. This test verifies that accessing
    a submodule attribute triggers the lazy load correctly.
    """
    import jsii_calc

    # Access a submodule as an attribute — this triggers __getattr__ / lazy load
    submod = jsii_calc.submodule
    assert submod is not None

    # Verify we can access types within the lazily-loaded submodule
    from jsii_calc.submodule.child import SomeEnum as LazyEnum

    assert LazyEnum.SOME is not None


def test_lazy_submodule_dir_includes_submodules():
    """Verifies that dir() on a module includes submodule names.

    The __dir__ function should report submodule names so that tab-completion
    and introspection tools can discover them without importing them.
    """
    import jsii_calc

    members = dir(jsii_calc)
    # These are submodules that should be discoverable
    assert "submodule" in members
    assert "composition" in members
    assert "cdk16625" in members


def test_custom_named_submodule_types_resolve():
    """Verifies that types from submodules with custom Python names work correctly.

    The @scope/jsii-calc-lib.submodule is mapped to the Python module
    scope.jsii_calc_lib.custom_submodule_name. This test verifies that types
    from such custom-named submodules can be used and resolved properly.
    """
    from scope.jsii_calc_lib.custom_submodule_name import Reflector, IReflectable

    # Verify the types are usable
    assert Reflector is not None
    assert IReflectable is not None

    # Create an instance to verify the type works end-to-end through the kernel
    reflector = Reflector()
    assert reflector is not None


def test_host_stack_trace_is_passed_to_kernel(monkeypatch):
    monkeypatch.setenv("JSII_HOST_STACK_TRACES", "1")
    trace = HostStackTraceReader.captured_trace()
    assert trace is not None
    assert len(trace) > 0
    # Each frame should be [file, line, column, function]
    for frame in trace:
        assert len(frame) == 4


def test_host_stack_trace_contains_test_file(monkeypatch):
    monkeypatch.setenv("JSII_HOST_STACK_TRACES", "1")
    trace = HostStackTraceReader.captured_trace()
    assert trace is not None
    files = [frame[0] for frame in trace]
    assert any("test_python" in f for f in files)


def test_host_stack_trace_not_passed_when_disabled(monkeypatch):
    monkeypatch.delenv("JSII_HOST_STACK_TRACES", raising=False)
    trace = HostStackTraceReader.captured_trace()
    assert trace is None


def test_host_stack_trace_through_callback(monkeypatch):
    monkeypatch.setenv("JSII_HOST_STACK_TRACES", "1")
    from jsii_calc import CallbackStackTraceTest

    class MyCallback(CallbackStackTraceTest):
        def _callback_provider(self):
            return HostStackTraceReader.captured_trace()

    obj = MyCallback()
    obj.invoke_callback()
    trace = obj.trace_from_callback

    assert trace is not None
    assert len(trace) > 0

    # These are calls we are interested in. The rest is pytest internals
    last_calls = [frame[3] for frame in trace][:4]

    assert last_calls == [
        "captured_trace",
        "_callback_provider",
        "invoke_callback",
        "test_host_stack_trace_through_callback",
    ]
