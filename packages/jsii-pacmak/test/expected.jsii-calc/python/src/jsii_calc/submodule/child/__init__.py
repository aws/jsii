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
    """(experimental)

    stability
    :stability: experimental
    """

    AWESOME = "AWESOME"
    """It was awesome! (experimental)

    stability
    :stability: experimental
    """


@jsii.enum(jsii_type="jsii-calc.submodule.child.Goodness")
class Goodness(enum.Enum):
    """(experimental)

    stability
    :stability: experimental
    """

    PRETTY_GOOD = "PRETTY_GOOD"
    """It's pretty good. (experimental)

    stability
    :stability: experimental
    """
    REALLY_GOOD = "REALLY_GOOD"
    """It's really good. (experimental)

    stability
    :stability: experimental
    """
    AMAZINGLY_GOOD = "AMAZINGLY_GOOD"
    """It's amazingly good. (experimental)

    stability
    :stability: experimental
    """


class InnerClass(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.submodule.child.InnerClass"
):
    """(experimental)

    stability
    :stability: experimental
    """

    def __init__(self) -> None:
        """
        stability
        :stability: experimental
        """
        jsii.create(InnerClass, self, [])

    @jsii.python.classproperty
    @jsii.member(jsii_name="staticProp")
    def STATIC_PROP(cls) -> "SomeStruct":
        """(experimental)

        stability
        :stability: experimental
        """
        return jsii.sget(cls, "staticProp")


class OuterClass(
    metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.submodule.child.OuterClass"
):
    """Checks that classes can self-reference during initialization. (experimental)

    see
    :see: : https://github.com/aws/jsii/pull/1706
    stability
    :stability: experimental
    """

    def __init__(self) -> None:
        """(experimental)

        stability
        :stability: experimental
        """
        jsii.create(OuterClass, self, [])

    @builtins.property
    @jsii.member(jsii_name="innerClass")
    def inner_class(self) -> "InnerClass":
        """(experimental)

        stability
        :stability: experimental
        """
        return jsii.get(self, "innerClass")


@jsii.enum(jsii_type="jsii-calc.submodule.child.SomeEnum")
class SomeEnum(enum.Enum):
    """(experimental)

    stability
    :stability: experimental
    """

    SOME = "SOME"
    """(experimental)

    stability
    :stability: experimental
    """


@jsii.data_type(
    jsii_type="jsii-calc.submodule.child.SomeStruct",
    jsii_struct_bases=[],
    name_mapping={"prop": "prop"},
)
class SomeStruct:
    def __init__(self, *, prop: "SomeEnum") -> None:
        """(experimental)

        :param prop: (experimental)

        stability
        :stability: experimental
        """
        self._values = {
            "prop": prop,
        }

    @builtins.property
    def prop(self) -> "SomeEnum":
        """(experimental)

        stability
        :stability: experimental
        """
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
        """(experimental)

        :param bool: (experimental)

        stability
        :stability: experimental
        """
        self._values = {
            "bool": bool,
        }

    @builtins.property
    def bool(self) -> bool:
        """(experimental)

        stability
        :stability: experimental
        """
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
        """(experimental)

        :param prop: (experimental)
        :param extra: (experimental)

        stability
        :stability: experimental
        """
        self._values = {
            "prop": prop,
        }
        if extra is not None:
            self._values["extra"] = extra

    @builtins.property
    def prop(self) -> "SomeEnum":
        """(experimental)

        stability
        :stability: experimental
        """
        return self._values.get("prop")

    @builtins.property
    def extra(self) -> typing.Optional[str]:
        """(experimental)

        stability
        :stability: experimental
        """
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
