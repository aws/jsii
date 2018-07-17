.. @jsii-pacmak:meta@ {"fingerprint":"ee5c70a356af2c713ac8b972627b9af3"}

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
   :param lhs: Left-hand side operand
   :type lhs: :py:class:`@scope/jsii-calc-lib.Value`
   :param rhs: Right-hand side operand
   :type rhs: :py:class:`@scope/jsii-calc-lib.Value`

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



   .. py:method:: enumMethod(value) -> jsii-calc.StringEnum

      :param value: 
      :type value: :py:class:`~jsii-calc.StringEnum`
      :rtype: :py:class:`~jsii-calc.StringEnum`


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


   .. py:attribute:: optionalEnumValue

      :type: :py:class:`~jsii-calc.StringEnum` or undefined


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


      :param withParam: 
      :type withParam: string
      :rtype: string


   .. py:method:: getBar(_p1, _p2)

      :param _p1: 
      :type _p1: string
      :param _p2: 
      :type _p2: number


   .. py:method:: setFoo(_x, _y)

      setFoo(x) is not allowed (see negatives), but setXxx(a, b, ...) is okay.


      :param _x: 
      :type _x: string
      :param _y: 
      :type _y: number


   .. py:method:: setBar(_x, _y, _z)

      :param _x: 
      :type _x: string
      :param _y: 
      :type _y: number
      :param _z: 
      :type _z: boolean


AsyncVirtualMethods
^^^^^^^^^^^^^^^^^^^

.. py:class:: AsyncVirtualMethods()


   .. py:method:: callMe() -> number

      :rtype: number


   .. py:method:: overrideMe(mult) -> number

      :param mult: 
      :type mult: number
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


   :extends: :py:class:`@scope/jsii-calc-lib.Operation`
   :implements: :py:class:`@scope/jsii-calc-lib.IFriendly`
   :abstract: Yes
   :param lhs: Left-hand side operand
   :type lhs: :py:class:`@scope/jsii-calc-lib.Value`
   :param rhs: Right-hand side operand
   :type rhs: :py:class:`@scope/jsii-calc-lib.Value`

   .. py:method:: hello() -> string

      Say hello!


      :rtype: string


   .. py:attribute:: lhs

      Left-hand side operand


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: rhs

      Right-hand side operand


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


Calculator
^^^^^^^^^^

.. py:class:: Calculator([props])

   A calculator which maintains a current value and allows adding operations.


   :extends: :py:class:`~jsii-calc.composition.CompositeOperation`
   :param props: Initialization properties.
   :type props: :py:class:`~jsii-calc.CalculatorProps` or undefined

   .. py:method:: add(value)

      Adds a number to the current value.


      :param value: 
      :type value: number


   .. py:method:: mul(value)

      Multiplies the current value by a number.


      :param value: 
      :type value: number


   .. py:method:: pow(value)

      Raises the current value by a power.


      :param value: 
      :type value: number


   .. py:method:: neg()

      Negates the current value.




   .. py:method:: readUnionValue() -> number

      Returns teh value of the union property (if defined).


      :rtype: number


   .. py:attribute:: curr

      The current value.


      :type: :py:class:`@scope/jsii-calc-lib.Value`


   .. py:attribute:: operationsMap

      A map of per operation name of all operations performed.


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: operationsLog

      A log of all operations.


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: maxValue

      The maximum value allows in this calculator.


      :type: number or undefined


   .. py:attribute:: expression

      Returns the expression.


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: unionProperty

      Example of a property that accepts a union of types.


      :type: :py:class:`~jsii-calc.Add` or :py:class:`~jsii-calc.Multiply` or :py:class:`~jsii-calc.Power` or undefined


