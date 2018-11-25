require 'open3'
require 'logger'
require 'json'
require_relative 'errors'

module Aws
  module Jsii
    # Represents the jsii-runtime
    class Runtime

      # singleton instance of jsii runtime
      def self.instance
        @@instance ||= Runtime.new
      end

      def initialize(debug = nil)
        @logger = Logger.new(STDERR)

        if (debug.nil?)
          debug = ENV['JSII_DEBUG'] == '1'
        end

        @debug = debug
        @logger.level = debug ? Logger::DEBUG : Logger::INFO

        runtime_js = File.join(File.dirname(__FILE__), '..', '..', 'resources', 'jsii-runtime.js')
        @logger.debug("jsii-runtime at: #{runtime_js}")
        env = {}
        env['JSII_DEBUG'] = '1' if @debug
        @stdin, @stdout, wait_thr = Open3.popen2(env, 'node', runtime_js)

        @logger.debug("jsii-runtime started on pid #{wait_thr.pid}")

        # ensure version compat.
        handshake

        at_exit { close }
      end

      def close
        @logger.debug('closing jsii-runtime child-process streams...')
        @stdin.close
        @stdout.close
      end

      def self.define_api(api)
        define_method(api) do |**opts|
          request_response(api: api, **opts)
        end
      end

      define_api :load
      define_api :create
      define_api :del
      define_api :get
      define_api :sget
      define_api :set
      define_api :sset
      define_api :invoke
      define_api :sinvoke
      define_api :begin
      define_api :end
      define_api :callbacks
      define_api :complete
      define_api :naming
      define_api :stats

      def on_callback(&blk)
        @callback_handler = blk
      end

      private

      def request_response(req)
        req_s = JSON.generate(req.delete_if { |_, v| v.nil? })

        @logger.debug("> #{req_s}")
        @stdin.puts(req_s)

        resp = read_next_response
        @logger.debug("< #{JSON.generate(resp)}")

        return process_error(resp) if resp['error']
        return process_callback(resp) if resp['callback']

        # if resp["ok"] is nil, it means 'undefined' (or void), so we just return it as-is
        resp['ok']
      end

      def read_next_response
        line = @stdout.readline
        @logger.debug("line: #{line}")
        JSON.parse(line)
      end

      def handshake
        hello = read_next_response
        version = hello['hello']

        expected_version = File.read(File.join(File.dirname(__FILE__), '..', '..', 'version.txt')).strip
        expected_version_string = "jsii-runtime@#{expected_version}"

        if version != expected_version_string
          raise JsiiError, "Invalid jsii-runtime handshake version '#{version}'. Expected: '#{expected_version_string}'"
        end
      end

      def process_error(resp)
        message = resp['error']
        stack = resp['stack']
        message += "\n#{stack}" if stack
        raise JsiiError, message
      end

      def process_callback(resp)
        raise JsiiError, 'no callback handler registered with on_callback' unless @callback_handler
        callback = resp['callback']

        result = nil
        err = nil

        begin
          result = @callback_handler.call(callback)
        rescue StandardError => e
          err = e
        end

        request_response(complete: {
          cbid: callback['cbid'],
          err: err,
          result: result
        })
      end
    end
  end
end
