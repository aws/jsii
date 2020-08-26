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
    def __init__(self_, self: str) -> None:
        """
        :param self: -
        """
        jsii.create(ClassWithSelf, self_, [self])

    @jsii.member(jsii_name="method")
    def method(self_, self: jsii.Number) -> str:
        """
        :param self: -
        """
        return jsii.invoke(self_, "method", [self])

    @builtins.property
    @jsii.member(jsii_name="self")
    def self(self) -> str:
        return jsii.get(self, "self")


class ClassWithSelfKwarg(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.PythonSelf.ClassWithSelfKwarg"
):
    def __init__(self_, *, self: str) -> None:
        """
        :param self: 
        """
        props = StructWithSelf(self=self)

        jsii.create(ClassWithSelfKwarg, self_, [props])

    @builtins.property
    @jsii.member(jsii_name="props")
    def props(self) -> "StructWithSelf":
        return jsii.get(self, "props")


@jsii.interface(jsii_type="jsii-calc.PythonSelf.IInterfaceWithSelf")
class IInterfaceWithSelf(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IInterfaceWithSelfProxy

    @jsii.member(jsii_name="method")
    def method(self_, self: jsii.Number) -> str:
        """
        :param self: -
        """
        ...


class _IInterfaceWithSelfProxy:
    __jsii_type__ = "jsii-calc.PythonSelf.IInterfaceWithSelf"

    @jsii.member(jsii_name="method")
    def method(self_, self: jsii.Number) -> str:
        """
        :param self: -
        """
        return jsii.invoke(self_, "method", [self])


@jsii.data_type(
    jsii_type="jsii-calc.PythonSelf.StructWithSelf",
    jsii_struct_bases=[],
    name_mapping={"self": "self"},
)
class StructWithSelf:
    def __init__(self_, *, self: str) -> None:
        """
        :param self: 
        """
        self_._values = {
            "self": self,
        }

    @builtins.property
    def self(self) -> str:
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
