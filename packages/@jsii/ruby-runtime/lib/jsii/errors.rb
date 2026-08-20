# frozen_string_literal: true

module Jsii
  # Base exception class for all errors generated natively by the Ruby JSII runtime wrapper.
  class Error < StandardError
    # Heuristic: does this error's message indicate that a property / method
    # member was not found on the underlying JSII object?  Used by the
    # dynamic-dispatch path to decide whether to fall through to Ruby's
    # `method_missing` chain instead of re-raising.
    #
    # @return [Boolean] `true` if the message matches a known "missing member" phrase.
    def missing_member?
      msg = message
      msg.include?('not a property') ||
        msg.include?("doesn't have a property") ||
        msg.include?('does not exist') ||
        msg.include?('is not a method') ||
        msg.include?('not a function') ||
        msg.include?("doesn't have a method")
    end
  end

  # Represents protocol, serialization, and boundary-level errors encountered when interacting
  # with the JSII kernel via standard IO pipes.
  class JSIIError < Error; end

  # Represents a runtime exception emitted by the underlying JavaScript code that has been
  # bubbled up and re-raised natively in Ruby, retaining the remote stack trace.
  class RuntimeError < Error
    # @return [String, nil] the remote (JavaScript-side) stack trace as a newline-delimited
    #   string, or `nil` when no stack was provided by the kernel.
    attr_reader :stack

    # @param msg   [String]      the error message returned by the kernel.
    # @param stack [String, nil] optional remote stack trace.
    # @return [RuntimeError] a new error preserving the remote stack.
    def initialize(msg, stack = nil)
      super(msg)
      @stack = stack
    end

    # @return [String] the message, suffixed with the remote stack when one was captured.
    def to_s
      if @stack
        "#{super}\nRemote Stack:\n#{@stack}"
      else
        super
      end
    end
  end
end
