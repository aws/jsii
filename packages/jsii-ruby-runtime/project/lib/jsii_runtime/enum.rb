module Aws
  module Jsii
    class JsiiEnum
      attr_reader :fqn

      def initialize(fqn, friendly)
        @friendly = friendly
        @fqn = fqn
      end

      def to_s
        @friendly
      end
    end
  end
end
