# frozen_string_literal: true

require 'date'
require 'time'

module Jsii
  # Explicit, type-driven serializer for the JSII wire format.  Replaces a
  # previous design that monkey-patched `Object#jsii_serialize` /
  # `Hash#jsii_deserialize` onto every Ruby object — the patches would walk
  # arbitrary host application objects (ActiveRecord rows, Rails params, etc.)
  # and could leak state via any `@jsii_ref` ivar that happened to exist.
  #
  # Always go through `Jsii::Serializer.dump(value)` and `Jsii::Serializer.load(value)`
  # rather than calling `.jsii_serialize` / `.jsii_deserialize` on values.
  module Serializer
    module_function

    # Convert a Ruby value into the JSII wire form (a JSON-ready Ruby value).
    # Primitives and `nil`/Booleans pass through; arrays/hashes are mapped
    # recursively; `Date`/`Time`/`DateTime` are wrapped in `$jsii.date`; jsii
    # types delegate to their own `jsii_serialize`; everything else falls
    # through to {#dump_other}.
    #
    # @param value [Object] the Ruby value to encode.
    # @return [Object] a JSON-ready value: primitive, Array, Hash, or jsii wire envelope.
    def dump(value)
      case value
      when nil, true, false, Numeric, String, Symbol
        value
      when Array
        value.map { |element| dump(element) }
      when Jsii::Enum, Jsii::Struct, Jsii::Object
        value.jsii_serialize
      when Date, DateTime, Time
        dump_date(value)
      when Hash
        value.transform_values { |element| dump(element) }
      else
        dump_other(value)
      end
    end

    # Inverse of {#dump}.  Decodes any wire envelopes back into Ruby values:
    # `$jsii.byref` → registered proxy, `$jsii.enum` → {Jsii::Enum},
    # `$jsii.date` → `DateTime`, `$jsii.map`/`$jsii.struct` → hydrated value,
    # plain primitives/arrays/hashes pass through (recursively).
    #
    # @param value [Object] the wire value to decode.
    # @return [Object] the native Ruby value.
    def load(value)
      case value
      when nil, true, false, Numeric, String, Symbol
        value
      when Array
        value.map { |element| load(element) }.freeze
      when Hash
        load_hash(value)
      else
        value
      end
    end

    # Encode a Ruby date/time-ish value as a `$jsii.date` wire envelope.
    #
    # @api private
    # @param value [Time, DateTime, Date] the temporal value to encode.
    # @return [Hash{String=>String}] `{ "$jsii.date" => "<iso8601>" }`.
    def dump_date(value)
      case value
      when Time
        { '$jsii.date' => value.utc.strftime('%Y-%m-%dT%H:%M:%S.%3NZ') }
      when DateTime
        { '$jsii.date' => value.new_offset(0).iso8601(3) }
      when Date
        { '$jsii.date' => DateTime.new(value.year, value.month, value.day).new_offset(0).iso8601(3) }
      end
    end

    # Fallback encoder for values that don't match the `dump` dispatch table:
    # delegates to a `jsii_serialize` method if present, or falls back to the
    # kernel's native-implementation serializer when the value carries a JSII
    # interface module.  Anything else has no jsii wire representation —
    # passing it through would let `JSON.generate` stringify it into
    # `"#<Object:0x...>"` garbage on the host side — so it raises instead.
    #
    # @api private
    # @param value [Object] the value to encode.
    # @return [Object] the wire form.
    # @raise [TypeError] when the value has no jsii wire representation.
    def dump_other(value)
      if value.respond_to?(:jsii_serialize)
        value.jsii_serialize
      elsif jsii_native_implementation?(value)
        Jsii::Kernel.instance.send(:serialize_native_implementations, value)
      else
        raise TypeError,
              "cannot serialize instance of #{value.class} to the jsii wire format; supported " \
              'values are nil, booleans, numerics, strings, symbols, Date/Time/DateTime, ' \
              'arrays/hashes of supported values, jsii types (Jsii::Object / Jsii::Struct / ' \
              'Jsii::Enum), and objects whose class includes a jsii interface module'
      end
    end

    # Decode a Hash that may carry a JSII wire envelope key (`$jsii.byref`,
    # `$jsii.enum`, `$jsii.date`, `$jsii.map`, `$jsii.struct`).  When no key
    # matches, the Hash is decoded element-wise.
    #
    # @api private
    # @param hash [Hash{String=>Object}] the wire Hash to decode.
    # @return [Object] the decoded native Ruby value (proxy, enum, date, etc.).
    def load_hash(hash)
      return Jsii::Object.jsii_deserialize(hash) if hash.key?('$jsii.byref')
      return Jsii::Enum.jsii_deserialize(hash) if hash.key?('$jsii.enum')
      return DateTime.parse(hash['$jsii.date']) if hash.key?('$jsii.date')
      return load(hash['$jsii.map']) if hash.key?('$jsii.map')
      return load_struct(hash['$jsii.struct']) if hash.key?('$jsii.struct')

      hash.transform_values { |element| load(element) }.freeze
    end

    # Detect whether a Ruby value is an instance of a class that includes a
    # JSII interface module (i.e. it carries a `jsii_fqn` somewhere in its
    # ancestor chain).
    #
    # @api private
    # @param value [Object] the value to test.
    # @return [Boolean] `true` if the value's class implements at least one JSII interface.
    def jsii_native_implementation?(value)
      return false unless value.respond_to?(:class)

      klass = value.class
      return false unless klass.respond_to?(:ancestors)

      klass.ancestors.any? do |ancestor|
        ancestor.instance_of?(Module) && ancestor.respond_to?(:jsii_fqn) && ancestor.jsii_fqn
      end
    end

    # Materialize a `$jsii.struct` payload into an instance of its registered
    # Ruby class (when one exists), or return a plain Hash with values
    # recursively loaded when the fqn is unknown.
    #
    # @api private
    # @param struct_info [Hash{String=>Object}] the `{ 'fqn' => ..., 'data' => ... }` payload.
    # @return [Jsii::Struct, Hash] a struct instance or a plain Hash, depending on registration.
    def load_struct(struct_info)
      klass = Jsii::Object.find_class_by_fqn(struct_info['fqn'])

      data = struct_info['data'] || {}
      return data.transform_values { |element| load(element) } unless klass.respond_to?(:jsii_properties)

      jsii_to_ruby = klass.jsii_properties.invert
      kwargs = data.to_h do |k, v|
        ruby_key = jsii_to_ruby[k] || k.to_sym
        [ruby_key, load(v)]
      end

      klass.new(**kwargs)
    end
  end
end
