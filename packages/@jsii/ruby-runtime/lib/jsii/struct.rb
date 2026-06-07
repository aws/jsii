# frozen_string_literal: true

module Jsii
  # Base class for all JSII data types (structs) which pass data by-value.
  class Struct
    extend Jsii::FqnExtension

    class << self
      # JSII structs support multiple inheritance (a struct may extend
      # several parent structs — "diamond" hierarchies), but Ruby classes
      # carry a single superclass: the generator subclasses the *first*
      # parent and records the rest here.  {#is_a?} and {.===} consult this
      # registry so type checks honor the full set of declared parents.
      #
      # @return [Array<Class>] additional parent struct classes beyond the
      #   Ruby superclass (set by generated code; empty for most structs).
      def jsii_extra_struct_bases
        @jsii_extra_struct_bases ||= []
      end

      # Whether this struct class conforms to `klass`: via real Ruby
      # ancestry, via a recorded extra base (transitively), or via an
      # ancestor's recorded extra bases.
      #
      # @param klass [Class] the struct class to test conformance against.
      # @return [Boolean]
      def jsii_struct_conforms_to?(klass)
        return true if self <= klass
        return true if jsii_extra_struct_bases.any? { |base| base.jsii_struct_conforms_to?(klass) }

        superclass.respond_to?(:jsii_struct_conforms_to?) &&
          superclass.jsii_struct_conforms_to?(klass)
      end

      # Makes `case value when SomeParentStruct` honor extra (non-first)
      # struct parents.  `super` is Module#===, which covers real ancestry.
      def ===(other)
        super || (other.is_a?(Struct) && other.class.jsii_struct_conforms_to?(self))
      end
    end

    # Honors the full set of declared struct parents, not just the single
    # Ruby superclass chain (see {.jsii_extra_struct_bases}).
    def is_a?(klass)
      super || (klass.is_a?(Class) && klass <= Struct && self.class.jsii_struct_conforms_to?(klass))
    end
    alias kind_of? is_a?

    # @return [String, nil] the by-reference handle for this struct, if any has been
    #   assigned (most structs are serialized purely by value and have no ref).
    attr_accessor :jsii_ref

    # Returns the struct's field values keyed by JSII (camelCase) wire names.
    # Always overridden by pacmak-generated subclasses; the base implementation
    # returns an empty hash so structs with no fields still serialize cleanly.
    #
    # @return [Hash{String=>Object}] field values keyed by JSII property name.
    def to_jsii
      # This should be overridden by the generated class
      {}
    end

    # Encodes this struct as a `$jsii.struct` wire envelope (fqn + data).
    #
    # @return [Hash{String=>Hash}] `{ "$jsii.struct" => { "fqn" => ..., "data" => ... } }`.
    def jsii_serialize
      {
        '$jsii.struct' => {
          'fqn' => self.class.jsii_fqn,
          'data' => Jsii::Serializer.dump(to_jsii)
        }
      }
    end

    # Two structs are equal when they share a class and produce identical
    # `to_jsii` payloads.
    #
    # @param other [Object] the value to compare against.
    # @return [Boolean] `true` iff `other` is the same class and has equal field values.
    def ==(other)
      return false unless other.class == self.class

      to_jsii == other.to_jsii
    end
    alias eql? ==

    # @return [Integer] a hash code derived from {#to_jsii}, consistent with {#==}.
    def hash
      to_jsii.hash
    end
  end
end
