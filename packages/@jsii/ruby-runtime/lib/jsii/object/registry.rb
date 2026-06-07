# frozen_string_literal: true

module Jsii
  class Object
    # Internal registry for tracking active JSII instances and FQN mappings
    module Registry
      # @return [Hash{String=>Class,Module}] the process-wide map from JSII fqn
      #   to the Ruby class/module that proxies it.
      def registry
        @registry ||= {}
      end

      # The process-wide map from `$jsii.byref` handle to the live Ruby proxy
      # instance.
      #
      # This is intentionally a *strong*-reference Hash, not a weak map, and
      # the runtime deliberately never issues the kernel's `del` call when a
      # proxy is garbage-collected. A jsii object is referenced from both
      # sides of the boundary, and the guest (Ruby) cannot know how many
      # references the host (the Node sidecar, and TypeScript code running in
      # it) still holds. Deleting a kernel object that the host still
      # references would create a dangling reference there — a use-after-free
      # the guest has no way to rule out.
      #
      # Every reference runtime makes the same choice: the Python runtime uses
      # a strong dict with the comment "we can never free the memory of JSII
      # objects ever, because we have no idea how many references exist on the
      # *other* side"; the Go runtime defines a `Del` request but never calls
      # it per-object, attaching its only finalizer to the kernel client to
      # close the child process. Wholesale cleanup happens the same way here:
      # {Jsii::Kernel#shutdown} closes the sidecar, freeing all kernel objects
      # at once. This suits jsii's `synth`-style, short-lived workloads.
      #
      # @return [Hash{String=>Jsii::Object}] the strong byref → proxy map.
      def objects
        @objects ||= {}
      end

      # The JSII fqn attached to this class, walking up the superclass chain
      # if it isn't set directly on the receiver.
      #
      # @return [String, nil] the inherited or own fqn, or `nil` if neither carries one.
      def jsii_fqn
        return @jsii_fqn if @jsii_fqn
        return unless superclass.respond_to?(:jsii_fqn)

        superclass.jsii_fqn
      end

      # Decode a `$jsii.byref` wire envelope into a live Ruby proxy, reusing
      # any previously-registered instance for the same ref.  Falls back to
      # the first interface fqn (then the ref prefix) when the wire envelope
      # only reports `"Object"` as the concrete type.
      #
      # @param value [Hash{String=>Object}] the wire envelope.
      # @return [Jsii::Object] the (possibly newly-allocated) proxy instance.
      def jsii_deserialize(value)
        ref = value['$jsii.byref']
        fqn = value['$jsii.fqn']

        if (Jsii::Utils.blank?(fqn) || fqn == 'Object') && value.key?('$jsii.interfaces')
          fqn = value['$jsii.interfaces'].first
        end
        fqn = ref.rpartition('@').first if Jsii::Utils.blank?(fqn) || fqn == 'Object'

        from_jsii_ref(ref, fqn)
      end

      # Register a Ruby class/module as the proxy for a given JSII fqn.
      # Idempotent: re-registering the same fqn replaces the previous mapping.
      #
      # @param fqn   [String] the JSII fully-qualified name.
      # @param klass [Class, Module] the Ruby type that should proxy that fqn.
      # @return [Class, Module] `klass`, for chaining.
      def register_jsii_fqn(fqn, klass)
        klass.extend(Jsii::FqnExtension) if klass.is_a?(Module) && !klass.respond_to?(:jsii_fqn=)
        klass.jsii_fqn = fqn if klass.respond_to?(:jsii_fqn=)
        Jsii::Object.registry[fqn] = klass
      end

      # @return [Hash{String=>String}] process-wide map from JSII fqn to the
      #   `require` path of the file that defines (and self-registers) its
      #   Ruby proxy.  Populated eagerly by a generated assembly's loader so
      #   that types can be loaded on demand — see {#find_class_by_fqn}.
      def autoload_paths
        @autoload_paths ||= {}
      end

      # Record where a type's proxy can be loaded from, without loading it.
      # Generated assembly loaders call this for every type alongside the
      # Ruby `autoload` declaration, so the two load triggers stay in sync:
      # Ruby `autoload` covers constant references in user code, while this
      # map covers the case the kernel hands back an fqn the user never named
      # (pervasive in CDK: `vpc.public_subnets`, `bucket.grant_read`, ...).
      #
      # @param fqn  [String] the JSII fully-qualified name.
      # @param path [String] the `require` path of the defining file.
      # @return [void]
      def register_autoload(fqn, path)
        autoload_paths[fqn] = path
      end

      # Look up the Ruby class/module registered for a given JSII fqn,
      # loading its defining file on demand if it hasn't been required yet.
      #
      # The on-demand load is what makes lazy (autoload) code generation safe
      # for hydration: when the kernel returns a `$jsii.byref` of a type the
      # user never referenced by constant, the type's file hasn't been loaded
      # and the registry is empty for it — so we `require` it here (which runs
      # its `register_jsii_fqn`) before resolving.
      #
      # @param fqn [String] the JSII fully-qualified name.
      # @return [Class, Module, nil] the registered proxy type, or `nil`.
      def find_class_by_fqn(fqn)
        return Jsii::Object.registry[fqn] if Jsii::Object.registry.key?(fqn)

        path = Jsii::Object.autoload_paths[fqn]
        require path if path

        Jsii::Object.registry[fqn]
      end

      # Is the given Ruby class/module registered against any JSII fqn?
      #
      # @param klass [Class, Module] the Ruby type to test.
      # @return [Boolean] `true` if it appears in the registry.
      def registered_class?(klass)
        Jsii::Object.registry.value?(klass)
      end

      # Look up a live proxy by its `$jsii.byref` handle (a raw string or a
      # `{ '$jsii.byref' => ... }` wire envelope).  Falls back to the
      # currently-pending in-flight instance when nothing has been registered
      # yet, which can happen during constructor callbacks.
      #
      # @param ref [String, Hash] either a raw handle or a wire envelope.
      # @return [Jsii::Object, nil] the registered (or pending) proxy, or `nil` if no match.
      def find_by_ref(ref)
        ref = ref['$jsii.byref'] if ref.is_a?(Hash) && ref.key?('$jsii.byref')
        Jsii::Object.objects[ref] || Jsii::Kernel.instance.pending_object
      end

      # Add a freshly-constructed proxy to the process-wide instance map.
      # No-op when the instance has no `jsii_ref` (e.g. value structs).
      #
      # @param instance [Jsii::Object] the proxy to record.
      # @return [Jsii::Object, nil] the registered instance, or `nil` if `instance.jsii_ref` is nil.
      def register_instance(instance)
        return unless instance.jsii_ref

        Jsii::Object.objects[instance.jsii_ref] = instance
      end

      # Resolve a ref to a proxy, allocating-and-registering a new one when
      # no matching live instance exists.
      #
      # @param ref [String] the `$jsii.byref` handle.
      # @param fqn [String] the JSII fqn to use when allocating a new proxy.
      # @return [Jsii::Object] the existing or newly-built proxy instance.
      def from_jsii_ref(ref, fqn)
        find_by_ref(ref) || build_and_register_instance(ref, fqn)
      end

      private

      # Allocate a brand-new proxy, attach the supplied ref, record it in
      # the registry, and eagerly load fields when the type is a struct
      # (so callers can read struct properties without a roundtrip).
      #
      # @param ref [String] the `$jsii.byref` handle.
      # @param fqn [String] the fqn to instantiate.
      # @return [Jsii::Object] the registered proxy.
      def build_and_register_instance(ref, fqn)
        instance = build_uninitialized_instance(fqn)
        instance.instance_variable_set(:@jsii_ref, ref)
        register_instance(instance)

        hydrate_struct!(instance, ref)

        instance
      end

      # Allocate an instance of the Ruby class registered for `fqn` (or
      # plain {Jsii::Object} when nothing's registered).  When the registry
      # has a `Module` instead of a `Class` (interface), allocate a base
      # `Jsii::Object` and `extend` the interface module onto it so type
      # checks and method dispatch behave correctly.
      #
      # @param fqn [String] the fqn whose proxy should be built.
      # @return [Jsii::Object] the freshly-allocated (uninitialized) instance.
      def build_uninitialized_instance(fqn)
        klass = find_class_by_fqn(fqn) || Jsii::Object

        if klass.is_a?(Class)
          klass.allocate
        else
          Jsii::Object.allocate.extend(klass)
        end
      end

      # When `instance` is a struct, fetch every declared property over the
      # wire and assign it as an instance variable, so subsequent reads
      # don't need to go back to the kernel.
      #
      # @param instance [Jsii::Object] the proxy to hydrate (typically a {Jsii::Struct}).
      # @param ref      [String]       the `$jsii.byref` handle.
      # @return [void]
      def hydrate_struct!(instance, ref)
        klass = instance.class
        return unless klass < Jsii::Struct && klass.respond_to?(:jsii_properties)

        klass.jsii_properties.each do |ruby_name, jsii_name|
          val = Jsii::Kernel.instance.get_property(ref, jsii_name)
          instance.instance_variable_set("@#{ruby_name}", val)
        end
      end
    end
  end
end
