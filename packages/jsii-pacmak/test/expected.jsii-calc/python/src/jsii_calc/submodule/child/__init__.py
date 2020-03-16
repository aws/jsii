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

__jsii_assembly__ = jsii.JSIIAssembly.load("jsii-calc", "1.1.0", "jsii_calc", "jsii-calc@1.1.0.jsii.tgz")


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


__all__ = ["Structure", "__jsii_assembly__"]

publication.publish()
