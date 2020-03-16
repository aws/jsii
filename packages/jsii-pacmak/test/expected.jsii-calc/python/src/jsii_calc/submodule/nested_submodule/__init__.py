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

__jsii_assembly__ = jsii.JSIIAssembly.load("jsii-calc", "1.1.0", "jsii_calc", "jsii-calc@1.1.0.jsii.tgz")


@jsii.implements(deeplyNested.INamespaced)
class Namespaced(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.submodule.nested_submodule.Namespaced"):
    """
    stability
    :stability: experimental
    """
    @builtins.property
    @jsii.member(jsii_name="definedAt")
    def defined_at(self) -> str:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "definedAt")


__all__ = ["Namespaced", "__jsii_assembly__"]

publication.publish()
