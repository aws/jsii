jsii-calc
=========

.. mdinclude:: ./_jsii-calc.README.md

Reference
---------

.. py:module:: jsii-calc

Add
^^^

.. py:class:: Add(lhs, rhs)

   The "+" binary operation.


   :extends: :py:class:`~jsii-calc.BinaryOperation`
   :param jsii-calc-lib.Value lhs: Left-hand side operand
   :type jsii-calc-lib.Value: :py:class:`~jsii-calc-lib.Value`
   :param jsii-calc-lib.Value rhs: Right-hand side operand
   :type jsii-calc-lib.Value: :py:class:`~jsii-calc-lib.Value`

   .. py:method:: toString() -> string

      String representation of the value.


      :rtype: string


   .. py:attribute:: value

      The value.


      :type: number *(readonly)*


AllTypes
^^^^^^^^

.. py:class:: AllTypes()

   This class includes property for all types supported by jsii. The setters will validate that the value set is of the expected type and throw otherwise.



   .. py:attribute:: booleanProperty

      :type: boolean


   .. py:attribute:: stringProperty

      :type: string


   .. py:attribute:: numberProperty

      :type: number


   .. py:attribute:: dateProperty

      :type: date


   .. py:attribute:: jsonProperty

      :type: json


   .. py:attribute:: mapProperty

      :type: number


   .. py:attribute:: arrayProperty

      :type: string


   .. py:attribute:: anyProperty

      :type: any


   .. py:attribute:: anyArrayProperty

      :type: any


   .. py:attribute:: anyMapProperty

      :type: any


   .. py:attribute:: unionProperty

      :type: string or number or :py:class:`~jsii-calc.Multiply`


   .. py:attribute:: unionArrayProperty

      :type: number or :py:class:`~jsii-calc.composition.CompositeOperation`


   .. py:attribute:: unionMapProperty

      :type: string or number


   .. py:attribute:: enumProperty

      :type: :py:class:`~jsii-calc.AllTypesEnum`


   .. py:attribute:: enumPropertyValue

      :type: number *(readonly)*


AllTypesEnum (enum)
^^^^^^^^^^^^^^^^^^^

.. py:class:: AllTypesEnum

   .. py:data:: MyEnumValue

   .. py:data:: YourEnumValue

   .. py:data:: ThisIsGreat


AllowedMethodNames
^^^^^^^^^^^^^^^^^^

.. py:class:: AllowedMethodNames()


   .. py:method:: getFoo(withParam) -> string

      getXxx() is not allowed (see negatives), but getXxx(a, ...) is okay.


      :param string withParam: 
      :type string: string
      :rtype: string


   .. py:method:: getBar(_p1, _p2)

      :param string _p1: 
      :type string: string
      :param number _p2: 
      :type number: number


   .. py:method:: setFoo(_x, _y)

      setFoo(x) is not allowed (see negatives), but setXxx(a, b, ...) is okay.


      :param string _x: 
      :type string: string
      :param number _y: 
      :type number: number


   .. py:method:: setBar(_x, _y, _z)

      :param string _x: 
      :type string: string
      :param number _y: 
      :type number: number
      :param boolean _z: 
      :type boolean: boolean


AsyncVirtualMethods
^^^^^^^^^^^^^^^^^^^

.. py:class:: AsyncVirtualMethods()


   .. py:method:: callMe() -> number

      :rtype: number


   .. py:method:: overrideMe(mult) -> number

      :param number mult: 
      :type number: number
      :rtype: number


   .. py:method:: overrideMeToo() -> number

      :rtype: number


   .. py:method:: callMe2() -> number

      Just calls "overrideMeToo"


      :rtype: number


   .. py:method:: callMeDoublePromise() -> number

      This method calls the "callMe" async method indirectly, which will then invoke a virtual method. This is a "double promise" situation, which means that callbacks are not going to be available immediate, but only after an "immediates" cycle.


      :rtype: number


   .. py:method:: dontOverrideMe() -> number

      :rtype: number


BinaryOperation
^^^^^^^^^^^^^^^

