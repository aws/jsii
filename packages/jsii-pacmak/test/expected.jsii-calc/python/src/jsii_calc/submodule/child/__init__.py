import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from ..._jsii import *


@jsii.enum(jsii_type="jsii-calc.submodule.child.Awesomeness")
class Awesomeness(enum.Enum):
    AWESOME = "AWESOME"
    """It was awesome!"""


@jsii.enum(jsii_type="jsii-calc.submodule.child.Goodness")
class Goodness(enum.Enum):
    PRETTY_GOOD = "PRETTY_GOOD"
    """It's pretty good."""
    REALLY_GOOD = "REALLY_GOOD"
    """It's really good."""
    AMAZINGLY_GOOD = "AMAZINGLY_GOOD"
    """It's amazingly good."""


class InnerClass(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.submodule.child.InnerClass"
):
    def __init__(self) -> None:
        jsii.create(InnerClass, self, [])

    @jsii.python.classproperty
    @jsii.member(jsii_name="staticProp")
    def STATIC_PROP(cls) -> "SomeStruct":
        return jsii.sget(cls, "staticProp")


class OuterClass(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.submodule.child.OuterClass"
):
    """Checks that classes can self-reference during initialization.

    see
    :see: : https://github.com/aws/jsii/pull/1706
    """

    def __init__(self) -> None:
        jsii.create(OuterClass, self, [])

    @builtins.property
    @jsii.member(jsii_name="innerClass")
    def inner_class(self) -> "InnerClass":
        return jsii.get(self, "innerClass")


@jsii.enum(jsii_type="jsii-calc.submodule.child.SomeEnum")
class SomeEnum(enum.Enum):
    SOME = "SOME"


@jsii.data_type(
    jsii_type="jsii-calc.submodule.child.SomeStruct",
    jsii_struct_bases=[],
    name_mapping={"prop": "prop"},
)
class SomeStruct:
    def __init__(self, *, prop: "SomeEnum") -> None:
        """
        :param prop: 
        """
        self._values = {
            "prop": prop,
        }

    @builtins.property
    def prop(self) -> "SomeEnum":
        return self._values.get("prop")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "SomeStruct(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.data_type(
    jsii_type="jsii-calc.submodule.child.Structure",
    jsii_struct_bases=[],
    name_mapping={"bool": "bool"},
)
class Structure:
    def __init__(self, *, bool: bool) -> None:
        """
        :param bool: 
        """
        self._values = {
            "bool": bool,
        }

    @builtins.property
    def bool(self) -> bool:
        return self._values.get("bool")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "Structure(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.data_type(
    jsii_type="jsii-calc.submodule.child.KwargsProps",
    jsii_struct_bases=[SomeStruct],
    name_mapping={"prop": "prop", "extra": "extra"},
)
class KwargsProps(SomeStruct):
    def __init__(self, *, prop: "SomeEnum", extra: typing.Optional[str] = None) -> None:
        """
        :param prop: 
        :param extra: 
        """
        self._values = {
            "prop": prop,
        }
        if extra is not None:
            self._values["extra"] = extra

    @builtins.property
    def prop(self) -> "SomeEnum":
        return self._values.get("prop")

    @builtins.property
    def extra(self) -> typing.Optional[str]:
        return self._values.get("extra")

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "KwargsProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


__all__ = [
    "Awesomeness",
    "Goodness",
    "InnerClass",
    "KwargsProps",
    "OuterClass",
    "SomeEnum",
    "SomeStruct",
    "Structure",
]

publication.publish()
