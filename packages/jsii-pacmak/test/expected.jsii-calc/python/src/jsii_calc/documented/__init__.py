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

__jsii_assembly__ = jsii.JSIIAssembly.load("jsii-calc", "1.1.0", "jsii_calc", "jsii-calc@1.1.0.jsii.tgz")


class DocumentedClass(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.documented.DocumentedClass"):
    """Here's the first line of the TSDoc comment.

    This is the meat of the TSDoc comment. It may contain
    multiple lines and multiple paragraphs.

    Multiple paragraphs are separated by an empty line.
    """
    def __init__(self) -> None:
        jsii.create(DocumentedClass, self, [])

    @jsii.member(jsii_name="greet")
    def greet(self, *, name: typing.Optional[str]=None) -> jsii.Number:
        """Greet the indicated person.

        This will print out a friendly greeting intended for
        the indicated person.

        :param name: The name of the greetee. Default: world

        return
        :return: A number that everyone knows very well
        """
        greetee = Greetee(name=name)

        return jsii.invoke(self, "greet", [greetee])

    @jsii.member(jsii_name="hola")
    def hola(self) -> None:
        """Say ¡Hola!

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "hola", [])


@jsii.data_type(jsii_type="jsii-calc.documented.Greetee", jsii_struct_bases=[], name_mapping={'name': 'name'})
class Greetee():
    def __init__(self, *, name: typing.Optional[str]=None):
        """These are some arguments you can pass to a method.

        :param name: The name of the greetee. Default: world

        stability
        :stability: experimental
        """
        self._values = {
        }
        if name is not None: self._values["name"] = name

    @builtins.property
    def name(self) -> typing.Optional[str]:
        """The name of the greetee.

        default
        :default: world

        stability
        :stability: experimental
        """
        return self._values.get('name')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'Greetee(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


class Old(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.documented.Old"):
    """Old class.

    deprecated
    :deprecated: Use the new class

    stability
    :stability: deprecated
    """
    def __init__(self) -> None:
        jsii.create(Old, self, [])

    @jsii.member(jsii_name="doAThing")
    def do_a_thing(self) -> None:
        """Doo wop that thing.

        stability
        :stability: deprecated
        """
        return jsii.invoke(self, "doAThing", [])


__all__ = ["DocumentedClass", "Greetee", "Old", "__jsii_assembly__"]

publication.publish()
