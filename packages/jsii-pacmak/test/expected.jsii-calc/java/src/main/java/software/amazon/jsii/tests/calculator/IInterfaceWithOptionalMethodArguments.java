package software.amazon.jsii.tests.calculator;

/**
 * awslabs/jsii#175 Interface proxies (and builders) do not respect optional arguments in methods.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IInterfaceWithOptionalMethodArguments")
@software.amazon.jsii.Jsii.Proxy(IInterfaceWithOptionalMethodArguments.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IInterfaceWithOptionalMethodArguments extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     * <p>
     * @param arg1 This parameter is required.
     * @param arg2
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    void hello(final @org.jetbrains.annotations.NotNull java.lang.String arg1, final @org.jetbrains.annotations.Nullable java.lang.Number arg2);

    /**
     * EXPERIMENTAL
     * <p>
     * @param arg1 This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    void hello(final @org.jetbrains.annotations.NotNull java.lang.String arg1);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IInterfaceWithOptionalMethodArguments {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         * <p>
         * @param arg1 This parameter is required.
         * @param arg2
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public void hello(final @org.jetbrains.annotations.NotNull java.lang.String arg1, final @org.jetbrains.annotations.Nullable java.lang.Number arg2) {
            this.jsiiCall("hello", software.amazon.jsii.NativeType.VOID, new Object[] { java.util.Objects.requireNonNull(arg1, "arg1 is required"), arg2 });
        }

        /**
         * EXPERIMENTAL
         * <p>
         * @param arg1 This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public void hello(final @org.jetbrains.annotations.NotNull java.lang.String arg1) {
            this.jsiiCall("hello", software.amazon.jsii.NativeType.VOID, new Object[] { java.util.Objects.requireNonNull(arg1, "arg1 is required") });
        }
    }
}
