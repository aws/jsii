import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from .._jsii import *


@jsii.data_type(
    jsii_type="jsii-calc.InterfaceInNamespaceOnlyInterface.Hello",
    jsii_struct_bases=[],
    name_mapping={"foo": "foo"},
)
class Hello:
    def __init__(self, *, foo: jsii.Number) -> None:
        """
        :param foo: 

        stability
        :stability: experimental
        """
        self._values = {
            "foo": foo,
        }

    @builtins.property
    def foo(self) -> jsii.Number:
        """
        stability
        :stability: experimental
        """
        return self._values.get("foo")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "Hello(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


__all__ = [
    "Hello",
]

publication.publish()
