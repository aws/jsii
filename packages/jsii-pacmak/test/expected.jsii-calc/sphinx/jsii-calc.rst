jsii Calculator
===============

.. mdinclude:: ./_jsii-calc.README.md

Reference
---------

.. tabs::

   .. group-tab:: C#

      View in `Nuget <https://www.nuget.org/packages/Amazon.JSII.Tests.CalculatorPackageId/0.17.0>`_

      **csproj**:

      .. code-block:: xml

         <PackageReference Include="Amazon.JSII.Tests.CalculatorPackageId" Version="0.17.0" />

      **dotnet**:

      .. code-block:: console

         dotnet add package Amazon.JSII.Tests.CalculatorPackageId --version 0.17.0

      **packages.config**:

      .. code-block:: xml

         <package id="Amazon.JSII.Tests.CalculatorPackageId" version="0.17.0" />


   .. group-tab:: Java

      View in `Maven Central <https://repo1.maven.org/maven2/software/amazon/jsii/tests/calculator/0.17.0/>`_

      **Apache Buildr**:

      .. code-block:: none

         'software.amazon.jsii.tests:calculator:jar:0.17.0'

      **Apache Ivy**:

      .. code-block:: xml

         <dependency groupId="software.amazon.jsii.tests" name="calculator" rev="0.17.0"/>

      **Apache Maven**:

      .. code-block:: xml

         <dependency>
           <groupId>software.amazon.jsii.tests</groupId>
           <artifactId>calculator</artifactId>
           <version>0.17.0</version>
         </dependency>

      **Gradle / Grails**:

      .. code-block:: none

         compile 'software.amazon.jsii.tests:calculator:0.17.0'

      **Groovy Grape**:

      .. code-block:: none

         @Grapes(
         @Grab(group='software.amazon.jsii.tests', module='calculator', version='0.17.0')
         )


   .. group-tab:: JavaScript

      View in `NPM <https://www.npmjs.com/package/jsii-calc/v/0.17.0>`_

      **npm**:

      .. code-block:: console

         $ npm i jsii-calc@0.17.0

      **package.json**:

      .. code-block:: js

         {
           "jsii-calc": "^0.17.0"
         }

      **yarn**:

      .. code-block:: console

         $ yarn add jsii-calc@0.17.0


   .. group-tab:: TypeScript

      View in `NPM <https://www.npmjs.com/package/jsii-calc/v/0.17.0>`_

      **npm**:

      .. code-block:: console

         $ npm i jsii-calc@0.17.0

      **package.json**:

      .. code-block:: js

         {
           "jsii-calc": "^0.17.0"
         }

      **yarn**:

      .. code-block:: console

         $ yarn add jsii-calc@0.17.0



.. py:module:: jsii-calc

AbstractClass
^^^^^^^^^^^^^

.. py:class:: AbstractClass()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.AbstractClass;

      .. code-tab:: javascript

         const { AbstractClass } = require('jsii-calc');

      .. code-tab:: typescript

         import { AbstractClass } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.AbstractClassBase`\ 
   :implements: :py:class:`~jsii-calc.IInterfaceImplementedByAbstractClass`\ 
   :abstract: Yes

   .. py:method:: abstractMethod(name) -> string

      :param name: 
      :type name: string
      :rtype: string
      :abstract: Yes


   .. py:method:: nonAbstractMethod() -> number

      :rtype: number


   .. py:attribute:: propFromInterface

      *Implements* :py:meth:`jsii-calc.IInterfaceImplementedByAbstractClass.propFromInterface`

      :type: string *(readonly)*


   .. py:attribute:: abstractProperty

      *Inherited from* :py:attr:`jsii-calc.AbstractClassBase <jsii-calc.AbstractClassBase.abstractProperty>`

      :type: string *(readonly)* *(abstract)*


AbstractClassBase
^^^^^^^^^^^^^^^^^

.. py:class:: AbstractClassBase()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.AbstractClassBase;

      .. code-tab:: javascript

         const { AbstractClassBase } = require('jsii-calc');

      .. code-tab:: typescript

         import { AbstractClassBase } from 'jsii-calc';



   :abstract: Yes

   .. py:attribute:: abstractProperty

      :type: string *(readonly)* *(abstract)*


AbstractClassReturner
^^^^^^^^^^^^^^^^^^^^^

.. py:class:: AbstractClassReturner()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.AbstractClassReturner;

      .. code-tab:: javascript

         const { AbstractClassReturner } = require('jsii-calc');

      .. code-tab:: typescript

         import { AbstractClassReturner } from 'jsii-calc';




   .. py:method:: giveMeAbstract() -> jsii-calc.AbstractClass

      :rtype: :py:class:`~jsii-calc.AbstractClass`\ 


   .. py:method:: giveMeInterface() -> jsii-calc.IInterfaceImplementedByAbstractClass

      :rtype: :py:class:`~jsii-calc.IInterfaceImplementedByAbstractClass`\ 


   .. py:attribute:: returnAbstractFromProperty

      :type: :py:class:`~jsii-calc.AbstractClassBase`\  *(readonly)*


Add
^^^

.. py:class:: Add(lhs, rhs)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Add;

      .. code-tab:: javascript

         const { Add } = require('jsii-calc');

      .. code-tab:: typescript

         import { Add } from 'jsii-calc';



   The "+" binary operation.



   :extends: :py:class:`~jsii-calc.BinaryOperation`\ 
   :param lhs: Left-hand side operand.
   :type lhs: :py:class:`@scope/jsii-calc-lib.Value`\ 
   :param rhs: Right-hand side operand.
   :type rhs: :py:class:`@scope/jsii-calc-lib.Value`\ 

   .. py:method:: toString() -> string

      *Implements* :py:meth:`@scope/jsii-calc-lib.Operation.toString`

      String representation of the value.



      :rtype: string


   .. py:attribute:: value

      *Implements* :py:meth:`@scope/jsii-calc-lib.Value.value`

      The value.



      :type: number *(readonly)*


   .. py:method:: typeName() -> any

      *Inherited from* :py:meth:`@scope/jsii-calc-base.Base <@scope/jsii-calc-base.Base.typeName>`

      :return: the name of the class (to verify native type names are created for derived classes).
      :rtype: any


   .. py:method:: hello() -> string

      *Inherited from* :py:meth:`jsii-calc.BinaryOperation <jsii-calc.BinaryOperation.hello>`

      Say hello!



      :rtype: string


   .. py:attribute:: lhs

      *Inherited from* :py:attr:`jsii-calc.BinaryOperation <jsii-calc.BinaryOperation.lhs>`

      Left-hand side operand.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\  *(readonly)*


   .. py:attribute:: rhs

      *Inherited from* :py:attr:`jsii-calc.BinaryOperation <jsii-calc.BinaryOperation.rhs>`

      Right-hand side operand.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\  *(readonly)*


AllTypes
^^^^^^^^

.. py:class:: AllTypes()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.AllTypes;

      .. code-tab:: javascript

         const { AllTypes } = require('jsii-calc');

      .. code-tab:: typescript

         import { AllTypes } from 'jsii-calc';



   This class includes property for all types supported by jsii.

   

   The setters will validate

   that the value set is of the expected type and throw otherwise.




   .. py:method:: anyIn(inp)

      :param inp: 
      :type inp: any


   .. py:method:: anyOut() -> any

      :rtype: any


   .. py:method:: enumMethod(value) -> jsii-calc.StringEnum

      :param value: 
      :type value: :py:class:`~jsii-calc.StringEnum`\ 
      :rtype: :py:class:`~jsii-calc.StringEnum`\ 


   .. py:attribute:: enumPropertyValue

      :type: number *(readonly)*


   .. py:attribute:: anyArrayProperty

      :type: any[]


   .. py:attribute:: anyMapProperty

      :type: string => any


   .. py:attribute:: anyProperty

      :type: any


   .. py:attribute:: arrayProperty

      :type: string[]


   .. py:attribute:: booleanProperty

      :type: boolean


   .. py:attribute:: dateProperty

      :type: date


   .. py:attribute:: enumProperty

      :type: :py:class:`~jsii-calc.AllTypesEnum`\ 


   .. py:attribute:: jsonProperty

      :type: json


   .. py:attribute:: mapProperty

      :type: string => :py:class:`@scope/jsii-calc-lib.Number`\ 


   .. py:attribute:: numberProperty

      :type: number


   .. py:attribute:: stringProperty

      :type: string


   .. py:attribute:: unionArrayProperty

      :type: (number or :py:class:`@scope/jsii-calc-lib.Value`\ )[]


   .. py:attribute:: unionMapProperty

      :type: string => (string or number or :py:class:`@scope/jsii-calc-lib.Number`\ )


   .. py:attribute:: unionProperty

      :type: string or number or :py:class:`~jsii-calc.Multiply`\  or :py:class:`@scope/jsii-calc-lib.Number`\ 


   .. py:attribute:: unknownArrayProperty

      :type: any[]


   .. py:attribute:: unknownMapProperty

      :type: string => any


   .. py:attribute:: unknownProperty

      :type: any


   .. py:attribute:: optionalEnumValue

      :type: :py:class:`~jsii-calc.StringEnum`\  *(optional)*


AllTypesEnum (enum)
^^^^^^^^^^^^^^^^^^^

.. py:class:: AllTypesEnum

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.AllTypesEnum;

      .. code-tab:: javascript

         const { AllTypesEnum } = require('jsii-calc');

      .. code-tab:: typescript

         import { AllTypesEnum } from 'jsii-calc';



   .. py:data:: MY_ENUM_VALUE

   .. py:data:: YOUR_ENUM_VALUE

   .. py:data:: THIS_IS_GREAT


AllowedMethodNames
^^^^^^^^^^^^^^^^^^

.. py:class:: AllowedMethodNames()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.AllowedMethodNames;

      .. code-tab:: javascript

         const { AllowedMethodNames } = require('jsii-calc');

      .. code-tab:: typescript

         import { AllowedMethodNames } from 'jsii-calc';




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

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.AsyncVirtualMethods;

      .. code-tab:: javascript

         const { AsyncVirtualMethods } = require('jsii-calc');

      .. code-tab:: typescript

         import { AsyncVirtualMethods } from 'jsii-calc';




   .. py:method:: callMe() -> number

      :rtype: number


   .. py:method:: callMe2() -> number

      Just calls "overrideMeToo".



      :rtype: number


   .. py:method:: callMeDoublePromise() -> number

      This method calls the "callMe" async method indirectly, which will then invoke a virtual method.

      

      This is a "double promise" situation, which

      means that callbacks are not going to be available immediate, but only

      after an "immediates" cycle.



      :rtype: number


   .. py:method:: dontOverrideMe() -> number

      :rtype: number


   .. py:method:: overrideMe(mult) -> number

      :param mult: 
      :type mult: number
      :rtype: number


   .. py:method:: overrideMeToo() -> number

      :rtype: number


AugmentableClass
^^^^^^^^^^^^^^^^

.. py:class:: AugmentableClass()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.AugmentableClass;

      .. code-tab:: javascript

         const { AugmentableClass } = require('jsii-calc');

      .. code-tab:: typescript

         import { AugmentableClass } from 'jsii-calc';




   .. py:method:: methodOne()



   .. py:method:: methodTwo()



BinaryOperation
^^^^^^^^^^^^^^^

.. py:class:: BinaryOperation(lhs, rhs)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.BinaryOperation;

      .. code-tab:: javascript

         const { BinaryOperation } = require('jsii-calc');

      .. code-tab:: typescript

         import { BinaryOperation } from 'jsii-calc';



   Represents an operation with two operands.



   :extends: :py:class:`@scope/jsii-calc-lib.Operation`\ 
   :implements: :py:class:`@scope/jsii-calc-lib.IFriendly`\ 
   :abstract: Yes
   :param lhs: Left-hand side operand.
   :type lhs: :py:class:`@scope/jsii-calc-lib.Value`\ 
   :param rhs: Right-hand side operand.
   :type rhs: :py:class:`@scope/jsii-calc-lib.Value`\ 

   .. py:method:: hello() -> string

      *Implements* :py:meth:`@scope/jsii-calc-lib.IFriendly.hello`

      Say hello!



      :rtype: string


   .. py:attribute:: lhs

      Left-hand side operand.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\  *(readonly)*


   .. py:attribute:: rhs

      Right-hand side operand.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\  *(readonly)*


   .. py:method:: typeName() -> any

      *Inherited from* :py:meth:`@scope/jsii-calc-base.Base <@scope/jsii-calc-base.Base.typeName>`

      :return: the name of the class (to verify native type names are created for derived classes).
      :rtype: any


   .. py:method:: toString() -> string

      *Inherited from* :py:meth:`@scope/jsii-calc-lib.Operation <@scope/jsii-calc-lib.Operation.toString>`

      String representation of the value.



      :rtype: string
      :abstract: Yes


   .. py:attribute:: value

      *Inherited from* :py:attr:`@scope/jsii-calc-lib.Value <@scope/jsii-calc-lib.Value.value>`

      The value.



      :type: number *(readonly)* *(abstract)*


Calculator
^^^^^^^^^^

.. py:class:: Calculator([props])

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Calculator;

      .. code-tab:: javascript

         const { Calculator } = require('jsii-calc');

      .. code-tab:: typescript

         import { Calculator } from 'jsii-calc';



   A calculator which maintains a current value and allows adding operations.



   :extends: :py:class:`~jsii-calc.composition.CompositeOperation`\ 
   :param props: Initialization properties.
   :type props: :py:class:`~jsii-calc.CalculatorProps`\ 

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

      *Implements* :py:meth:`jsii-calc.composition.CompositeOperation.expression`

      Returns the expression.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\  *(readonly)*


   .. py:attribute:: operationsLog

      A log of all operations.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\ [] *(readonly)*


   .. py:attribute:: operationsMap

      A map of per operation name of all operations performed.



      :type: string => :py:class:`@scope/jsii-calc-lib.Value`\ [] *(readonly)*


   .. py:attribute:: curr

      The current value.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\ 


   .. py:attribute:: maxValue

      The maximum value allows in this calculator.



      :type: number *(optional)*


   .. py:attribute:: unionProperty

      Example of a property that accepts a union of types.



      :type: :py:class:`~jsii-calc.Add`\  or :py:class:`~jsii-calc.Multiply`\  or :py:class:`~jsii-calc.Power`\  *(optional)*


   .. py:method:: typeName() -> any

      *Inherited from* :py:meth:`@scope/jsii-calc-base.Base <@scope/jsii-calc-base.Base.typeName>`

      :return: the name of the class (to verify native type names are created for derived classes).
      :rtype: any


   .. py:method:: toString() -> string

      *Inherited from* :py:meth:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.toString>`

      String representation of the value.



      :rtype: string


   .. py:attribute:: value

      *Inherited from* :py:attr:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.value>`

      The value.



      :type: number *(readonly)*


   .. py:attribute:: decorationPostfixes

      *Inherited from* :py:attr:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.decorationPostfixes>`

      A set of postfixes to include in a decorated .toString().



      :type: string[]


   .. py:attribute:: decorationPrefixes

      *Inherited from* :py:attr:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.decorationPrefixes>`

      A set of prefixes to include in a decorated .toString().



      :type: string[]


   .. py:attribute:: stringStyle

      *Inherited from* :py:attr:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.stringStyle>`

      The .toString() style.



      :type: :py:class:`~jsii-calc.composition.CompositeOperation.CompositionStringStyle`\ 


