module Aws
  module Jsii
    module Serialization
      def self.to_jsii(x)
        puts "!!! to_jsii #{x}"

        if x.nil?
          return nil
        end

        # array
        if x.kind_of?(Array)
          return x.map { |e| self.to_jsii(e) }.to_a
        end

        # hash
        if x.kind_of?(Hash)
          return x.map { |k,v| [k, self.to_jsii(v)] }.to_h
        end

        # primitive
        return x
      end

      def self.from_jsii(x)
        puts "!!! from_jsii #{x}"
        return x
      end
    end
  end
end