CalculatorProps (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: CalculatorProps

   Properties for Calculator.




   .. py:attribute:: initialValue

      :type: number or undefined


   .. py:attribute:: maximumValue

      :type: number or undefined



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


   :extends: :py:class:`@scope/jsii-calc-lib.MyFirstStruct`


   .. py:attribute:: nonPrimitive

      An example of a non primitive property.


      :type: :py:class:`~jsii-calc.DoubleTrouble`


   .. py:attribute:: bool

      :type: boolean


   .. py:attribute:: anotherRequired

      :type: date


   .. py:attribute:: optionalArray

      :type: string or undefined


   .. py:attribute:: anotherOptional

      This is optional.


      :type: :py:class:`@scope/jsii-calc-lib.Value` or undefined


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


      :param first: 
      :type first: :py:class:`@scope/jsii-calc-lib.MyFirstStruct`
      :rtype: number


   .. py:method:: readDerivedNonPrimitive(derived) -> jsii-calc.DoubleTrouble

      Returns the boolean from a DerivedStruct struct.


      :param derived: 
      :type derived: :py:class:`~jsii-calc.DerivedStruct`
      :rtype: :py:class:`~jsii-calc.DoubleTrouble`


   .. py:method:: derivedToFirst(derived) -> @scope/jsii-calc-lib.MyFirstStruct

      Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.


      :param derived: 
      :type derived: :py:class:`~jsii-calc.DerivedStruct`
      :rtype: :py:class:`@scope/jsii-calc-lib.MyFirstStruct`


   .. py:attribute:: structLiteral

      :type: :py:class:`@scope/jsii-calc-lib.StructWithOnlyOptionals` *(readonly)*


IFriendlier (interface)
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IFriendlier

   Even friendlier classes can implement this interface.


   :extends: :py:class:`@scope/jsii-calc-lib.IFriendly`


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
   :extends: :py:class:`@scope/jsii-calc-lib.IFriendly`


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


   .. py:method:: giveMeFriendly() -> @scope/jsii-calc-lib.IFriendly

      :rtype: :py:class:`@scope/jsii-calc-lib.IFriendly`


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


JavaReservedWords
^^^^^^^^^^^^^^^^^

.. py:class:: JavaReservedWords()


   .. py:method:: abstract()



   .. py:method:: assert()



   .. py:method:: boolean()



   .. py:method:: break()



   .. py:method:: byte()



   .. py:method:: case()



   .. py:method:: catch()



   .. py:method:: char()



   .. py:method:: class()



   .. py:method:: const()



   .. py:method:: continue()



   .. py:method:: default()



   .. py:method:: double()



   .. py:method:: do()



   .. py:method:: else()



   .. py:method:: enum()



   .. py:method:: extends()



   .. py:method:: false()



   .. py:method:: final()



   .. py:method:: finally()



   .. py:method:: float()



   .. py:method:: for()



   .. py:method:: goto()



   .. py:method:: if()



   .. py:method:: implements()



   .. py:method:: import()



   .. py:method:: instanceof()



   .. py:method:: int()



   .. py:method:: interface()



   .. py:method:: long()



   .. py:method:: native()



   .. py:method:: new()



   .. py:method:: null()



   .. py:method:: package()



   .. py:method:: private()



   .. py:method:: protected()



   .. py:method:: public()



   .. py:method:: return()



   .. py:method:: short()



   .. py:method:: static()



   .. py:method:: strictfp()



   .. py:method:: super()



   .. py:method:: switch()



   .. py:method:: synchronized()



   .. py:method:: this()



   .. py:method:: throw()



   .. py:method:: throws()



   .. py:method:: transient()



   .. py:method:: true()



   .. py:method:: try()



   .. py:method:: void()



   .. py:method:: volatile()



   .. py:attribute:: while

      :type: string


Multiply
^^^^^^^^

.. py:class:: Multiply(lhs, rhs)

   The "*" binary operation.


   :extends: :py:class:`~jsii-calc.BinaryOperation`
   :implements: :py:class:`~jsii-calc.IFriendlier`
   :implements: :py:class:`~jsii-calc.IRandomNumberGenerator`
   :param lhs: Left-hand side operand
   :type lhs: :py:class:`@scope/jsii-calc-lib.Value`
   :param rhs: Right-hand side operand
   :type rhs: :py:class:`@scope/jsii-calc-lib.Value`

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
   :param operand: 
   :type operand: :py:class:`@scope/jsii-calc-lib.Value`

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

   This allows us to test that a reference can be stored for objects that implement interfaces.


   :param generator: 
   :type generator: :py:class:`~jsii-calc.IRandomNumberGenerator`

   .. py:method:: nextTimes100() -> number

      :rtype: number


   .. py:method:: isSameGenerator(gen) -> boolean

      :param gen: 
      :type gen: :py:class:`~jsii-calc.IRandomNumberGenerator`
      :rtype: boolean


   .. py:attribute:: generator

      :type: :py:class:`~jsii-calc.IRandomNumberGenerator`


ObjectRefsInCollections
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ObjectRefsInCollections()

   Verify that object references can be passed inside collections.



   .. py:method:: sumFromArray(values) -> number

      Returns the sum of all values


      :param values: 
      :type values: :py:class:`@scope/jsii-calc-lib.Value`
      :rtype: number


   .. py:method:: sumFromMap(values) -> number

      Returns the sum of all values in a map


      :param values: 
      :type values: :py:class:`@scope/jsii-calc-lib.Value`
      :rtype: number


OverrideReturnsObject
^^^^^^^^^^^^^^^^^^^^^

.. py:class:: OverrideReturnsObject()


   .. py:method:: test(obj) -> number

      :param obj: 
      :type obj: :py:class:`~jsii-calc.ReturnsNumber`
      :rtype: number


Polymorphism
^^^^^^^^^^^^

.. py:class:: Polymorphism()


   .. py:method:: sayHello(friendly) -> string

      :param friendly: 
      :type friendly: :py:class:`@scope/jsii-calc-lib.IFriendly`
      :rtype: string


Power
^^^^^

.. py:class:: Power(base, pow)

   The power operation.


   :extends: :py:class:`~jsii-calc.composition.CompositeOperation`
   :param base: The base of the power
   :type base: :py:class:`@scope/jsii-calc-lib.Value`
   :param pow: The number of times to multiply
   :type pow: :py:class:`@scope/jsii-calc-lib.Value`

   .. py:attribute:: base

      The base of the power


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: pow

      The number of times to multiply


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: expression

      The expression that this operation consists of. Must be implemented by derived classes.


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


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


      :param arg1: 
      :type arg1: number
      :param arg2: 
      :type arg2: string
      :param arg3: 
      :type arg3: date or undefined


Statics
^^^^^^^

.. py:class:: Statics(value)

   :param value: 
   :type value: string

   .. py:staticmethod:: staticMethod(name) -> string

      Jsdocs for static method


      :param name: The name of the person to say hello to
      :type name: string
      :rtype: string


   .. py:method:: justMethod() -> string

      :rtype: string


   .. py:attribute:: value

      :type: string *(readonly)*


   .. py:attribute:: Foo

      Jsdocs for static property.


      :type: string *(readonly)* *(static)*


   .. py:attribute:: BAR

      Constants may also use all-caps.


      :type: number *(readonly)* *(static)*


   .. py:attribute:: zooBar

      Constants can also use camelCase.


      :type: string *(readonly)* *(static)*


   .. py:attribute:: instance

      Jsdocs for static getter. Jsdocs for static setter.


      :type: :py:class:`~jsii-calc.Statics` *(static)*


   .. py:attribute:: nonConstStatic

      :type: number *(static)*


   .. py:attribute:: ConstObj

      :type: :py:class:`~jsii-calc.DoubleTrouble` *(readonly)* *(static)*


StringEnum (enum)
^^^^^^^^^^^^^^^^^

.. py:class:: StringEnum

   .. py:data:: A

   .. py:data:: B

   .. py:data:: C


Sum
^^^

.. py:class:: Sum()

   An operation that sums multiple values.


   :extends: :py:class:`~jsii-calc.composition.CompositeOperation`

   .. py:attribute:: parts

      The parts to sum.


      :type: :py:class:`@scope/jsii-calc-lib.Value`


   .. py:attribute:: expression

      The expression that this operation consists of. Must be implemented by derived classes.


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


SyncVirtualMethods
^^^^^^^^^^^^^^^^^^

.. py:class:: SyncVirtualMethods()


   .. py:method:: callerIsMethod() -> number

      :rtype: number


   .. py:method:: callerIsAsync() -> number

      :rtype: number


   .. py:method:: virtualMethod(n) -> number

      :param n: 
      :type n: number
      :rtype: number


   .. py:method:: modifyValueOfTheProperty(value)

      :param value: 
      :type value: string


   .. py:method:: retrieveValueOfTheProperty() -> string

      :rtype: string


   .. py:method:: retrieveReadOnlyProperty() -> string

      :rtype: string


   .. py:method:: modifyOtherProperty(value)

      :param value: 
      :type value: string


   .. py:method:: retrieveOtherProperty() -> string

      :rtype: string


   .. py:method:: readA() -> number

      :rtype: number


   .. py:method:: writeA(value)

      :param value: 
      :type value: number


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


   :extends: :py:class:`@scope/jsii-calc-lib.Operation`
   :abstract: Yes
   :param operand: 
   :type operand: :py:class:`@scope/jsii-calc-lib.Value`

   .. py:attribute:: operand

      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


UnionProperties (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: UnionProperties



   .. py:attribute:: foo

      :type: string or number or undefined


   .. py:attribute:: bar

      :type: string or number or :py:class:`~jsii-calc.AllTypes` *(readonly)*


UseBundledDependency
^^^^^^^^^^^^^^^^^^^^

.. py:class:: UseBundledDependency()


   .. py:method:: value() -> any

      :rtype: any


UsesInterfaceWithProperties
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: UsesInterfaceWithProperties(obj)

   :param obj: 
   :type obj: :py:class:`~jsii-calc.IInterfaceWithProperties`

   .. py:method:: justRead() -> string

      :rtype: string


   .. py:method:: writeAndRead(value) -> string

      :param value: 
      :type value: string
      :rtype: string


   .. py:method:: readStringAndNumber(ext) -> string

      :param ext: 
      :type ext: :py:class:`~jsii-calc.IInterfaceWithPropertiesExtension`
      :rtype: string


   .. py:attribute:: obj

      :type: :py:class:`~jsii-calc.IInterfaceWithProperties` *(readonly)*


VariadicMethod
^^^^^^^^^^^^^^

.. py:class:: VariadicMethod(*prefix)

   :param \*prefix: a prefix that will be use for all values returned by ``#asArray``.
   :type \*prefix: number

   .. py:method:: asArray(first, *others) -> number[]

      :param first: the first element of the array to be returned (after the ``prefix`` provided at construction time).
      :type first: number
      :param \*others: other elements to be included in the array.
      :type \*others: number
      :rtype: number


VirtualMethodPlayground
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: VirtualMethodPlayground()


   .. py:method:: serialSumAsync(count) -> number

      :param count: 
      :type count: number
      :rtype: number


   .. py:method:: parallelSumAsync(count) -> number

      :param count: 
      :type count: number
      :rtype: number


   .. py:method:: sumSync(count) -> number

      :param count: 
      :type count: number
      :rtype: number


   .. py:method:: overrideMeAsync(index) -> number

      :param index: 
      :type index: number
      :rtype: number


   .. py:method:: overrideMeSync(index) -> number

      :param index: 
      :type index: number
      :rtype: number



composition
^^^^^^^^^^^
.. py:module:: jsii-calc.composition

CompositeOperation
~~~~~~~~~~~~~~~~~~

.. py:class:: CompositeOperation()

   Abstract operation composed from an expression of other operations.


   :extends: :py:class:`@scope/jsii-calc-lib.Operation`
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


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)* *(abstract)*


CompositionStringStyle (enum)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. py:class:: CompositionStringStyle

   .. py:data:: Normal

   .. py:data:: Decorated



.. py:currentmodule:: jsii-calc

