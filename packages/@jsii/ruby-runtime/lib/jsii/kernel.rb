# frozen_string_literal: true

require 'singleton'
require 'open3'
require 'json'
require 'date'
require 'monitor'

require_relative 'kernel/async'
require_relative 'utils'
require_relative 'serializer'
require_relative 'kernel/api'
require_relative 'kernel/callbacks'

module Jsii
  # The Kernel is responsible for managing the child Node.js process containing
  # the jsii-runtime. It orchestrates all cross-language RPC communication,
  # enabling Ruby objects to transparently interact with JavaScript components,
  # instantiate objects, and execute methods across the boundary.
  #
  # Thread-safety: the kernel multiplexes a single bidirectional JSON pipe to
  # the Node sidecar.  Concurrent requests from multiple threads cannot
  # interleave on that pipe without corrupting the framing, so `request` is
  # serialized via a re-entrant `Monitor`.  Re-entrant because a request can
  # receive a `{ callback }` response that calls back into Ruby, and the
  # user's override may in turn make further jsii calls — the same thread
  # must be allowed to re-enter the lock.
  #
  # ## Wire protocol
  #
  # Communication is line-delimited JSON over the sidecar's stdin/stdout.
  # Each line is exactly one JSON object; stderr is drained separately and
  # used only for crash diagnostics (see {#check_crash!}).
  #
  # On startup the sidecar emits one **handshake** line (an object identifying
  # the runtime version) before accepting requests.  {#initialize} reads and
  # validates it; a `nil` (EOF) means the child died and is surfaced as
  # {Jsii::RuntimeError} with the captured stderr.
  #
  # ### Request envelope
  #
  # Every request is `{ api: <verb>, ...verb-specific-fields }`.  The verbs:
  #
  # | `api`        | Fields                                                                | Purpose                                     |
  # | ------------ | --------------------------------------------------------------------- | ------------------------------------------- |
  # | `load`       | `name`, `version`, `tarball`                                          | Load a JSII assembly tarball.               |
  # | `create`     | `fqn`, `args`, `overrides`, `interfaces`                              | Construct a remote object.                  |
  # | `invoke`     | `objref`, `method`, `args`                                            | Call an instance method.                    |
  # | `get`        | `objref`, `property`                                                  | Read an instance property.                  |
  # | `set`        | `objref`, `property`, `value`                                         | Write an instance property.                 |
  # | `sinvoke`    | `fqn`, `method`, `args`                                               | Call a static method.                       |
  # | `sget`       | `fqn`, `property`                                                     | Read a static property.                     |
  # | `sset`       | `fqn`, `property`, `value`                                            | Write a static property.                    |
  # | `begin`      | `objref`, `method`, `args`                                            | Start an async method, returns `promiseid`. |
  # | `end`        | `promiseid`                                                           | Resolve a previously-`begin`'d promise.     |
  # | `callbacks`  | —                                                                     | Poll the queue of pending Ruby callbacks.   |
  # | `complete`   | `cbid`, `result` _or_ `err`+`name`+`stack`                            | Reply to a callback the sidecar requested.  |
  #
  # ### Response envelope
  #
  # Each line the sidecar writes is one of:
  #
  # * `{ "ok": <value> }` — success; `<value>` shape depends on the verb (e.g.
  #   `create` returns `{ "$jsii.byref": ... }`, `invoke`/`sinvoke` returns
  #   `{ "result": <wire value> }`, `get`/`sget` returns `{ "value": <wire value> }`).
  # * `{ "error": <msg>, "name": <classname>, "stack": <remote stack> }` —
  #   remote failure.  `name == "@jsii/kernel.Fault"` raises {Jsii::JSIIError}
  #   (protocol/boundary error); any other name raises {Jsii::RuntimeError}
  #   preserving the JavaScript-side stack.
  # * `{ "callback": { cbid, invoke | get | set: {...} } }` — mid-request the
  #   sidecar is asking Ruby to service an overridden method/property on a
  #   `create`d object.  {#request} dispatches it via the {Callbacks} mixin
  #   and then resumes reading for the original reply.
  #
  # ### Value envelopes
  #
  # Composite values are serialized using a small set of tag keys.  These can
  # appear anywhere a value is expected (request args, return values, struct
  # fields, etc.) and are encoded/decoded by {Jsii::Serializer}:
  #
  # * `{ "$jsii.byref": "<handle>" }` — by-reference object handle issued by
  #   the sidecar.  May also carry `$jsii.fqn` and/or `$jsii.interfaces` so
  #   the decoder can pick the right Ruby proxy class (see {Jsii::Object::Registry#jsii_deserialize}).
  # * `{ "$jsii.struct": { "fqn": "...", "data": { ... } } }` — by-value data
  #   class instance; the `data` map's keys are camelCase JSII property names.
  # * `{ "$jsii.enum": "<fqn>/<member>" }` — enum value (see {Jsii::Enum}).
  # * `{ "$jsii.date": "<ISO 8601>" }` — `Date` / `DateTime` / `Time`, always
  #   normalized to UTC with millisecond precision.
  # * `{ "$jsii.map": { ... } }` — used only when the map's keys would
  #   otherwise be ambiguous with one of the tag keys above.
  #
  # Primitives (`nil`, booleans, numbers, strings) pass through unchanged.
  class Kernel
    include Singleton
    include Async
    include Api
    include Callbacks

    # Key used to stash the per-thread "object currently being constructed"
    # stack.  See `pending_object` / `push_pending_object`.
    PENDING_OBJECT_STACK_KEY = :__jsii_pending_object_stack__

    # Spawn the Node.js sidecar process, perform the protocol handshake, and
    # register an `at_exit` shutdown hook.  Called by `Singleton` on first
    # access — never construct a Kernel directly.
    #
    # @return [Kernel] the singleton instance.
    # @raise [Jsii::RuntimeError] if the sidecar exits before sending its
    #   handshake line.
    # @raise [StandardError] if the `jsii-runtime` executable cannot be located
    #   (see {#resolve_jsii_runtime}).
    def initialize
      node_path = begin
        ENV['NODE_PATH'] || `npm root -g`.strip
      rescue StandardError
        nil
      end
      env = node_path ? { 'NODE_PATH' => node_path } : {}
      env['JSII_AGENT'] = "Ruby/#{RUBY_VERSION}"
      runtime_cmd = resolve_jsii_runtime
      @stdin, @stdout, @stderr, @wait_thr = Open3.popen3(env, *runtime_cmd)

      @mutex = Monitor.new
      @stderr_buffer = []
      @stderr_mutex = Mutex.new
      @shutdown = false
      start_stderr_drain

      @handshake = @stdout.gets
      check_crash!(@handshake)

      # Best-effort: graceful shutdown so the child doesn't leak as a zombie
      # if the Ruby process exits without an explicit `shutdown` call.
      at_exit do
        shutdown
      rescue StandardError
        nil
      end
    end

    # Send a single request payload over the JSON pipe and return the
    # `ok` envelope from the sidecar.  Re-entrant: a response containing a
    # `{ callback }` envelope is dispatched back into Ruby (which may make
    # further `request` calls on the same thread) before resuming the read
    # loop for the original reply.
    #
    # @param payload [Hash{Symbol=>Object}] the request to send (e.g.
    #   `{ api: 'invoke', objref: ..., method: ..., args: ... }`).
    # @return [Hash, Object] the `ok` field of the kernel's response.
    # @raise [Jsii::JSIIError] for protocol-level (`@jsii/kernel.Fault`) errors.
    # @raise [Jsii::RuntimeError] for sidecar crashes or remote (JS) exceptions.
    def request(payload)
      @mutex.synchronize do
        send_payload(payload)

        loop do
          response_line = @stdout.gets
          warn "RECV: #{response_line.inspect}" if ENV['JSII_DEBUG']

          check_crash!(response_line)

          response = JSON.parse(response_line)
          check_error!(response)

          return response['ok'] unless response.key?('callback')

          process_callback_request(response['callback'])
        end
      end
    end

    # Build the `create` request payload for a new JSII object.  Used by
    # `Api#create_object`; exposed so the payload can be inspected/logged
    # without actually issuing the call.
    #
    # @param fqn        [String] fully-qualified name of the class to instantiate.
    # @param args       [Array]  positional constructor arguments (Ruby values).
    # @param overrides  [Array<Hash>] override descriptors (`{ "method" => ... }` or `{ "property" => ... }`).
    # @param interfaces [Array<String>] additional interface FQNs the instance implements.
    # @return [Hash{Symbol=>Object}] the `api: 'create'` request payload, with all
    #   nested values already passed through {Jsii::Serializer.dump}.
    def create_object_payload(fqn, args, overrides: [], interfaces: [])
      {
        api: 'create',
        fqn: fqn,
        args: Jsii::Serializer.dump(args),
        overrides: Jsii::Serializer.dump(overrides),
        interfaces: interfaces
      }
    end

    # The "object currently being constructed" — looked up by `find_by_ref`
    # so that the kernel's callback referring to an objref the registry hasn't
    # learned about yet can resolve to the in-flight instance.
    #
    # Stored on Thread.current rather than an instance variable: with the
    # kernel mutex in place we still need re-entrant create_object calls
    # (constructor -> callback -> further create) on the same thread to push
    # and pop without clobbering each other.
    #
    # @return [Jsii::Object, nil] the top of the per-thread pending-object stack.
    def pending_object
      instance, = pending_object_stack.last
      instance
    end

    # The in-flight instance whose `create` request was issued with the given
    # fqn — the guard `find_by_ref` applies before falling back to a pending
    # object.  Kernel objrefs are labelled `<fqn>@<id>`, and the sidecar
    # labels the object a `create` is constructing with the same fqn the
    # request named (guest subclasses construct via their nearest *generated*
    # base class fqn, which is also the nearest visible type the sidecar
    # labels with), so an unknown ref whose fqn label matches no in-flight
    # create cannot be the object under construction.  Searches the whole
    # per-thread stack (innermost create first) so a callback arriving during
    # a nested create can still resolve an outer in-flight instance.
    #
    # @param fqn [String] the fqn label of an unresolved `$jsii.byref` handle.
    # @return [Jsii::Object, nil] the innermost matching in-flight instance, or `nil`.
    def pending_object_for(fqn)
      instance, = pending_object_stack.reverse_each.find do |pending_instance, pending_fqn|
        pending_instance && pending_fqn == fqn
      end
      instance
    end

    # @api private
    # @param instance [Jsii::Object, nil] the instance whose `create_object` call is in flight.
    # @param fqn      [String] the fqn the `create` request was issued with.
    # @return [Array<Array(Jsii::Object, String)>] the updated per-thread stack.
    def push_pending_object(instance, fqn)
      pending_object_stack.push([instance, fqn])
    end

    # @api private
    # @return [Array(Jsii::Object, String), nil] the previously-pending entry, or `nil` if the stack was empty.
    def pop_pending_object
      pending_object_stack.pop
    end

    # Idempotently shut down the sidecar: close stdin to signal EOF, wait for
    # the child to exit (escalating to SIGTERM/SIGKILL if needed), then close
    # the remaining pipes and join the stderr drain thread.  Safe to call
    # multiple times.
    #
    # @return [nil]
    def shutdown
      return if @shutdown

      @shutdown = true
      close_stdin
      reap_child
      close_streams(@stdout, @stderr)
      @stderr_drain_thread&.join(0.5)
    end

    private

    # Closing stdin sends EOF to the jsii-runtime wrapper, which is its
    # intended exit signal — the wrapper's SIGTERM handler only forwards
    # the signal to its grandchild and does NOT exit the wrapper itself,
    # so SIGTERM alone leaves the wrapper parented to us and `@wait_thr`
    # hung forever.
    def close_stdin
      @stdin.close if @stdin && !@stdin.closed?
    end

    # Wait for the child to exit on its own after stdin EOF; escalate to
    # SIGTERM then SIGKILL if it doesn't.  `@wait_thr.kill` only kills
    # the Ruby bookkeeping thread, not the OS process, so it isn't a
    # substitute.
    #
    # @return [Process::Status, nil] the child's exit status, or `nil` if
    #   the wait was already complete / the child had already been reaped.
    def reap_child
      return unless @wait_thr

      if @wait_thr.alive? && !@wait_thr.join(2)
        signal_child('TERM')
        signal_child('KILL') unless @wait_thr.join(2)
      end
      @wait_thr.value
    rescue StandardError
      nil
    end

    def close_streams(*streams)
      streams.compact.reject(&:closed?).each do |io|
        io.close
      rescue StandardError
        nil
      end
    end

    def signal_child(name)
      return unless @wait_thr&.alive?

      Process.kill(name, @wait_thr.pid)
    rescue Errno::ESRCH, Errno::EPERM
      # Already gone or no permission; nothing more to do.
    end

    def pending_object_stack
      Thread.current[PENDING_OBJECT_STACK_KEY] ||= []
    end

    # Drain the child's stderr in a background thread.  Without this the
    # stderr pipe's buffer fills (~64KB on macOS) when the child is chatty,
    # the child blocks on its next write, and the JSON request loop on
    # stdout deadlocks waiting for a response that will never arrive.
    #
    # @return [Thread] the drain thread (also stored in `@stderr_drain_thread`).
    def start_stderr_drain
      @stderr_drain_thread = Thread.new do
        @stderr.each_line do |line|
          @stderr_mutex.synchronize { @stderr_buffer << line }
        end
      rescue IOError, Errno::EBADF
        # Pipe closed during shutdown; nothing to do.
      end
      @stderr_drain_thread.name = 'jsii-stderr-drain' if @stderr_drain_thread.respond_to?(:name=)
    end

    # Locate the `jsii-runtime` executable.  Resolution order:
    # 1. `JSII_RUNTIME` env var (explicit override).
    # 2. `jsii-runtime` on `PATH` (system install).
    # 3. `require.resolve('@jsii/runtime/bin/jsii-runtime')` via `node`.
    # 4. `$(npm root)/.bin/jsii-runtime` (local `node_modules`).
    #
    # @return [Array<String>] the command and its arguments to run the executable.
    # @raise [StandardError] if none of the four strategies finds it.
    def resolve_jsii_runtime
      if ENV.key?('JSII_RUNTIME')
        runtime = ENV['JSII_RUNTIME']
        return [runtime] if File.exist?(runtime)
        return runtime.split(' ')
      end

      dev_null = Gem.win_platform? ? 'NUL' : '/dev/null'
      path_checker = Gem.win_platform? ? 'where' : 'which'
      return ['jsii-runtime'] if system("#{path_checker} jsii-runtime > #{dev_null} 2>&1")

      node_path = resolve_via_node
      return ['node', node_path] if node_path

      npm_path = resolve_via_npm
      return [npm_path] if npm_path

      raise StandardError,
            'Unable to locate jsii-runtime executable. ' \
            'Please ensure @jsii/runtime is installed or set JSII_RUNTIME.'
    end

    # Ask Node to resolve the `@jsii/runtime` package and return the
    # absolute path to its `jsii-runtime` bin entry.
    #
    # @return [String, nil] the resolved path, or `nil` if Node is unavailable
    #   or the package can't be resolved.
    def resolve_via_node
      dev_null = Gem.win_platform? ? 'NUL' : '/dev/null'
      node_path = `node -p "require.resolve('@jsii/runtime/bin/jsii-runtime')" 2>#{dev_null}`.strip
      node_path unless node_path.empty?
    rescue StandardError
      nil
    end

    # Locate `jsii-runtime` inside the local `node_modules/.bin` directory.
    #
    # @return [String, nil] the executable path, or `nil` if `npm root`
    #   yields nothing or the symlink isn't executable.
    def resolve_via_npm
      dev_null = Gem.win_platform? ? 'NUL' : '/dev/null'
      npm_root = `npm root 2>#{dev_null}`.strip
      return nil if npm_root.empty?

      bin_name = Gem.win_platform? ? 'jsii-runtime.cmd' : 'jsii-runtime'
      bin_path = File.join(npm_root, '.bin', bin_name)
      File.executable?(bin_path) ? bin_path : nil
    rescue StandardError
      nil
    end

    def send_payload(payload)
      warn "SEND: #{JSON.generate(payload)}" if ENV['JSII_DEBUG']
      @stdin.puts(JSON.generate(payload))
      @stdin.flush
    end

    # Treat a `nil` (EOF) read from the sidecar's stdout as an unexpected
    # crash: join the stderr drain briefly to flush any final output, then
    # raise with whatever was captured so the user sees the underlying
    # cause instead of a generic protocol error.
    #
    # @param response_line [String, nil] the line returned by `@stdout.gets`.
    # @return [nil] when the line is non-nil (no-op).
    # @raise [Jsii::RuntimeError] when the line is `nil` (child gone).
    def check_crash!(response_line)
      return if response_line

      # Let the drain thread flush whatever the child wrote on its way out,
      # but cap the wait so a hung drain doesn't turn a crash into a hang.
      @stderr_drain_thread&.join(0.5)
      stderr_content = @stderr_mutex.synchronize { @stderr_buffer.dup }.join
      raise Jsii::RuntimeError, "JSII Kernel crashed unexpectedly.\nStderr: #{stderr_content}"
    end

    # Inspect a decoded response envelope and raise on protocol vs remote
    # errors.  `name == '@jsii/kernel.Fault'` indicates a kernel-side
    # protocol fault (raised as {Jsii::JSIIError}); any other `error`
    # indicates an exception from user JS code (raised as
    # {Jsii::RuntimeError}, preserving the remote stack).
    #
    # @param response [Hash{String=>Object}] the parsed JSON response.
    # @return [nil] when the response has no `error`.
    # @raise [Jsii::JSIIError] for kernel protocol faults.
    # @raise [Jsii::RuntimeError] for remote JavaScript exceptions.
    def check_error!(response)
      return unless response['error']

      raise Jsii::JSIIError, response['error'] if response['name'] == '@jsii/kernel.Fault'

      raise Jsii::RuntimeError.new(response['error'], response['stack'])
    end
  end
end
