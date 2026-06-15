from typing import cast, Any, Optional
import jsii
import pytest
import re

from jsii.errors import JSIIError
import jsii_calc
from jsii_calc.module2702 import IVpc, Vpc, IBaz, Baz
from jsii_calc.jsii3656 import OverrideMe


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


class TestLazyImport:
    """Tests for jsii._LazyImport used by generated code to defer cross-module imports."""

    def test_defers_import_until_first_access(self):
        lazy = jsii._LazyImport("os.path")
        # The module should not be loaded yet
        assert lazy._module is None
        # Accessing an attribute triggers the import
        result = lazy.join
        assert result is __import__("os.path", fromlist=["join"]).join
        assert lazy._module is not None

    def test_caches_module_after_first_access(self):
        lazy = jsii._LazyImport("os")
        _ = lazy.sep
        mod = lazy._module
        # Second access should reuse the cached module
        _ = lazy.path
        assert lazy._module is mod

    def test_raises_attribute_error_for_missing_attr(self):
        lazy = jsii._LazyImport("os")
        with pytest.raises(AttributeError, match="has no attribute"):
            _ = lazy.nonexistent_attribute_xyz_12345

    def test_raises_module_not_found_for_bad_module(self):
        lazy = jsii._LazyImport("nonexistent_module_xyz_12345")
        with pytest.raises(ModuleNotFoundError):
            _ = lazy.something

    def test_failed_import_allows_retry(self):
        lazy = jsii._LazyImport("nonexistent_module_xyz_12345")
        with pytest.raises(ModuleNotFoundError):
            _ = lazy.something
        # _module should still be None so a retry is possible
        assert lazy._module is None

    def test_repr_before_import(self):
        lazy = jsii._LazyImport("os")
        assert repr(lazy) == "_LazyImport('os')"

    def test_repr_after_import(self):
        lazy = jsii._LazyImport("os")
        _ = lazy.sep
        # After import, repr delegates to the real module
        assert "os" in repr(lazy)

    def test_works_as_type_checking_proxy(self):
        """Simulates the generated pattern: attribute access resolves a type from the module."""
        lazy = jsii._LazyImport("collections.abc")
        # Accessing a class through the proxy
        mapping_cls = lazy.Mapping
        import collections.abc

        assert mapping_cls is collections.abc.Mapping

    def test_relative_import_with_package(self):
        """Simulates the generated pattern for same-assembly relative imports."""
        # From within 'email', import '.mime.text' relatively
        lazy = jsii._LazyImport(".mime.text", "email")
        # Accessing a class through the proxy
        mime_text_cls = lazy.MIMEText
        from email.mime.text import MIMEText

        assert mime_text_cls is MIMEText


class TestMemoized:
    """Tests for jsii._memoized used by generated code to cache factory function results."""

    def test_single_invocation_returns_result(self):
        call_count = 0

        @jsii._memoized
        def factory():
            nonlocal call_count
            call_count += 1
            return {"value": 42}

        result = factory()
        assert result == {"value": 42}
        assert call_count == 1

    def test_repeated_invocations_return_same_object(self):
        @jsii._memoized
        def factory():
            return object()

        first = factory()
        second = factory()
        third = factory()
        assert first is second
        assert second is third

    def test_exceptions_are_not_cached(self):
        call_count = 0

        @jsii._memoized
        def factory():
            nonlocal call_count
            call_count += 1
            if call_count < 3:
                raise RuntimeError(f"attempt {call_count}")
            return "success"

        with pytest.raises(RuntimeError, match="attempt 1"):
            factory()
        with pytest.raises(RuntimeError, match="attempt 2"):
            factory()
        # Third call should succeed
        result = factory()
        assert result == "success"
        assert call_count == 3

    def test_preserves_function_name(self):
        @jsii._memoized
        def my_factory():
            return 123

        assert my_factory.__name__ == "my_factory"

    def test_preserves_wrapped_reference(self):
        def original():
            return 123

        wrapped = jsii._memoized(original)
        assert wrapped.__wrapped__ is original  # type: ignore[attr-defined]


