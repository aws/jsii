import abc
import builtins
import datetime
import enum
import publication
import typing

import jsii
import jsii.compat

import scope.jsii_calc_base
import scope.jsii_calc_base_of_base
import scope.jsii_calc_lib

__jsii_assembly__ = jsii.JSIIAssembly.load("jsii-calc", "1.0.0", "jsii_calc", "jsii-calc@1.0.0.jsii.tgz")


class DeprecatedClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.stability_annotations.DeprecatedClass"):
    """
    deprecated
    :deprecated: a pretty boring class

    stability
    :stability: deprecated
    """
    def __init__(self, readonly_string: str, mutable_number: typing.Optional[jsii.Number]=None) -> None:
        """
        :param readonly_string: -
        :param mutable_number: -

        deprecated
        :deprecated: this constructor is "just" okay

        stability
        :stability: deprecated
        """
        jsii.create(DeprecatedClass, self, [readonly_string, mutable_number])

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        deprecated
        :deprecated: it was a bad idea

        stability
        :stability: deprecated
        """
        return jsii.invoke(self, "method", [])

    @builtins.property
    @jsii.member(jsii_name="readonlyProperty")
    def readonly_property(self) -> str:
        """
        deprecated
        :deprecated: this is not always "wazoo", be ready to be disappointed

        stability
        :stability: deprecated
        """
        return jsii.get(self, "readonlyProperty")

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        deprecated
        :deprecated: shouldn't have been mutable

        stability
        :stability: deprecated
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        jsii.set(self, "mutableProperty", value)


@jsii.enum(jsii_type="jsii-calc.stability_annotations.DeprecatedEnum")
class DeprecatedEnum(enum.Enum):
    """
    deprecated
    :deprecated: your deprecated selection of bad options

    stability
    :stability: deprecated
    """
    OPTION_A = "OPTION_A"
    """
    deprecated
    :deprecated: option A is not great

    stability
    :stability: deprecated
    """
    OPTION_B = "OPTION_B"
    """
    deprecated
    :deprecated: option B is kinda bad, too

    stability
    :stability: deprecated
    """

@jsii.data_type(jsii_type="jsii-calc.stability_annotations.DeprecatedStruct", jsii_struct_bases=[], name_mapping={'readonly_property': 'readonlyProperty'})
class DeprecatedStruct():
    def __init__(self, *, readonly_property: str):
        """
        :param readonly_property: 

        deprecated
        :deprecated: it just wraps a string

        stability
        :stability: deprecated
        """
        self._values = {
            'readonly_property': readonly_property,
        }

    @builtins.property
    def readonly_property(self) -> str:
        """
        deprecated
        :deprecated: well, yeah

        stability
        :stability: deprecated
        """
        return self._values.get('readonly_property')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'DeprecatedStruct(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


class ExperimentalClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.stability_annotations.ExperimentalClass"):
    """
    stability
    :stability: experimental
    """
    def __init__(self, readonly_string: str, mutable_number: typing.Optional[jsii.Number]=None) -> None:
        """
        :param readonly_string: -
        :param mutable_number: -

        stability
        :stability: experimental
        """
        jsii.create(ExperimentalClass, self, [readonly_string, mutable_number])

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        stability
        :stability: experimental
        """
        return jsii.invoke(self, "method", [])

    @builtins.property
    @jsii.member(jsii_name="readonlyProperty")
    def readonly_property(self) -> str:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "readonlyProperty")

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        jsii.set(self, "mutableProperty", value)


@jsii.enum(jsii_type="jsii-calc.stability_annotations.ExperimentalEnum")
class ExperimentalEnum(enum.Enum):
    """
    stability
    :stability: experimental
    """
    OPTION_A = "OPTION_A"
    """
    stability
    :stability: experimental
    """
    OPTION_B = "OPTION_B"
    """
    stability
    :stability: experimental
    """

@jsii.data_type(jsii_type="jsii-calc.stability_annotations.ExperimentalStruct", jsii_struct_bases=[], name_mapping={'readonly_property': 'readonlyProperty'})
class ExperimentalStruct():
    def __init__(self, *, readonly_property: str):
        """
        :param readonly_property: 

        stability
        :stability: experimental
        """
        self._values = {
            'readonly_property': readonly_property,
        }

    @builtins.property
    def readonly_property(self) -> str:
        """
        stability
        :stability: experimental
        """
        return self._values.get('readonly_property')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'ExperimentalStruct(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


