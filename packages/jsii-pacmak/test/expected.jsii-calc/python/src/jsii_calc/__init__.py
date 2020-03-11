"""
# jsii Calculator

This library is used to demonstrate and test the features of JSII

## How to use running sum API:

First, create a calculator:

```python
# Example automatically generated. See https://github.com/aws/jsii/issues/826
calculator = calc.Calculator()
```

Then call some operations:

```python
# Example automatically generated. See https://github.com/aws/jsii/issues/826
calculator.add(10)
```

## Code Samples

```python
# Example automatically generated. See https://github.com/aws/jsii/issues/826
# This is totes a magic comment in here, just you wait!
foo = "bar"
```
"""
import abc
import builtins
import datetime
import enum
import publication
import typing

import jsii
import jsii.compat

import jsii_calc.composition
import scope.jsii_calc_base
import scope.jsii_calc_base_of_base
import scope.jsii_calc_lib

__jsii_assembly__ = jsii.JSIIAssembly.load("jsii-calc", "1.0.0", "jsii_calc", "jsii-calc@1.0.0.jsii.tgz")


class AbstractSuite(metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.AbstractSuite"):
    """Ensures abstract members implementations correctly register overrides in various languages.

    stability
    :stability: experimental
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _AbstractSuiteProxy

    def __init__(self) -> None:
        jsii.create(AbstractSuite, self, [])

    @jsii.member(jsii_name="someMethod")
    @abc.abstractmethod
    def _some_method(self, str: str) -> str:
        """
        :param str: -

        stability
        :stability: experimental
        """
        ...

    @jsii.member(jsii_name="workItAll")
    def work_it_all(self, seed: str) -> str:
        """Sets ``seed`` to ``this.property``, then calls ``someMethod`` with ``this.property`` and returns the result.

        :param seed: a ``string``.

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "workItAll", [seed])

    @builtins.property
    @jsii.member(jsii_name="property")
    @abc.abstractmethod
    def _property(self) -> str:
        """
        stability
        :stability: experimental
        """
        ...

    @_property.setter
    @abc.abstractmethod
    def _property(self, value: str):
        ...


