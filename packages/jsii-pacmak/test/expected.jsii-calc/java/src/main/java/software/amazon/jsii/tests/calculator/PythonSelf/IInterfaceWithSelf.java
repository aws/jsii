package software.amazon.jsii.tests.calculator.PythonSelf;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.PythonSelf.IInterfaceWithSelf")
@software.amazon.jsii.Jsii.Proxy(IInterfaceWithSelf.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IInterfaceWithSelf extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     * <p>
     * @param self This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.String method(final @org.jetbrains.annotations.NotNull java.lang.Number self);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.PythonSelf.IInterfaceWithSelf {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         * <p>
         * @param self This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public @org.jetbrains.annotations.NotNull java.lang.String method(final @org.jetbrains.annotations.NotNull java.lang.Number self) {
            return this.jsiiCall("method", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(self, "self is required") });
        }
    }
}
