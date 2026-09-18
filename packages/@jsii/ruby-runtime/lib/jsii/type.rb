# frozen_string_literal: true

require 'date'
require 'time'

module Jsii
  # Provides runtime type validation and coercion for JSII primitives, collections, and structs.
  module Type
    # Validate `value` against a JSII type reference (the same shape used by
    # the assembly metadata: `{ 'primitive' => 'string' }`, `{ 'fqn' => '...' }`,
    # `{ 'collection' => { ... } }`, or `{ 'union' => { 'types' => [...] } }`).
    #
    # @param value    [Object] the value to check.
    # @param type_ref [Hash]   the JSII type-reference description.
    # @param argname  [String] human-readable label used in error messages.
    # @return [nil] when the value satisfies the type.
    # @raise [TypeError] when the value does not match the type reference.
    def self.check_type(value, type_ref, argname = 'argument')
      return check_primitive(value, type_ref['primitive'], argname) if type_ref.key?('primitive')
      return check_fqn(value, type_ref['fqn'], argname) if type_ref.key?('fqn')
      return check_collection(value, type_ref['collection'], argname) if type_ref.key?('collection')
      return check_union(value, type_ref['union'], argname) if type_ref.key?('union')

      raise TypeError, "Unknown type reference: #{type_ref.inspect}"
    end

    class << self
      private

      PRIMITIVE_VALIDATORS = {
        'string' => ->(v, arg) { Jsii::Type.send(:check_ruby_type!, v, String, arg, 'a String') },
        'number' => ->(v, arg) { Jsii::Type.send(:check_ruby_type!, v, Numeric, arg, 'a Numeric') },
        'boolean' => lambda do |v, arg|
          raise TypeError, "Expected #{arg} to be a Boolean" unless v.is_a?(TrueClass) || v.is_a?(FalseClass)
        end,
        'date' => lambda do |v, arg|
          unless v.is_a?(Time) || v.is_a?(DateTime) || v.is_a?(Date)
            raise TypeError,
                  "Expected #{arg} to be a Date/Time"
          end
        end,
        'json' => ->(v, arg) { Jsii::Type.send(:check_json_type, v, arg) },
        'any' => ->(_v, _arg) { nil }
      }.freeze

      def check_primitive(value, primitive, argname)
        validator = PRIMITIVE_VALIDATORS[primitive]
        raise TypeError, "Unknown primitive type: #{primitive}" unless validator

        validator.call(value, argname)
      end

      def check_fqn(value, fqn, argname)
        return if fqn == 'any'

        ruby_class = resolve_fqn_to_ruby_class(fqn)
        return unless ruby_class

        if value.is_a?(Hash) || value.is_a?(Jsii::Struct)
          # Hash is allowed for Structs and Interfaces (which are Ruby Modules)
          return if ruby_class.instance_of?(Module)
          return if ruby_class < Jsii::Struct

          raise TypeError, "Expected #{argname} to be of type #{ruby_class.name}"
        end

        raise TypeError, "Expected #{argname} to be of type #{ruby_class.name}" unless value.is_a?(ruby_class)
      end

      def check_collection(value, collection, argname)
        case collection['kind']
        when 'array'
          check_array_collection(value, collection, argname)
        when 'map'
          check_map_collection(value, collection, argname)
        else
          raise TypeError, "Unknown collection kind: #{collection['kind']}"
        end
      end

      def check_ruby_type!(value, expected_class, argname, type_name)
        raise TypeError, "Expected #{argname} to be #{type_name}" unless value.is_a?(expected_class)
      end

      def check_json_type(value, argname)
        is_valid = value.is_a?(Hash) || value.is_a?(Array) || value.is_a?(String) ||
                   value.is_a?(Numeric) || value.is_a?(TrueClass) || value.is_a?(FalseClass)
        raise TypeError, "Expected #{argname} to be a JSON-serializable type" unless is_valid
      end

      def check_array_collection(value, collection, argname)
        check_ruby_type!(value, Array, argname, 'an Array')

        element_type = collection['elementtype']
        value.each_with_index do |item, index|
          check_type(item, element_type, "#{argname}[#{index}]")
        end
      end

      def check_map_collection(value, collection, argname)
        check_ruby_type!(value, Hash, argname, 'a Hash')

        element_type = collection['elementtype']
        value.each do |k, v|
          check_type(v, element_type, "#{argname}[#{k.inspect}]")
        end
      end

      def check_union(value, union, argname)
        types = union['types']
        is_valid = types.any? do |t|
          check_type(value, t, argname)
          true
        rescue TypeError
          false
        end
        raise TypeError, "Expected #{argname} to match one of the union types" unless is_valid
      end
    end

    # Resolves a JSII fully-qualified name to the Ruby class/module the pacmak
    # target generated for it.
    #
    # @param fqn [String] the JSII fully-qualified name (e.g. `"jsii-calc.Calculator"`).
    # @return [Class, Module, nil] the registered Ruby class/module, or `nil` if
    #   no class is registered for that fqn.
    def self.resolve_fqn_to_ruby_class(fqn)
      Jsii::Object.find_class_by_fqn(fqn)
    end
  end
end
