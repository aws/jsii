@scope/jsii-calc-base
=====================

.. tabs::

   .. group-tab:: C#

      View in `Nuget <https://www.nuget.org/packages/Amazon.JSII.Tests.CalculatorPackageId.BasePackageId/0.7.5>`_

      **csproj**:

      .. code-block:: xml

         <PackageReference Include="Amazon.JSII.Tests.CalculatorPackageId.BasePackageId" Version="0.7.5" />

      **dotnet**:

      .. code-block:: console

         dotnet add package Amazon.JSII.Tests.CalculatorPackageId.BasePackageId --version 0.7.5

      **packages.config**:

      .. code-block:: xml

         <package id="Amazon.JSII.Tests.CalculatorPackageId.BasePackageId" version="0.7.5" />


   .. group-tab:: Java

      View in `Maven Central <https://repo1.maven.org/maven2/software/amazon/jsii/tests/calculator-base/0.7.5/>`_

      **Apache Buildr**:

      .. code-block:: none

         'software.amazon.jsii.tests:calculator-base:jar:0.7.5'

      **Apache Ivy**:

      .. code-block:: xml

         <dependency groupId="software.amazon.jsii.tests" name="calculator-base" rev="0.7.5"/>

      **Apache Maven**:

      .. code-block:: xml

         <dependency>
           <groupId>software.amazon.jsii.tests</groupId>
           <artifactId>calculator-base</artifactId>
           <version>0.7.5</version>
         </dependency>

      **Gradle / Grails**:

      .. code-block:: none

         compile 'software.amazon.jsii.tests:calculator-base:0.7.5'

      **Groovy Grape**:

      .. code-block:: none

         @Grapes(
         @Grab(group='software.amazon.jsii.tests', module='calculator-base', version='0.7.5')
         )


   .. group-tab:: JavaScript

      View in `NPM <https://www.npmjs.com/package/@scope/jsii-calc-base/v/0.7.5>`_

      **npm**:

      .. code-block:: console

         $ npm i @scope/jsii-calc-base@0.7.5

      **package.json**:

      .. code-block:: js

         {
           "@scope/jsii-calc-base": "^0.7.5"
         }

      **yarn**:

      .. code-block:: console

         $ yarn add @scope/jsii-calc-base@0.7.5


   .. group-tab:: TypeScript

      View in `NPM <https://www.npmjs.com/package/@scope/jsii-calc-base/v/0.7.5>`_

      **npm**:

      .. code-block:: console

         $ npm i @scope/jsii-calc-base@0.7.5

      **package.json**:

      .. code-block:: js

         {
           "@scope/jsii-calc-base": "^0.7.5"
         }

      **yarn**:

      .. code-block:: console

         $ yarn add @scope/jsii-calc-base@0.7.5



Reference
---------

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

         const { Base } = require('@scope/jsii-calc-base');

      .. code-tab:: typescript

         import { Base } from '@scope/jsii-calc-base';



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

         import { BaseProps } from '@scope/jsii-calc-base';



   :extends: :py:class:`@scope/jsii-calc-base-of-base.VeryBaseProps`


   .. py:attribute:: bar

      :type: string *(abstract)*


