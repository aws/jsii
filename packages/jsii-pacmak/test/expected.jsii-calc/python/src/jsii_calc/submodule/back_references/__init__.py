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

from ..._jsii import *


@jsii.data_type(jsii_type="jsii-calc.submodule.back_references.MyClassReference", jsii_struct_bases=[], name_mapping={'reference': 'reference'})
class MyClassReference():
    def __init__(self, *, reference: jsii_calc.submodule.MyClass):
        """
        :param reference: 

        stability
        :stability: experimental
        """
        self._values = {
            'reference': reference,
        }

    @builtins.property
    def reference(self) -> jsii_calc.submodule.MyClass:
        """
        stability
        :stability: experimental
        """
        return self._values.get('reference')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'MyClassReference(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


__all__ = ["MyClassReference"]

publication.publish()
