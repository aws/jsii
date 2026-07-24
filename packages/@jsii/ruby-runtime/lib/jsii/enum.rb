# frozen_string_literal: true

module Jsii
  # Represents a JSII enumeration value passed by-reference.
  class Enum
    # @return [String] the fully-qualified name of the enum type (e.g. `"jsii-calc.StringEnum"`).
    attr_reader :fqn

    # @return [String] the enum member name (e.g. `"A"`).
    attr_reader :value

    class << self
      # Decodes a `$jsii.enum` wire envelope into a {Jsii::Enum} instance.
      #
      # @param value [Hash{String=>String}] the wire envelope `{ "$jsii.enum" => "<fqn>/<member>" }`.
      # @return [Jsii::Enum] the deserialized enum value.
      def jsii_deserialize(value)
        enum_ref = value['$jsii.enum']
        fqn, _, member = enum_ref.rpartition('/')
        Jsii::Enum.new(fqn, member)
      end
    end

    # @param fqn   [String] fully-qualified name of the enum type.
    # @param value [String] enum member name.
    # @return [Jsii::Enum] a new enum value.
    def initialize(fqn, value)
      @fqn = fqn
      @value = value
    end

    # Encodes this enum into the JSII wire envelope.
    #
    # @return [Hash{String=>String}] `{ "$jsii.enum" => "<fqn>/<member>" }`.
    def jsii_serialize
      { '$jsii.enum' => "#{fqn}/#{value}" }
    end

    # @return [String] the enum member name.
    def to_s
      @value
    end

    # @return [String] a human-readable representation including fqn and member.
    def inspect
      "#<Jsii::Enum #{@fqn}/#{@value}>"
    end

    # Two enums are equal when they share both fqn and member.
    #
    # @param other [Object] the value to compare against.
    # @return [Boolean] `true` iff `other` is a {Jsii::Enum} with the same fqn and value.
    def ==(other)
      other.is_a?(Jsii::Enum) && other.fqn == @fqn && other.value == @value
    end
  end
end
