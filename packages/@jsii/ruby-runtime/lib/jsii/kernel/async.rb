# frozen_string_literal: true

module Jsii
  class Kernel
    # Handles async callbacks and promises across the JSII IPC boundary
    module Async
      # Invoke an async JSII method end-to-end: open the promise via `begin`,
      # service any callbacks the sidecar requests while the promise is
      # pending, then resolve the value via `end`.  Synchronous from the
      # caller's perspective.
      #
      # @param objref [String] the `$jsii.byref` handle of the receiver.
      # @param method [String] the JSII async method name (camelCase wire form).
      # @param args   [Array] positional arguments (Ruby values, serialized internally).
      # @return [Object] the resolved promise value (deserialized to native Ruby).
      # @raise [Jsii::RuntimeError] if the promise rejects.
      def call_async_method(objref, method, args = [])
        promiseid = begin_async_call(objref, method, args)
        process_async_callbacks
        end_async_call(promiseid)
      end

      private

      # Issue the `begin` half of the async pair and return the kernel's
      # `promiseid` for later resolution via {#end_async_call}.
      #
      # @param objref [String, Jsii::Object] the receiver or its `$jsii.byref` handle.
      # @param method [String] the JSII async method name.
      # @param args   [Array]  positional arguments (serialized internally).
      # @return [String] the opaque `promiseid` issued by the sidecar.
      def begin_async_call(objref, method, args)
        objref_payload = if objref.respond_to?(:jsii_serialize)
          objref.jsii_serialize
        else
          { '$jsii.byref' => objref }
        end

        response = request({
          api: 'begin',
          objref: objref_payload,
          method: method,
          args: Jsii::Serializer.dump(args)
        })
        response['promiseid']
      end

      # Resolve a previously-`begin`'d promise via the `end` verb.
      #
      # @param promiseid [String] the id returned by {#begin_async_call}.
      # @return [Object] the resolved value (deserialized to native Ruby).
      # @raise [Jsii::RuntimeError] if the promise rejects.
      def end_async_call(promiseid)
        end_response = request({
          api: 'end',
          promiseid: promiseid
        })
        Jsii::Serializer.load(end_response['result'])
      end

      # Drain every pending Ruby-side callback the sidecar has queued up
      # while a promise is in flight.  Loops until the kernel reports the
      # queue is empty — each completed callback can itself trigger further
      # callbacks, so a single pass isn't sufficient.
      #
      # @return [nil] when the callback queue is finally empty.
      def process_async_callbacks
        callbacks_response = request({ api: 'callbacks' })
        callbacks = callbacks_response['callbacks'] || []
        until callbacks.empty?
          callbacks.each do |callback|
            complete_async_callback(callback)
          end
          callbacks_response = request({ api: 'callbacks' })
          callbacks = callbacks_response['callbacks'] || []
        end
      end

      # Service one async callback by dispatching it into Ruby and sending
      # the result (or error envelope) back via `complete`.  Errors are
      # converted to the wire's `{ err, name, stack }` shape rather than
      # re-raised so the promise on the JS side can settle cleanly.
      #
      # @param callback [Hash{String=>Object}] the callback descriptor.
      # @return [Hash] the kernel's `ok` response envelope for the `complete` call.
      def complete_async_callback(callback)
        template = {
          api: 'complete',
          cbid: callback['cbid']
        }
        result = handle_callback(callback)
        request({ **template, result: Jsii::Serializer.dump(result) })
      rescue StandardError => e
        request({
          **template,
          err: e.message,
          name: e.class.name,
          stack: e.backtrace&.join("\n")
        })
      end
    end
  end
end
