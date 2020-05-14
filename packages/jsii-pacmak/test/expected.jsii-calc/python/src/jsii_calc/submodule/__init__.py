import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from .._jsii import *

from .. import (AllTypes as _AllTypes_b08307c5)
from .child import (Awesomeness as _Awesomeness_d37a24df, Goodness as _Goodness_2df26737)
from .nested_submodule.deeply_nested import (INamespaced as _INamespaced_e2f386ad)


@jsii.implements(_INamespaced_e2f386ad)
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
    def awesomeness(self) -> _Awesomeness_d37a24df:
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
    def goodness(self) -> _Goodness_2df26737:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "goodness")

    @builtins.property
    @jsii.member(jsii_name="allTypes")
    def all_types(self) -> typing.Optional[_AllTypes_b08307c5]:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "allTypes")

    @all_types.setter
    def all_types(self, value: typing.Optional[_AllTypes_b08307c5]) -> None:
        jsii.set(self, "allTypes", value)


__all__ = [
    "MyClass",
]

publication.publish()