class TestLazyClassFactory:
    """Tests for lazy class factory triggering via _try_import_type_module."""

    def test_getattr_triggers_factory_registration(self):
        """Module imported but type not registered → getattr triggers factory → type registered."""
        from jsii._reference_map import (
            _try_import_type_module,
            _types,
            _assembly_to_module,
            _submodule_fqn_map,
        )
        import sys
        from types import ModuleType

        # Create a fake module with a lazy factory (__getattr__)
        fake_mod = ModuleType("fake_pkg.sub")
        fake_mod.__name__ = "fake_pkg.sub"

        def __getattr__(name):
            if name == "MyClass":
                # Simulate factory: create class and register it (like JSIIMeta would)
                cls = type(
                    "MyClass", (), {"__jsii_type__": "fake-assembly.sub.MyClass"}
                )
                _types[cls.__jsii_type__] = cls  # type: ignore[attr-defined]
                setattr(sys.modules["fake_pkg.sub"], name, cls)
                return cls
            raise AttributeError(name)

        fake_mod.__getattr__ = __getattr__
        sys.modules["fake_pkg.sub"] = fake_mod

        # Register mappings so _try_import_type_module can find the module
        _assembly_to_module["fake-assembly"] = "fake_pkg"
        _submodule_fqn_map["fake-assembly.sub"] = "fake_pkg.sub"

        try:
            # Type not registered yet
            assert "fake-assembly.sub.MyClass" not in _types

            # This should trigger getattr → factory → registration
            result = _try_import_type_module("fake-assembly.sub.MyClass")
            assert result is True
            assert "fake-assembly.sub.MyClass" in _types
        finally:
            # Cleanup
            del sys.modules["fake_pkg.sub"]
            del _assembly_to_module["fake-assembly"]
            del _submodule_fqn_map["fake-assembly.sub"]
            _types.pop("fake-assembly.sub.MyClass", None)

    def test_nested_type_progressive_getattr(self):
        """Nested type Parent.Nested resolves via progressive getattr."""
        from jsii._reference_map import (
            _try_import_type_module,
            _types,
            _assembly_to_module,
            _submodule_fqn_map,
        )
        import sys
        from types import ModuleType

        # Create a fake module where accessing "Parent" defines both Parent and Parent.Nested
        fake_mod = ModuleType("nested_pkg.sub")
        fake_mod.__name__ = "nested_pkg.sub"

        def __getattr__(name):
            if name == "Parent":
                # Simulate factory: define Parent with a Nested class attribute
                nested_cls = type(
                    "Nested",
                    (),
                    {"__jsii_type__": "nested-assembly.sub.Parent.Nested"},
                )
                parent_cls = type(
                    "Parent",
                    (),
                    {
                        "__jsii_type__": "nested-assembly.sub.Parent",
                        "Nested": nested_cls,
                    },
                )
                # Register both types (like JSIIMeta would do)
                _types[parent_cls.__jsii_type__] = parent_cls  # type: ignore[attr-defined]
                _types[nested_cls.__jsii_type__] = nested_cls  # type: ignore[attr-defined]
                setattr(sys.modules["nested_pkg.sub"], name, parent_cls)
                return parent_cls
            raise AttributeError(name)

        fake_mod.__getattr__ = __getattr__
        sys.modules["nested_pkg.sub"] = fake_mod

        # Register mappings
        _assembly_to_module["nested-assembly"] = "nested_pkg"
        _submodule_fqn_map["nested-assembly.sub"] = "nested_pkg.sub"

        try:
            # Neither type registered yet
            assert "nested-assembly.sub.Parent" not in _types
            assert "nested-assembly.sub.Parent.Nested" not in _types

            # Resolve the nested type — should trigger getattr("Parent") then getattr on Parent for "Nested"
            result = _try_import_type_module("nested-assembly.sub.Parent.Nested")
            assert result is True
            assert "nested-assembly.sub.Parent.Nested" in _types
            # Parent should also be registered as a side effect
            assert "nested-assembly.sub.Parent" in _types
        finally:
            # Cleanup
            del sys.modules["nested_pkg.sub"]
            del _assembly_to_module["nested-assembly"]
            del _submodule_fqn_map["nested-assembly.sub"]
            _types.pop("nested-assembly.sub.Parent", None)
            _types.pop("nested-assembly.sub.Parent.Nested", None)

    def test_unknown_type_returns_false(self):
        """AttributeError from getattr returns False (caller raises ValueError)."""
        from jsii._reference_map import (
            _try_import_type_module,
            _types,
            _assembly_to_module,
            _submodule_fqn_map,
        )
        import sys
        from types import ModuleType

        # Create a fake module that raises AttributeError for any access
        fake_mod = ModuleType("missing_pkg.sub")
        fake_mod.__name__ = "missing_pkg.sub"

        def __getattr__(name):
            raise AttributeError(name)

        fake_mod.__getattr__ = __getattr__
        sys.modules["missing_pkg.sub"] = fake_mod

        # Register mappings
        _assembly_to_module["missing-assembly"] = "missing_pkg"
        _submodule_fqn_map["missing-assembly.sub"] = "missing_pkg.sub"

        try:
            # Type does not exist in registry
            assert "missing-assembly.sub.NoSuchClass" not in _types

            # Should return False since getattr raises AttributeError
            result = _try_import_type_module("missing-assembly.sub.NoSuchClass")
            assert result is False
            assert "missing-assembly.sub.NoSuchClass" not in _types
        finally:
            # Cleanup
            del sys.modules["missing_pkg.sub"]
            del _assembly_to_module["missing-assembly"]
            del _submodule_fqn_map["missing-assembly.sub"]

    def test_no_assembly_mapping_returns_false(self):
        """When assembly is not in _assembly_to_module, returns False."""
        from jsii._reference_map import _try_import_type_module, _types

        # No mapping registered for this assembly
        result = _try_import_type_module("unknown-assembly.sub.SomeClass")
        assert result is False
        assert "unknown-assembly.sub.SomeClass" not in _types


