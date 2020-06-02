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
    """
    stability
    :stability: experimental
    """
    AWESOME = "AWESOME"
    """It was awesome!

    stability
    :stability: experimental
    """

@jsii.enum(jsii_type="jsii-calc.submodule.child.Goodness")
class Goodness(enum.Enum):
    """
    stability
    :stability: experimental
    """
    PRETTY_GOOD = "PRETTY_GOOD"
    """It's pretty good.

    stability
    :stability: experimental
    """
    REALLY_GOOD = "REALLY_GOOD"
    """It's really good.

    stability
    :stability: experimental
    """
    AMAZINGLY_GOOD = "AMAZINGLY_GOOD"
    """It's amazingly good.

    stability
    :stability: experimental
    """

class InnerClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.submodule.child.InnerClass"):
    """
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
        """
        stability
        :stability: experimental
        """
        return jsii.sget(cls, "staticProp")


class OuterClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.submodule.child.OuterClass"):
    """Checks that classes can self-reference during initialization.

    see
    :see: : https://github.com/aws/jsii/pull/1706
    stability
    :stability: experimental
    """
    def __init__(self) -> None:
        """
        stability
        :stability: experimental
        """
        jsii.create(OuterClass, self, [])

    @builtins.property
    @jsii.member(jsii_name="innerClass")
    def inner_class(self) -> "InnerClass":
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "innerClass")


@jsii.enum(jsii_type="jsii-calc.submodule.child.SomeEnum")
class SomeEnum(enum.Enum):
    """
    stability
    :stability: experimental
    """
    SOME = "SOME"
    """
    stability
    :stability: experimental
    """

@jsii.data_type(jsii_type="jsii-calc.submodule.child.SomeStruct", jsii_struct_bases=[], name_mapping={'prop': 'prop'})
class SomeStruct():
    def __init__(self, *, prop: "SomeEnum") -> None:
        """
        :param prop: 

        stability
        :stability: experimental
        """
        self._values = {
            'prop': prop,
        }

    @builtins.property
    def prop(self) -> "SomeEnum":
        """
        stability
        :stability: experimental
        """
        return self._values.get('prop')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'SomeStruct(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


@jsii.data_type(jsii_type="jsii-calc.submodule.child.Structure", jsii_struct_bases=[], name_mapping={'bool': 'bool'})
class Structure():
    def __init__(self, *, bool: bool) -> None:
        """
        :param bool: 

        stability
        :stability: experimental
        """
        self._values = {
            'bool': bool,
        }

    @builtins.property
    def bool(self) -> bool:
        """
        stability
        :stability: experimental
        """
        return self._values.get('bool')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'Structure(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


__all__ = [
    "Awesomeness",
    "Goodness",
    "InnerClass",
    "OuterClass",
    "SomeEnum",
    "SomeStruct",
    "Structure",
]

publication.publish()
