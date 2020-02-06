package software.amazon.jsii.tests.calculator;

/**
 * @deprecated useless interface
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IDeprecatedInterface")
@software.amazon.jsii.Jsii.Proxy(IDeprecatedInterface.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@Deprecated
public interface IDeprecatedInterface extends software.amazon.jsii.JsiiSerializable {

    /**
     * @deprecated could be better
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    default java.lang.Number getMutableProperty() {
        return null;
    }

    /**
     * @deprecated could be better
     */
    @software.amazon.jsii.Optional
    default void setMutableProperty(final java.lang.Number value) {
        throw new UnsupportedOperationException("'void " + getClass().getCanonicalName() + "#setMutableProperty(java.lang.Number)' is not implemented!");
    }

    /**
     * @deprecated services no purpose
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    void method();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IDeprecatedInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * @deprecated could be better
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        public @org.jetbrains.annotations.Nullable java.lang.Number getMutableProperty() {
            return this.jsiiGet("mutableProperty", java.lang.Number.class);
        }

        /**
         * @deprecated could be better
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        public void setMutableProperty(final @org.jetbrains.annotations.Nullable java.lang.Number value) {
            this.jsiiSet("mutableProperty", value);
        }

        /**
         * @deprecated services no purpose
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        @Override
        public void method() {
            this.jsiiCall("method", software.amazon.jsii.NativeType.VOID);
        }
    }
}
