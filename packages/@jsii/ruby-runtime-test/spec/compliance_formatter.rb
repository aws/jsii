# frozen_string_literal: true

require 'rspec/core/formatters/base_formatter'
require 'json'

# Collects the results of examples tagged with `compliance: '<testName>'`
# metadata and writes them to compliance-report.json, which is consumed by
# tools/jsii-compliance/report.ts to build the per-language compliance matrix
# (gh-pages/content/specification/6-compliance-report.md).
#
# The canonical test names are defined in tools/jsii-compliance/suite.ts.
# To mark a spec as implementing a suite test, tag it:
#
#   it 'reads arrays returned by methods', compliance: 'arrayReturnedByMethodCanBeRead' do
#     ...
#   end
class ComplianceFormatter < RSpec::Core::Formatters::BaseFormatter
  RSpec::Core::Formatters.register self, :example_passed, :example_failed, :close

  def initialize(output)
    super(output)
    @results = {}
  end

  def example_passed(notification)
    record(notification.example, 'success')
  end

  def example_failed(notification)
    record(notification.example, 'failure')
  end

  def close(_notification)
    # Sorted so the report is deterministic regardless of spec execution order.
    File.write('compliance-report.json', JSON.pretty_generate(@results.sort.to_h))
  end

  private

  def record(example, status)
    key = example.metadata[:compliance]
    @results[key] = { status: status } if key
  end
end
