import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from ..._jsii import *

from ..child import (Goodness as _Goodness_2df26737)
from .deeplyNested import (INamespaced as _INamespaced_8958714a)


@jsii.implements(_INamespaced_8958714a)
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


__all__ = ["Namespaced"]

publication.publish()
