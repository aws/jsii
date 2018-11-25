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

    end
  end
end