.. py:class:: BinaryOperation(lhs, rhs)

   Represents an operation with two operands.


   :extends: :py:class:`~jsii-calc-lib.Operation`
   :implements: :py:class:`~jsii-calc-lib.IFriendly`
   :abstract: Yes
   :param jsii-calc-lib.Value lhs: Left-hand side operand
   :type jsii-calc-lib.Value: :py:class:`~jsii-calc-lib.Value`
   :param jsii-calc-lib.Value rhs: Right-hand side operand
   :type jsii-calc-lib.Value: :py:class:`~jsii-calc-lib.Value`

   .. py:method:: hello() -> string

      Say hello!


      :rtype: string


   .. py:attribute:: lhs

      Left-hand side operand


      :type: :py:class:`~jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: rhs

      Right-hand side operand


      :type: :py:class:`~jsii-calc-lib.Value` *(readonly)*


Calculator
^^^^^^^^^^

.. py:class:: Calculator([props])

   A calculator which maintains a current value and allows adding operations.


   :extends: :py:class:`~jsii-calc.composition.CompositeOperation`
   :param jsii-calc.CalculatorProps props: Initialization properties. *(optional)*
   :type jsii-calc.CalculatorProps: :py:class:`~jsii-calc.CalculatorProps`

   .. py:method:: add(value)

      Adds a number to the current value.


      :param number value: 
      :type number: number


   .. py:method:: mul(value)

      Multiplies the current value by a number.


      :param number value: 
      :type number: number


   .. py:method:: pow(value)

      Raises the current value by a power.


      :param number value: 
      :type number: number


   .. py:method:: neg()

      Negates the current value.




   .. py:method:: readUnionValue() -> number

      Returns teh value of the union property (if defined).


      :rtype: number


   .. py:attribute:: curr

      The current value.


      :type: :py:class:`~jsii-calc-lib.Value`


   .. py:attribute:: operationsMap

      A map of per operation name of all operations performed.


      :type: :py:class:`~jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: operationsLog

      A log of all operations.


      :type: :py:class:`~jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: maxValue

      The maximum value allows in this calculator.


      :type: number


   .. py:attribute:: expression

      Returns the expression.


      :type: :py:class:`~jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: unionProperty

      Example of a property that accepts a union of types.


      :type: :py:class:`~jsii-calc.Add` or :py:class:`~jsii-calc.Multiply` or :py:class:`~jsii-calc.Power`


