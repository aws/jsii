import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from ..child import (
    Goodness as _Goodness_2df26737,
)
from .deeply_nested import (
    INamespaced as _INamespaced_e2f386ad,
)
import scope.jsii_calc_base
import scope.jsii_calc_base_of_base
import scope.jsii_calc_lib

__jsii_assembly__ = jsii.JSIIAssembly.load("jsii-calc", "0.0.0", "jsii_calc", "jsii-calc@0.0.0.jsii.tgz")


@jsii.implements(_INamespaced_e2f386ad)
class Namespaced(metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.submodule.nested_submodule.Namespaced"):
    """
    stability
    :stability: experimental
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _NamespacedProxy

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
    @abc.abstractmethod
    def goodness(self) -> _Goodness_2df26737:
        """
        stability
        :stability: experimental
        """
        ...


class _NamespacedProxy(Namespaced):
    @builtins.property
    @jsii.member(jsii_name="goodness")
    def goodness(self) -> _Goodness_2df26737:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "goodness")


__all__ = ["Namespaced", "__jsii_assembly__"]

publication.publish()