class _AbstractSuiteProxy(AbstractSuite):
    @jsii.member(jsii_name="someMethod")
    def _some_method(self, str: str) -> str:
        """
        :param str: -

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "someMethod", [str])

    @builtins.property
    @jsii.member(jsii_name="property")
    def _property(self) -> str:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "property")

    @_property.setter
    def _property(self, value: str):
        jsii.set(self, "property", value)


@jsii.implements(scope.jsii_calc_lib.IFriendly)
class BinaryOperation(scope.jsii_calc_lib.Operation, metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.BinaryOperation"):
    """Represents an operation with two operands.

    stability
    :stability: experimental
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _BinaryOperationProxy

    def __init__(self, lhs: scope.jsii_calc_lib.Value, rhs: scope.jsii_calc_lib.Value) -> None:
        """Creates a BinaryOperation.

        :param lhs: Left-hand side operand.
        :param rhs: Right-hand side operand.

        stability
        :stability: experimental
        """
        jsii.create(BinaryOperation, self, [lhs, rhs])

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        """Say hello!

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "hello", [])

    @builtins.property
    @jsii.member(jsii_name="lhs")
    def lhs(self) -> scope.jsii_calc_lib.Value:
        """Left-hand side operand.

        stability
        :stability: experimental
        """
        return jsii.get(self, "lhs")

    @builtins.property
    @jsii.member(jsii_name="rhs")
    def rhs(self) -> scope.jsii_calc_lib.Value:
        """Right-hand side operand.

        stability
        :stability: experimental
        """
        return jsii.get(self, "rhs")


class _BinaryOperationProxy(BinaryOperation, jsii.proxy_for(scope.jsii_calc_lib.Operation)):
    pass

class Calculator(composition.CompositeOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Calculator"):
    """A calculator which maintains a current value and allows adding operations.

    Here's how you use it::

       # Example automatically generated. See https://github.com/aws/jsii/issues/826
       calculator = calc.Calculator()
       calculator.add(5)
       calculator.mul(3)
       print(calculator.expression.value)

    I will repeat this example again, but in an @example tag.

    stability
    :stability: experimental

    Example::

        # Example automatically generated. See https://github.com/aws/jsii/issues/826
        calculator = calc.Calculator()
        calculator.add(5)
        calculator.mul(3)
        print(calculator.expression.value)
    """
    def __init__(self, *, initial_value: typing.Optional[jsii.Number]=None, maximum_value: typing.Optional[jsii.Number]=None) -> None:
        """Creates a Calculator object.

        :param initial_value: The initial value of the calculator. NOTE: Any number works here, it's fine. Default: 0
        :param maximum_value: The maximum value the calculator can store. Default: none

        stability
        :stability: experimental
        """
        props = CalculatorProps(initial_value=initial_value, maximum_value=maximum_value)

        jsii.create(Calculator, self, [props])

    @jsii.member(jsii_name="add")
    def add(self, value: jsii.Number) -> None:
        """Adds a number to the current value.

        :param value: -

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "add", [value])

    @jsii.member(jsii_name="mul")
    def mul(self, value: jsii.Number) -> None:
        """Multiplies the current value by a number.

        :param value: -

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "mul", [value])

    @jsii.member(jsii_name="neg")
    def neg(self) -> None:
        """Negates the current value.

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "neg", [])

    @jsii.member(jsii_name="pow")
    def pow(self, value: jsii.Number) -> None:
        """Raises the current value by a power.

        :param value: -

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "pow", [value])

    @jsii.member(jsii_name="readUnionValue")
    def read_union_value(self) -> jsii.Number:
        """Returns teh value of the union property (if defined).

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "readUnionValue", [])

    @builtins.property
    @jsii.member(jsii_name="expression")
    def expression(self) -> scope.jsii_calc_lib.Value:
        """Returns the expression.

        stability
        :stability: experimental
        """
        return jsii.get(self, "expression")

    @builtins.property
    @jsii.member(jsii_name="operationsLog")
    def operations_log(self) -> typing.List[scope.jsii_calc_lib.Value]:
        """A log of all operations.

        stability
        :stability: experimental
        """
        return jsii.get(self, "operationsLog")

    @builtins.property
    @jsii.member(jsii_name="operationsMap")
    def operations_map(self) -> typing.Mapping[str,typing.List[scope.jsii_calc_lib.Value]]:
        """A map of per operation name of all operations performed.

        stability
        :stability: experimental
        """
        return jsii.get(self, "operationsMap")

    @builtins.property
    @jsii.member(jsii_name="curr")
    def curr(self) -> scope.jsii_calc_lib.Value:
        """The current value.

        stability
        :stability: experimental
        """
        return jsii.get(self, "curr")

    @curr.setter
    def curr(self, value: scope.jsii_calc_lib.Value):
        jsii.set(self, "curr", value)

    @builtins.property
    @jsii.member(jsii_name="maxValue")
    def max_value(self) -> typing.Optional[jsii.Number]:
        """The maximum value allows in this calculator.

        stability
        :stability: experimental
        """
        return jsii.get(self, "maxValue")

    @max_value.setter
    def max_value(self, value: typing.Optional[jsii.Number]):
        jsii.set(self, "maxValue", value)

    @builtins.property
    @jsii.member(jsii_name="unionProperty")
    def union_property(self) -> typing.Optional[typing.Union[typing.Optional["Add"], typing.Optional["Multiply"], typing.Optional["Power"]]]:
        """Example of a property that accepts a union of types.

        stability
        :stability: experimental
        """
        return jsii.get(self, "unionProperty")

    @union_property.setter
    def union_property(self, value: typing.Optional[typing.Union[typing.Optional["Add"], typing.Optional["Multiply"], typing.Optional["Power"]]]):
        jsii.set(self, "unionProperty", value)


