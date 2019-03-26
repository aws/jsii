import abc
import datetime
import enum
import typing

import jsii
import jsii.compat
import publication

from jsii.python import classproperty

import scope.jsii_calc_base_of_base
__jsii_assembly__ = jsii.JSIIAssembly.load("@scope/jsii-calc-base", "0.8.0", __name__, "jsii-calc-base@0.8.0.jsii.tgz")
class Base(metaclass=jsii.JSIIAbstractClass, jsii_type="@scope/jsii-calc-base.Base"):
    @staticmethod
    def __jsii_proxy_class__():
        return _BaseProxy

    def __init__(self) -> None:
        jsii.create(Base, self, [])

    @jsii.member(jsii_name="typeName")
    def type_name(self) -> typing.Any:
        return jsii.invoke(self, "typeName", [])


class _BaseProxy(Base):
    pass

@jsii.data_type(jsii_type="@scope/jsii-calc-base.BaseProps")
class BaseProps(scope.jsii_calc_base_of_base.VeryBaseProps, jsii.compat.TypedDict):
    bar: str

__all__ = ["Base", "BaseProps", "__jsii_assembly__"]

publication.publish()
