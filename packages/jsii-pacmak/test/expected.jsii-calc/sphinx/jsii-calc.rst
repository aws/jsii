jsii-calc
=========

.. tabs::

   .. group-tab:: Java

      View in `Maven Central <https://repo1.maven.org/maven2/software/amazon/jsii/tests/calculator/0.6.4/>`_

      **Apache Buildr**:

      .. code-block:: none

         'software.amazon.jsii.tests:calculator:jar:0.6.4'

      **Apache Ivy**:

      .. code-block:: xml

         <dependency groupId="software.amazon.jsii.tests" name="calculator" rev="0.6.4"/>

      **Apache Maven**:

      .. code-block:: xml

         <dependency>
           <groupId>software.amazon.jsii.tests</groupId>
           <artifactId>calculator</artifactId>
           <version>0.6.4</version>
         </dependency>

      **Gradle / Grails**:

      .. code-block:: none

         compile 'software.amazon.jsii.tests:calculator:0.6.4'

      **Groovy Grape**:

      .. code-block:: none

         @Grapes(
         @Grab(group='software.amazon.jsii.tests', module='calculator', version='0.6.4')
         )


   .. group-tab:: JavaScript

      View in `NPM <https://www.npmjs.com/package/jsii-calc/v/0.6.4>`_

      **npm**:

      .. code-block:: console

         $ npm i jsii-calc@0.6.4

      **package.json**:

      .. code-block:: js

         {
           "jsii-calc": "^0.6.4"
         }

      **yarn**:

      .. code-block:: console

         $ yarn add jsii-calc@0.6.4


   .. group-tab:: TypeScript

      View in `NPM <https://www.npmjs.com/package/jsii-calc/v/0.6.4>`_

      **npm**:

      .. code-block:: console

         $ npm i jsii-calc@0.6.4

      **package.json**:

      .. code-block:: js

         {
           "jsii-calc": "^0.6.4"
         }

      **yarn**:

      .. code-block:: console

         $ yarn add jsii-calc@0.6.4



.. mdinclude:: ./_jsii-calc.README.md

Reference
---------

.. py:module:: jsii-calc

Add
^^^

.. py:class:: Add(lhs, rhs)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Add;

      .. code-tab:: javascript

         const { Add } = require('jsii-calc');

      .. code-tab:: typescript

         import { Add } from 'jsii-calc';



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

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.AllTypes;

      .. code-tab:: javascript

         const { AllTypes } = require('jsii-calc');

      .. code-tab:: typescript

         import { AllTypes } from 'jsii-calc';



   This class includes property for all types supported by jsii. The setters will validate that the value set is of the expected type and throw otherwise.



   .. py:method:: enumMethod(value) -> jsii-calc.StringEnum

      :param value: 
      :type value: :py:class:`~jsii-calc.StringEnum`
      :rtype: :py:class:`~jsii-calc.StringEnum`


   .. py:attribute:: enumPropertyValue

      :type: number *(readonly)*


   .. py:attribute:: anyArrayProperty

      :type: any


   .. py:attribute:: anyMapProperty

      :type: any


   .. py:attribute:: anyProperty

      :type: any


   .. py:attribute:: arrayProperty

      :type: string


   .. py:attribute:: booleanProperty

      :type: boolean


   .. py:attribute:: dateProperty

      :type: date


   .. py:attribute:: enumProperty

      :type: :py:class:`~jsii-calc.AllTypesEnum`


   .. py:attribute:: jsonProperty

      :type: json


   .. py:attribute:: mapProperty

      :type: number


   .. py:attribute:: numberProperty

      :type: number


   .. py:attribute:: stringProperty

      :type: string


   .. py:attribute:: unionArrayProperty

      :type: number or :py:class:`~jsii-calc.composition.CompositeOperation`


   .. py:attribute:: unionMapProperty

      :type: string or number


   .. py:attribute:: unionProperty

      :type: string or number or :py:class:`~jsii-calc.Multiply`


   .. py:attribute:: unknownArrayProperty

      :type: any


   .. py:attribute:: unknownMapProperty

      :type: any


   .. py:attribute:: unknownProperty

      :type: any


   .. py:attribute:: optionalEnumValue

      :type: :py:class:`~jsii-calc.StringEnum` or undefined


