.. @jsii-pacmak:meta@ {"fingerprint":"BRXQ7PQKFrsGdnfQ8hKIvg=="}

@scope/jsii-calc-lib
====================

Reference
---------

.. py:module:: @scope/jsii-calc-lib

IFriendly (interface)
^^^^^^^^^^^^^^^^^^^^^

.. py:class:: IFriendly

   Applies to classes that are considered friendly. These classes can be greeted with a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.




   .. py:method:: hello() -> string

      Say hello!


      :rtype: string


MyFirstStruct (interface)
^^^^^^^^^^^^^^^^^^^^^^^^^

.. py:class:: MyFirstStruct

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

   Abstract class which represents a numeric value.


   :extends: :py:class:`@scope/jsii-calc-base.Base`
   :abstract: Yes

   .. py:method:: toString() -> string

      String representation of the value.


      :rtype: string


   .. py:attribute:: value

      The value.


      :type: number *(readonly)* *(abstract)*


