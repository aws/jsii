@scope/jsii-calc-base
=====================

Reference
---------

.. tabs::

   .. group-tab:: C#

      View in `Nuget <https://www.nuget.org/packages/Amazon.JSII.Tests.CalculatorPackageId.BasePackageId/0.17.0>`_

      **csproj**:

      .. code-block:: xml

         <PackageReference Include="Amazon.JSII.Tests.CalculatorPackageId.BasePackageId" Version="0.17.0" />

      **dotnet**:

      .. code-block:: console

         dotnet add package Amazon.JSII.Tests.CalculatorPackageId.BasePackageId --version 0.17.0

      **packages.config**:

      .. code-block:: xml

         <package id="Amazon.JSII.Tests.CalculatorPackageId.BasePackageId" version="0.17.0" />


   .. group-tab:: Java

      View in `Maven Central <https://repo1.maven.org/maven2/software/amazon/jsii/tests/calculator-base/0.17.0/>`_

      **Apache Buildr**:

      .. code-block:: none

         'software.amazon.jsii.tests:calculator-base:jar:0.17.0'

      **Apache Ivy**:

      .. code-block:: xml

         <dependency groupId="software.amazon.jsii.tests" name="calculator-base" rev="0.17.0"/>

      **Apache Maven**:

      .. code-block:: xml

         <dependency>
           <groupId>software.amazon.jsii.tests</groupId>
           <artifactId>calculator-base</artifactId>
           <version>0.17.0</version>
         </dependency>

      **Gradle / Grails**:

      .. code-block:: none

         compile 'software.amazon.jsii.tests:calculator-base:0.17.0'

      **Groovy Grape**:

      .. code-block:: none

         @Grapes(
         @Grab(group='software.amazon.jsii.tests', module='calculator-base', version='0.17.0')
         )


   .. group-tab:: JavaScript

      View in `NPM <https://www.npmjs.com/package/@scope/jsii-calc-base/v/0.17.0>`_

      **npm**:

      .. code-block:: console

         $ npm i @scope/jsii-calc-base@0.17.0

      **package.json**:

      .. code-block:: js

         {
           "@scope/jsii-calc-base": "^0.17.0"
         }

      **yarn**:

      .. code-block:: console

         $ yarn add @scope/jsii-calc-base@0.17.0


   .. group-tab:: TypeScript

      View in `NPM <https://www.npmjs.com/package/@scope/jsii-calc-base/v/0.17.0>`_

      **npm**:

      .. code-block:: console

         $ npm i @scope/jsii-calc-base@0.17.0

      **package.json**:

      .. code-block:: js

         {
           "@scope/jsii-calc-base": "^0.17.0"
         }

      **yarn**:

      .. code-block:: console

         $ yarn add @scope/jsii-calc-base@0.17.0



.. py:module:: @scope/jsii-calc-base

Base
^^^^

.. py:class:: Base()

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.base.Base;

      .. code-tab:: javascript

         const { Base } = require('@scope/jsii-calc-base');

      .. code-tab:: typescript

         import { Base } from '@scope/jsii-calc-base';



   A base class.



   :abstract: Yes

   .. py:method:: typeName() -> any

      :return: the name of the class (to verify native type names are created for derived classes).
      :rtype: any


BaseProps (interface)
^^^^^^^^^^^^^^^^^^^^^

.. py:class:: BaseProps

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.base.BaseProps;

      .. code-tab:: javascript

         // BaseProps is an interface

      .. code-tab:: typescript

         import { BaseProps } from '@scope/jsii-calc-base';



   :extends: :py:class:`@scope/jsii-calc-base-of-base.VeryBaseProps`\ 


   .. py:attribute:: bar

      :type: string *(readonly)*


   .. py:attribute:: foo

      *Inherited from* :py:attr:`@scope/jsii-calc-base-of-base.VeryBaseProps <@scope/jsii-calc-base-of-base.VeryBaseProps.foo>`

      :type: :py:class:`@scope/jsii-calc-base-of-base.Very`\  *(readonly)*


IBaseInterface (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IBaseInterface

   **Language-specific names:**

   .. tabs::

      .. code-tab:: c#

         using Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace;

      .. code-tab:: java

         import software.amazon.jsii.tests.calculator.base.IBaseInterface;

      .. code-tab:: javascript

         // IBaseInterface is an interface

      .. code-tab:: typescript

         import { IBaseInterface } from '@scope/jsii-calc-base';



   :extends: :py:class:`@scope/jsii-calc-base-of-base.IVeryBaseInterface`\ 


   .. py:method:: bar()

      :abstract: Yes


   .. py:method:: foo()

      *Inherited from* :py:meth:`@scope/jsii-calc-base-of-base.IVeryBaseInterface <@scope/jsii-calc-base-of-base.IVeryBaseInterface.foo>`

      :abstract: Yes