AllTypesEnum (enum)
^^^^^^^^^^^^^^^^^^^

.. py:class:: AllTypesEnum

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.AllTypesEnum;

      .. code-tab:: javascript

         const { AllTypesEnum } = require('jsii-calc');

      .. code-tab:: typescript

         import { AllTypesEnum } from 'jsii-calc';



   .. py:data:: MyEnumValue

   .. py:data:: YourEnumValue

   .. py:data:: ThisIsGreat


AllowedMethodNames
^^^^^^^^^^^^^^^^^^

.. py:class:: AllowedMethodNames()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.AllowedMethodNames;

      .. code-tab:: javascript

         const { AllowedMethodNames } = require('jsii-calc');

      .. code-tab:: typescript

         import { AllowedMethodNames } from 'jsii-calc';




   .. py:method:: getBar(_p1, _p2)

      :param _p1: 
      :type _p1: string
      :param _p2: 
      :type _p2: number


   .. py:method:: getFoo(withParam) -> string

      getXxx() is not allowed (see negatives), but getXxx(a, ...) is okay.


      :param withParam: 
      :type withParam: string
      :rtype: string


   .. py:method:: setBar(_x, _y, _z)

      :param _x: 
      :type _x: string
      :param _y: 
      :type _y: number
      :param _z: 
      :type _z: boolean


   .. py:method:: setFoo(_x, _y)

      setFoo(x) is not allowed (see negatives), but setXxx(a, b, ...) is okay.


      :param _x: 
      :type _x: string
      :param _y: 
      :type _y: number


AsyncVirtualMethods
^^^^^^^^^^^^^^^^^^^

.. py:class:: AsyncVirtualMethods()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.AsyncVirtualMethods;

      .. code-tab:: javascript

         const { AsyncVirtualMethods } = require('jsii-calc');

      .. code-tab:: typescript

         import { AsyncVirtualMethods } from 'jsii-calc';




   .. py:method:: callMe() -> number

      :rtype: number


   .. py:method:: callMe2() -> number

      Just calls "overrideMeToo"


      :rtype: number


   .. py:method:: callMeDoublePromise() -> number

      This method calls the "callMe" async method indirectly, which will then invoke a virtual method. This is a "double promise" situation, which means that callbacks are not going to be available immediate, but only after an "immediates" cycle.


      :rtype: number


   .. py:method:: dontOverrideMe() -> number

      :rtype: number


   .. py:method:: overrideMe(mult) -> number

      :param mult: 
      :type mult: number
      :rtype: number


   .. py:method:: overrideMeToo() -> number

      :rtype: number


BinaryOperation
^^^^^^^^^^^^^^^

.. py:class:: BinaryOperation(lhs, rhs)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.BinaryOperation;

      .. code-tab:: javascript

         const { BinaryOperation } = require('jsii-calc');

      .. code-tab:: typescript

         import { BinaryOperation } from 'jsii-calc';



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

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Calculator;

      .. code-tab:: javascript

         const { Calculator } = require('jsii-calc');

      .. code-tab:: typescript

         import { Calculator } from 'jsii-calc';



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


   .. py:method:: neg()

      Negates the current value.




   .. py:method:: pow(value)

      Raises the current value by a power.


      :param value: 
      :type value: number


   .. py:method:: readUnionValue() -> number

      Returns teh value of the union property (if defined).


      :rtype: number


   .. py:attribute:: expression

      Returns the expression.


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: operationsLog

      A log of all operations.


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: operationsMap

      A map of per operation name of all operations performed.


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: curr

      The current value.


      :type: :py:class:`@scope/jsii-calc-lib.Value`


   .. py:attribute:: maxValue

      The maximum value allows in this calculator.


      :type: number or undefined


   .. py:attribute:: unionProperty

      Example of a property that accepts a union of types.


      :type: :py:class:`~jsii-calc.Add` or :py:class:`~jsii-calc.Multiply` or :py:class:`~jsii-calc.Power` or undefined


