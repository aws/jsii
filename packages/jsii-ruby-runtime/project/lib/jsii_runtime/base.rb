module Aws
  module Jsii
    class JsiiObject

      def _jsii_objref
        @objref
      end
      def _jsii_objref=(v)
        @objref = v
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

      def _jsii_begin(method:, args:)
        promise = _jsii.begin(objref: @objref, method: method, args: args)
        _jsii.callbacks["callbacks"].each do |callback|
          p callback
          raise "handle_callback!"
        end
        return _jsii.from_jsii(_jsii.end(promiseid: promise['promiseid'])['result'])
      end

      def _jsii_create(fqn:, args:)
        objref = _jsii.create(fqn: fqn, args: _jsii.to_jsii(args))
        _jsii.register_object(objref, self)
      end

      def _jsii_get(property:)
        return _jsii.from_jsii(_jsii.get(objref: @objref, property: property)['value'])
      end

      def _jsii_set(property:, value:)
        _jsii.set(objref: @objref, property: property, value: _jsii.to_jsii(value))
      end

      def _jsii_invoke(method:, args:)
        return _jsii.from_jsii(_jsii.invoke(objref: @objref, method: method, args: _jsii.to_jsii(args))['result'])
      end
    end
  end
end
