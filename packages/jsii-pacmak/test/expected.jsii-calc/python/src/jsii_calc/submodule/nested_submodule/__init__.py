import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

import jsii_calc.submodule.child
import scope.jsii_calc_base
import scope.jsii_calc_base_of_base
import scope.jsii_calc_lib

from ..._jsii import *


@jsii.implements(deeplyNested.INamespaced)
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
    def goodness(self) -> jsii_calc.submodule.child.Goodness:
        """
        stability
        :stability: experimental
        """
        ...


class _NamespacedProxy(Namespaced):
    @builtins.property
    @jsii.member(jsii_name="goodness")
    def goodness(self) -> jsii_calc.submodule.child.Goodness:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "goodness")


__all__ = ["Namespaced"]

publication.publish()
