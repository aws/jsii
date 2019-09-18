@scope/jsii-calc-lib
====================

Reference
---------

.. tabs::

   .. group-tab:: C#

      View in `Nuget <https://www.nuget.org/packages/Amazon.JSII.Tests.CalculatorPackageId.LibPackageId/0.17.0>`_

      **csproj**:

      .. code-block:: xml

         <PackageReference Include="Amazon.JSII.Tests.CalculatorPackageId.LibPackageId" Version="0.17.0" />

      **dotnet**:

      .. code-block:: console

         dotnet add package Amazon.JSII.Tests.CalculatorPackageId.LibPackageId --version 0.17.0

      **packages.config**:

      .. code-block:: xml

         <package id="Amazon.JSII.Tests.CalculatorPackageId.LibPackageId" version="0.17.0" />


   .. group-tab:: Java

      View in `Maven Central <https://repo1.maven.org/maven2/software/amazon/jsii/tests/calculator-lib/0.17.0/>`_

      **Apache Buildr**:

      .. code-block:: none

         'software.amazon.jsii.tests:calculator-lib:jar:0.17.0'

      **Apache Ivy**:

      .. code-block:: xml

         <dependency groupId="software.amazon.jsii.tests" name="calculator-lib" rev="0.17.0"/>

      **Apache Maven**:

      .. code-block:: xml

         <dependency>
           <groupId>software.amazon.jsii.tests</groupId>
           <artifactId>calculator-lib</artifactId>
           <version>0.17.0</version>
         </dependency>

      **Gradle / Grails**:

      .. code-block:: none

         compile 'software.amazon.jsii.tests:calculator-lib:0.17.0'

      **Groovy Grape**:

      .. code-block:: none

         @Grapes(
         @Grab(group='software.amazon.jsii.tests', module='calculator-lib', version='0.17.0')
         )


   .. group-tab:: JavaScript

      View in `NPM <https://www.npmjs.com/package/@scope/jsii-calc-lib/v/0.17.0>`_

      **npm**:

      .. code-block:: console

         $ npm i @scope/jsii-calc-lib@0.17.0

      **package.json**:

      .. code-block:: js

         {
           "@scope/jsii-calc-lib": "^0.17.0"
         }

      **yarn**:

      .. code-block:: console

         $ yarn add @scope/jsii-calc-lib@0.17.0


   .. group-tab:: TypeScript

      View in `NPM <https://www.npmjs.com/package/@scope/jsii-calc-lib/v/0.17.0>`_

      **npm**:

      .. code-block:: console

         $ npm i @scope/jsii-calc-lib@0.17.0

      **package.json**:

      .. code-block:: js

         {
           "@scope/jsii-calc-lib": "^0.17.0"
         }

      **yarn**:

      .. code-block:: console

         $ yarn add @scope/jsii-calc-lib@0.17.0



.. py:module:: @scope/jsii-calc-lib

EnumFromScopedModule (enum)
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: EnumFromScopedModule

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule;

      .. code-tab:: javascript

         const { EnumFromScopedModule } = require('@scope/jsii-calc-lib');

      .. code-tab:: typescript

         import { EnumFromScopedModule } from '@scope/jsii-calc-lib';



   Check that enums from \@scoped packages can be references. See awslabs/jsii#138.



   .. py:data:: VALUE1

   .. py:data:: VALUE2


IDoublable (interface)
^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IDoublable

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.lib.IDoublable;

      .. code-tab:: javascript

         // IDoublable is an interface

      .. code-tab:: typescript

         import { IDoublable } from '@scope/jsii-calc-lib';



   The general contract for a concrete number.





   .. py:attribute:: doubleValue

      :type: number *(readonly)*


IFriendly (interface)
^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IFriendly

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.lib.IFriendly;

      .. code-tab:: javascript

         // IFriendly is an interface

      .. code-tab:: typescript

         import { IFriendly } from '@scope/jsii-calc-lib';



   Applies to classes that are considered friendly.

   

   These classes can be greeted with

   a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.





   .. py:method:: hello() -> string

      Say hello!



      :rtype: string
      :abstract: Yes


