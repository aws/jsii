import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from .._jsii import *


class ClassWithSelf(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.PythonSelf.ClassWithSelf"
):
    """(experimental)

    stability
    :stability: experimental
    """

    def __init__(self_, self: str) -> None:
        """(experimental)

        :param self: -

        stability
        :stability: experimental
        """
        jsii.create(ClassWithSelf, self_, [self])

    @jsii.member(jsii_name="method")
    def method(self_, self: jsii.Number) -> str:
        """(experimental)

        :param self: -

        stability
        :stability: experimental
        """
        return jsii.invoke(self_, "method", [self])

    @builtins.property
    @jsii.member(jsii_name="self")
    def self(self) -> str:
        """(experimental)

        stability
        :stability: experimental
        """
        return jsii.get(self, "self")


class ClassWithSelfKwarg(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.PythonSelf.ClassWithSelfKwarg"
):
    """(experimental)

    stability
    :stability: experimental
    """

    def __init__(self_, *, self: str) -> None:
        """(experimental)

        :param self: (experimental)

        stability
        :stability: experimental
        """
        props = StructWithSelf(self=self)

        jsii.create(ClassWithSelfKwarg, self_, [props])

    @builtins.property
    @jsii.member(jsii_name="props")
    def props(self) -> "StructWithSelf":
        """(experimental)

        stability
        :stability: experimental
        """
        return jsii.get(self, "props")


@jsii.interface(jsii_type="jsii-calc.PythonSelf.IInterfaceWithSelf")
class IInterfaceWithSelf(jsii.compat.Protocol):
    """(experimental)

    stability
    :stability: experimental
    """

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithSelfProxy

    @jsii.member(jsii_name="method")
    def method(self_, self: jsii.Number) -> str:
        """(experimental)

        :param self: -

        stability
        :stability: experimental
        """
        ...


class _IInterfaceWithSelfProxy:
    """(experimental)

    stability
    :stability: experimental
    """

    __jsii_type__ = "jsii-calc.PythonSelf.IInterfaceWithSelf"

    @jsii.member(jsii_name="method")
    def method(self_, self: jsii.Number) -> str:
        """(experimental)

        :param self: -

        stability
        :stability: experimental
        """
        return jsii.invoke(self_, "method", [self])


@jsii.data_type(
    jsii_type="jsii-calc.PythonSelf.StructWithSelf",
    jsii_struct_bases=[],
    name_mapping={"self": "self"},
)
class StructWithSelf:
    def __init__(self_, *, self: str) -> None:
        """(experimental)

        :param self: (experimental)

        stability
        :stability: experimental
        """
        self_._values = {
            "self": self,
        }

    @builtins.property
    def self(self) -> str:
        """(experimental)

        stability
        :stability: experimental
        """
        return self._values.get("self")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "StructWithSelf(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


__all__ = [
    "ClassWithSelf",
    "ClassWithSelfKwarg",
    "IInterfaceWithSelf",
    "StructWithSelf",
]

publication.publish()