CalculatorProps (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: CalculatorProps

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.CalculatorProps;

      .. code-tab:: javascript

         // CalculatorProps is an interface

      .. code-tab:: typescript

         import { CalculatorProps } from 'jsii-calc';



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

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DerivedClassHasNoProperties.Base;

      .. code-tab:: javascript

         const { DerivedClassHasNoProperties.Base } = require('jsii-calc');

      .. code-tab:: typescript

         import { DerivedClassHasNoProperties.Base } from 'jsii-calc';




   .. py:attribute:: prop

      :type: string


Derived
~~~~~~~

.. py:class:: Derived()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DerivedClassHasNoProperties.Derived;

      .. code-tab:: javascript

         const { DerivedClassHasNoProperties.Derived } = require('jsii-calc');

      .. code-tab:: typescript

         import { DerivedClassHasNoProperties.Derived } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.DerivedClassHasNoProperties.Base`


.. py:currentmodule:: jsii-calc

DerivedStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: DerivedStruct

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DerivedStruct;

      .. code-tab:: javascript

         // DerivedStruct is an interface

      .. code-tab:: typescript

         import { DerivedStruct } from 'jsii-calc';



   A struct which derives from another struct.


   :extends: :py:class:`@scope/jsii-calc-lib.MyFirstStruct`


   .. py:attribute:: anotherRequired

      :type: date


   .. py:attribute:: bool

      :type: boolean


   .. py:attribute:: nonPrimitive

      An example of a non primitive property.


      :type: :py:class:`~jsii-calc.DoubleTrouble`


   .. py:attribute:: anotherOptional

      This is optional.


      :type: :py:class:`@scope/jsii-calc-lib.Value` or undefined


   .. py:attribute:: optionalArray

      :type: string or undefined


DoubleTrouble
^^^^^^^^^^^^^

.. py:class:: DoubleTrouble()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DoubleTrouble;

      .. code-tab:: javascript

         const { DoubleTrouble } = require('jsii-calc');

      .. code-tab:: typescript

         import { DoubleTrouble } from 'jsii-calc';



   :implements: :py:class:`~jsii-calc.IFriendlyRandomGenerator`

   .. py:method:: hello() -> string

      Say hello!


      :rtype: string


   .. py:method:: next() -> number

      Returns another random number.


      :rtype: number


GiveMeStructs
^^^^^^^^^^^^^

.. py:class:: GiveMeStructs()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.GiveMeStructs;

      .. code-tab:: javascript

         const { GiveMeStructs } = require('jsii-calc');

      .. code-tab:: typescript

         import { GiveMeStructs } from 'jsii-calc';




   .. py:method:: derivedToFirst(derived) -> @scope/jsii-calc-lib.MyFirstStruct

      Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.


      :param derived: 
      :type derived: :py:class:`~jsii-calc.DerivedStruct`
      :rtype: :py:class:`@scope/jsii-calc-lib.MyFirstStruct`


   .. py:method:: readDerivedNonPrimitive(derived) -> jsii-calc.DoubleTrouble

      Returns the boolean from a DerivedStruct struct.


      :param derived: 
      :type derived: :py:class:`~jsii-calc.DerivedStruct`
      :rtype: :py:class:`~jsii-calc.DoubleTrouble`


   .. py:method:: readFirstNumber(first) -> number

      Returns the "anumber" from a MyFirstStruct struct;


      :param first: 
      :type first: :py:class:`@scope/jsii-calc-lib.MyFirstStruct`
      :rtype: number


   .. py:attribute:: structLiteral

      :type: :py:class:`@scope/jsii-calc-lib.StructWithOnlyOptionals` *(readonly)*


IFriendlier (interface)
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IFriendlier

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IFriendlier;

      .. code-tab:: javascript

         // IFriendlier is an interface

      .. code-tab:: typescript

         import { IFriendlier } from 'jsii-calc';



   Even friendlier classes can implement this interface.


   :extends: :py:class:`@scope/jsii-calc-lib.IFriendly`


   .. py:method:: farewell() -> string

      Say farewell.


      :rtype: string


   .. py:method:: goodbye() -> string

      Say goodbye.


      :return: A goodbye blessing.
      :rtype: string


IFriendlyRandomGenerator (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IFriendlyRandomGenerator

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator;

      .. code-tab:: javascript

         // IFriendlyRandomGenerator is an interface

      .. code-tab:: typescript

         import { IFriendlyRandomGenerator } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.IRandomNumberGenerator`
   :extends: :py:class:`@scope/jsii-calc-lib.IFriendly`


IInterfaceWithProperties (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IInterfaceWithProperties

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IInterfaceWithProperties;

      .. code-tab:: javascript

         // IInterfaceWithProperties is an interface

      .. code-tab:: typescript

         import { IInterfaceWithProperties } from 'jsii-calc';





   .. py:attribute:: readOnlyString

      :type: string *(readonly)*


   .. py:attribute:: readWriteString

      :type: string


IInterfaceWithPropertiesExtension (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IInterfaceWithPropertiesExtension

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IInterfaceWithPropertiesExtension;

      .. code-tab:: javascript

         // IInterfaceWithPropertiesExtension is an interface

      .. code-tab:: typescript

         import { IInterfaceWithPropertiesExtension } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.IInterfaceWithProperties`


   .. py:attribute:: foo

      :type: number


IRandomNumberGenerator (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IRandomNumberGenerator

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IRandomNumberGenerator;

      .. code-tab:: javascript

         // IRandomNumberGenerator is an interface

      .. code-tab:: typescript

         import { IRandomNumberGenerator } from 'jsii-calc';



   Generates random numbers.




   .. py:method:: next() -> number

      Returns another random number.


      :return: A random number.
      :rtype: number


ImplictBaseOfBase (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ImplictBaseOfBase

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ImplictBaseOfBase;

      .. code-tab:: javascript

         // ImplictBaseOfBase is an interface

      .. code-tab:: typescript

         import { ImplictBaseOfBase } from 'jsii-calc';



   :extends: :py:class:`@scope/jsii-calc-base.BaseProps`


   .. py:attribute:: goo

      :type: date


JSObjectLiteralForInterface
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: JSObjectLiteralForInterface()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.JSObjectLiteralForInterface;

      .. code-tab:: javascript

         const { JSObjectLiteralForInterface } = require('jsii-calc');

      .. code-tab:: typescript

         import { JSObjectLiteralForInterface } from 'jsii-calc';




   .. py:method:: giveMeFriendly() -> @scope/jsii-calc-lib.IFriendly

      :rtype: :py:class:`@scope/jsii-calc-lib.IFriendly`


   .. py:method:: giveMeFriendlyGenerator() -> jsii-calc.IFriendlyRandomGenerator

      :rtype: :py:class:`~jsii-calc.IFriendlyRandomGenerator`


JSObjectLiteralToNative
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: JSObjectLiteralToNative()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.JSObjectLiteralToNative;

      .. code-tab:: javascript

         const { JSObjectLiteralToNative } = require('jsii-calc');

      .. code-tab:: typescript

         import { JSObjectLiteralToNative } from 'jsii-calc';




   .. py:method:: returnLiteral() -> jsii-calc.JSObjectLiteralToNativeClass

      :rtype: :py:class:`~jsii-calc.JSObjectLiteralToNativeClass`


JSObjectLiteralToNativeClass
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: JSObjectLiteralToNativeClass()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.JSObjectLiteralToNativeClass;

      .. code-tab:: javascript

         const { JSObjectLiteralToNativeClass } = require('jsii-calc');

      .. code-tab:: typescript

         import { JSObjectLiteralToNativeClass } from 'jsii-calc';




   .. py:attribute:: propA

      :type: string


   .. py:attribute:: propB

      :type: number


JavaReservedWords
^^^^^^^^^^^^^^^^^

.. py:class:: JavaReservedWords()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.JavaReservedWords;

      .. code-tab:: javascript

         const { JavaReservedWords } = require('jsii-calc');

      .. code-tab:: typescript

         import { JavaReservedWords } from 'jsii-calc';




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



   .. py:method:: do()



   .. py:method:: double()



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

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Multiply;

      .. code-tab:: javascript

         const { Multiply } = require('jsii-calc');

      .. code-tab:: typescript

         import { Multiply } from 'jsii-calc';



   The "*" binary operation.


   :extends: :py:class:`~jsii-calc.BinaryOperation`
   :implements: :py:class:`~jsii-calc.IFriendlier`
   :implements: :py:class:`~jsii-calc.IRandomNumberGenerator`
   :param lhs: Left-hand side operand
   :type lhs: :py:class:`@scope/jsii-calc-lib.Value`
   :param rhs: Right-hand side operand
   :type rhs: :py:class:`@scope/jsii-calc-lib.Value`

   .. py:method:: farewell() -> string

      Say farewell.


      :rtype: string


   .. py:method:: goodbye() -> string

      Say goodbye.


      :rtype: string


   .. py:method:: next() -> number

      Returns another random number.


      :rtype: number


   .. py:method:: toString() -> string

      String representation of the value.


      :rtype: string


   .. py:attribute:: value

      The value.


      :type: number *(readonly)*


Negate
^^^^^^

.. py:class:: Negate(operand)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Negate;

      .. code-tab:: javascript

         const { Negate } = require('jsii-calc');

      .. code-tab:: typescript

         import { Negate } from 'jsii-calc';



   The negation operation ("-value")


   :extends: :py:class:`~jsii-calc.UnaryOperation`
   :implements: :py:class:`~jsii-calc.IFriendlier`
   :param operand: 
   :type operand: :py:class:`@scope/jsii-calc-lib.Value`

   .. py:method:: farewell() -> string

      Say farewell.


      :rtype: string


   .. py:method:: goodbye() -> string

      Say goodbye.


      :rtype: string


   .. py:method:: hello() -> string

      Say hello!


      :rtype: string


   .. py:method:: toString() -> string

      String representation of the value.


      :rtype: string


   .. py:attribute:: value

      The value.


      :type: number *(readonly)*


NodeStandardLibrary
^^^^^^^^^^^^^^^^^^^

.. py:class:: NodeStandardLibrary()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.NodeStandardLibrary;

      .. code-tab:: javascript

         const { NodeStandardLibrary } = require('jsii-calc');

      .. code-tab:: typescript

         import { NodeStandardLibrary } from 'jsii-calc';



   Test fixture to verify that jsii modules can use the node standard library.



   .. py:method:: cryptoSha256() -> string

      Uses node.js "crypto" module to calculate sha256 of a string.


      :return: "6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50"
      :rtype: string


   .. py:method:: fsReadFile() -> string

      Reads a local resource file (resource.txt) asynchronously.


      :return: "Hello, resource!"
      :rtype: string


   .. py:method:: fsReadFileSync() -> string

      Sync version of fsReadFile.


      :return: "Hello, resource! SYNC!"
      :rtype: string


   .. py:attribute:: osPlatform

      Returns the current os.platform() from the "os" node module.


      :type: string *(readonly)*


NumberGenerator
^^^^^^^^^^^^^^^

.. py:class:: NumberGenerator(generator)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.NumberGenerator;

      .. code-tab:: javascript

         const { NumberGenerator } = require('jsii-calc');

      .. code-tab:: typescript

         import { NumberGenerator } from 'jsii-calc';



   This allows us to test that a reference can be stored for objects that implement interfaces.


   :param generator: 
   :type generator: :py:class:`~jsii-calc.IRandomNumberGenerator`

   .. py:method:: isSameGenerator(gen) -> boolean

      :param gen: 
      :type gen: :py:class:`~jsii-calc.IRandomNumberGenerator`
      :rtype: boolean


   .. py:method:: nextTimes100() -> number

      :rtype: number


   .. py:attribute:: generator

      :type: :py:class:`~jsii-calc.IRandomNumberGenerator`


ObjectRefsInCollections
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ObjectRefsInCollections()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ObjectRefsInCollections;

      .. code-tab:: javascript

         const { ObjectRefsInCollections } = require('jsii-calc');

      .. code-tab:: typescript

         import { ObjectRefsInCollections } from 'jsii-calc';



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

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.OverrideReturnsObject;

      .. code-tab:: javascript

         const { OverrideReturnsObject } = require('jsii-calc');

      .. code-tab:: typescript

         import { OverrideReturnsObject } from 'jsii-calc';




   .. py:method:: test(obj) -> number

      :param obj: 
      :type obj: :py:class:`~jsii-calc.ReturnsNumber`
      :rtype: number


Polymorphism
^^^^^^^^^^^^

.. py:class:: Polymorphism()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Polymorphism;

      .. code-tab:: javascript

         const { Polymorphism } = require('jsii-calc');

      .. code-tab:: typescript

         import { Polymorphism } from 'jsii-calc';




   .. py:method:: sayHello(friendly) -> string

      :param friendly: 
      :type friendly: :py:class:`@scope/jsii-calc-lib.IFriendly`
      :rtype: string


Power
^^^^^

.. py:class:: Power(base, pow)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Power;

      .. code-tab:: javascript

         const { Power } = require('jsii-calc');

      .. code-tab:: typescript

         import { Power } from 'jsii-calc';



   The power operation.


   :extends: :py:class:`~jsii-calc.composition.CompositeOperation`
   :param base: The base of the power
   :type base: :py:class:`@scope/jsii-calc-lib.Value`
   :param pow: The number of times to multiply
   :type pow: :py:class:`@scope/jsii-calc-lib.Value`

   .. py:attribute:: base

      The base of the power


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: expression

      The expression that this operation consists of. Must be implemented by derived classes.


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: pow

      The number of times to multiply


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


ReferenceEnumFromScopedPackage
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ReferenceEnumFromScopedPackage()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ReferenceEnumFromScopedPackage;

      .. code-tab:: javascript

         const { ReferenceEnumFromScopedPackage } = require('jsii-calc');

      .. code-tab:: typescript

         import { ReferenceEnumFromScopedPackage } from 'jsii-calc';



   See awslabs/jsii#138



   .. py:method:: loadFoo() -> @scope/jsii-calc-lib.EnumFromScopedModule

      :rtype: :py:class:`@scope/jsii-calc-lib.EnumFromScopedModule` or undefined


   .. py:method:: saveFoo(value)

      :param value: 
      :type value: :py:class:`@scope/jsii-calc-lib.EnumFromScopedModule`


   .. py:attribute:: foo

      :type: :py:class:`@scope/jsii-calc-lib.EnumFromScopedModule` or undefined


ReturnsNumber (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ReturnsNumber

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ReturnsNumber;

      .. code-tab:: javascript

         // ReturnsNumber is an interface

      .. code-tab:: typescript

         import { ReturnsNumber } from 'jsii-calc';





   .. py:attribute:: numberProp

      :type: number *(readonly)*


   .. py:method:: obtainNumber() -> number

      :rtype: number


RuntimeTypeChecking
^^^^^^^^^^^^^^^^^^^

.. py:class:: RuntimeTypeChecking()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.RuntimeTypeChecking;

      .. code-tab:: javascript

         const { RuntimeTypeChecking } = require('jsii-calc');

      .. code-tab:: typescript

         import { RuntimeTypeChecking } from 'jsii-calc';




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

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Statics;

      .. code-tab:: javascript

         const { Statics } = require('jsii-calc');

      .. code-tab:: typescript

         import { Statics } from 'jsii-calc';



   :param value: 
   :type value: string

   .. py:staticmethod:: staticMethod(name) -> string

      Jsdocs for static method


      :param name: The name of the person to say hello to
      :type name: string
      :rtype: string


   .. py:method:: justMethod() -> string

      :rtype: string


   .. py:attribute:: BAR

      Constants may also use all-caps.


      :type: number *(readonly)* *(static)*


   .. py:attribute:: ConstObj

      :type: :py:class:`~jsii-calc.DoubleTrouble` *(readonly)* *(static)*


   .. py:attribute:: Foo

      Jsdocs for static property.


      :type: string *(readonly)* *(static)*


   .. py:attribute:: zooBar

      Constants can also use camelCase.


      :type: string *(readonly)* *(static)*


   .. py:attribute:: instance

      Jsdocs for static getter. Jsdocs for static setter.


      :type: :py:class:`~jsii-calc.Statics` *(static)*


   .. py:attribute:: nonConstStatic

      :type: number *(static)*


   .. py:attribute:: value

      :type: string *(readonly)*


StringEnum (enum)
^^^^^^^^^^^^^^^^^

.. py:class:: StringEnum

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.StringEnum;

      .. code-tab:: javascript

         const { StringEnum } = require('jsii-calc');

      .. code-tab:: typescript

         import { StringEnum } from 'jsii-calc';



   .. py:data:: A

   .. py:data:: B

   .. py:data:: C


Sum
^^^

.. py:class:: Sum()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Sum;

      .. code-tab:: javascript

         const { Sum } = require('jsii-calc');

      .. code-tab:: typescript

         import { Sum } from 'jsii-calc';



   An operation that sums multiple values.


   :extends: :py:class:`~jsii-calc.composition.CompositeOperation`

   .. py:attribute:: expression

      The expression that this operation consists of. Must be implemented by derived classes.


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)*


   .. py:attribute:: parts

      The parts to sum.


      :type: :py:class:`@scope/jsii-calc-lib.Value`


SyncVirtualMethods
^^^^^^^^^^^^^^^^^^

.. py:class:: SyncVirtualMethods()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.SyncVirtualMethods;

      .. code-tab:: javascript

         const { SyncVirtualMethods } = require('jsii-calc');

      .. code-tab:: typescript

         import { SyncVirtualMethods } from 'jsii-calc';




   .. py:method:: callerIsAsync() -> number

      :rtype: number


   .. py:method:: callerIsMethod() -> number

      :rtype: number


   .. py:method:: modifyOtherProperty(value)

      :param value: 
      :type value: string


   .. py:method:: modifyValueOfTheProperty(value)

      :param value: 
      :type value: string


   .. py:method:: readA() -> number

      :rtype: number


   .. py:method:: retrieveOtherProperty() -> string

      :rtype: string


   .. py:method:: retrieveReadOnlyProperty() -> string

      :rtype: string


   .. py:method:: retrieveValueOfTheProperty() -> string

      :rtype: string


   .. py:method:: virtualMethod(n) -> number

      :param n: 
      :type n: number
      :rtype: number


   .. py:method:: writeA(value)

      :param value: 
      :type value: number


   .. py:attribute:: readonlyProperty

      :type: string *(readonly)*


   .. py:attribute:: a

      :type: number


   .. py:attribute:: callerIsProperty

      :type: number


   .. py:attribute:: otherProperty

      :type: string


   .. py:attribute:: theProperty

      :type: string


   .. py:attribute:: valueOfOtherProperty

      :type: string


Thrower
^^^^^^^

.. py:class:: Thrower()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Thrower;

      .. code-tab:: javascript

         const { Thrower } = require('jsii-calc');

      .. code-tab:: typescript

         import { Thrower } from 'jsii-calc';




   .. py:method:: throwError()



UnaryOperation
^^^^^^^^^^^^^^

.. py:class:: UnaryOperation(operand)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.UnaryOperation;

      .. code-tab:: javascript

         const { UnaryOperation } = require('jsii-calc');

      .. code-tab:: typescript

         import { UnaryOperation } from 'jsii-calc';



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

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.UnionProperties;

      .. code-tab:: javascript

         // UnionProperties is an interface

      .. code-tab:: typescript

         import { UnionProperties } from 'jsii-calc';





   .. py:attribute:: bar

      :type: string or number or :py:class:`~jsii-calc.AllTypes` *(readonly)*


   .. py:attribute:: foo

      :type: string or number or undefined


UseBundledDependency
^^^^^^^^^^^^^^^^^^^^

.. py:class:: UseBundledDependency()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.UseBundledDependency;

      .. code-tab:: javascript

         const { UseBundledDependency } = require('jsii-calc');

      .. code-tab:: typescript

         import { UseBundledDependency } from 'jsii-calc';




   .. py:method:: value() -> any

      :rtype: any


UseCalcBase
^^^^^^^^^^^

.. py:class:: UseCalcBase()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.UseCalcBase;

      .. code-tab:: javascript

         const { UseCalcBase } = require('jsii-calc');

      .. code-tab:: typescript

         import { UseCalcBase } from 'jsii-calc';



   Depend on a type from jsii-calc-base as a test for awslabs/jsii#128



   .. py:method:: hello() -> @scope/jsii-calc-base.Base

      :rtype: :py:class:`@scope/jsii-calc-base.Base`


UsesInterfaceWithProperties
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: UsesInterfaceWithProperties(obj)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.UsesInterfaceWithProperties;

      .. code-tab:: javascript

         const { UsesInterfaceWithProperties } = require('jsii-calc');

      .. code-tab:: typescript

         import { UsesInterfaceWithProperties } from 'jsii-calc';



   :param obj: 
   :type obj: :py:class:`~jsii-calc.IInterfaceWithProperties`

   .. py:method:: justRead() -> string

      :rtype: string


   .. py:method:: readStringAndNumber(ext) -> string

      :param ext: 
      :type ext: :py:class:`~jsii-calc.IInterfaceWithPropertiesExtension`
      :rtype: string


   .. py:method:: writeAndRead(value) -> string

      :param value: 
      :type value: string
      :rtype: string


   .. py:attribute:: obj

      :type: :py:class:`~jsii-calc.IInterfaceWithProperties` *(readonly)*


VariadicMethod
^^^^^^^^^^^^^^

.. py:class:: VariadicMethod(*prefix)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.VariadicMethod;

      .. code-tab:: javascript

         const { VariadicMethod } = require('jsii-calc');

      .. code-tab:: typescript

         import { VariadicMethod } from 'jsii-calc';



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

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.VirtualMethodPlayground;

      .. code-tab:: javascript

         const { VirtualMethodPlayground } = require('jsii-calc');

      .. code-tab:: typescript

         import { VirtualMethodPlayground } from 'jsii-calc';




   .. py:method:: overrideMeAsync(index) -> number

      :param index: 
      :type index: number
      :rtype: number


   .. py:method:: overrideMeSync(index) -> number

      :param index: 
      :type index: number
      :rtype: number


   .. py:method:: parallelSumAsync(count) -> number

      :param count: 
      :type count: number
      :rtype: number


   .. py:method:: serialSumAsync(count) -> number

      :param count: 
      :type count: number
      :rtype: number


   .. py:method:: sumSync(count) -> number

      :param count: 
      :type count: number
      :rtype: number



composition
^^^^^^^^^^^
.. py:module:: jsii-calc.composition

CompositeOperation
~~~~~~~~~~~~~~~~~~

.. py:class:: CompositeOperation()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.composition.CompositeOperation;

      .. code-tab:: javascript

         const { composition.CompositeOperation } = require('jsii-calc');

      .. code-tab:: typescript

         import { composition.CompositeOperation } from 'jsii-calc';



   Abstract operation composed from an expression of other operations.


   :extends: :py:class:`@scope/jsii-calc-lib.Operation`
   :abstract: Yes

   .. py:method:: toString() -> string

      String representation of the value.


      :rtype: string


   .. py:attribute:: expression

      The expression that this operation consists of. Must be implemented by derived classes.


      :type: :py:class:`@scope/jsii-calc-lib.Value` *(readonly)* *(abstract)*


   .. py:attribute:: value

      The value.


      :type: number *(readonly)*


   .. py:attribute:: decorationPostfixes

      A set of postfixes to include in a decorated .toString().


      :type: string


   .. py:attribute:: decorationPrefixes

      A set of prefixes to include in a decorated .toString().


      :type: string


   .. py:attribute:: stringStyle

      The .toString() style.


      :type: :py:class:`~jsii-calc.composition.CompositeOperation.CompositionStringStyle`

   .. py:class:: CompositionStringStyle

      **Language-specific names:**

      .. tabs::

         .. code-tab:: java

            import software.amazon.jsii.tests.calculator.composition.CompositeOperation.CompositionStringStyle;

         .. code-tab:: javascript

            const { composition.CompositeOperation.CompositionStringStyle } = require('jsii-calc');

         .. code-tab:: typescript

            import { composition.CompositeOperation.CompositionStringStyle } from 'jsii-calc';



      Style of .toString() output for CompositeOperation.


      .. py:data:: Normal

      Normal string expression 


      .. py:data:: Decorated

      Decorated string expression 





.. py:currentmodule:: jsii-calc