class TestLazyLoadingIntegration:
    """Integration tests for the lazy class loading feature using real jsii_calc types.

    These tests verify the end-user experience: that lazy-loaded classes behave
    identically to eagerly-loaded classes from the perspective of isinstance,
    issubclass, subclassing, dir(), help(), __module__, __qualname__, and
    cross-module references.
    """

    def test_from_import_triggers_lazy_load(self):
        """'from pkg import Name' triggers __getattr__ and returns the class."""
        from jsii_calc import Calculator

        assert Calculator is not None
        assert Calculator.__name__ == "Calculator"

    def test_class_identity_across_imports(self):
        """Repeated imports yield the exact same class object (identity, not equality)."""
        import jsii_calc
        from jsii_calc import Calculator as Calc1
        from jsii_calc import Calculator as Calc2

        assert Calc1 is Calc2
        assert jsii_calc.Calculator is Calc1

    def test_isinstance_with_lazy_loaded_class(self):
        """isinstance() works correctly with lazily-loaded classes."""
        from jsii_calc import Calculator

        c = Calculator()
        assert isinstance(c, Calculator)

    def test_issubclass_with_lazy_loaded_base(self):
        """issubclass() works when base class was lazy-loaded."""
        from jsii_calc import Calculator

        class MyCalc(Calculator):
            pass

        assert issubclass(MyCalc, Calculator)
        assert isinstance(MyCalc(), Calculator)

    def test_subclassing_lazy_loaded_class(self):
        """User can subclass a lazy-loaded class and call its methods."""
        from jsii_calc import Calculator

        class EnhancedCalc(Calculator):
            pass

        c = EnhancedCalc()
        c.add(10)
        c.mul(3)
        assert c.value == 30

    def test_qualname_correct_for_top_level_class(self):
        """__qualname__ is the simple class name (not '_lazy_build_X.<locals>.X')."""
        import jsii_calc

        assert jsii_calc.Calculator.__qualname__ == "Calculator"
        assert jsii_calc.AllTypes.__qualname__ == "AllTypes"

    def test_qualname_correct_for_nested_class(self):
        """Nested classes have Parent.Nested qualname, not factory scope qualname."""
        import jsii_calc

        level_one = jsii_calc.LevelOne
        assert level_one.__qualname__ == "LevelOne"
        assert level_one.PropBooleanValue.__qualname__ == "LevelOne.PropBooleanValue"
        assert level_one.PropProperty.__qualname__ == "LevelOne.PropProperty"

    def test_module_attribute_correct(self):
        """__module__ points to the correct Python module, not a factory function."""
        import jsii_calc
        from jsii_calc.composition import CompositeOperation

        assert jsii_calc.Calculator.__module__ == "jsii_calc"
        assert CompositeOperation.__module__ == "jsii_calc.composition"

    def test_dir_includes_deferred_classes(self):
        """dir(module) returns deferred class names via __dir__."""
        import jsii_calc

        module_dir = dir(jsii_calc)
        assert "Calculator" in module_dir
        assert "AllTypes" in module_dir
        assert "Add" in module_dir
        # Interfaces too
        assert "IFriendlyRandomGenerator" in module_dir
        # Structs too
        assert "CalculatorProps" in module_dir

    def test_dir_includes_submodules(self):
        """dir(module) returns submodule names via __dir__."""
        import jsii_calc

        module_dir = dir(jsii_calc)
        assert "composition" in module_dir
        assert "submodule" in module_dir

    def test_all_includes_deferred_classes(self):
        """__all__ contains all public class names."""
        import jsii_calc

        assert "Calculator" in jsii_calc.__all__
        assert "AllTypes" in jsii_calc.__all__
        assert "IFriendlyRandomGenerator" in jsii_calc.__all__

    def test_help_works_on_lazy_class(self):
        """help(LazyClass) produces meaningful output without errors."""
        import io
        from contextlib import redirect_stdout
        import jsii_calc

        f = io.StringIO()
        with redirect_stdout(f):
            help(jsii_calc.Calculator)
        output = f.getvalue()

        assert "Calculator" in output
        assert "add" in output

    def test_submodule_lazy_loaded_on_access(self):
        """Submodules are not imported until accessed via attribute."""
        import sys
        import importlib

        # Re-import jsii_calc fresh-ish — but we can still check module loading
        import jsii_calc

        # composition should not be in sys.modules unless previously accessed
        # (in a fresh test run, this will be True; in a test suite it may already be loaded)
        # We just verify that attribute access works and returns a module
        comp = jsii_calc.composition
        assert "jsii_calc.composition" in sys.modules
        assert hasattr(comp, "CompositeOperation")

    def test_cross_module_references_work(self):
        """Types referencing other assemblies work through _LazyImport."""
        from jsii_calc import Add
        from scope.jsii_calc_lib import Number

        result = Add(Number(7), Number(3))
        assert result.value == 10

    def test_cross_module_type_identity(self):
        """Cross-module base types are the same object regardless of access path."""
        from scope.jsii_calc_lib import Number as Num1

        import scope.jsii_calc_lib
        Num2 = scope.jsii_calc_lib.Number

        assert Num1 is Num2

    def test_interface_lazy_loaded_and_implementable(self):
        """Lazy-loaded interfaces can be used with @jsii.implements."""
        import jsii
        from jsii_calc import IRandomNumberGenerator

        @jsii.implements(IRandomNumberGenerator)
        class MyRng:
            def next(self):
                return 42

        rng = MyRng()
        assert rng.next() == 42

    def test_struct_lazy_loaded_and_instantiable(self):
        """Lazy-loaded structs can be instantiated with keyword arguments."""
        from jsii_calc import TopLevelStruct

        s = TopLevelStruct(required="hello", second_level=5)
        assert s.required == "hello"
        assert s.second_level == 5

    def test_lazy_deserialization_from_kernel(self):
        """Types returned by the kernel from unloaded submodules are correctly resolved."""
        from jsii._reference_map import _try_import_type_module, _types

        import jsii_calc  # ensure assembly is loaded

        # Pick a type from a submodule
        fqn = "jsii-calc.composition.CompositeOperation"
        # Resolve it — this may or may not need to trigger import depending on test order
        result = _try_import_type_module(fqn)
        assert result is True
        assert fqn in _types

    def test_enum_eagerly_loaded(self):
        """Enums are NOT deferred — they're available immediately at module scope."""
        import jsii_calc

        # Enums should be in the module dict directly, not behind __getattr__
        assert hasattr(jsii_calc, "AllTypesEnum")
        assert jsii_calc.AllTypesEnum.MY_ENUM_VALUE is not None

    def test_repeated_attribute_access_is_idempotent(self):
        """Accessing the same class attribute multiple times returns the same object."""
        import jsii_calc

        cls1 = jsii_calc.Calculator
        cls2 = jsii_calc.Calculator
        cls3 = jsii_calc.Calculator
        assert cls1 is cls2
        assert cls2 is cls3