@jsii.interface(jsii_type="jsii-calc.stability_annotations.IDeprecatedInterface")
class IDeprecatedInterface(jsii.compat.Protocol):
    """
    deprecated
    :deprecated: useless interface

    stability
    :stability: deprecated
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IDeprecatedInterfaceProxy

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        deprecated
        :deprecated: could be better

        stability
        :stability: deprecated
        """
        ...

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        ...

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        deprecated
        :deprecated: services no purpose

        stability
        :stability: deprecated
        """
        ...


class _IDeprecatedInterfaceProxy():
    """
    deprecated
    :deprecated: useless interface

    stability
    :stability: deprecated
    """
    __jsii_type__ = "jsii-calc.stability_annotations.IDeprecatedInterface"
    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        deprecated
        :deprecated: could be better

        stability
        :stability: deprecated
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        jsii.set(self, "mutableProperty", value)

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        deprecated
        :deprecated: services no purpose

        stability
        :stability: deprecated
        """
        return jsii.invoke(self, "method", [])


@jsii.interface(jsii_type="jsii-calc.stability_annotations.IExperimentalInterface")
class IExperimentalInterface(jsii.compat.Protocol):
    """
    stability
    :stability: experimental
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IExperimentalInterfaceProxy

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        stability
        :stability: experimental
        """
        ...

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        ...

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        stability
        :stability: experimental
        """
        ...


class _IExperimentalInterfaceProxy():
    """
    stability
    :stability: experimental
    """
    __jsii_type__ = "jsii-calc.stability_annotations.IExperimentalInterface"
    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        jsii.set(self, "mutableProperty", value)

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        """
        stability
        :stability: experimental
        """
        return jsii.invoke(self, "method", [])


@jsii.interface(jsii_type="jsii-calc.stability_annotations.IStableInterface")
class IStableInterface(jsii.compat.Protocol):
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IStableInterfaceProxy

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        ...

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        ...

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        ...


class _IStableInterfaceProxy():
    __jsii_type__ = "jsii-calc.stability_annotations.IStableInterface"
    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        jsii.set(self, "mutableProperty", value)

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        return jsii.invoke(self, "method", [])


class StableClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.stability_annotations.StableClass"):
    def __init__(self, readonly_string: str, mutable_number: typing.Optional[jsii.Number]=None) -> None:
        """
        :param readonly_string: -
        :param mutable_number: -
        """
        jsii.create(StableClass, self, [readonly_string, mutable_number])

    @jsii.member(jsii_name="method")
    def method(self) -> None:
        return jsii.invoke(self, "method", [])

    @builtins.property
    @jsii.member(jsii_name="readonlyProperty")
    def readonly_property(self) -> str:
        return jsii.get(self, "readonlyProperty")

    @builtins.property
    @jsii.member(jsii_name="mutableProperty")
    def mutable_property(self) -> typing.Optional[jsii.Number]:
        return jsii.get(self, "mutableProperty")

    @mutable_property.setter
    def mutable_property(self, value: typing.Optional[jsii.Number]):
        jsii.set(self, "mutableProperty", value)


@jsii.enum(jsii_type="jsii-calc.stability_annotations.StableEnum")
class StableEnum(enum.Enum):
    OPTION_A = "OPTION_A"
    OPTION_B = "OPTION_B"

@jsii.data_type(jsii_type="jsii-calc.stability_annotations.StableStruct", jsii_struct_bases=[], name_mapping={'readonly_property': 'readonlyProperty'})
class StableStruct():
    def __init__(self, *, readonly_property: str):
        """
        :param readonly_property: 
        """
        self._values = {
            'readonly_property': readonly_property,
        }

    @builtins.property
    def readonly_property(self) -> str:
        return self._values.get('readonly_property')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'StableStruct(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


__all__ = ["DeprecatedClass", "DeprecatedEnum", "DeprecatedStruct", "ExperimentalClass", "ExperimentalEnum", "ExperimentalStruct", "IDeprecatedInterface", "IExperimentalInterface", "IStableInterface", "StableClass", "StableEnum", "StableStruct", "__jsii_assembly__"]

publication.publish()