@jsii.data_type(jsii_type="jsii-calc.CalculatorProps", jsii_struct_bases=[], name_mapping={'initial_value': 'initialValue', 'maximum_value': 'maximumValue'})
class CalculatorProps():
    def __init__(self, *, initial_value: typing.Optional[jsii.Number]=None, maximum_value: typing.Optional[jsii.Number]=None):
        """Properties for Calculator.

        :param initial_value: The initial value of the calculator. NOTE: Any number works here, it's fine. Default: 0
        :param maximum_value: The maximum value the calculator can store. Default: none

        stability
        :stability: experimental
        """
        self._values = {
        }
        if initial_value is not None: self._values["initial_value"] = initial_value
        if maximum_value is not None: self._values["maximum_value"] = maximum_value

    @builtins.property
    def initial_value(self) -> typing.Optional[jsii.Number]:
        """The initial value of the calculator.

        NOTE: Any number works here, it's fine.

        default
        :default: 0

        stability
        :stability: experimental
        """
        return self._values.get('initial_value')

    @builtins.property
    def maximum_value(self) -> typing.Optional[jsii.Number]:
        """The maximum value the calculator can store.

        default
        :default: none

        stability
        :stability: experimental
        """
        return self._values.get('maximum_value')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'CalculatorProps(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


@jsii.interface(jsii_type="jsii-calc.IFriendlier")
class IFriendlier(scope.jsii_calc_lib.IFriendly, jsii.compat.Protocol):
    """Even friendlier classes can implement this interface.

    stability
    :stability: experimental
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IFriendlierProxy

    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        """Say farewell.

        stability
        :stability: experimental
        """
        ...

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        """Say goodbye.

        return
        :return: A goodbye blessing.

        stability
        :stability: experimental
        """
        ...


class _IFriendlierProxy(jsii.proxy_for(scope.jsii_calc_lib.IFriendly)):
    """Even friendlier classes can implement this interface.

    stability
    :stability: experimental
    """
    __jsii_type__ = "jsii-calc.IFriendlier"
    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        """Say farewell.

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "farewell", [])

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        """Say goodbye.

        return
        :return: A goodbye blessing.

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "goodbye", [])


@jsii.interface(jsii_type="jsii-calc.IRandomNumberGenerator")
class IRandomNumberGenerator(jsii.compat.Protocol):
    """Generates random numbers.

    stability
    :stability: experimental
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IRandomNumberGeneratorProxy

    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        """Returns another random number.

        return
        :return: A random number.

        stability
        :stability: experimental
        """
        ...