class TestTypeCheckingNamespace:
    """Tests for _TypeCheckingNamespace used by runtime type checking."""

    def test_contains_reports_true_for_lazy_classes(self):
        """__contains__ returns True for keys with lazy factories."""
        from jsii._utils import _TypeCheckingNamespace

        ns = _TypeCheckingNamespace({}, {"Foo": lambda: type("Foo", (), {})})
        assert "Foo" in ns

    def test_contains_reports_false_for_unknown_keys(self):
        """__contains__ returns False for keys not in dict or lazy_classes."""
        from jsii._utils import _TypeCheckingNamespace

        ns = _TypeCheckingNamespace({}, {"Foo": lambda: type("Foo", (), {})})
        assert "Bar" not in ns

    def test_missing_materializes_class_on_bracket_access(self):
        """ns['Foo'] triggers __missing__ which calls the factory."""
        from jsii._utils import _TypeCheckingNamespace

        calls = []
        def factory():
            calls.append(1)
            return type("Foo", (), {})

        ns = _TypeCheckingNamespace({}, {"Foo": factory})
        result = ns["Foo"]
        assert result.__name__ == "Foo"
        assert len(calls) == 1

    def test_missing_caches_after_first_access(self):
        """Second bracket access returns cached value without calling factory again."""
        from jsii._utils import _TypeCheckingNamespace

        calls = []
        def factory():
            calls.append(1)
            return type("Foo", (), {})

        ns = _TypeCheckingNamespace({}, {"Foo": factory})
        first = ns["Foo"]
        second = ns["Foo"]
        assert first is second
        assert len(calls) == 1

    def test_missing_raises_keyerror_for_unknown(self):
        """Accessing unknown key raises KeyError (not infinite loop)."""
        from jsii._utils import _TypeCheckingNamespace

        ns = _TypeCheckingNamespace({}, {"Foo": lambda: type("Foo", (), {})})
        with pytest.raises(KeyError):
            _ = ns["Bar"]

    def test_get_bypasses_missing(self):
        """dict.get() does NOT trigger __missing__ — returns default."""
        from jsii._utils import _TypeCheckingNamespace

        calls = []
        def factory():
            calls.append(1)
            return type("Foo", (), {})

        ns = _TypeCheckingNamespace({}, {"Foo": factory})
        result = ns.get("Foo")
        assert result is None
        assert len(calls) == 0

    def test_existing_keys_accessible_normally(self):
        """Keys passed in module_globals are accessible without triggering factories."""
        from jsii._utils import _TypeCheckingNamespace

        ns = _TypeCheckingNamespace({"builtins": __builtins__, "x": 42}, {})
        assert ns["x"] == 42
        assert "x" in ns

    def test_typing_get_type_hints_resolves_lazy_class(self):
        """typing.get_type_hints() with _TypeCheckingNamespace resolves forward refs."""
        import typing
        from jsii._utils import _TypeCheckingNamespace

        # Create a function with a string annotation referencing a lazy class
        lazy_classes = {"MyClass": lambda: type("MyClass", (), {})}
        ns = _TypeCheckingNamespace({"typing": typing}, lazy_classes)

        # Define a stub function with a string annotation
        exec('def stub(x: "MyClass") -> None: pass', ns)
        stub_fn = ns["stub"]

        # get_type_hints should resolve "MyClass" via the namespace
        hints = typing.get_type_hints(stub_fn, globalns=ns)
        assert hints["x"].__name__ == "MyClass"


