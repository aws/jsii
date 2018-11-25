require 'date'

DATE_TOKEN = '$jsii.date'

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

        # date
        if x.kind_of?(DateTime)
          return { DATE_TOKEN => x.iso8601 }
        end

        # primitive
        return x
      end

      def self.from_jsii(x)
        puts "!!! from_jsii #{x}"

        if x.kind_of?(Hash)
          if not x[DATE_TOKEN].nil?
            return DateTime.parse(x[DATE_TOKEN])
          end
        end

        return x
      end
    end
  end
end
