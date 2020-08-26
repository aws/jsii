import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from .._jsii import *


class Base(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DerivedClassHasNoProperties.Base"
):
    def __init__(self) -> None:
        jsii.create(Base, self, [])

    @builtins.property
    @jsii.member(jsii_name="prop")
    def prop(self) -> str:
        return jsii.get(self, "prop")

    @prop.setter
    def prop(self, value: str) -> None:
        jsii.set(self, "prop", value)


class Derived(
    Base,
    metaclass=jsii.JSIIMeta,
    jsii_type="jsii-calc.DerivedClassHasNoProperties.Derived",
):
    def __init__(self) -> None:
        jsii.create(Derived, self, [])


__all__ = [
    "Base",
    "Derived",
]

publication.publish()
