import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

import scope.jsii_calc_base
import scope.jsii_calc_base_of_base
import scope.jsii_calc_lib

__jsii_assembly__ = jsii.JSIIAssembly.load("jsii-calc", "0.0.0", "jsii_calc", "jsii-calc@0.0.0.jsii.tgz")


class Base(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DerivedClassHasNoProperties.Base"):
    """
    stability
    :stability: experimental
    """
    def __init__(self) -> None:
        jsii.create(jsii_calc.DerivedClassHasNoProperties.Base, self, [])

    @builtins.property
    @jsii.member(jsii_name="prop")
    def prop(self) -> str:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "prop")

    @prop.setter
    def prop(self, value: str):
        jsii.set(self, "prop", value)


class Derived(jsii_calc.DerivedClassHasNoProperties.Base, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.DerivedClassHasNoProperties.Derived"):
    """
    stability
    :stability: experimental
    """
    def __init__(self) -> None:
        jsii.create(jsii_calc.DerivedClassHasNoProperties.Derived, self, [])


__all__ = ["Base", "Derived", "__jsii_assembly__"]

publication.publish()
