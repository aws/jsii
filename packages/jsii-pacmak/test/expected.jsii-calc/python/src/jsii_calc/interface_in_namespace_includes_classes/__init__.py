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


class Foo(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.InterfaceInNamespaceIncludesClasses.Foo"):
    """
    stability
    :stability: experimental
    """
    def __init__(self) -> None:
        jsii.create(Foo, self, [])

    @builtins.property
    @jsii.member(jsii_name="bar")
    def bar(self) -> typing.Optional[str]:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "bar")

    @bar.setter
    def bar(self, value: typing.Optional[str]):
        jsii.set(self, "bar", value)


@jsii.data_type(jsii_type="jsii-calc.InterfaceInNamespaceIncludesClasses.Hello", jsii_struct_bases=[], name_mapping={'foo': 'foo'})
class Hello():
    def __init__(self, *, foo: jsii.Number):
        """
        :param foo: 

        stability
        :stability: experimental
        """
        self._values = {
            'foo': foo,
        }

    @builtins.property
    def foo(self) -> jsii.Number:
        """
        stability
        :stability: experimental
        """
        return self._values.get('foo')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'Hello(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


__all__ = ["Foo", "Hello", "__jsii_assembly__"]

publication.publish()