class _IRandomNumberGeneratorProxy():
    """Generates random numbers.

    stability
    :stability: experimental
    """
    __jsii_type__ = "jsii-calc.IRandomNumberGenerator"
    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        """Returns another random number.

        return
        :return: A random number.

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "next", [])


class MethodNamedProperty(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.MethodNamedProperty"):
    """
    stability
    :stability: experimental
    """
    def __init__(self) -> None:
        jsii.create(MethodNamedProperty, self, [])

    @jsii.member(jsii_name="property")
    def property(self) -> str:
        """
        stability
        :stability: experimental
        """
        return jsii.invoke(self, "property", [])

    @builtins.property
    @jsii.member(jsii_name="elite")
    def elite(self) -> jsii.Number:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "elite")


@jsii.implements(IFriendlier, IRandomNumberGenerator)
class Multiply(BinaryOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Multiply"):
    """The "*" binary operation.

    stability
    :stability: experimental
    """
    def __init__(self, lhs: scope.jsii_calc_lib.Value, rhs: scope.jsii_calc_lib.Value) -> None:
        """Creates a BinaryOperation.

        :param lhs: Left-hand side operand.
        :param rhs: Right-hand side operand.

        stability
        :stability: experimental
        """
        jsii.create(Multiply, self, [lhs, rhs])

    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        """Say farewell.

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "farewell", [])

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        """Say goodbye.

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "goodbye", [])

    @jsii.member(jsii_name="next")
    def next(self) -> jsii.Number:
        """Returns another random number.

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "next", [])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value.

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "toString", [])

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The value.

        stability
        :stability: experimental
        """
        return jsii.get(self, "value")


class Power(composition.CompositeOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Power"):
    """The power operation.

    stability
    :stability: experimental
    """
    def __init__(self, base: scope.jsii_calc_lib.Value, pow: scope.jsii_calc_lib.Value) -> None:
        """Creates a Power operation.

        :param base: The base of the power.
        :param pow: The number of times to multiply.

        stability
        :stability: experimental
        """
        jsii.create(Power, self, [base, pow])

    @builtins.property
    @jsii.member(jsii_name="base")
    def base(self) -> scope.jsii_calc_lib.Value:
        """The base of the power.

        stability
        :stability: experimental
        """
        return jsii.get(self, "base")

    @builtins.property
    @jsii.member(jsii_name="expression")
    def expression(self) -> scope.jsii_calc_lib.Value:
        """The expression that this operation consists of.

        Must be implemented by derived classes.

        stability
        :stability: experimental
        """
        return jsii.get(self, "expression")

    @builtins.property
    @jsii.member(jsii_name="pow")
    def pow(self) -> scope.jsii_calc_lib.Value:
        """The number of times to multiply.

        stability
        :stability: experimental
        """
        return jsii.get(self, "pow")


class PropertyNamedProperty(metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.PropertyNamedProperty"):
    """Reproduction for https://github.com/aws/jsii/issues/1113 Where a method or property named "property" would result in impossible to load Python code.

    stability
    :stability: experimental
    """
    def __init__(self) -> None:
        jsii.create(PropertyNamedProperty, self, [])

    @builtins.property
    @jsii.member(jsii_name="property")
    def property(self) -> str:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "property")

    @builtins.property
    @jsii.member(jsii_name="yetAnoterOne")
    def yet_anoter_one(self) -> bool:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "yetAnoterOne")


@jsii.data_type(jsii_type="jsii-calc.SmellyStruct", jsii_struct_bases=[], name_mapping={'property': 'property', 'yet_anoter_one': 'yetAnoterOne'})
class SmellyStruct():
    def __init__(self, *, property: str, yet_anoter_one: bool):
        """
        :param property: 
        :param yet_anoter_one: 

        stability
        :stability: experimental
        """
        self._values = {
            'property': property,
            'yet_anoter_one': yet_anoter_one,
        }

    @builtins.property
    def property(self) -> str:
        """
        stability
        :stability: experimental
        """
        return self._values.get('property')

    @builtins.property
    def yet_anoter_one(self) -> bool:
        """
        stability
        :stability: experimental
        """
        return self._values.get('yet_anoter_one')

    def __eq__(self, rhs) -> bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs) -> bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return 'SmellyStruct(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())


class Sum(composition.CompositeOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Sum"):
    """An operation that sums multiple values.

    stability
    :stability: experimental
    """
    def __init__(self) -> None:
        """
        stability
        :stability: experimental
        """
        jsii.create(Sum, self, [])

    @builtins.property
    @jsii.member(jsii_name="expression")
    def expression(self) -> scope.jsii_calc_lib.Value:
        """The expression that this operation consists of.

        Must be implemented by derived classes.

        stability
        :stability: experimental
        """
        return jsii.get(self, "expression")

    @builtins.property
    @jsii.member(jsii_name="parts")
    def parts(self) -> typing.List[scope.jsii_calc_lib.Value]:
        """The parts to sum.

        stability
        :stability: experimental
        """
        return jsii.get(self, "parts")

    @parts.setter
    def parts(self, value: typing.List[scope.jsii_calc_lib.Value]):
        jsii.set(self, "parts", value)


class UnaryOperation(scope.jsii_calc_lib.Operation, metaclass=jsii.JSIIAbstractClass, jsii_type="jsii-calc.UnaryOperation"):
    """An operation on a single operand.

    stability
    :stability: experimental
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _UnaryOperationProxy

    def __init__(self, operand: scope.jsii_calc_lib.Value) -> None:
        """
        :param operand: -

        stability
        :stability: experimental
        """
        jsii.create(UnaryOperation, self, [operand])

    @builtins.property
    @jsii.member(jsii_name="operand")
    def operand(self) -> scope.jsii_calc_lib.Value:
        """
        stability
        :stability: experimental
        """
        return jsii.get(self, "operand")


