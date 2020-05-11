import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

import jsii_calc
import jsii_calc.submodule.child
import scope.jsii_calc_base
import scope.jsii_calc_base_of_base
import scope.jsii_calc_lib
import scope.jsii_calc_lib.submodule

from .._jsii import *


@jsii.implements(nested_submodule.deeplyNested.INamespaced)
class MyClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.submodule.MyClass"):
    """
    stability
    :stability: experimental
    """
    def __init__(self) -> None:
        """
        stability
        :stability: experimental
        """
        jsii.create(MyClass, self, [])

    @builtins.property
    @jsii.member(jsii_name="awesomeness")
    def awesomeness(self) -> "child.Awesomeness":
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "awesomeness")

    @builtins.property
    @jsii.member(jsii_name="definedAt")
    def defined_at(self) -> str:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "definedAt")

    @builtins.property
    @jsii.member(jsii_name="goodness")
    def goodness(self) -> "child.Goodness":
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "goodness")

    @builtins.property
    @jsii.member(jsii_name="allTypes")
    def all_types(self) -> typing.Optional[jsii_calc.AllTypes]:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "allTypes")

    @all_types.setter
    def all_types(self, value: typing.Optional[jsii_calc.AllTypes]) -> None:
        jsii.set(self, "allTypes", value)


__all__ = [
    "MyClass",
]

publication.publish()
