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

__jsii_assembly__ = jsii.JSIIAssembly.load("jsii-calc", "0.0.0", "jsii_calc", "jsii-calc@0.0.0.jsii.tgz")


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

@jsii.data_type(jsii_type="jsii-calc.submodule.child.Structure", jsii_struct_bases=[], name_mapping={'bool': 'bool'})
class Structure():
    def __init__(self, *, bool: bool):
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


__all__ = ["Awesomeness", "Goodness", "Structure", "__jsii_assembly__"]

publication.publish()