CalculatorProps (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: CalculatorProps

   Properties for Calculator.




   .. py:attribute:: initialValue

      :type: number


   .. py:attribute:: maximumValue

      :type: number



DerivedClassHasNoProperties
^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. py:module:: jsii-calc.DerivedClassHasNoProperties

Base
~~~~

.. py:class:: Base()


   .. py:attribute:: prop

      :type: string


Derived
~~~~~~~

.. py:class:: Derived()

   :extends: :py:class:`~jsii-calc.DerivedClassHasNoProperties.Base`


.. py:currentmodule:: jsii-calc

DerivedStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: DerivedStruct

   A struct which derives from another struct.


   :extends: :py:class:`~jsii-calc-lib.MyFirstStruct`


   .. py:attribute:: nonPrimitive

      An example of a non primitive property.


      :type: :py:class:`~jsii-calc.DoubleTrouble`


   .. py:attribute:: bool

      :type: boolean


   .. py:attribute:: anotherRequired

      :type: date


   .. py:attribute:: optionalArray

      :type: string


   .. py:attribute:: anotherOptional

      This is optional.


      :type: :py:class:`~jsii-calc-lib.Value`


DoubleTrouble
^^^^^^^^^^^^^

.. py:class:: DoubleTrouble()

   :implements: :py:class:`~jsii-calc.IFriendlyRandomGenerator`

   .. py:method:: next() -> number

      Returns another random number.


      :rtype: number


   .. py:method:: hello() -> string

      Say hello!


      :rtype: string


GiveMeStructs
^^^^^^^^^^^^^

.. py:class:: GiveMeStructs()


   .. py:method:: readFirstNumber(first) -> number

      Returns the "anumber" from a MyFirstStruct struct;


      :param jsii-calc-lib.MyFirstStruct first: 
      :type jsii-calc-lib.MyFirstStruct: :py:class:`~jsii-calc-lib.MyFirstStruct`
      :rtype: number


   .. py:method:: readDerivedNonPrimitive(derived) -> jsii-calc.DoubleTrouble

      Returns the boolean from a DerivedStruct struct.


      :param jsii-calc.DerivedStruct derived: 
      :type jsii-calc.DerivedStruct: :py:class:`~jsii-calc.DerivedStruct`
      :rtype: :py:class:`~jsii-calc.DoubleTrouble`


   .. py:method:: derivedToFirst(derived) -> jsii-calc-lib.MyFirstStruct

      Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.


      :param jsii-calc.DerivedStruct derived: 
      :type jsii-calc.DerivedStruct: :py:class:`~jsii-calc.DerivedStruct`
      :rtype: :py:class:`~jsii-calc-lib.MyFirstStruct`


   .. py:attribute:: structLiteral

      :type: :py:class:`~jsii-calc-lib.StructWithOnlyOptionals` *(readonly)*


IFriendlier (interface)
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IFriendlier

   Even friendlier classes can implement this interface.


   :extends: :py:class:`~jsii-calc-lib.IFriendly`


   .. py:method:: goodbye() -> string

      Say goodbye.


      :return: A goodbye blessing.
      :rtype: string


   .. py:method:: farewell() -> string

      Say farewell.


      :rtype: string


IFriendlyRandomGenerator (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IFriendlyRandomGenerator

   :extends: :py:class:`~jsii-calc.IRandomNumberGenerator`
   :extends: :py:class:`~jsii-calc-lib.IFriendly`


IInterfaceWithProperties (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IInterfaceWithProperties



   .. py:attribute:: readOnlyString

      :type: string *(readonly)*


   .. py:attribute:: readWriteString

      :type: string


IInterfaceWithPropertiesExtension (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IInterfaceWithPropertiesExtension

   :extends: :py:class:`~jsii-calc.IInterfaceWithProperties`


   .. py:attribute:: foo

      :type: number


IRandomNumberGenerator (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IRandomNumberGenerator

   Generates random numbers.




   .. py:method:: next() -> number

      Returns another random number.


      :return: A random number.
      :rtype: number


JSObjectLiteralForInterface
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: JSObjectLiteralForInterface()


   .. py:method:: giveMeFriendly() -> jsii-calc-lib.IFriendly

      :rtype: :py:class:`~jsii-calc-lib.IFriendly`


   .. py:method:: giveMeFriendlyGenerator() -> jsii-calc.IFriendlyRandomGenerator

      :rtype: :py:class:`~jsii-calc.IFriendlyRandomGenerator`


JSObjectLiteralToNative
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: JSObjectLiteralToNative()


   .. py:method:: returnLiteral() -> jsii-calc.JSObjectLiteralToNativeClass

      :rtype: :py:class:`~jsii-calc.JSObjectLiteralToNativeClass`


JSObjectLiteralToNativeClass
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: JSObjectLiteralToNativeClass()


   .. py:attribute:: propA

      :type: string


   .. py:attribute:: propB

      :type: number


Multiply
^^^^^^^^

.. py:class:: Multiply(lhs, rhs)

   The "*" binary operation.


   :extends: :py:class:`~jsii-calc.BinaryOperation`
   :implements: :py:class:`~jsii-calc.IFriendlier`
   :implements: :py:class:`~jsii-calc.IRandomNumberGenerator`
   :param jsii-calc-lib.Value lhs: Left-hand side operand
   :type jsii-calc-lib.Value: :py:class:`~jsii-calc-lib.Value`
   :param jsii-calc-lib.Value rhs: Right-hand side operand
   :type jsii-calc-lib.Value: :py:class:`~jsii-calc-lib.Value`

   .. py:method:: toString() -> string

      String representation of the value.


      :rtype: string


   .. py:method:: goodbye() -> string

      Say goodbye.


      :rtype: string


   .. py:method:: farewell() -> string

      Say farewell.


      :rtype: string


   .. py:method:: next() -> number

      Returns another random number.


      :rtype: number


   .. py:attribute:: value

      The value.


      :type: number *(readonly)*


Negate
^^^^^^

.. py:class:: Negate(operand)

   The negation operation ("-value")


   :extends: :py:class:`~jsii-calc.UnaryOperation`
   :implements: :py:class:`~jsii-calc.IFriendlier`
   :param jsii-calc-lib.Value operand: 
   :type jsii-calc-lib.Value: :py:class:`~jsii-calc-lib.Value`

   .. py:method:: toString() -> string

      String representation of the value.


      :rtype: string


   .. py:method:: hello() -> string

      Say hello!


      :rtype: string


   .. py:method:: goodbye() -> string

      Say goodbye.


      :rtype: string


   .. py:method:: farewell() -> string

      Say farewell.


      :rtype: string


   .. py:attribute:: value

      The value.


      :type: number *(readonly)*


NumberGenerator
^^^^^^^^^^^^^^^

.. py:class:: NumberGenerator(generator)

   This allows us to test that a reference can be stored for objects that  implement interfaces.


   :param jsii-calc.IRandomNumberGenerator generator: 
   :type jsii-calc.IRandomNumberGenerator: :py:class:`~jsii-calc.IRandomNumberGenerator`

   .. py:method:: nextTimes100() -> number

      :rtype: number


   .. py:method:: isSameGenerator(gen) -> boolean

      :param jsii-calc.IRandomNumberGenerator gen: 
      :type jsii-calc.IRandomNumberGenerator: :py:class:`~jsii-calc.IRandomNumberGenerator`
      :rtype: boolean


   .. py:attribute:: generator

      :type: :py:class:`~jsii-calc.IRandomNumberGenerator`


ObjectRefsInCollections
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ObjectRefsInCollections()

   Verify that object references can be passed inside collections.



   .. py:method:: sumFromArray(values) -> number

      Returns the sum of all values


      :param jsii-calc-lib.Value[] values: 
      :type jsii-calc-lib.Value[]: :py:class:`~jsii-calc-lib.Value`
      :rtype: number


   .. py:method:: sumFromMap(values) -> number

      Returns the sum of all values in a map


      :param string => jsii-calc-lib.Value values: 
      :type string => jsii-calc-lib.Value: :py:class:`~jsii-calc-lib.Value`
      :rtype: number


OverrideReturnsObject
^^^^^^^^^^^^^^^^^^^^^

.. py:class:: OverrideReturnsObject()


   .. py:method:: test(obj) -> number

      :param jsii-calc.ReturnsNumber obj: 
      :type jsii-calc.ReturnsNumber: :py:class:`~jsii-calc.ReturnsNumber`
      :rtype: number


Polymorphism
^^^^^^^^^^^^

.. py:class:: Polymorphism()


   .. py:method:: sayHello(friendly) -> string

      :param jsii-calc-lib.IFriendly friendly: 
      :type jsii-calc-lib.IFriendly: :py:class:`~jsii-calc-lib.IFriendly`
      :rtype: string


Power
^^^^^

.. py:class:: Power(base, pow)

   The power operation.


   :extends: :py:class:`~jsii-calc.composition.CompositeOperation`
   :param jsii-calc-lib.Value base: The base of the power
   :type jsii-calc-lib.Value: :py:class:`~jsii-calc-lib.Value`
   :param jsii-calc-lib.Value pow: The number of times to multiply
   :type jsii-calc-lib.Value: :py:class:`~jsii-calc-lib.Value`

   .. py:attribute:: base

      The base of the power


      :type: :py:class:`~jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: pow

      The number of times to multiply


      :type: :py:class:`~jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: expression

      The expression that this operation consists of. Must be implemented by derived classes.


      :type: :py:class:`~jsii-calc-lib.Operation` *(readonly)*


ReturnsNumber (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ReturnsNumber



   .. py:attribute:: numberProp

      :type: number *(readonly)*


   .. py:method:: obtainNumber() -> number

      :rtype: number


RuntimeTypeChecking
^^^^^^^^^^^^^^^^^^^

.. py:class:: RuntimeTypeChecking()


   .. py:method:: methodWithOptionalArguments(arg1, arg2, [arg3])

      Used to verify verification of number of method arguments.


      :param number arg1: 
      :type number: number
      :param string arg2: 
      :type string: string
      :param date arg3:  *(optional)*
      :type date: date


Sum
^^^

.. py:class:: Sum()

   An operation that sums multiple values.


   :extends: :py:class:`~jsii-calc.composition.CompositeOperation`

   .. py:attribute:: parts

      The parts to sum.


      :type: :py:class:`~jsii-calc-lib.Value`


   .. py:attribute:: expression

      The expression that this operation consists of. Must be implemented by derived classes.


      :type: :py:class:`~jsii-calc-lib.Value` *(readonly)*


SyncVirtualMethods
^^^^^^^^^^^^^^^^^^

.. py:class:: SyncVirtualMethods()


   .. py:method:: callerIsMethod() -> number

      :rtype: number


   .. py:method:: callerIsAsync() -> number

      :rtype: number


   .. py:method:: virtualMethod(n) -> number

      :param number n: 
      :type number: number
      :rtype: number


   .. py:method:: modifyValueOfTheProperty(value)

      :param string value: 
      :type string: string


   .. py:method:: retrieveValueOfTheProperty() -> string

      :rtype: string


   .. py:method:: retrieveReadOnlyProperty() -> string

      :rtype: string


   .. py:method:: modifyOtherProperty(value)

      :param string value: 
      :type string: string


   .. py:method:: retrieveOtherProperty() -> string

      :rtype: string


   .. py:method:: readA() -> number

      :rtype: number


   .. py:method:: writeA(value)

      :param number value: 
      :type number: number


   .. py:attribute:: callerIsProperty

      :type: number


   .. py:attribute:: theProperty

      :type: string


   .. py:attribute:: readonlyProperty

      :type: string *(readonly)*


   .. py:attribute:: otherProperty

      :type: string


   .. py:attribute:: valueOfOtherProperty

      :type: string


   .. py:attribute:: a

      :type: number


Thrower
^^^^^^^

.. py:class:: Thrower()


   .. py:method:: throwError()



UnaryOperation
^^^^^^^^^^^^^^

.. py:class:: UnaryOperation(operand)

   An operation on a single operand.


   :extends: :py:class:`~jsii-calc-lib.Operation`
   :abstract: Yes
   :param jsii-calc-lib.Value operand: 
   :type jsii-calc-lib.Value: :py:class:`~jsii-calc-lib.Value`

   .. py:attribute:: operand

      :type: :py:class:`~jsii-calc-lib.Value` *(readonly)*


UsesInterfaceWithProperties
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: UsesInterfaceWithProperties(obj)

   :param jsii-calc.IInterfaceWithProperties obj: 
   :type jsii-calc.IInterfaceWithProperties: :py:class:`~jsii-calc.IInterfaceWithProperties`

   .. py:method:: justRead() -> string

      :rtype: string


   .. py:method:: writeAndRead(value) -> string

      :param string value: 
      :type string: string
      :rtype: string


   .. py:method:: readStringAndNumber(ext) -> string

      :param jsii-calc.IInterfaceWithPropertiesExtension ext: 
      :type jsii-calc.IInterfaceWithPropertiesExtension: :py:class:`~jsii-calc.IInterfaceWithPropertiesExtension`
      :rtype: string


   .. py:attribute:: obj

      :type: :py:class:`~jsii-calc.IInterfaceWithProperties` *(readonly)*


VirtualMethodPlayground
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: VirtualMethodPlayground()


   .. py:method:: serialSumAsync(count) -> number

      :param number count: 
      :type number: number
      :rtype: number


   .. py:method:: parallelSumAsync(count) -> number

      :param number count: 
      :type number: number
      :rtype: number


   .. py:method:: sumSync(count) -> number

      :param number count: 
      :type number: number
      :rtype: number


   .. py:method:: overrideMeAsync(index) -> number

      :param number index: 
      :type number: number
      :rtype: number


   .. py:method:: overrideMeSync(index) -> number

      :param number index: 
      :type number: number
      :rtype: number



composition
^^^^^^^^^^^
.. py:module:: jsii-calc.composition

CompositeOperation
~~~~~~~~~~~~~~~~~~

.. py:class:: CompositeOperation()

   Abstract operation composed from an expression of other operations.


   :extends: :py:class:`~jsii-calc-lib.Operation`
   :abstract: Yes

   .. py:method:: toString() -> string

      String representation of the value.


      :rtype: string


   .. py:attribute:: stringStyle

      The .toString() style.


      :type: :py:class:`~jsii-calc.composition.CompositionStringStyle`


   .. py:attribute:: decorationPrefixes

      A set of prefixes to include in a decorated .toString().


      :type: string


   .. py:attribute:: decorationPostfixes

      A set of postfixes to include in a decorated .toString().


      :type: string


   .. py:attribute:: value

      The value.


      :type: number *(readonly)*


   .. py:attribute:: expression

      The expression that this operation consists of. Must be implemented by derived classes.


      :type: :py:class:`~jsii-calc-lib.Value` *(readonly)* *(abstract)*


CompositionStringStyle (enum)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. py:class:: CompositionStringStyle

   .. py:data:: Normal

   .. py:data:: Decorated



.. py:currentmodule:: jsii-calc

