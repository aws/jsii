@scope/jsii-calc-lib
====================

.. tabs::

   .. group-tab:: Maven

      ::

         <?xml version="1.0"?>
         <dependency>
           <groupId>com.amazonaws.jsii.tests</groupId>
           <artifactId>calculator-lib</artifactId>
           <version>[0.5.0-beta,0.5.0)</version>
         </dependency>


   .. group-tab:: NPM

      ::

         {
           "@scope/jsii-calc-lib": "^0.5.0-beta"
         }



Reference
---------

.. py:module:: @scope/jsii-calc-lib

EnumFromScopedModule (enum)
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: EnumFromScopedModule

   .. py:data:: Value1

   .. py:data:: Value2


IFriendly (interface)
^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IFriendly

   .. tabs::

      .. code-tab:: java

         org.jsii.tests.calculator.lib.IFriendly

      .. code-tab:: typescript

         IFriendly



   Applies to classes that are considered friendly. These classes can be greeted with a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.




   .. py:method:: hello() -> string

      Say hello!


      :rtype: string


MyFirstStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: MyFirstStruct

   .. tabs::

      .. code-tab:: java

         org.jsii.tests.calculator.lib.MyFirstStruct

      .. code-tab:: typescript

         MyFirstStruct



   This is the first struct we have created in jsii




   .. py:attribute:: astring

      A string value


      :type: string


   .. py:attribute:: anumber

      An awesome number value


      :type: number


   .. py:attribute:: firstOptional

      :type: string or undefined


Number
^^^^^^

.. py:class:: Number(value)

   .. tabs::

      .. code-tab:: java

         org.jsii.tests.calculator.lib.Number

      .. code-tab:: javascript

         Number

      .. code-tab:: typescript

         Number



   Represents a concrete number.


   :extends: :py:class:`~@scope/jsii-calc-lib.Value`
   :param value: The number.
   :type value: number

   .. py:attribute:: value

      The number.


      :type: number *(readonly)*


   .. py:attribute:: doubleValue

      The number multiplied by 2.


      :type: number *(readonly)*


Operation
^^^^^^^^^

.. py:class:: Operation()

   .. tabs::

      .. code-tab:: java

         org.jsii.tests.calculator.lib.Operation

      .. code-tab:: javascript

         Operation

      .. code-tab:: typescript

         Operation



   Represents an operation on values.


   :extends: :py:class:`~@scope/jsii-calc-lib.Value`
   :abstract: Yes

   .. py:method:: toString() -> string

      String representation of the value.


      :rtype: string
      :abstract: Yes


StructWithOnlyOptionals (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: StructWithOnlyOptionals

   .. tabs::

      .. code-tab:: java

         org.jsii.tests.calculator.lib.StructWithOnlyOptionals

      .. code-tab:: typescript

         StructWithOnlyOptionals



   This is a struct with only optional properties.




   .. py:attribute:: optional1

      The first optional!


      :type: string or undefined


   .. py:attribute:: optional2

      :type: number or undefined


   .. py:attribute:: optional3

      :type: boolean or undefined


Value
^^^^^

.. py:class:: Value()

   .. tabs::

      .. code-tab:: java

         org.jsii.tests.calculator.lib.Value

      .. code-tab:: javascript

         Value

      .. code-tab:: typescript

         Value



   Abstract class which represents a numeric value.


   :extends: :py:class:`@scope/jsii-calc-base.Base`
   :abstract: Yes

   .. py:method:: toString() -> string

      String representation of the value.


      :rtype: string


   .. py:attribute:: value

      The value.


      :type: number *(readonly)* *(abstract)*


