"""
Checks the types that mypy and pyright infer for static properties of generated code.

These tests are mostly checked statically: `assert_type` fails mypy (via `pytest --mypy`)
and pyright (via `yarn test:types`) if the inferred type differs.
"""

from typing_extensions import assert_type

from jsii_calc import DoubleTrouble, Statics


def test_static_constant_types() -> None:
    assert_type(Statics.FOO, str)
    assert_type(Statics.CONST_OBJ, DoubleTrouble)