IThreeLevelsInterface (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IThreeLevelsInterface

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.lib.IThreeLevelsInterface;

      .. code-tab:: javascript

         // IThreeLevelsInterface is an interface

      .. code-tab:: typescript

         import { IThreeLevelsInterface } from '@scope/jsii-calc-lib';



   Interface that inherits from packages 2 levels up the tree.

   

   Their presence validates that .NET/Java/jsii-reflect can track all fields

   far enough up the tree.



   :extends: :py:class:`@scope/jsii-calc-base.IBaseInterface`\ 


   .. py:method:: baz()

      :abstract: Yes


   .. py:method:: foo()

      *Inherited from* :py:meth:`@scope/jsii-calc-base-of-base.IVeryBaseInterface <@scope/jsii-calc-base-of-base.IVeryBaseInterface.foo>`

      :abstract: Yes


   .. py:method:: bar()

      *Inherited from* :py:meth:`@scope/jsii-calc-base.IBaseInterface <@scope/jsii-calc-base.IBaseInterface.bar>`

      :abstract: Yes


MyFirstStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: MyFirstStruct

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.lib.MyFirstStruct;

      .. code-tab:: javascript

         // MyFirstStruct is an interface

      .. code-tab:: typescript

         import { MyFirstStruct } from '@scope/jsii-calc-lib';



   This is the first struct we have created in jsii.





   .. py:attribute:: anumber

      An awesome number value.



      :type: number *(readonly)*


   .. py:attribute:: astring

      A string value.



      :type: string *(readonly)*


   .. py:attribute:: firstOptional

      :type: string[] *(optional)* *(readonly)*


Number
^^^^^^

.. py:class:: Number(value)

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.lib.Number;

      .. code-tab:: javascript

         const { Number } = require('@scope/jsii-calc-lib');

      .. code-tab:: typescript

         import { Number } from '@scope/jsii-calc-lib';



   Represents a concrete number.



   :extends: :py:class:`~@scope/jsii-calc-lib.Value`\ 
   :implements: :py:class:`~@scope/jsii-calc-lib.IDoublable`\ 
   :param value: The number.
   :type value: number

   .. py:attribute:: doubleValue

      *Implements* :py:meth:`@scope/jsii-calc-lib.IDoublable.doubleValue`

      The number multiplied by 2.



      :type: number *(readonly)*


   .. py:attribute:: value

      *Implements* :py:meth:`@scope/jsii-calc-lib.Value.value`

      The number.



      :type: number *(readonly)*


   .. py:method:: typeName() -> any

      *Inherited from* :py:meth:`@scope/jsii-calc-base.Base <@scope/jsii-calc-base.Base.typeName>`

      :return: the name of the class (to verify native type names are created for derived classes).
      :rtype: any


   .. py:method:: toString() -> string

      *Inherited from* :py:meth:`@scope/jsii-calc-lib.Value <@scope/jsii-calc-lib.Value.toString>`

      String representation of the value.



      :rtype: string


Operation
^^^^^^^^^

.. py:class:: Operation()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.lib.Operation;

      .. code-tab:: javascript

         const { Operation } = require('@scope/jsii-calc-lib');

      .. code-tab:: typescript

         import { Operation } from '@scope/jsii-calc-lib';



   Represents an operation on values.



   :extends: :py:class:`~@scope/jsii-calc-lib.Value`\ 
   :abstract: Yes

   .. py:method:: toString() -> string

      *Overrides* :py:meth:`@scope/jsii-calc-lib.Value.toString`

      String representation of the value.



      :rtype: string
      :abstract: Yes


   .. py:method:: typeName() -> any

      *Inherited from* :py:meth:`@scope/jsii-calc-base.Base <@scope/jsii-calc-base.Base.typeName>`

      :return: the name of the class (to verify native type names are created for derived classes).
      :rtype: any


   .. py:attribute:: value

      *Inherited from* :py:attr:`@scope/jsii-calc-lib.Value <@scope/jsii-calc-lib.Value.value>`

      The value.



      :type: number *(readonly)* *(abstract)*


StructWithOnlyOptionals (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: StructWithOnlyOptionals

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.lib.StructWithOnlyOptionals;

      .. code-tab:: javascript

         // StructWithOnlyOptionals is an interface

      .. code-tab:: typescript

         import { StructWithOnlyOptionals } from '@scope/jsii-calc-lib';



   This is a struct with only optional properties.





   .. py:attribute:: optional1

      The first optional!



      :type: string *(optional)* *(readonly)*


   .. py:attribute:: optional2

      :type: number *(optional)* *(readonly)*


   .. py:attribute:: optional3

      :type: boolean *(optional)* *(readonly)*


Value
^^^^^

.. py:class:: Value()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.lib.Value;

      .. code-tab:: javascript

         const { Value } = require('@scope/jsii-calc-lib');

      .. code-tab:: typescript

         import { Value } from '@scope/jsii-calc-lib';



   Abstract class which represents a numeric value.



   :extends: :py:class:`@scope/jsii-calc-base.Base`\ 
   :abstract: Yes

   .. py:method:: toString() -> string

      String representation of the value.



      :rtype: string


   .. py:attribute:: value

      The value.



      :type: number *(readonly)* *(abstract)*


   .. py:method:: typeName() -> any

      *Inherited from* :py:meth:`@scope/jsii-calc-base.Base <@scope/jsii-calc-base.Base.typeName>`

      :return: the name of the class (to verify native type names are created for derived classes).
      :rtype: any