CalculatorProps (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: CalculatorProps

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.CalculatorProps;

      .. code-tab:: javascript

         // CalculatorProps is an interface

      .. code-tab:: typescript

         import { CalculatorProps } from 'jsii-calc';



   Properties for Calculator.





   .. py:attribute:: initialValue

      :type: number *(optional)* *(readonly)*


   .. py:attribute:: maximumValue

      :type: number *(optional)* *(readonly)*


ClassThatImplementsTheInternalInterface
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ClassThatImplementsTheInternalInterface()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ClassThatImplementsTheInternalInterface;

      .. code-tab:: javascript

         const { ClassThatImplementsTheInternalInterface } = require('jsii-calc');

      .. code-tab:: typescript

         import { ClassThatImplementsTheInternalInterface } from 'jsii-calc';



   :implements: :py:class:`~jsii-calc.INonInternalInterface`\ 

   .. py:attribute:: a

      *Implements* :py:meth:`jsii-calc.IAnotherPublicInterface.a`

      :type: string


   .. py:attribute:: b

      *Implements* :py:meth:`jsii-calc.INonInternalInterface.b`

      :type: string


   .. py:attribute:: c

      *Implements* :py:meth:`jsii-calc.INonInternalInterface.c`

      :type: string


   .. py:attribute:: d

      :type: string


ClassThatImplementsThePrivateInterface
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ClassThatImplementsThePrivateInterface()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ClassThatImplementsThePrivateInterface;

      .. code-tab:: javascript

         const { ClassThatImplementsThePrivateInterface } = require('jsii-calc');

      .. code-tab:: typescript

         import { ClassThatImplementsThePrivateInterface } from 'jsii-calc';



   :implements: :py:class:`~jsii-calc.INonInternalInterface`\ 

   .. py:attribute:: a

      *Implements* :py:meth:`jsii-calc.IAnotherPublicInterface.a`

      :type: string


   .. py:attribute:: b

      *Implements* :py:meth:`jsii-calc.INonInternalInterface.b`

      :type: string


   .. py:attribute:: c

      *Implements* :py:meth:`jsii-calc.INonInternalInterface.c`

      :type: string


   .. py:attribute:: e

      :type: string


ClassWithCollections
^^^^^^^^^^^^^^^^^^^^

.. py:class:: ClassWithCollections(map, array)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ClassWithCollections;

      .. code-tab:: javascript

         const { ClassWithCollections } = require('jsii-calc');

      .. code-tab:: typescript

         import { ClassWithCollections } from 'jsii-calc';



   :param map: 
   :type map: string => string
   :param array: 
   :type array: string[]

   .. py:staticmethod:: createAList() -> string[]

      :rtype: string[]


   .. py:staticmethod:: createAMap() -> string => string

      :rtype: string => string


   .. py:attribute:: staticArray

      :type: string[] *(static)*


   .. py:attribute:: staticMap

      :type: string => string *(static)*


   .. py:attribute:: array

      :type: string[]


   .. py:attribute:: map

      :type: string => string


ClassWithDocs
^^^^^^^^^^^^^

.. py:class:: ClassWithDocs()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ClassWithDocs;

      .. code-tab:: javascript

         const { ClassWithDocs } = require('jsii-calc');

      .. code-tab:: typescript

         import { ClassWithDocs } from 'jsii-calc';



   This class has docs.

   

   The docs are great. They're a bunch of tags.

   https://aws.amazon.com/



ClassWithJavaReservedWords
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ClassWithJavaReservedWords(int)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ClassWithJavaReservedWords;

      .. code-tab:: javascript

         const { ClassWithJavaReservedWords } = require('jsii-calc');

      .. code-tab:: typescript

         import { ClassWithJavaReservedWords } from 'jsii-calc';



   :param int: 
   :type int: string

   .. py:method:: import(assert) -> string

      :param assert: 
      :type assert: string
      :rtype: string


   .. py:attribute:: int

      :type: string *(readonly)*


ClassWithMutableObjectLiteralProperty
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ClassWithMutableObjectLiteralProperty()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ClassWithMutableObjectLiteralProperty;

      .. code-tab:: javascript

         const { ClassWithMutableObjectLiteralProperty } = require('jsii-calc');

      .. code-tab:: typescript

         import { ClassWithMutableObjectLiteralProperty } from 'jsii-calc';




   .. py:attribute:: mutableObject

      :type: :py:class:`~jsii-calc.IMutableObjectLiteral`\ 


ClassWithPrivateConstructorAndAutomaticProperties
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ClassWithPrivateConstructorAndAutomaticProperties

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ClassWithPrivateConstructorAndAutomaticProperties;

      .. code-tab:: javascript

         const { ClassWithPrivateConstructorAndAutomaticProperties } = require('jsii-calc');

      .. code-tab:: typescript

         import { ClassWithPrivateConstructorAndAutomaticProperties } from 'jsii-calc';



   Class that implements interface properties automatically, but using a private constructor.



   :implements: :py:class:`~jsii-calc.IInterfaceWithProperties`\ 

   .. py:staticmethod:: create(readOnlyString, readWriteString) -> jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties

      :param readOnlyString: 
      :type readOnlyString: string
      :param readWriteString: 
      :type readWriteString: string
      :rtype: :py:class:`~jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties`\ 


   .. py:attribute:: readOnlyString

      *Implements* :py:meth:`jsii-calc.IInterfaceWithProperties.readOnlyString`

      :type: string *(readonly)*


   .. py:attribute:: readWriteString

      *Implements* :py:meth:`jsii-calc.IInterfaceWithProperties.readWriteString`

      :type: string


ConstructorPassesThisOut
^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ConstructorPassesThisOut(consumer)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ConstructorPassesThisOut;

      .. code-tab:: javascript

         const { ConstructorPassesThisOut } = require('jsii-calc');

      .. code-tab:: typescript

         import { ConstructorPassesThisOut } from 'jsii-calc';



   :param consumer: 
   :type consumer: :py:class:`~jsii-calc.PartiallyInitializedThisConsumer`\ 

Constructors
^^^^^^^^^^^^

.. py:class:: Constructors()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Constructors;

      .. code-tab:: javascript

         const { Constructors } = require('jsii-calc');

      .. code-tab:: typescript

         import { Constructors } from 'jsii-calc';




   .. py:staticmethod:: hiddenInterface() -> jsii-calc.IPublicInterface

      :rtype: :py:class:`~jsii-calc.IPublicInterface`\ 


   .. py:staticmethod:: hiddenInterfaces() -> jsii-calc.IPublicInterface[]

      :rtype: :py:class:`~jsii-calc.IPublicInterface`\ []


   .. py:staticmethod:: hiddenSubInterfaces() -> jsii-calc.IPublicInterface[]

      :rtype: :py:class:`~jsii-calc.IPublicInterface`\ []


   .. py:staticmethod:: makeClass() -> jsii-calc.PublicClass

      :rtype: :py:class:`~jsii-calc.PublicClass`\ 


   .. py:staticmethod:: makeInterface() -> jsii-calc.IPublicInterface

      :rtype: :py:class:`~jsii-calc.IPublicInterface`\ 


   .. py:staticmethod:: makeInterface2() -> jsii-calc.IPublicInterface2

      :rtype: :py:class:`~jsii-calc.IPublicInterface2`\ 


   .. py:staticmethod:: makeInterfaces() -> jsii-calc.IPublicInterface[]

      :rtype: :py:class:`~jsii-calc.IPublicInterface`\ []


ConsumersOfThisCrazyTypeSystem
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ConsumersOfThisCrazyTypeSystem()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ConsumersOfThisCrazyTypeSystem;

      .. code-tab:: javascript

         const { ConsumersOfThisCrazyTypeSystem } = require('jsii-calc');

      .. code-tab:: typescript

         import { ConsumersOfThisCrazyTypeSystem } from 'jsii-calc';




   .. py:method:: consumeAnotherPublicInterface(obj) -> string

      :param obj: 
      :type obj: :py:class:`~jsii-calc.IAnotherPublicInterface`\ 
      :rtype: string


   .. py:method:: consumeNonInternalInterface(obj) -> any

      :param obj: 
      :type obj: :py:class:`~jsii-calc.INonInternalInterface`\ 
      :rtype: any


DataRenderer
^^^^^^^^^^^^

.. py:class:: DataRenderer()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DataRenderer;

      .. code-tab:: javascript

         const { DataRenderer } = require('jsii-calc');

      .. code-tab:: typescript

         import { DataRenderer } from 'jsii-calc';



   Verifies proper type handling through dynamic overrides.




   .. py:method:: render([data]) -> string

      :param data: 
      :type data: :py:class:`@scope/jsii-calc-lib.MyFirstStruct`\ 
      :rtype: string


   .. py:method:: renderArbitrary(data) -> string

      :param data: 
      :type data: string => any
      :rtype: string


   .. py:method:: renderMap(map) -> string

      :param map: 
      :type map: string => any
      :rtype: string


DefaultedConstructorArgument
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: DefaultedConstructorArgument([arg1, [arg2, [arg3]]])

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DefaultedConstructorArgument;

      .. code-tab:: javascript

         const { DefaultedConstructorArgument } = require('jsii-calc');

      .. code-tab:: typescript

         import { DefaultedConstructorArgument } from 'jsii-calc';



   :param arg1: 
   :type arg1: number
   :param arg2: 
   :type arg2: string
   :param arg3: 
   :type arg3: date

   .. py:attribute:: arg1

      :type: number *(readonly)*


   .. py:attribute:: arg3

      :type: date *(readonly)*


   .. py:attribute:: arg2

      :type: string *(optional)* *(readonly)*


DeprecatedClass
^^^^^^^^^^^^^^^

.. py:class:: DeprecatedClass(readonlyString, [mutableNumber])

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DeprecatedClass;

      .. code-tab:: javascript

         const { DeprecatedClass } = require('jsii-calc');

      .. code-tab:: typescript

         import { DeprecatedClass } from 'jsii-calc';



   :param readonlyString: 
   :type readonlyString: string
   :param mutableNumber: 
   :type mutableNumber: number

   .. py:method:: method()



   .. py:attribute:: readonlyProperty

      :type: string *(readonly)*


   .. py:attribute:: mutableProperty

      :type: number *(optional)*


DeprecatedEnum (enum)
^^^^^^^^^^^^^^^^^^^^^

.. py:class:: DeprecatedEnum

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DeprecatedEnum;

      .. code-tab:: javascript

         const { DeprecatedEnum } = require('jsii-calc');

      .. code-tab:: typescript

         import { DeprecatedEnum } from 'jsii-calc';



   .. py:data:: OPTION_A

   .. py:data:: OPTION_B


DeprecatedStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: DeprecatedStruct

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DeprecatedStruct;

      .. code-tab:: javascript

         // DeprecatedStruct is an interface

      .. code-tab:: typescript

         import { DeprecatedStruct } from 'jsii-calc';





   .. py:attribute:: readonlyProperty

      :type: string *(readonly)*



DerivedClassHasNoProperties
^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. py:module:: jsii-calc.DerivedClassHasNoProperties

Base
~~~~

.. py:class:: Base()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DerivedClassHasNoProperties.Base;

      .. code-tab:: javascript

         const { DerivedClassHasNoProperties.Base } = require('jsii-calc');

      .. code-tab:: typescript

         import { DerivedClassHasNoProperties.Base } from 'jsii-calc';




   .. py:attribute:: prop

      :type: string


Derived
~~~~~~~

.. py:class:: Derived()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DerivedClassHasNoProperties.Derived;

      .. code-tab:: javascript

         const { DerivedClassHasNoProperties.Derived } = require('jsii-calc');

      .. code-tab:: typescript

         import { DerivedClassHasNoProperties.Derived } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.DerivedClassHasNoProperties.Base`\ 

   .. py:attribute:: prop

      *Inherited from* :py:attr:`jsii-calc.DerivedClassHasNoProperties.Base <jsii-calc.DerivedClassHasNoProperties.Base.prop>`

      :type: string



.. py:currentmodule:: jsii-calc

DerivedStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: DerivedStruct

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DerivedStruct;

      .. code-tab:: javascript

         // DerivedStruct is an interface

      .. code-tab:: typescript

         import { DerivedStruct } from 'jsii-calc';



   A struct which derives from another struct.



   :extends: :py:class:`@scope/jsii-calc-lib.MyFirstStruct`\ 


   .. py:attribute:: anotherRequired

      :type: date *(readonly)*


   .. py:attribute:: bool

      :type: boolean *(readonly)*


   .. py:attribute:: nonPrimitive

      An example of a non primitive property.



      :type: :py:class:`~jsii-calc.DoubleTrouble`\  *(readonly)*


   .. py:attribute:: anotherOptional

      This is optional.



      :type: string => :py:class:`@scope/jsii-calc-lib.Value`\  *(optional)* *(readonly)*


   .. py:attribute:: optionalAny

      :type: any *(readonly)*


   .. py:attribute:: optionalArray

      :type: string[] *(optional)* *(readonly)*


   .. py:attribute:: anumber

      *Inherited from* :py:attr:`@scope/jsii-calc-lib.MyFirstStruct <@scope/jsii-calc-lib.MyFirstStruct.anumber>`

      An awesome number value.



      :type: number *(readonly)*


   .. py:attribute:: astring

      *Inherited from* :py:attr:`@scope/jsii-calc-lib.MyFirstStruct <@scope/jsii-calc-lib.MyFirstStruct.astring>`

      A string value.



      :type: string *(readonly)*


   .. py:attribute:: firstOptional

      *Inherited from* :py:attr:`@scope/jsii-calc-lib.MyFirstStruct <@scope/jsii-calc-lib.MyFirstStruct.firstOptional>`

      :type: string[] *(optional)* *(readonly)*


DiamondInheritanceBaseLevelStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: DiamondInheritanceBaseLevelStruct

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DiamondInheritanceBaseLevelStruct;

      .. code-tab:: javascript

         // DiamondInheritanceBaseLevelStruct is an interface

      .. code-tab:: typescript

         import { DiamondInheritanceBaseLevelStruct } from 'jsii-calc';





   .. py:attribute:: baseLevelProperty

      :type: string *(readonly)*


DiamondInheritanceFirstMidLevelStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: DiamondInheritanceFirstMidLevelStruct

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DiamondInheritanceFirstMidLevelStruct;

      .. code-tab:: javascript

         // DiamondInheritanceFirstMidLevelStruct is an interface

      .. code-tab:: typescript

         import { DiamondInheritanceFirstMidLevelStruct } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.DiamondInheritanceBaseLevelStruct`\ 


   .. py:attribute:: firstMidLevelProperty

      :type: string *(readonly)*


   .. py:attribute:: baseLevelProperty

      *Inherited from* :py:attr:`jsii-calc.DiamondInheritanceBaseLevelStruct <jsii-calc.DiamondInheritanceBaseLevelStruct.baseLevelProperty>`

      :type: string *(readonly)*


DiamondInheritanceSecondMidLevelStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: DiamondInheritanceSecondMidLevelStruct

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DiamondInheritanceSecondMidLevelStruct;

      .. code-tab:: javascript

         // DiamondInheritanceSecondMidLevelStruct is an interface

      .. code-tab:: typescript

         import { DiamondInheritanceSecondMidLevelStruct } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.DiamondInheritanceBaseLevelStruct`\ 


   .. py:attribute:: secondMidLevelProperty

      :type: string *(readonly)*


   .. py:attribute:: baseLevelProperty

      *Inherited from* :py:attr:`jsii-calc.DiamondInheritanceBaseLevelStruct <jsii-calc.DiamondInheritanceBaseLevelStruct.baseLevelProperty>`

      :type: string *(readonly)*


DiamondInheritanceTopLevelStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: DiamondInheritanceTopLevelStruct

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DiamondInheritanceTopLevelStruct;

      .. code-tab:: javascript

         // DiamondInheritanceTopLevelStruct is an interface

      .. code-tab:: typescript

         import { DiamondInheritanceTopLevelStruct } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.DiamondInheritanceFirstMidLevelStruct`\ 
   :extends: :py:class:`~jsii-calc.DiamondInheritanceSecondMidLevelStruct`\ 


   .. py:attribute:: topLevelProperty

      :type: string *(readonly)*


   .. py:attribute:: baseLevelProperty

      *Inherited from* :py:attr:`jsii-calc.DiamondInheritanceBaseLevelStruct <jsii-calc.DiamondInheritanceBaseLevelStruct.baseLevelProperty>`

      :type: string *(readonly)*


   .. py:attribute:: firstMidLevelProperty

      *Inherited from* :py:attr:`jsii-calc.DiamondInheritanceFirstMidLevelStruct <jsii-calc.DiamondInheritanceFirstMidLevelStruct.firstMidLevelProperty>`

      :type: string *(readonly)*


   .. py:attribute:: secondMidLevelProperty

      *Inherited from* :py:attr:`jsii-calc.DiamondInheritanceSecondMidLevelStruct <jsii-calc.DiamondInheritanceSecondMidLevelStruct.secondMidLevelProperty>`

      :type: string *(readonly)*


DoNotOverridePrivates
^^^^^^^^^^^^^^^^^^^^^

.. py:class:: DoNotOverridePrivates()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DoNotOverridePrivates;

      .. code-tab:: javascript

         const { DoNotOverridePrivates } = require('jsii-calc');

      .. code-tab:: typescript

         import { DoNotOverridePrivates } from 'jsii-calc';




   .. py:method:: changePrivatePropertyValue(newValue)

      :param newValue: 
      :type newValue: string


   .. py:method:: privateMethodValue() -> string

      :rtype: string


   .. py:method:: privatePropertyValue() -> string

      :rtype: string


DoNotRecognizeAnyAsOptional
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: DoNotRecognizeAnyAsOptional()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DoNotRecognizeAnyAsOptional;

      .. code-tab:: javascript

         const { DoNotRecognizeAnyAsOptional } = require('jsii-calc');

      .. code-tab:: typescript

         import { DoNotRecognizeAnyAsOptional } from 'jsii-calc';



   jsii#284: do not recognize "any" as an optional argument.




   .. py:method:: method(_requiredAny, [_optionalAny, [_optionalString]])

      :param _requiredAny: 
      :type _requiredAny: any
      :param _optionalAny: 
      :type _optionalAny: any
      :param _optionalString: 
      :type _optionalString: string


DocumentedClass
^^^^^^^^^^^^^^^

.. py:class:: DocumentedClass()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DocumentedClass;

      .. code-tab:: javascript

         const { DocumentedClass } = require('jsii-calc');

      .. code-tab:: typescript

         import { DocumentedClass } from 'jsii-calc';



   Here's the first line of the TSDoc comment.

   

   This is the meat of the TSDoc comment. It may contain

   multiple lines and multiple paragraphs.

   

   Multiple paragraphs are separated by an empty line.




   .. py:method:: greet([greetee]) -> number

      Greet the indicated person.

      

      This will print out a friendly greeting intended for

      the indicated person.



      :param greetee: The person to be greeted.
      :type greetee: :py:class:`~jsii-calc.Greetee`\ 
      :return: A number that everyone knows very well
      :rtype: number


   .. py:method:: hola()

      Say ¡Hola!





DontComplainAboutVariadicAfterOptional
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: DontComplainAboutVariadicAfterOptional()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DontComplainAboutVariadicAfterOptional;

      .. code-tab:: javascript

         const { DontComplainAboutVariadicAfterOptional } = require('jsii-calc');

      .. code-tab:: typescript

         import { DontComplainAboutVariadicAfterOptional } from 'jsii-calc';




   .. py:method:: optionalAndVariadic([optional, *things]) -> string

      :param optional: 
      :type optional: string
      :param \*things: 
      :type \*things: string
      :rtype: string


DoubleTrouble
^^^^^^^^^^^^^

.. py:class:: DoubleTrouble()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.DoubleTrouble;

      .. code-tab:: javascript

         const { DoubleTrouble } = require('jsii-calc');

      .. code-tab:: typescript

         import { DoubleTrouble } from 'jsii-calc';



   :implements: :py:class:`~jsii-calc.IFriendlyRandomGenerator`\ 

   .. py:method:: hello() -> string

      *Implements* :py:meth:`@scope/jsii-calc-lib.IFriendly.hello`

      Say hello!



      :rtype: string


   .. py:method:: next() -> number

      *Implements* :py:meth:`jsii-calc.IRandomNumberGenerator.next`

      Returns another random number.



      :rtype: number


EnumDispenser
^^^^^^^^^^^^^

.. py:class:: EnumDispenser

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.EnumDispenser;

      .. code-tab:: javascript

         const { EnumDispenser } = require('jsii-calc');

      .. code-tab:: typescript

         import { EnumDispenser } from 'jsii-calc';




   .. py:staticmethod:: randomIntegerLikeEnum() -> jsii-calc.AllTypesEnum

      :rtype: :py:class:`~jsii-calc.AllTypesEnum`\ 


   .. py:staticmethod:: randomStringLikeEnum() -> jsii-calc.StringEnum

      :rtype: :py:class:`~jsii-calc.StringEnum`\ 


EraseUndefinedHashValues
^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: EraseUndefinedHashValues()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.EraseUndefinedHashValues;

      .. code-tab:: javascript

         const { EraseUndefinedHashValues } = require('jsii-calc');

      .. code-tab:: typescript

         import { EraseUndefinedHashValues } from 'jsii-calc';




   .. py:staticmethod:: doesKeyExist(opts, key) -> boolean

      Returns `true` if `key` is defined in `opts`.

      

      Used to check that undefined/null hash values

      are being erased when sending values from native code to JS.



      :param opts: 
      :type opts: :py:class:`~jsii-calc.EraseUndefinedHashValuesOptions`\ 
      :param key: 
      :type key: string
      :rtype: boolean


   .. py:staticmethod:: prop1IsNull() -> any

      We expect "prop1" to be erased.



      :rtype: any


   .. py:staticmethod:: prop2IsUndefined() -> any

      We expect "prop2" to be erased.



      :rtype: any


EraseUndefinedHashValuesOptions (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: EraseUndefinedHashValuesOptions

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.EraseUndefinedHashValuesOptions;

      .. code-tab:: javascript

         // EraseUndefinedHashValuesOptions is an interface

      .. code-tab:: typescript

         import { EraseUndefinedHashValuesOptions } from 'jsii-calc';





   .. py:attribute:: option1

      :type: string *(optional)* *(readonly)*


   .. py:attribute:: option2

      :type: string *(optional)* *(readonly)*


ExperimentalClass
^^^^^^^^^^^^^^^^^

.. py:class:: ExperimentalClass(readonlyString, [mutableNumber])

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ExperimentalClass;

      .. code-tab:: javascript

         const { ExperimentalClass } = require('jsii-calc');

      .. code-tab:: typescript

         import { ExperimentalClass } from 'jsii-calc';



   :param readonlyString: 
   :type readonlyString: string
   :param mutableNumber: 
   :type mutableNumber: number

   .. py:method:: method()



   .. py:attribute:: readonlyProperty

      :type: string *(readonly)*


   .. py:attribute:: mutableProperty

      :type: number *(optional)*


ExperimentalEnum (enum)
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ExperimentalEnum

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ExperimentalEnum;

      .. code-tab:: javascript

         const { ExperimentalEnum } = require('jsii-calc');

      .. code-tab:: typescript

         import { ExperimentalEnum } from 'jsii-calc';



   .. py:data:: OPTION_A

   .. py:data:: OPTION_B


ExperimentalStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ExperimentalStruct

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ExperimentalStruct;

      .. code-tab:: javascript

         // ExperimentalStruct is an interface

      .. code-tab:: typescript

         import { ExperimentalStruct } from 'jsii-calc';





   .. py:attribute:: readonlyProperty

      :type: string *(readonly)*


ExportedBaseClass
^^^^^^^^^^^^^^^^^

.. py:class:: ExportedBaseClass(success)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ExportedBaseClass;

      .. code-tab:: javascript

         const { ExportedBaseClass } = require('jsii-calc');

      .. code-tab:: typescript

         import { ExportedBaseClass } from 'jsii-calc';



   :param success: 
   :type success: boolean

   .. py:attribute:: success

      :type: boolean *(readonly)*


ExtendsInternalInterface (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ExtendsInternalInterface

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ExtendsInternalInterface;

      .. code-tab:: javascript

         // ExtendsInternalInterface is an interface

      .. code-tab:: typescript

         import { ExtendsInternalInterface } from 'jsii-calc';





   .. py:attribute:: boom

      :type: boolean *(readonly)*


   .. py:attribute:: prop

      :type: string *(readonly)*


GiveMeStructs
^^^^^^^^^^^^^

.. py:class:: GiveMeStructs()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.GiveMeStructs;

      .. code-tab:: javascript

         const { GiveMeStructs } = require('jsii-calc');

      .. code-tab:: typescript

         import { GiveMeStructs } from 'jsii-calc';




   .. py:method:: derivedToFirst(derived) -> @scope/jsii-calc-lib.MyFirstStruct

      Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.



      :param derived: 
      :type derived: :py:class:`~jsii-calc.DerivedStruct`\ 
      :rtype: :py:class:`@scope/jsii-calc-lib.MyFirstStruct`\ 


   .. py:method:: readDerivedNonPrimitive(derived) -> jsii-calc.DoubleTrouble

      Returns the boolean from a DerivedStruct struct.



      :param derived: 
      :type derived: :py:class:`~jsii-calc.DerivedStruct`\ 
      :rtype: :py:class:`~jsii-calc.DoubleTrouble`\ 


   .. py:method:: readFirstNumber(first) -> number

      Returns the "anumber" from a MyFirstStruct struct;



      :param first: 
      :type first: :py:class:`@scope/jsii-calc-lib.MyFirstStruct`\ 
      :rtype: number


   .. py:attribute:: structLiteral

      :type: :py:class:`@scope/jsii-calc-lib.StructWithOnlyOptionals`\  *(readonly)*


Greetee (interface)
^^^^^^^^^^^^^^^^^^^

.. py:class:: Greetee

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Greetee;

      .. code-tab:: javascript

         // Greetee is an interface

      .. code-tab:: typescript

         import { Greetee } from 'jsii-calc';



   These are some arguments you can pass to a method.





   .. py:attribute:: name

      The name of the greetee.



      :type: string *(optional)* *(readonly)*
      :default: world


GreetingAugmenter
^^^^^^^^^^^^^^^^^

.. py:class:: GreetingAugmenter()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.GreetingAugmenter;

      .. code-tab:: javascript

         const { GreetingAugmenter } = require('jsii-calc');

      .. code-tab:: typescript

         import { GreetingAugmenter } from 'jsii-calc';




   .. py:method:: betterGreeting(friendly) -> string

      :param friendly: 
      :type friendly: :py:class:`@scope/jsii-calc-lib.IFriendly`\ 
      :rtype: string


IAnotherPublicInterface (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IAnotherPublicInterface

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IAnotherPublicInterface;

      .. code-tab:: javascript

         // IAnotherPublicInterface is an interface

      .. code-tab:: typescript

         import { IAnotherPublicInterface } from 'jsii-calc';





   .. py:attribute:: a

      :type: string


IDeprecatedInterface (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IDeprecatedInterface

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IDeprecatedInterface;

      .. code-tab:: javascript

         // IDeprecatedInterface is an interface

      .. code-tab:: typescript

         import { IDeprecatedInterface } from 'jsii-calc';





   .. py:attribute:: mutableProperty

      :type: number *(optional)*


   .. py:method:: method()

      :abstract: Yes


IExperimentalInterface (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IExperimentalInterface

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IExperimentalInterface;

      .. code-tab:: javascript

         // IExperimentalInterface is an interface

      .. code-tab:: typescript

         import { IExperimentalInterface } from 'jsii-calc';





   .. py:attribute:: mutableProperty

      :type: number *(optional)*


   .. py:method:: method()

      :abstract: Yes


IExtendsPrivateInterface (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IExtendsPrivateInterface

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IExtendsPrivateInterface;

      .. code-tab:: javascript

         // IExtendsPrivateInterface is an interface

      .. code-tab:: typescript

         import { IExtendsPrivateInterface } from 'jsii-calc';





   .. py:attribute:: moreThings

      :type: string[] *(readonly)*


   .. py:attribute:: private

      :type: string


IFriendlier (interface)
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IFriendlier

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IFriendlier;

      .. code-tab:: javascript

         // IFriendlier is an interface

      .. code-tab:: typescript

         import { IFriendlier } from 'jsii-calc';



   Even friendlier classes can implement this interface.



   :extends: :py:class:`@scope/jsii-calc-lib.IFriendly`\ 


   .. py:method:: farewell() -> string

      Say farewell.



      :rtype: string
      :abstract: Yes


   .. py:method:: goodbye() -> string

      Say goodbye.



      :return: A goodbye blessing.
      :rtype: string
      :abstract: Yes


   .. py:method:: hello() -> string

      *Inherited from* :py:meth:`@scope/jsii-calc-lib.IFriendly <@scope/jsii-calc-lib.IFriendly.hello>`

      Say hello!



      :rtype: string
      :abstract: Yes


IFriendlyRandomGenerator (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IFriendlyRandomGenerator

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator;

      .. code-tab:: javascript

         // IFriendlyRandomGenerator is an interface

      .. code-tab:: typescript

         import { IFriendlyRandomGenerator } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.IRandomNumberGenerator`\ 
   :extends: :py:class:`@scope/jsii-calc-lib.IFriendly`\ 


   .. py:method:: hello() -> string

      *Inherited from* :py:meth:`@scope/jsii-calc-lib.IFriendly <@scope/jsii-calc-lib.IFriendly.hello>`

      Say hello!



      :rtype: string
      :abstract: Yes


   .. py:method:: next() -> number

      *Inherited from* :py:meth:`jsii-calc.IRandomNumberGenerator <jsii-calc.IRandomNumberGenerator.next>`

      Returns another random number.



      :return: A random number.
      :rtype: number
      :abstract: Yes


IInterfaceImplementedByAbstractClass (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IInterfaceImplementedByAbstractClass

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IInterfaceImplementedByAbstractClass;

      .. code-tab:: javascript

         // IInterfaceImplementedByAbstractClass is an interface

      .. code-tab:: typescript

         import { IInterfaceImplementedByAbstractClass } from 'jsii-calc';



   awslabs/jsii#220 Abstract return type.





   .. py:attribute:: propFromInterface

      :type: string *(readonly)*


IInterfaceThatShouldNotBeADataType (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IInterfaceThatShouldNotBeADataType

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IInterfaceThatShouldNotBeADataType;

      .. code-tab:: javascript

         // IInterfaceThatShouldNotBeADataType is an interface

      .. code-tab:: typescript

         import { IInterfaceThatShouldNotBeADataType } from 'jsii-calc';



   Even though this interface has only properties, it is disqualified from being a datatype because it inherits from an interface that is not a datatype.



   :extends: :py:class:`~jsii-calc.IInterfaceWithMethods`\ 


   .. py:attribute:: otherValue

      :type: string *(readonly)*


   .. py:method:: doThings()

      *Inherited from* :py:meth:`jsii-calc.IInterfaceWithMethods <jsii-calc.IInterfaceWithMethods.doThings>`

      :abstract: Yes


   .. py:attribute:: value

      *Inherited from* :py:attr:`jsii-calc.IInterfaceWithMethods <jsii-calc.IInterfaceWithMethods.value>`

      :type: string *(readonly)*


IInterfaceWithInternal (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IInterfaceWithInternal

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IInterfaceWithInternal;

      .. code-tab:: javascript

         // IInterfaceWithInternal is an interface

      .. code-tab:: typescript

         import { IInterfaceWithInternal } from 'jsii-calc';





   .. py:method:: visible()

      :abstract: Yes


IInterfaceWithMethods (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IInterfaceWithMethods

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IInterfaceWithMethods;

      .. code-tab:: javascript

         // IInterfaceWithMethods is an interface

      .. code-tab:: typescript

         import { IInterfaceWithMethods } from 'jsii-calc';





   .. py:attribute:: value

      :type: string *(readonly)*


   .. py:method:: doThings()

      :abstract: Yes


IInterfaceWithOptionalMethodArguments (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IInterfaceWithOptionalMethodArguments

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IInterfaceWithOptionalMethodArguments;

      .. code-tab:: javascript

         // IInterfaceWithOptionalMethodArguments is an interface

      .. code-tab:: typescript

         import { IInterfaceWithOptionalMethodArguments } from 'jsii-calc';



   awslabs/jsii#175 Interface proxies (and builders) do not respect optional arguments in methods.





   .. py:method:: hello(arg1, [arg2])

      :param arg1: 
      :type arg1: string
      :param arg2: 
      :type arg2: number
      :abstract: Yes


IInterfaceWithProperties (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IInterfaceWithProperties

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IInterfaceWithProperties;

      .. code-tab:: javascript

         // IInterfaceWithProperties is an interface

      .. code-tab:: typescript

         import { IInterfaceWithProperties } from 'jsii-calc';





   .. py:attribute:: readOnlyString

      :type: string *(readonly)*


   .. py:attribute:: readWriteString

      :type: string


IInterfaceWithPropertiesExtension (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IInterfaceWithPropertiesExtension

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IInterfaceWithPropertiesExtension;

      .. code-tab:: javascript

         // IInterfaceWithPropertiesExtension is an interface

      .. code-tab:: typescript

         import { IInterfaceWithPropertiesExtension } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.IInterfaceWithProperties`\ 


   .. py:attribute:: foo

      :type: number


   .. py:attribute:: readOnlyString

      *Inherited from* :py:attr:`jsii-calc.IInterfaceWithProperties <jsii-calc.IInterfaceWithProperties.readOnlyString>`

      :type: string *(readonly)*


   .. py:attribute:: readWriteString

      *Inherited from* :py:attr:`jsii-calc.IInterfaceWithProperties <jsii-calc.IInterfaceWithProperties.readWriteString>`

      :type: string


IJSII417Derived (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IJSII417Derived

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IJSII417Derived;

      .. code-tab:: javascript

         // IJSII417Derived is an interface

      .. code-tab:: typescript

         import { IJSII417Derived } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.IJSII417PublicBaseOfBase`\ 


   .. py:attribute:: property

      :type: string *(readonly)*


   .. py:method:: bar()

      :abstract: Yes


   .. py:method:: baz()

      :abstract: Yes


   .. py:method:: foo()

      *Inherited from* :py:meth:`jsii-calc.IJSII417PublicBaseOfBase <jsii-calc.IJSII417PublicBaseOfBase.foo>`

      :abstract: Yes


   .. py:attribute:: hasRoot

      *Inherited from* :py:attr:`jsii-calc.IJSII417PublicBaseOfBase <jsii-calc.IJSII417PublicBaseOfBase.hasRoot>`

      :type: boolean *(readonly)*


IJSII417PublicBaseOfBase (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IJSII417PublicBaseOfBase

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IJSII417PublicBaseOfBase;

      .. code-tab:: javascript

         // IJSII417PublicBaseOfBase is an interface

      .. code-tab:: typescript

         import { IJSII417PublicBaseOfBase } from 'jsii-calc';





   .. py:attribute:: hasRoot

      :type: boolean *(readonly)*


   .. py:method:: foo()

      :abstract: Yes


IJsii487External (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IJsii487External

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IJsii487External;

      .. code-tab:: javascript

         // IJsii487External is an interface

      .. code-tab:: typescript

         import { IJsii487External } from 'jsii-calc';





IJsii487External2 (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IJsii487External2

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IJsii487External2;

      .. code-tab:: javascript

         // IJsii487External2 is an interface

      .. code-tab:: typescript

         import { IJsii487External2 } from 'jsii-calc';





IJsii496 (interface)
^^^^^^^^^^^^^^^^^^^^

.. py:class:: IJsii496

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IJsii496;

      .. code-tab:: javascript

         // IJsii496 is an interface

      .. code-tab:: typescript

         import { IJsii496 } from 'jsii-calc';





IMutableObjectLiteral (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IMutableObjectLiteral

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IMutableObjectLiteral;

      .. code-tab:: javascript

         // IMutableObjectLiteral is an interface

      .. code-tab:: typescript

         import { IMutableObjectLiteral } from 'jsii-calc';





   .. py:attribute:: value

      :type: string


INonInternalInterface (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: INonInternalInterface

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.INonInternalInterface;

      .. code-tab:: javascript

         // INonInternalInterface is an interface

      .. code-tab:: typescript

         import { INonInternalInterface } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.IAnotherPublicInterface`\ 


   .. py:attribute:: b

      :type: string


   .. py:attribute:: c

      :type: string


   .. py:attribute:: a

      *Inherited from* :py:attr:`jsii-calc.IAnotherPublicInterface <jsii-calc.IAnotherPublicInterface.a>`

      :type: string


IPrivatelyImplemented (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IPrivatelyImplemented

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IPrivatelyImplemented;

      .. code-tab:: javascript

         // IPrivatelyImplemented is an interface

      .. code-tab:: typescript

         import { IPrivatelyImplemented } from 'jsii-calc';





   .. py:attribute:: success

      :type: boolean *(readonly)*


IPublicInterface (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IPublicInterface

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IPublicInterface;

      .. code-tab:: javascript

         // IPublicInterface is an interface

      .. code-tab:: typescript

         import { IPublicInterface } from 'jsii-calc';





   .. py:method:: bye() -> string

      :rtype: string
      :abstract: Yes


IPublicInterface2 (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IPublicInterface2

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IPublicInterface2;

      .. code-tab:: javascript

         // IPublicInterface2 is an interface

      .. code-tab:: typescript

         import { IPublicInterface2 } from 'jsii-calc';





   .. py:method:: ciao() -> string

      :rtype: string
      :abstract: Yes


IRandomNumberGenerator (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IRandomNumberGenerator

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IRandomNumberGenerator;

      .. code-tab:: javascript

         // IRandomNumberGenerator is an interface

      .. code-tab:: typescript

         import { IRandomNumberGenerator } from 'jsii-calc';



   Generates random numbers.





   .. py:method:: next() -> number

      Returns another random number.



      :return: A random number.
      :rtype: number
      :abstract: Yes


IReturnsNumber (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IReturnsNumber

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IReturnsNumber;

      .. code-tab:: javascript

         // IReturnsNumber is an interface

      .. code-tab:: typescript

         import { IReturnsNumber } from 'jsii-calc';





   .. py:attribute:: numberProp

      :type: :py:class:`@scope/jsii-calc-lib.Number`\  *(readonly)*


   .. py:method:: obtainNumber() -> @scope/jsii-calc-lib.IDoublable

      :rtype: :py:class:`@scope/jsii-calc-lib.IDoublable`\ 
      :abstract: Yes


IStableInterface (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IStableInterface

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.IStableInterface;

      .. code-tab:: javascript

         // IStableInterface is an interface

      .. code-tab:: typescript

         import { IStableInterface } from 'jsii-calc';





   .. py:attribute:: mutableProperty

      :type: number *(optional)*


   .. py:method:: method()

      :abstract: Yes


ImplementInternalInterface
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ImplementInternalInterface()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ImplementInternalInterface;

      .. code-tab:: javascript

         const { ImplementInternalInterface } = require('jsii-calc');

      .. code-tab:: typescript

         import { ImplementInternalInterface } from 'jsii-calc';




   .. py:attribute:: prop

      :type: string


ImplementsInterfaceWithInternal
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ImplementsInterfaceWithInternal()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ImplementsInterfaceWithInternal;

      .. code-tab:: javascript

         const { ImplementsInterfaceWithInternal } = require('jsii-calc');

      .. code-tab:: typescript

         import { ImplementsInterfaceWithInternal } from 'jsii-calc';



   :implements: :py:class:`~jsii-calc.IInterfaceWithInternal`\ 

   .. py:method:: visible()

      *Implements* :py:meth:`jsii-calc.IInterfaceWithInternal.visible`



ImplementsInterfaceWithInternalSubclass
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ImplementsInterfaceWithInternalSubclass()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ImplementsInterfaceWithInternalSubclass;

      .. code-tab:: javascript

         const { ImplementsInterfaceWithInternalSubclass } = require('jsii-calc');

      .. code-tab:: typescript

         import { ImplementsInterfaceWithInternalSubclass } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.ImplementsInterfaceWithInternal`\ 

   .. py:method:: visible()

      *Inherited from* :py:meth:`jsii-calc.ImplementsInterfaceWithInternal <jsii-calc.ImplementsInterfaceWithInternal.visible>`



ImplementsPrivateInterface
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ImplementsPrivateInterface()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ImplementsPrivateInterface;

      .. code-tab:: javascript

         const { ImplementsPrivateInterface } = require('jsii-calc');

      .. code-tab:: typescript

         import { ImplementsPrivateInterface } from 'jsii-calc';




   .. py:attribute:: private

      :type: string


ImplictBaseOfBase (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ImplictBaseOfBase

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ImplictBaseOfBase;

      .. code-tab:: javascript

         // ImplictBaseOfBase is an interface

      .. code-tab:: typescript

         import { ImplictBaseOfBase } from 'jsii-calc';



   :extends: :py:class:`@scope/jsii-calc-base.BaseProps`\ 


   .. py:attribute:: goo

      :type: date *(readonly)*


   .. py:attribute:: foo

      *Inherited from* :py:attr:`@scope/jsii-calc-base-of-base.VeryBaseProps <@scope/jsii-calc-base-of-base.VeryBaseProps.foo>`

      :type: :py:class:`@scope/jsii-calc-base-of-base.Very`\  *(readonly)*


   .. py:attribute:: bar

      *Inherited from* :py:attr:`@scope/jsii-calc-base.BaseProps <@scope/jsii-calc-base.BaseProps.bar>`

      :type: string *(readonly)*


InbetweenClass
^^^^^^^^^^^^^^

.. py:class:: InbetweenClass()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.InbetweenClass;

      .. code-tab:: javascript

         const { InbetweenClass } = require('jsii-calc');

      .. code-tab:: typescript

         import { InbetweenClass } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.PublicClass`\ 
   :implements: :py:class:`~jsii-calc.IPublicInterface2`\ 

   .. py:method:: ciao() -> string

      *Implements* :py:meth:`jsii-calc.IPublicInterface2.ciao`

      :rtype: string


   .. py:method:: hello()

      *Inherited from* :py:meth:`jsii-calc.PublicClass <jsii-calc.PublicClass.hello>`




InterfaceInNamespaceIncludesClasses
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. py:module:: jsii-calc.InterfaceInNamespaceIncludesClasses

Foo
~~~

.. py:class:: Foo()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.InterfaceInNamespaceIncludesClasses.Foo;

      .. code-tab:: javascript

         const { InterfaceInNamespaceIncludesClasses.Foo } = require('jsii-calc');

      .. code-tab:: typescript

         import { InterfaceInNamespaceIncludesClasses.Foo } from 'jsii-calc';




   .. py:attribute:: bar

      :type: string *(optional)*


Hello (interface)
~~~~~~~~~~~~~~~~~

.. py:class:: Hello

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.InterfaceInNamespaceIncludesClasses.Hello;

      .. code-tab:: javascript

         // InterfaceInNamespaceIncludesClasses.Hello is an interface

      .. code-tab:: typescript

         import { InterfaceInNamespaceIncludesClasses.Hello } from 'jsii-calc';





   .. py:attribute:: foo

      :type: number *(readonly)*



.. py:currentmodule:: jsii-calc


InterfaceInNamespaceOnlyInterface
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. py:module:: jsii-calc.InterfaceInNamespaceOnlyInterface

Hello (interface)
~~~~~~~~~~~~~~~~~

.. py:class:: Hello

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.InterfaceInNamespaceOnlyInterface.Hello;

      .. code-tab:: javascript

         // InterfaceInNamespaceOnlyInterface.Hello is an interface

      .. code-tab:: typescript

         import { InterfaceInNamespaceOnlyInterface.Hello } from 'jsii-calc';





   .. py:attribute:: foo

      :type: number *(readonly)*



.. py:currentmodule:: jsii-calc

InterfacesMaker
^^^^^^^^^^^^^^^

.. py:class:: InterfacesMaker

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.InterfacesMaker;

      .. code-tab:: javascript

         const { InterfacesMaker } = require('jsii-calc');

      .. code-tab:: typescript

         import { InterfacesMaker } from 'jsii-calc';



   We can return arrays of interfaces See aws/aws-cdk#2362.




   .. py:staticmethod:: makeInterfaces(count) -> @scope/jsii-calc-lib.IDoublable[]

      :param count: 
      :type count: number
      :rtype: :py:class:`@scope/jsii-calc-lib.IDoublable`\ []


JSII417Derived
^^^^^^^^^^^^^^

.. py:class:: JSII417Derived(property)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.JSII417Derived;

      .. code-tab:: javascript

         const { JSII417Derived } = require('jsii-calc');

      .. code-tab:: typescript

         import { JSII417Derived } from 'jsii-calc';



   :extends: :py:class:`~jsii-calc.JSII417PublicBaseOfBase`\ 
   :param property: 
   :type property: string

   .. py:method:: bar()



   .. py:method:: baz()



   .. py:attribute:: property

      *Protected property*

      :type: string *(readonly)*


   .. py:method:: foo()

      *Inherited from* :py:meth:`jsii-calc.JSII417PublicBaseOfBase <jsii-calc.JSII417PublicBaseOfBase.foo>`



   .. py:attribute:: hasRoot

      *Inherited from* :py:attr:`jsii-calc.JSII417PublicBaseOfBase <jsii-calc.JSII417PublicBaseOfBase.hasRoot>`

      :type: boolean *(readonly)*


JSII417PublicBaseOfBase
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: JSII417PublicBaseOfBase()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.JSII417PublicBaseOfBase;

      .. code-tab:: javascript

         const { JSII417PublicBaseOfBase } = require('jsii-calc');

      .. code-tab:: typescript

         import { JSII417PublicBaseOfBase } from 'jsii-calc';




   .. py:staticmethod:: makeInstance() -> jsii-calc.JSII417PublicBaseOfBase

      :rtype: :py:class:`~jsii-calc.JSII417PublicBaseOfBase`\ 


   .. py:method:: foo()



   .. py:attribute:: hasRoot

      :type: boolean *(readonly)*


JSObjectLiteralForInterface
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: JSObjectLiteralForInterface()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.JSObjectLiteralForInterface;

      .. code-tab:: javascript

         const { JSObjectLiteralForInterface } = require('jsii-calc');

      .. code-tab:: typescript

         import { JSObjectLiteralForInterface } from 'jsii-calc';




   .. py:method:: giveMeFriendly() -> @scope/jsii-calc-lib.IFriendly

      :rtype: :py:class:`@scope/jsii-calc-lib.IFriendly`\ 


   .. py:method:: giveMeFriendlyGenerator() -> jsii-calc.IFriendlyRandomGenerator

      :rtype: :py:class:`~jsii-calc.IFriendlyRandomGenerator`\ 


JSObjectLiteralToNative
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: JSObjectLiteralToNative()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.JSObjectLiteralToNative;

      .. code-tab:: javascript

         const { JSObjectLiteralToNative } = require('jsii-calc');

      .. code-tab:: typescript

         import { JSObjectLiteralToNative } from 'jsii-calc';




   .. py:method:: returnLiteral() -> jsii-calc.JSObjectLiteralToNativeClass

      :rtype: :py:class:`~jsii-calc.JSObjectLiteralToNativeClass`\ 


JSObjectLiteralToNativeClass
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: JSObjectLiteralToNativeClass()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.JSObjectLiteralToNativeClass;

      .. code-tab:: javascript

         const { JSObjectLiteralToNativeClass } = require('jsii-calc');

      .. code-tab:: typescript

         import { JSObjectLiteralToNativeClass } from 'jsii-calc';




   .. py:attribute:: propA

      :type: string


   .. py:attribute:: propB

      :type: number


JavaReservedWords
^^^^^^^^^^^^^^^^^

.. py:class:: JavaReservedWords()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.JavaReservedWords;

      .. code-tab:: javascript

         const { JavaReservedWords } = require('jsii-calc');

      .. code-tab:: typescript

         import { JavaReservedWords } from 'jsii-calc';




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


Jsii487Derived
^^^^^^^^^^^^^^

.. py:class:: Jsii487Derived()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Jsii487Derived;

      .. code-tab:: javascript

         const { Jsii487Derived } = require('jsii-calc');

      .. code-tab:: typescript

         import { Jsii487Derived } from 'jsii-calc';



   :implements: :py:class:`~jsii-calc.IJsii487External2`\ 
   :implements: :py:class:`~jsii-calc.IJsii487External`\ 

Jsii496Derived
^^^^^^^^^^^^^^

.. py:class:: Jsii496Derived()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Jsii496Derived;

      .. code-tab:: javascript

         const { Jsii496Derived } = require('jsii-calc');

      .. code-tab:: typescript

         import { Jsii496Derived } from 'jsii-calc';



   :implements: :py:class:`~jsii-calc.IJsii496`\ 

JsiiAgent
^^^^^^^^^

.. py:class:: JsiiAgent()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.JsiiAgent;

      .. code-tab:: javascript

         const { JsiiAgent } = require('jsii-calc');

      .. code-tab:: typescript

         import { JsiiAgent } from 'jsii-calc';



   Host runtime version should be set via JSII_AGENT.




   .. py:attribute:: jsiiAgent

      Returns the value of the JSII_AGENT environment variable.



      :type: string *(optional)* *(readonly)* *(static)*


LoadBalancedFargateServiceProps (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: LoadBalancedFargateServiceProps

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.LoadBalancedFargateServiceProps;

      .. code-tab:: javascript

         // LoadBalancedFargateServiceProps is an interface

      .. code-tab:: typescript

         import { LoadBalancedFargateServiceProps } from 'jsii-calc';



   jsii#298: show default values in sphinx documentation, and respect newlines.





   .. py:attribute:: containerPort

      The container port of the application load balancer attached to your Fargate service.

      

      Corresponds to container port mapping.



      :type: number *(optional)* *(readonly)*
      :default: 80


   .. py:attribute:: cpu

      The number of cpu units used by the task. Valid values, which determines your range of valid values for the memory parameter: 256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB 512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB 1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB 2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments 4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments.

      

      This default is set in the underlying FargateTaskDefinition construct.



      :type: string *(optional)* *(readonly)*
      :default: 256


   .. py:attribute:: memoryMiB

      The amount (in MiB) of memory used by the task.

      

      This field is required and you must use one of the following values, which determines your range of valid values

      for the cpu parameter:

      

      0.5GB, 1GB, 2GB - Available cpu values: 256 (.25 vCPU)

      

      1GB, 2GB, 3GB, 4GB - Available cpu values: 512 (.5 vCPU)

      

      2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB - Available cpu values: 1024 (1 vCPU)

      

      Between 4GB and 16GB in 1GB increments - Available cpu values: 2048 (2 vCPU)

      

      Between 8GB and 30GB in 1GB increments - Available cpu values: 4096 (4 vCPU)

      

      This default is set in the underlying FargateTaskDefinition construct.



      :type: string *(optional)* *(readonly)*
      :default: 512


   .. py:attribute:: publicLoadBalancer

      Determines whether the Application Load Balancer will be internet-facing.



      :type: boolean *(optional)* *(readonly)*
      :default: true


   .. py:attribute:: publicTasks

      Determines whether your Fargate Service will be assigned a public IP address.



      :type: boolean *(optional)* *(readonly)*
      :default: false


Multiply
^^^^^^^^

.. py:class:: Multiply(lhs, rhs)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Multiply;

      .. code-tab:: javascript

         const { Multiply } = require('jsii-calc');

      .. code-tab:: typescript

         import { Multiply } from 'jsii-calc';



   The "*" binary operation.



   :extends: :py:class:`~jsii-calc.BinaryOperation`\ 
   :implements: :py:class:`~jsii-calc.IFriendlier`\ 
   :implements: :py:class:`~jsii-calc.IRandomNumberGenerator`\ 
   :param lhs: Left-hand side operand.
   :type lhs: :py:class:`@scope/jsii-calc-lib.Value`\ 
   :param rhs: Right-hand side operand.
   :type rhs: :py:class:`@scope/jsii-calc-lib.Value`\ 

   .. py:method:: farewell() -> string

      *Implements* :py:meth:`jsii-calc.IFriendlier.farewell`

      Say farewell.



      :rtype: string


   .. py:method:: goodbye() -> string

      *Implements* :py:meth:`jsii-calc.IFriendlier.goodbye`

      Say goodbye.



      :rtype: string


   .. py:method:: next() -> number

      *Implements* :py:meth:`jsii-calc.IRandomNumberGenerator.next`

      Returns another random number.



      :rtype: number


   .. py:method:: toString() -> string

      *Implements* :py:meth:`@scope/jsii-calc-lib.Operation.toString`

      String representation of the value.



      :rtype: string


   .. py:attribute:: value

      *Implements* :py:meth:`@scope/jsii-calc-lib.Value.value`

      The value.



      :type: number *(readonly)*


   .. py:method:: typeName() -> any

      *Inherited from* :py:meth:`@scope/jsii-calc-base.Base <@scope/jsii-calc-base.Base.typeName>`

      :return: the name of the class (to verify native type names are created for derived classes).
      :rtype: any


   .. py:method:: hello() -> string

      *Inherited from* :py:meth:`jsii-calc.BinaryOperation <jsii-calc.BinaryOperation.hello>`

      Say hello!



      :rtype: string


   .. py:attribute:: lhs

      *Inherited from* :py:attr:`jsii-calc.BinaryOperation <jsii-calc.BinaryOperation.lhs>`

      Left-hand side operand.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\  *(readonly)*


   .. py:attribute:: rhs

      *Inherited from* :py:attr:`jsii-calc.BinaryOperation <jsii-calc.BinaryOperation.rhs>`

      Right-hand side operand.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\  *(readonly)*


Negate
^^^^^^

.. py:class:: Negate(operand)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Negate;

      .. code-tab:: javascript

         const { Negate } = require('jsii-calc');

      .. code-tab:: typescript

         import { Negate } from 'jsii-calc';



   The negation operation ("-value").



   :extends: :py:class:`~jsii-calc.UnaryOperation`\ 
   :implements: :py:class:`~jsii-calc.IFriendlier`\ 
   :param operand: 
   :type operand: :py:class:`@scope/jsii-calc-lib.Value`\ 

   .. py:method:: farewell() -> string

      *Implements* :py:meth:`jsii-calc.IFriendlier.farewell`

      Say farewell.



      :rtype: string


   .. py:method:: goodbye() -> string

      *Implements* :py:meth:`jsii-calc.IFriendlier.goodbye`

      Say goodbye.



      :rtype: string


   .. py:method:: hello() -> string

      *Implements* :py:meth:`@scope/jsii-calc-lib.IFriendly.hello`

      Say hello!



      :rtype: string


   .. py:method:: toString() -> string

      *Implements* :py:meth:`@scope/jsii-calc-lib.Operation.toString`

      String representation of the value.



      :rtype: string


   .. py:attribute:: value

      *Implements* :py:meth:`@scope/jsii-calc-lib.Value.value`

      The value.



      :type: number *(readonly)*


   .. py:method:: typeName() -> any

      *Inherited from* :py:meth:`@scope/jsii-calc-base.Base <@scope/jsii-calc-base.Base.typeName>`

      :return: the name of the class (to verify native type names are created for derived classes).
      :rtype: any


   .. py:attribute:: operand

      *Inherited from* :py:attr:`jsii-calc.UnaryOperation <jsii-calc.UnaryOperation.operand>`

      :type: :py:class:`@scope/jsii-calc-lib.Value`\  *(readonly)*


NodeStandardLibrary
^^^^^^^^^^^^^^^^^^^

.. py:class:: NodeStandardLibrary()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.NodeStandardLibrary;

      .. code-tab:: javascript

         const { NodeStandardLibrary } = require('jsii-calc');

      .. code-tab:: typescript

         import { NodeStandardLibrary } from 'jsii-calc';



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


NullShouldBeTreatedAsUndefined
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: NullShouldBeTreatedAsUndefined(_param1, [optional])

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.NullShouldBeTreatedAsUndefined;

      .. code-tab:: javascript

         const { NullShouldBeTreatedAsUndefined } = require('jsii-calc');

      .. code-tab:: typescript

         import { NullShouldBeTreatedAsUndefined } from 'jsii-calc';



   jsii#282, aws-cdk#157: null should be treated as "undefined".



   :param _param1: 
   :type _param1: string
   :param optional: 
   :type optional: any

   .. py:method:: giveMeUndefined([value])

      :param value: 
      :type value: any


   .. py:method:: giveMeUndefinedInsideAnObject(input)

      :param input: 
      :type input: :py:class:`~jsii-calc.NullShouldBeTreatedAsUndefinedData`\ 


   .. py:method:: verifyPropertyIsUndefined()



   .. py:attribute:: changeMeToUndefined

      :type: string *(optional)*


NullShouldBeTreatedAsUndefinedData (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: NullShouldBeTreatedAsUndefinedData

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.NullShouldBeTreatedAsUndefinedData;

      .. code-tab:: javascript

         // NullShouldBeTreatedAsUndefinedData is an interface

      .. code-tab:: typescript

         import { NullShouldBeTreatedAsUndefinedData } from 'jsii-calc';





   .. py:attribute:: arrayWithThreeElementsAndUndefinedAsSecondArgument

      :type: any[] *(readonly)*


   .. py:attribute:: thisShouldBeUndefined

      :type: any *(readonly)*


NumberGenerator
^^^^^^^^^^^^^^^

.. py:class:: NumberGenerator(generator)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.NumberGenerator;

      .. code-tab:: javascript

         const { NumberGenerator } = require('jsii-calc');

      .. code-tab:: typescript

         import { NumberGenerator } from 'jsii-calc';



   This allows us to test that a reference can be stored for objects that implement interfaces.



   :param generator: 
   :type generator: :py:class:`~jsii-calc.IRandomNumberGenerator`\ 

   .. py:method:: isSameGenerator(gen) -> boolean

      :param gen: 
      :type gen: :py:class:`~jsii-calc.IRandomNumberGenerator`\ 
      :rtype: boolean


   .. py:method:: nextTimes100() -> number

      :rtype: number


   .. py:attribute:: generator

      :type: :py:class:`~jsii-calc.IRandomNumberGenerator`\ 


ObjectRefsInCollections
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ObjectRefsInCollections()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ObjectRefsInCollections;

      .. code-tab:: javascript

         const { ObjectRefsInCollections } = require('jsii-calc');

      .. code-tab:: typescript

         import { ObjectRefsInCollections } from 'jsii-calc';



   Verify that object references can be passed inside collections.




   .. py:method:: sumFromArray(values) -> number

      Returns the sum of all values.



      :param values: 
      :type values: :py:class:`@scope/jsii-calc-lib.Value`\ []
      :rtype: number


   .. py:method:: sumFromMap(values) -> number

      Returns the sum of all values in a map.



      :param values: 
      :type values: string => :py:class:`@scope/jsii-calc-lib.Value`\ 
      :rtype: number


Old
^^^

.. py:class:: Old()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Old;

      .. code-tab:: javascript

         const { Old } = require('jsii-calc');

      .. code-tab:: typescript

         import { Old } from 'jsii-calc';



   Old class.




   .. py:method:: doAThing()

      Doo wop that thing.





OptionalConstructorArgument
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: OptionalConstructorArgument(arg1, arg2, [arg3])

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.OptionalConstructorArgument;

      .. code-tab:: javascript

         const { OptionalConstructorArgument } = require('jsii-calc');

      .. code-tab:: typescript

         import { OptionalConstructorArgument } from 'jsii-calc';



   :param arg1: 
   :type arg1: number
   :param arg2: 
   :type arg2: string
   :param arg3: 
   :type arg3: date

   .. py:attribute:: arg1

      :type: number *(readonly)*


   .. py:attribute:: arg2

      :type: string *(readonly)*


   .. py:attribute:: arg3

      :type: date *(optional)* *(readonly)*


OptionalStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: OptionalStruct

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.OptionalStruct;

      .. code-tab:: javascript

         // OptionalStruct is an interface

      .. code-tab:: typescript

         import { OptionalStruct } from 'jsii-calc';





   .. py:attribute:: field

      :type: string *(optional)* *(readonly)*


OptionalStructConsumer
^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: OptionalStructConsumer([optionalStruct])

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.OptionalStructConsumer;

      .. code-tab:: javascript

         const { OptionalStructConsumer } = require('jsii-calc');

      .. code-tab:: typescript

         import { OptionalStructConsumer } from 'jsii-calc';



   :param optionalStruct: 
   :type optionalStruct: :py:class:`~jsii-calc.OptionalStruct`\ 

   .. py:attribute:: parameterWasUndefined

      :type: boolean *(readonly)*


   .. py:attribute:: fieldValue

      :type: string *(optional)* *(readonly)*


OverrideReturnsObject
^^^^^^^^^^^^^^^^^^^^^

.. py:class:: OverrideReturnsObject()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.OverrideReturnsObject;

      .. code-tab:: javascript

         const { OverrideReturnsObject } = require('jsii-calc');

      .. code-tab:: typescript

         import { OverrideReturnsObject } from 'jsii-calc';




   .. py:method:: test(obj) -> number

      :param obj: 
      :type obj: :py:class:`~jsii-calc.IReturnsNumber`\ 
      :rtype: number


PartiallyInitializedThisConsumer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: PartiallyInitializedThisConsumer()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.PartiallyInitializedThisConsumer;

      .. code-tab:: javascript

         const { PartiallyInitializedThisConsumer } = require('jsii-calc');

      .. code-tab:: typescript

         import { PartiallyInitializedThisConsumer } from 'jsii-calc';



   :abstract: Yes

   .. py:method:: consumePartiallyInitializedThis(obj, dt, ev) -> string

      :param obj: 
      :type obj: :py:class:`~jsii-calc.ConstructorPassesThisOut`\ 
      :param dt: 
      :type dt: date
      :param ev: 
      :type ev: :py:class:`~jsii-calc.AllTypesEnum`\ 
      :rtype: string
      :abstract: Yes


Polymorphism
^^^^^^^^^^^^

.. py:class:: Polymorphism()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Polymorphism;

      .. code-tab:: javascript

         const { Polymorphism } = require('jsii-calc');

      .. code-tab:: typescript

         import { Polymorphism } from 'jsii-calc';




   .. py:method:: sayHello(friendly) -> string

      :param friendly: 
      :type friendly: :py:class:`@scope/jsii-calc-lib.IFriendly`\ 
      :rtype: string


Power
^^^^^

.. py:class:: Power(base, pow)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Power;

      .. code-tab:: javascript

         const { Power } = require('jsii-calc');

      .. code-tab:: typescript

         import { Power } from 'jsii-calc';



   The power operation.



   :extends: :py:class:`~jsii-calc.composition.CompositeOperation`\ 
   :param base: The base of the power.
   :type base: :py:class:`@scope/jsii-calc-lib.Value`\ 
   :param pow: The number of times to multiply.
   :type pow: :py:class:`@scope/jsii-calc-lib.Value`\ 

   .. py:attribute:: base

      The base of the power.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\  *(readonly)*


   .. py:attribute:: expression

      *Implements* :py:meth:`jsii-calc.composition.CompositeOperation.expression`

      The expression that this operation consists of. Must be implemented by derived classes.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\  *(readonly)*


   .. py:attribute:: pow

      The number of times to multiply.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\  *(readonly)*


   .. py:method:: typeName() -> any

      *Inherited from* :py:meth:`@scope/jsii-calc-base.Base <@scope/jsii-calc-base.Base.typeName>`

      :return: the name of the class (to verify native type names are created for derived classes).
      :rtype: any


   .. py:method:: toString() -> string

      *Inherited from* :py:meth:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.toString>`

      String representation of the value.



      :rtype: string


   .. py:attribute:: value

      *Inherited from* :py:attr:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.value>`

      The value.



      :type: number *(readonly)*


   .. py:attribute:: decorationPostfixes

      *Inherited from* :py:attr:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.decorationPostfixes>`

      A set of postfixes to include in a decorated .toString().



      :type: string[]


   .. py:attribute:: decorationPrefixes

      *Inherited from* :py:attr:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.decorationPrefixes>`

      A set of prefixes to include in a decorated .toString().



      :type: string[]


   .. py:attribute:: stringStyle

      *Inherited from* :py:attr:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.stringStyle>`

      The .toString() style.



      :type: :py:class:`~jsii-calc.composition.CompositeOperation.CompositionStringStyle`\ 


PublicClass
^^^^^^^^^^^

.. py:class:: PublicClass()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.PublicClass;

      .. code-tab:: javascript

         const { PublicClass } = require('jsii-calc');

      .. code-tab:: typescript

         import { PublicClass } from 'jsii-calc';




   .. py:method:: hello()



PythonReservedWords
^^^^^^^^^^^^^^^^^^^

.. py:class:: PythonReservedWords()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.PythonReservedWords;

      .. code-tab:: javascript

         const { PythonReservedWords } = require('jsii-calc');

      .. code-tab:: typescript

         import { PythonReservedWords } from 'jsii-calc';




   .. py:method:: and()



   .. py:method:: as()



   .. py:method:: assert()



   .. py:method:: async()



   .. py:method:: await()



   .. py:method:: break()



   .. py:method:: class()



   .. py:method:: continue()



   .. py:method:: def()



   .. py:method:: del()



   .. py:method:: elif()



   .. py:method:: else()



   .. py:method:: except()



   .. py:method:: finally()



   .. py:method:: for()



   .. py:method:: from()



   .. py:method:: global()



   .. py:method:: if()



   .. py:method:: import()



   .. py:method:: in()



   .. py:method:: is()



   .. py:method:: lambda()



   .. py:method:: nonlocal()



   .. py:method:: not()



   .. py:method:: or()



   .. py:method:: pass()



   .. py:method:: raise()



   .. py:method:: return()



   .. py:method:: try()



   .. py:method:: while()



   .. py:method:: with()



   .. py:method:: yield()



ReferenceEnumFromScopedPackage
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ReferenceEnumFromScopedPackage()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ReferenceEnumFromScopedPackage;

      .. code-tab:: javascript

         const { ReferenceEnumFromScopedPackage } = require('jsii-calc');

      .. code-tab:: typescript

         import { ReferenceEnumFromScopedPackage } from 'jsii-calc';



   See awslabs/jsii#138.




   .. py:method:: loadFoo() -> @scope/jsii-calc-lib.EnumFromScopedModule

      :rtype: :py:class:`@scope/jsii-calc-lib.EnumFromScopedModule`\  *(optional)*


   .. py:method:: saveFoo(value)

      :param value: 
      :type value: :py:class:`@scope/jsii-calc-lib.EnumFromScopedModule`\ 


   .. py:attribute:: foo

      :type: :py:class:`@scope/jsii-calc-lib.EnumFromScopedModule`\  *(optional)*


ReturnsPrivateImplementationOfInterface
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: ReturnsPrivateImplementationOfInterface()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.ReturnsPrivateImplementationOfInterface;

      .. code-tab:: javascript

         const { ReturnsPrivateImplementationOfInterface } = require('jsii-calc');

      .. code-tab:: typescript

         import { ReturnsPrivateImplementationOfInterface } from 'jsii-calc';



   Helps ensure the JSII kernel & runtime cooperate correctly when an un-exported instance of a class is returned with a declared type that is an exported interface, and the instance inherits from an exported class.

   https://github.com/aws/jsii/issues/320



   .. py:attribute:: privateImplementation

      :type: :py:class:`~jsii-calc.IPrivatelyImplemented`\  *(readonly)*


RuntimeTypeChecking
^^^^^^^^^^^^^^^^^^^

.. py:class:: RuntimeTypeChecking()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.RuntimeTypeChecking;

      .. code-tab:: javascript

         const { RuntimeTypeChecking } = require('jsii-calc');

      .. code-tab:: typescript

         import { RuntimeTypeChecking } from 'jsii-calc';




   .. py:method:: methodWithDefaultedArguments([arg1, [arg2, [arg3]]])

      :param arg1: 
      :type arg1: number
      :param arg2: 
      :type arg2: string
      :param arg3: 
      :type arg3: date


   .. py:method:: methodWithOptionalAnyArgument([arg])

      :param arg: 
      :type arg: any


   .. py:method:: methodWithOptionalArguments(arg1, arg2, [arg3])

      Used to verify verification of number of method arguments.



      :param arg1: 
      :type arg1: number
      :param arg2: 
      :type arg2: string
      :param arg3: 
      :type arg3: date


SecondLevelStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: SecondLevelStruct

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.SecondLevelStruct;

      .. code-tab:: javascript

         // SecondLevelStruct is an interface

      .. code-tab:: typescript

         import { SecondLevelStruct } from 'jsii-calc';





   .. py:attribute:: deeperRequiredProp

      It's long and required.



      :type: string *(readonly)*


   .. py:attribute:: deeperOptionalProp

      It's long, but you'll almost never pass it.



      :type: string *(optional)* *(readonly)*


SingleInstanceTwoTypes
^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: SingleInstanceTwoTypes()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.SingleInstanceTwoTypes;

      .. code-tab:: javascript

         const { SingleInstanceTwoTypes } = require('jsii-calc');

      .. code-tab:: typescript

         import { SingleInstanceTwoTypes } from 'jsii-calc';



   Test that a single instance can be returned under two different FQNs.

   

   JSII clients can instantiate 2 different strongly-typed wrappers for the same

   object. Unfortunately, this will break object equality, but if we didn't do

   this it would break runtime type checks in the JVM or CLR.




   .. py:method:: interface1() -> jsii-calc.InbetweenClass

      :rtype: :py:class:`~jsii-calc.InbetweenClass`\ 


   .. py:method:: interface2() -> jsii-calc.IPublicInterface

      :rtype: :py:class:`~jsii-calc.IPublicInterface`\ 


SingletonInt
^^^^^^^^^^^^

.. py:class:: SingletonInt

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.SingletonInt;

      .. code-tab:: javascript

         const { SingletonInt } = require('jsii-calc');

      .. code-tab:: typescript

         import { SingletonInt } from 'jsii-calc';



   Verifies that singleton enums are handled correctly.

   

   https://github.com/aws/jsii/issues/231




   .. py:method:: isSingletonInt(value) -> boolean

      :param value: 
      :type value: number
      :rtype: boolean


SingletonIntEnum (enum)
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: SingletonIntEnum

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.SingletonIntEnum;

      .. code-tab:: javascript

         const { SingletonIntEnum } = require('jsii-calc');

      .. code-tab:: typescript

         import { SingletonIntEnum } from 'jsii-calc';



   A singleton integer.



   .. py:data:: SINGLETON_INT

   Elite!




SingletonString
^^^^^^^^^^^^^^^

.. py:class:: SingletonString

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.SingletonString;

      .. code-tab:: javascript

         const { SingletonString } = require('jsii-calc');

      .. code-tab:: typescript

         import { SingletonString } from 'jsii-calc';



   Verifies that singleton enums are handled correctly.

   

   https://github.com/aws/jsii/issues/231




   .. py:method:: isSingletonString(value) -> boolean

      :param value: 
      :type value: string
      :rtype: boolean


SingletonStringEnum (enum)
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: SingletonStringEnum

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.SingletonStringEnum;

      .. code-tab:: javascript

         const { SingletonStringEnum } = require('jsii-calc');

      .. code-tab:: typescript

         import { SingletonStringEnum } from 'jsii-calc';



   A singleton string.



   .. py:data:: SINGLETON_STRING

   1337.




StableClass
^^^^^^^^^^^

.. py:class:: StableClass(readonlyString, [mutableNumber])

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.StableClass;

      .. code-tab:: javascript

         const { StableClass } = require('jsii-calc');

      .. code-tab:: typescript

         import { StableClass } from 'jsii-calc';



   :param readonlyString: 
   :type readonlyString: string
   :param mutableNumber: 
   :type mutableNumber: number

   .. py:method:: method()



   .. py:attribute:: readonlyProperty

      :type: string *(readonly)*


   .. py:attribute:: mutableProperty

      :type: number *(optional)*


StableEnum (enum)
^^^^^^^^^^^^^^^^^

.. py:class:: StableEnum

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.StableEnum;

      .. code-tab:: javascript

         const { StableEnum } = require('jsii-calc');

      .. code-tab:: typescript

         import { StableEnum } from 'jsii-calc';



   .. py:data:: OPTION_A

   .. py:data:: OPTION_B


StableStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: StableStruct

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.StableStruct;

      .. code-tab:: javascript

         // StableStruct is an interface

      .. code-tab:: typescript

         import { StableStruct } from 'jsii-calc';





   .. py:attribute:: readonlyProperty

      :type: string *(readonly)*


StaticContext
^^^^^^^^^^^^^

.. py:class:: StaticContext

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.StaticContext;

      .. code-tab:: javascript

         const { StaticContext } = require('jsii-calc');

      .. code-tab:: typescript

         import { StaticContext } from 'jsii-calc';



   This is used to validate the ability to use `this` from within a static context.

   

   https://github.com/awslabs/aws-cdk/issues/2304




   .. py:staticmethod:: canAccessStaticContext() -> boolean

      :rtype: boolean


   .. py:attribute:: staticVariable

      :type: boolean *(static)*


Statics
^^^^^^^

.. py:class:: Statics(value)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Statics;

      .. code-tab:: javascript

         const { Statics } = require('jsii-calc');

      .. code-tab:: typescript

         import { Statics } from 'jsii-calc';



   :param value: 
   :type value: string

   .. py:staticmethod:: staticMethod(name) -> string

      Jsdocs for static method.



      :param name: The name of the person to say hello to.
      :type name: string
      :rtype: string


   .. py:method:: justMethod() -> string

      :rtype: string


   .. py:attribute:: BAR

      Constants may also use all-caps.



      :type: number *(readonly)* *(static)*


   .. py:attribute:: ConstObj

      :type: :py:class:`~jsii-calc.DoubleTrouble`\  *(readonly)* *(static)*


   .. py:attribute:: Foo

      Jsdocs for static property.



      :type: string *(readonly)* *(static)*


   .. py:attribute:: zooBar

      Constants can also use camelCase.



      :type: string => string *(readonly)* *(static)*


   .. py:attribute:: instance

      Jsdocs for static getter. Jsdocs for static setter.



      :type: :py:class:`~jsii-calc.Statics`\  *(static)*


   .. py:attribute:: nonConstStatic

      :type: number *(static)*


   .. py:attribute:: value

      :type: string *(readonly)*


StringEnum (enum)
^^^^^^^^^^^^^^^^^

.. py:class:: StringEnum

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.StringEnum;

      .. code-tab:: javascript

         const { StringEnum } = require('jsii-calc');

      .. code-tab:: typescript

         import { StringEnum } from 'jsii-calc';



   .. py:data:: A

   .. py:data:: B

   .. py:data:: C


StripInternal
^^^^^^^^^^^^^

.. py:class:: StripInternal()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.StripInternal;

      .. code-tab:: javascript

         const { StripInternal } = require('jsii-calc');

      .. code-tab:: typescript

         import { StripInternal } from 'jsii-calc';




   .. py:attribute:: youSeeMe

      :type: string


StructPassing
^^^^^^^^^^^^^

.. py:class:: StructPassing()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.StructPassing;

      .. code-tab:: javascript

         const { StructPassing } = require('jsii-calc');

      .. code-tab:: typescript

         import { StructPassing } from 'jsii-calc';



   Just because we can.




   .. py:staticmethod:: howManyVarArgsDidIPass(_positional, *inputs) -> number

      :param _positional: 
      :type _positional: number
      :param \*inputs: 
      :type \*inputs: :py:class:`~jsii-calc.TopLevelStruct`\ 
      :rtype: number


   .. py:staticmethod:: roundTrip(_positional, input) -> jsii-calc.TopLevelStruct

      :param _positional: 
      :type _positional: number
      :param input: 
      :type input: :py:class:`~jsii-calc.TopLevelStruct`\ 
      :rtype: :py:class:`~jsii-calc.TopLevelStruct`\ 


StructWithJavaReservedWords (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: StructWithJavaReservedWords

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.StructWithJavaReservedWords;

      .. code-tab:: javascript

         // StructWithJavaReservedWords is an interface

      .. code-tab:: typescript

         import { StructWithJavaReservedWords } from 'jsii-calc';





   .. py:attribute:: default

      :type: string *(readonly)*


   .. py:attribute:: assert

      :type: string *(optional)* *(readonly)*


   .. py:attribute:: result

      :type: string *(optional)* *(readonly)*


   .. py:attribute:: that

      :type: string *(optional)* *(readonly)*


Sum
^^^

.. py:class:: Sum()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Sum;

      .. code-tab:: javascript

         const { Sum } = require('jsii-calc');

      .. code-tab:: typescript

         import { Sum } from 'jsii-calc';



   An operation that sums multiple values.



   :extends: :py:class:`~jsii-calc.composition.CompositeOperation`\ 

   .. py:attribute:: expression

      *Implements* :py:meth:`jsii-calc.composition.CompositeOperation.expression`

      The expression that this operation consists of. Must be implemented by derived classes.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\  *(readonly)*


   .. py:attribute:: parts

      The parts to sum.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\ []


   .. py:method:: typeName() -> any

      *Inherited from* :py:meth:`@scope/jsii-calc-base.Base <@scope/jsii-calc-base.Base.typeName>`

      :return: the name of the class (to verify native type names are created for derived classes).
      :rtype: any


   .. py:method:: toString() -> string

      *Inherited from* :py:meth:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.toString>`

      String representation of the value.



      :rtype: string


   .. py:attribute:: value

      *Inherited from* :py:attr:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.value>`

      The value.



      :type: number *(readonly)*


   .. py:attribute:: decorationPostfixes

      *Inherited from* :py:attr:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.decorationPostfixes>`

      A set of postfixes to include in a decorated .toString().



      :type: string[]


   .. py:attribute:: decorationPrefixes

      *Inherited from* :py:attr:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.decorationPrefixes>`

      A set of prefixes to include in a decorated .toString().



      :type: string[]


   .. py:attribute:: stringStyle

      *Inherited from* :py:attr:`jsii-calc.composition.CompositeOperation <jsii-calc.composition.CompositeOperation.stringStyle>`

      The .toString() style.



      :type: :py:class:`~jsii-calc.composition.CompositeOperation.CompositionStringStyle`\ 


SyncVirtualMethods
^^^^^^^^^^^^^^^^^^

.. py:class:: SyncVirtualMethods()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.SyncVirtualMethods;

      .. code-tab:: javascript

         const { SyncVirtualMethods } = require('jsii-calc');

      .. code-tab:: typescript

         import { SyncVirtualMethods } from 'jsii-calc';




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

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.Thrower;

      .. code-tab:: javascript

         const { Thrower } = require('jsii-calc');

      .. code-tab:: typescript

         import { Thrower } from 'jsii-calc';




   .. py:method:: throwError()



TopLevelStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: TopLevelStruct

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.TopLevelStruct;

      .. code-tab:: javascript

         // TopLevelStruct is an interface

      .. code-tab:: typescript

         import { TopLevelStruct } from 'jsii-calc';





   .. py:attribute:: required

      This is a required field.



      :type: string *(readonly)*


   .. py:attribute:: secondLevel

      A union to really stress test our serialization.



      :type: number or :py:class:`~jsii-calc.SecondLevelStruct`\  *(readonly)*


   .. py:attribute:: optional

      You don't have to pass this.



      :type: string *(optional)* *(readonly)*


UnaryOperation
^^^^^^^^^^^^^^

.. py:class:: UnaryOperation(operand)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.UnaryOperation;

      .. code-tab:: javascript

         const { UnaryOperation } = require('jsii-calc');

      .. code-tab:: typescript

         import { UnaryOperation } from 'jsii-calc';



   An operation on a single operand.



   :extends: :py:class:`@scope/jsii-calc-lib.Operation`\ 
   :abstract: Yes
   :param operand: 
   :type operand: :py:class:`@scope/jsii-calc-lib.Value`\ 

   .. py:attribute:: operand

      :type: :py:class:`@scope/jsii-calc-lib.Value`\  *(readonly)*


   .. py:method:: typeName() -> any

      *Inherited from* :py:meth:`@scope/jsii-calc-base.Base <@scope/jsii-calc-base.Base.typeName>`

      :return: the name of the class (to verify native type names are created for derived classes).
      :rtype: any


   .. py:method:: toString() -> string

      *Inherited from* :py:meth:`@scope/jsii-calc-lib.Operation <@scope/jsii-calc-lib.Operation.toString>`

      String representation of the value.



      :rtype: string
      :abstract: Yes


   .. py:attribute:: value

      *Inherited from* :py:attr:`@scope/jsii-calc-lib.Value <@scope/jsii-calc-lib.Value.value>`

      The value.



      :type: number *(readonly)* *(abstract)*


UnionProperties (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: UnionProperties

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.UnionProperties;

      .. code-tab:: javascript

         // UnionProperties is an interface

      .. code-tab:: typescript

         import { UnionProperties } from 'jsii-calc';





   .. py:attribute:: bar

      :type: string or number or :py:class:`~jsii-calc.AllTypes`\  *(readonly)*


   .. py:attribute:: foo

      :type: string or number *(optional)* *(readonly)*


UseBundledDependency
^^^^^^^^^^^^^^^^^^^^

.. py:class:: UseBundledDependency()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.UseBundledDependency;

      .. code-tab:: javascript

         const { UseBundledDependency } = require('jsii-calc');

      .. code-tab:: typescript

         import { UseBundledDependency } from 'jsii-calc';




   .. py:method:: value() -> any

      :rtype: any


UseCalcBase
^^^^^^^^^^^

.. py:class:: UseCalcBase()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.UseCalcBase;

      .. code-tab:: javascript

         const { UseCalcBase } = require('jsii-calc');

      .. code-tab:: typescript

         import { UseCalcBase } from 'jsii-calc';



   Depend on a type from jsii-calc-base as a test for awslabs/jsii#128.




   .. py:method:: hello() -> @scope/jsii-calc-base.Base

      :rtype: :py:class:`@scope/jsii-calc-base.Base`\ 


UsesInterfaceWithProperties
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: UsesInterfaceWithProperties(obj)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.UsesInterfaceWithProperties;

      .. code-tab:: javascript

         const { UsesInterfaceWithProperties } = require('jsii-calc');

      .. code-tab:: typescript

         import { UsesInterfaceWithProperties } from 'jsii-calc';



   :param obj: 
   :type obj: :py:class:`~jsii-calc.IInterfaceWithProperties`\ 

   .. py:method:: justRead() -> string

      :rtype: string


   .. py:method:: readStringAndNumber(ext) -> string

      :param ext: 
      :type ext: :py:class:`~jsii-calc.IInterfaceWithPropertiesExtension`\ 
      :rtype: string


   .. py:method:: writeAndRead(value) -> string

      :param value: 
      :type value: string
      :rtype: string


   .. py:attribute:: obj

      :type: :py:class:`~jsii-calc.IInterfaceWithProperties`\  *(readonly)*


VariadicMethod
^^^^^^^^^^^^^^

.. py:class:: VariadicMethod(*prefix)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.VariadicMethod;

      .. code-tab:: javascript

         const { VariadicMethod } = require('jsii-calc');

      .. code-tab:: typescript

         import { VariadicMethod } from 'jsii-calc';



   :param \*prefix: a prefix that will be use for all values returned by `#asArray`.
   :type \*prefix: number

   .. py:method:: asArray(first, *others) -> number[]

      :param first: the first element of the array to be returned (after the `prefix` provided at construction time).
      :type first: number
      :param \*others: other elements to be included in the array.
      :type \*others: number
      :rtype: number[]


VirtualMethodPlayground
^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: VirtualMethodPlayground()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.VirtualMethodPlayground;

      .. code-tab:: javascript

         const { VirtualMethodPlayground } = require('jsii-calc');

      .. code-tab:: typescript

         import { VirtualMethodPlayground } from 'jsii-calc';




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


VoidCallback
^^^^^^^^^^^^

.. py:class:: VoidCallback()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.VoidCallback;

      .. code-tab:: javascript

         const { VoidCallback } = require('jsii-calc');

      .. code-tab:: typescript

         import { VoidCallback } from 'jsii-calc';



   This test is used to validate the runtimes can return correctly from a void callback.

   

   - Implement `overrideMe` (method does not have to do anything).

   - Invoke `callMe`

   - Verify that `methodWasCalled` is `true`.



   :abstract: Yes

   .. py:method:: callMe()



   .. py:method:: overrideMe()

      *Protected method*

      :abstract: Yes


   .. py:attribute:: methodWasCalled

      :type: boolean *(readonly)*


WithPrivatePropertyInConstructor
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: WithPrivatePropertyInConstructor([privateField])

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.WithPrivatePropertyInConstructor;

      .. code-tab:: javascript

         const { WithPrivatePropertyInConstructor } = require('jsii-calc');

      .. code-tab:: typescript

         import { WithPrivatePropertyInConstructor } from 'jsii-calc';



   Verifies that private property declarations in constructor arguments are hidden.



   :param privateField: 
   :type privateField: string

   .. py:attribute:: success

      :type: boolean *(readonly)*



composition
^^^^^^^^^^^
.. py:module:: jsii-calc.composition

CompositeOperation
~~~~~~~~~~~~~~~~~~

.. py:class:: CompositeOperation()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.composition.CompositeOperation;

      .. code-tab:: javascript

         const { composition.CompositeOperation } = require('jsii-calc');

      .. code-tab:: typescript

         import { composition.CompositeOperation } from 'jsii-calc';



   Abstract operation composed from an expression of other operations.



   :extends: :py:class:`@scope/jsii-calc-lib.Operation`\ 
   :abstract: Yes

   .. py:method:: toString() -> string

      *Implements* :py:meth:`@scope/jsii-calc-lib.Operation.toString`

      String representation of the value.



      :rtype: string


   .. py:attribute:: expression

      The expression that this operation consists of. Must be implemented by derived classes.



      :type: :py:class:`@scope/jsii-calc-lib.Value`\  *(readonly)* *(abstract)*


   .. py:attribute:: value

      *Implements* :py:meth:`@scope/jsii-calc-lib.Value.value`

      The value.



      :type: number *(readonly)*


   .. py:attribute:: decorationPostfixes

      A set of postfixes to include in a decorated .toString().



      :type: string[]


   .. py:attribute:: decorationPrefixes

      A set of prefixes to include in a decorated .toString().



      :type: string[]


   .. py:attribute:: stringStyle

      The .toString() style.



      :type: :py:class:`~jsii-calc.composition.CompositeOperation.CompositionStringStyle`\ 

   .. py:class:: CompositionStringStyle

      **Language-specific names:**

      .. tabs::

         .. code-tab:: c#

            using Amazon.JSII.Tests.CalculatorNamespace;

         .. code-tab:: java

            import software.amazon.jsii.tests.calculator.composition.CompositeOperation.CompositionStringStyle;

         .. code-tab:: javascript

            const { composition.CompositeOperation.CompositionStringStyle } = require('jsii-calc');

         .. code-tab:: typescript

            import { composition.CompositeOperation.CompositionStringStyle } from 'jsii-calc';



      Style of .toString() output for CompositeOperation.



      .. py:data:: NORMAL

      Normal string expression.



      .. py:data:: DECORATED

      Decorated string expression.





   .. py:method:: typeName() -> any

      *Inherited from* :py:meth:`@scope/jsii-calc-base.Base <@scope/jsii-calc-base.Base.typeName>`

      :return: the name of the class (to verify native type names are created for derived classes).
      :rtype: any



.. py:currentmodule:: jsii-calc

