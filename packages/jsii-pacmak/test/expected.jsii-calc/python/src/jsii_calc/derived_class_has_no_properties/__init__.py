import abc
import builtins

import jsii
import jsii.compat
import publication

from .._jsii import *


class Base(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DerivedClassHasNoProperties.Base"):
    """
    stability
    :stability: experimental
    """
    def __init__(self) -> None:
        jsii.create(Base, self, [])

    @builtins.property
    @jsii.member(jsii_name="prop")
    def prop(self) -> str:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "prop")

    @prop.setter
    def prop(self, value: str) -> None:
        jsii.set(self, "prop", value)


class Derived(Base, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DerivedClassHasNoProperties.Derived"):
    """
    stability
    :stability: experimental
    """
    def __init__(self) -> None:
        jsii.create(Derived, self, [])


__all__ = ["Base", "Derived"]

publication.publish()