class TestLazyLoadingEdgeCases:
    """Edge cases and potential failure modes for the lazy loading system."""

    def test_attribute_error_for_nonexistent_name(self):
        """Accessing a non-existent name raises AttributeError, not KeyError."""
        import jsii_calc

        with pytest.raises(AttributeError, match="has no attribute"):
            _ = jsii_calc.ThisClassDefinitelyDoesNotExist12345

    def test_interface_proxy_resolution_with_lazy_loading(self):
        """Interface proxies are correctly built when interface is lazy-loaded."""
        import jsii
        from jsii_calc import AbstractClassReturner

        obj = AbstractClassReturner()
        iface = obj.give_me_interface()
        # This exercises the _obtain_interface path which triggers lazy loading
        assert iface.prop_from_interface == "propFromInterfaceValue"

    def test_callback_with_lazy_loaded_type(self):
        """Callbacks that return types from unloaded modules work correctly."""
        import jsii
        from jsii_calc import NumberGenerator, IRandomNumberGenerator

        @jsii.implements(IRandomNumberGenerator)
        class LateRng:
            def next(self):
                return 999

        # This creates the object in JS, passes our native object,
        # and calls back into it
        gen = NumberGenerator(LateRng())
        assert gen.next_times100() == 99900

    def test_object_deserialization_triggers_lazy_loading(self):
        """When the kernel returns an Object type with interfaces, lazy loading kicks in."""
        from jsii_calc import AnonymousImplementationProvider

        provider = AnonymousImplementationProvider()
        # This returns an anonymous object implementing IAnonymouslyImplementMe
        obj = provider.provide_as_interface()
        assert obj is not None
        # Calling a method on it exercises the full callback/proxy chain
        assert obj.verb() == "to implement"

    def test_multiple_submodule_types_resolve_independently(self):
        """Types from different submodules can be resolved independently."""
        from jsii_calc.python_self import ClassWithSelf, ClassWithSelfKwarg
        from jsii_calc.submodule.child import SomeEnum

        # Each type should be independently materialized
        obj = ClassWithSelf("hello")
        assert obj.self == "hello"

        assert SomeEnum.SOME is not None

    def test_intersection_type_importable(self):
        """Modules using intersection types (A & B) import without NameError."""
        from jsii_calc.intersection import ConsumesIntersection, ISomething

        assert ConsumesIntersection is not None
        assert ISomething is not None