class _UnaryOperationProxy(UnaryOperation, jsii.proxy_for(scope.jsii_calc_lib.Operation)):
    pass

class Add(BinaryOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Add"):
    """The "+" binary operation.

    stability
    :stability: experimental
    """
    def __init__(self, lhs: scope.jsii_calc_lib.Value, rhs: scope.jsii_calc_lib.Value) -> None:
        """Creates a BinaryOperation.

        :param lhs: Left-hand side operand.
        :param rhs: Right-hand side operand.

        stability
        :stability: experimental
        """
        jsii.create(Add, self, [lhs, rhs])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value.

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "toString", [])

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The value.

        stability
        :stability: experimental
        """
        return jsii.get(self, "value")


@jsii.interface(jsii_type="jsii-calc.IFriendlyRandomGenerator")
class IFriendlyRandomGenerator(IRandomNumberGenerator, scope.jsii_calc_lib.IFriendly, jsii.compat.Protocol):
    """
    stability
    :stability: experimental
    """
    @builtins.staticmethod
    def __jsii_proxy_class__():
        return _IFriendlyRandomGeneratorProxy

    pass

class _IFriendlyRandomGeneratorProxy(jsii.proxy_for(IRandomNumberGenerator), jsii.proxy_for(scope.jsii_calc_lib.IFriendly)):
    """
    stability
    :stability: experimental
    """
    __jsii_type__ = "jsii-calc.IFriendlyRandomGenerator"
    pass

@jsii.implements(IFriendlier)
class Negate(UnaryOperation, metaclass=jsii.JSIIMeta, jsii_type="jsii-calc.Negate"):
    """The negation operation ("-value").

    stability
    :stability: experimental
    """
    def __init__(self, operand: scope.jsii_calc_lib.Value) -> None:
        """
        :param operand: -

        stability
        :stability: experimental
        """
        jsii.create(Negate, self, [operand])

    @jsii.member(jsii_name="farewell")
    def farewell(self) -> str:
        """Say farewell.

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "farewell", [])

    @jsii.member(jsii_name="goodbye")
    def goodbye(self) -> str:
        """Say goodbye.

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "goodbye", [])

    @jsii.member(jsii_name="hello")
    def hello(self) -> str:
        """Say hello!

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "hello", [])

    @jsii.member(jsii_name="toString")
    def to_string(self) -> str:
        """String representation of the value.

        stability
        :stability: experimental
        """
        return jsii.invoke(self, "toString", [])

    @builtins.property
    @jsii.member(jsii_name="value")
    def value(self) -> jsii.Number:
        """The value.

        stability
        :stability: experimental
        """
        return jsii.get(self, "value")


__all__ = ["AbstractSuite", "Add", "BinaryOperation", "Calculator", "CalculatorProps", "IFriendlier", "IFriendlyRandomGenerator", "IRandomNumberGenerator", "MethodNamedProperty", "Multiply", "Negate", "Power", "PropertyNamedProperty", "SmellyStruct", "Sum", "UnaryOperation", "__jsii_assembly__"]

publication.publish()
