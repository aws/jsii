import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from .._jsii import *

import scope.jsii_calc_lib


class CompositeOperation(
    scope.jsii_calc_lib.Operation,
    metaclass=jsii.JSIIAbstractClass,
    jsii_type="jsii-calc.composition.CompositeOperation",
):
    """Abstract operation composed from an expression of other operations. (experimental)

    stability
    :stability: experimental
    """

    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _CompositeOperationProxy

    def __init__(self) -> None:
        jsii.create(CompositeOperation, self, [])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value. (experimental)

        (deprecated)

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "toString", [])

    @builtins.property
    @jsii.member(jsii_name="expression")
    @abc.abstractmethod
    def expression(self) -> scope.jsii_calc_lib.Value:
        """The expression that this operation consists of. (experimental)

        Must be implemented by derived classes.

        stability
        :stability: experimental
        """
        ...

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The value. (experimental)

        (deprecated)

        stability
        :stability: experimental
        """
        return jsii.get(self, "value")

    @builtins.property
    @jsii.member(jsii_name="decorationPostfixes")
    def decoration_postfixes(self) -> typing.List[str]:
        """A set of postfixes to include in a decorated .toString(). (experimental)

        stability
        :stability: experimental
        """
        return jsii.get(self, "decorationPostfixes")

    @decoration_postfixes.setter
    def decoration_postfixes(self, value: typing.List[str]) -> None:
        jsii.set(self, "decorationPostfixes", value)

    @builtins.property
    @jsii.member(jsii_name="decorationPrefixes")
    def decoration_prefixes(self) -> typing.List[str]:
        """A set of prefixes to include in a decorated .toString(). (experimental)

        stability
        :stability: experimental
        """
        return jsii.get(self, "decorationPrefixes")

    @decoration_prefixes.setter
    def decoration_prefixes(self, value: typing.List[str]) -> None:
        jsii.set(self, "decorationPrefixes", value)

    @builtins.property
    @jsii.member(jsii_name="stringStyle")
    def string_style(self) -> "CompositionStringStyle":
        """The .toString() style. (experimental)

        stability
        :stability: experimental
        """
        return jsii.get(self, "stringStyle")

    @string_style.setter
    def string_style(self, value: "CompositionStringStyle") -> None:
        jsii.set(self, "stringStyle", value)

    @jsii.enum(
        jsii_type="jsii-calc.composition.CompositeOperation.CompositionStringStyle"
    )
    class CompositionStringStyle(enum.Enum):
        """Style of .toString() output for CompositeOperation. (experimental)

        stability
        :stability: experimental
        """

        NORMAL = "NORMAL"
        """Normal string expression. (experimental)

        stability
        :stability: experimental
        """
        DECORATED = "DECORATED"
        """Decorated string expression. (experimental)

        stability
        :stability: experimental
        """


class _CompositeOperationProxy(
    CompositeOperation, jsii.proxy_for(scope.jsii_calc_lib.Operation)
):
    @builtins.property
    @jsii.member(jsii_name="expression")
    def expression(self) -> scope.jsii_calc_lib.Value:
        """The expression that this operation consists of. (experimental)

        Must be implemented by derived classes.

        stability
        :stability: experimental
        """
        return jsii.get(self, "expression")


__all__ = [
    "CompositeOperation",
]

publication.publish()
