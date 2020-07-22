import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from ..._jsii import *

from ..child import KwargsProps as _KwargsProps_c7855dcf, SomeEnum as _SomeEnum_b2e41d92


class Kwargs(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.submodule.isolated.Kwargs"):
    """Ensures imports are correctly registered for kwargs lifted properties from super-structs.

    stability
    :stability: experimental
    """

    @jsii.member(jsii_name="method")
    @builtins.classmethod
    def method(
        cls, *, extra: typing.Optional[str] = None, prop: _SomeEnum_b2e41d92
    ) -> bool:
        """
        :param extra: 
        :param prop: 

        stability
        :stability: experimental
        """
        props = _KwargsProps_c7855dcf(extra=extra, prop=prop)

        return jsii.sinvoke(cls, "method", [props])


__all__ = [
    "Kwargs",
]

publication.publish()
