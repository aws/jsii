module Aws
  module Jsii
    class JsiiObject
      @@_jsii_method_to_ruby = { }
      @@_jsii_method_from_ruby = { }
      @@_jsii_prop_to_ruby = { }
      @@_jsii_prop_from_ruby = { }

      def _jsii_objref
        @objref
      end

      def _jsii_objref=(v)
        @objref = v
      end

      def self._jsii_map_method(ruby, js)
        @@_jsii_method_to_ruby[js] = ruby
        @@_jsii_method_from_ruby[ruby] = js
      end

      def self._jsii_map_property(ruby, js)
        @@_jsii_prop_to_ruby[js] = ruby
        @@_jsii_prop_from_ruby[ruby] = js
      end

      def _jsii_lookup_method(js)
        return self.method(@@_jsii_method_to_ruby[js].to_sym)
      end

      def _jsii_lookup_property(js)
        return self.method(@@_jsii_prop_to_ruby[js].to_sym)
      end

      def to_s
        if self.respond_to?(:to_string)
          return self.to_string
        else
          super
        end
      end

      protected

      def _jsii
        return Aws::Jsii::Runtime.instance
      end

      def _jsii_create(fqn:, args:)
        objref = _jsii.create(fqn: fqn, args: _jsii.to_jsii(args), overrides: _jsii_overrides)
        _jsii.register_object(objref, self)
      end

      def _jsii_get(property:)
        return _jsii.from_jsii(_jsii.get(objref: @objref, property: property)['value'])
      end

      def _jsii_set(property:, value:)
        _jsii.set(objref: @objref, property: property, value: _jsii.to_jsii(value))
      end

      def _jsii_async_invoke(method:, args:)
        promise = _jsii.begin(objref: @objref, method: method, args: args)
        _jsii.callbacks["callbacks"].each do |callback|
          complete = _jsii.process_callback(callback)
          _jsii.complete(complete)
        end
        return _jsii.from_jsii(_jsii.end(promiseid: promise['promiseid'])['result'])
      end

      def _jsii_invoke(method:, args:)
        return _jsii.from_jsii(_jsii.invoke(objref: @objref, method: method, args: _jsii.to_jsii(args))['result'])
      end

      private

      def _jsii_overrides
        overrides = []

        self.methods.select { |m| _jsii_is_override(m) }.each do |method|
          m = method.to_s
          if @@_jsii_method_from_ruby[m]
            overrides << { "method" => @@_jsii_method_from_ruby[m] }
          elsif @@_jsii_prop_from_ruby[m]
            overrides << { "property" => @@_jsii_prop_from_ruby[m] }
          end
        end

        return overrides
      end

      def _jsii_is_override(method_name)
        owner = self.method(method_name).owner

        # base classes of JsiiObject
        return false if owner == Kernel
        return false if owner == BasicObject

        # it's not an override if te owner is a generated jsii class
        return false if owner.singleton_methods(false).include?(:_jsii_generated)

        # okay, it's an override
        return true
      end
    end
  end
end
