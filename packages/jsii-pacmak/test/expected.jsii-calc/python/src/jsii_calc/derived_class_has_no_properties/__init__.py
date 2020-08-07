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
    """(experimental)

    stability
    :stability: experimental
    """

    def __init__(self) -> None:
        """
        stability
        :stability: experimental
        """
        jsii.create(Base, self, [])

    @builtins.property
    @jsii.member(jsii_name="prop")
    def prop(self) -> str:
        """(experimental)

        stability
        :stability: experimental
        """
        return jsii.get(self, "prop")

    @prop.setter
    def prop(self, value: str) -> None:
        jsii.set(self, "prop", value)


class Derived(
    Base,
    metaclass=jsii.JSIIMeta,
    jsii_type="jsii-calc.DerivedClassHasNoProperties.Derived",
):
    """(experimental)

    stability
    :stability: experimental
    """

    def __init__(self) -> None:
        """
        stability
        :stability: experimental
        """
        jsii.create(Derived, self, [])


__all__ = [
    "Base",
    "Derived",
]

publication.publish()
