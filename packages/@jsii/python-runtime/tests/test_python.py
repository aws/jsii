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

    def test_missing_instance_attrs_do_not_recurse(self):
        """An instance created without __init__ (e.g. via __new__) must not
        cause __getattr__ to recurse infinitely when its own attributes are
        absent from __dict__."""
        obj = jsii._LazyImport.__new__(jsii._LazyImport)
        # _module / _module_name / _package were never assigned.
        for attr in ("_module", "_module_name", "_package"):
            with pytest.raises(AttributeError):
                getattr(obj, attr)

    def test_copy_does_not_recurse(self):
        """copy.copy() creates the object via __new__ and probes dunder
        attributes; this must not trigger infinite recursion."""
        import copy

        lazy = jsii._LazyImport("os")
        clone = copy.copy(lazy)
        # The clone should still behave as a lazy proxy.
        assert clone._module_name == "os"
        assert clone.sep == __import__("os").sep

    def test_deepcopy_does_not_recurse(self):
        import copy

        lazy = jsii._LazyImport("os")
        clone = copy.deepcopy(lazy)
        assert clone._module_name == "os"
        assert clone.sep == __import__("os").sep

    def test_pickle_does_not_recurse(self):
        import pickle

        lazy = jsii._LazyImport("os")
        restored = pickle.loads(pickle.dumps(lazy))
        assert restored._module_name == "os"
        assert restored.sep == __import__("os").sep


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


class TestTypeCheckingNamespace:
    """Tests for jsii._type_checking_namespace.

    This is the single, stable entry point that jsii-pacmak generated code uses
    to build the globals namespace for typing.get_type_hints(). It is the only
    type-checking helper in the generated-code/runtime contract; the classes it
    relies on (_TypeCheckingNamespace, _LazyBuiltins) are private internals.
    """

    def test_facade_is_exported(self):
        # Generated code references jsii._type_checking_namespace by name, so it
        # must remain part of the public runtime surface.
        assert hasattr(jsii, "_type_checking_namespace")
        assert "_type_checking_namespace" in jsii.__all__

    def test_private_internals_are_not_part_of_the_contract(self):
        # These must NOT be referenced by generated code, so we deliberately do
        # not export them. Keeping them unexported lets us refactor/remove them
        # (e.g. if get_type_hints() is dropped) without breaking old packages.
        assert "_TypeCheckingNamespace" not in jsii.__all__
        assert "_LazyBuiltins" not in jsii.__all__

    def test_resolves_deferred_classes_lazily(self):
        # Mirror the generated pattern: a _LAZY_CLASSES map of @_memoized
        # factories and a stub annotated with a quoted (forward-ref) class name.
        build_count = {"n": 0}

        @jsii._memoized
        def _factory():
            build_count["n"] += 1

            class Deferred:
                pass

            return Deferred

        lazy_classes = {"Deferred": _factory}

        def _stub(x: "Deferred") -> None:  # type: ignore[name-defined]  # noqa: F821
            ...

        ns = jsii._type_checking_namespace(_stub.__globals__, lazy_classes)
        hints = __import__("typing").get_type_hints(_stub, globalns=ns)

        assert hints["x"] is _factory()
        # The factory must have been triggered exactly once (no de-lazification).
        assert build_count["n"] == 1

    def test_does_not_materialize_unreferenced_classes(self):
        built = {"A": 0, "B": 0}

        def _make(name):
            def f():
                built[name] += 1
                return type(name, (), {})

            return f

        lazy_classes = {"A": _make("A"), "B": _make("B")}

        def _stub(x: "A") -> None:  # type: ignore[name-defined]  # noqa: F821
            ...

        ns = jsii._type_checking_namespace(_stub.__globals__, lazy_classes)
        __import__("typing").get_type_hints(_stub, globalns=ns)

        # Only the referenced class "A" should have been built.
        assert built["A"] == 1
        assert built["B"] == 0


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
