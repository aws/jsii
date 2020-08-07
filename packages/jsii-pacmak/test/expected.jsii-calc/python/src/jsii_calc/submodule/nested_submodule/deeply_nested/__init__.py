import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from ...._jsii import *


@jsii.interface(
    jsii_type="jsii-calc.submodule.nested_submodule.deeplyNested.INamespaced"
)
class INamespaced(jsii.compat.Protocol):
    """(experimental)

    stability
    :stability: experimental
    """

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _INamespacedProxy

    @builtins.property
    @jsii.member(jsii_name="definedAt")
    def defined_at(self) -> str:
        """(experimental)

        stability
        :stability: experimental
        """
        ...


class _INamespacedProxy:
    """(experimental)

    stability
    :stability: experimental
    """

    __jsii_type__ = "jsii-calc.submodule.nested_submodule.deeplyNested.INamespaced"

    @builtins.property
    @jsii.member(jsii_name="definedAt")
    def defined_at(self) -> str:
        """(experimental)

        stability
        :stability: experimental
        """
        return jsii.get(self, "definedAt")


__all__ = [
    "INamespaced",
]

publication.publish()
