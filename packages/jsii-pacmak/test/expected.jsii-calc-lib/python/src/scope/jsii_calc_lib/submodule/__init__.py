import abc
import builtins
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from .._jsii import *


@jsii.interface(jsii_type="@scope/jsii-calc-lib.submodule.IReflectable")
class IReflectable(jsii.compat.Protocol):
    """
    stability
    :stability: deprecated
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IReflectableProxy

    @builtins.property
    @jsii.member(jsii_name="entries")
    def entries(self) -> typing.List["ReflectableEntry"]:
        """
        stability
        :stability: deprecated
        """
        ...


class _IReflectableProxy():
    """
    stability
    :stability: deprecated
    """
    __jsii_type__ = "@scope/jsii-calc-lib.submodule.IReflectable"
    @builtins.property
    @jsii.member(jsii_name="entries")
    def entries(self) -> typing.List["ReflectableEntry"]:
        """
        stability
        :stability: deprecated
        """
        return jsii.get(self, "entries")


@jsii.data_type(jsii_type="@scope/jsii-calc-lib.submodule.ReflectableEntry", jsii_struct_bases=[], name_mapping={'key': 'key', 'value': 'value'})
class ReflectableEntry():
    def __init__(self, *, key: str, value: typing.Any) -> None:
        """
        :param key: 
        :param value: 

        stability
        :stability: deprecated
        """
        self._values = {
            'key': key,
            'value': value,
        }

    @builtins.property
    def key(self) -> str:
        """
        stability
        :stability: deprecated
        """
        return self._values.get('key')

    @builtins.property
    def value(self) -> typing.Any:
        """
        stability
        :stability: deprecated
        """
        return self._values.get('value')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'ReflectableEntry(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


class Reflector(metaclass=jsii.JSIIMeta, jsii_type="@scope/jsii-calc-lib.submodule.Reflector"):
    """
    stability
    :stability: deprecated
    """
    def __init__(self) -> None:
        """
        stability
        :stability: deprecated
        """
        jsii.create(Reflector, self, [])

    @jsii.member(jsii_name="asMap")
    def as_map(self, reflectable: "IReflectable") -> typing.Mapping[str, typing.Any]:
        """
        :param reflectable: -

        stability
        :stability: deprecated
        """
        return jsii.invoke(self, "asMap", [reflectable])


__all__ = [
    "IReflectable",
    "ReflectableEntry",
    "Reflector",
]

publication.publish()
