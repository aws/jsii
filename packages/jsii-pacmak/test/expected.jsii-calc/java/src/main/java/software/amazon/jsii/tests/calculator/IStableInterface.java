package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IStableInterface")
@software.amazon.jsii.Jsii.Proxy(IStableInterface.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface IStableInterface extends software.amazon.jsii.JsiiSerializable {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    default @org.jetbrains.annotations.Nullable java.lang.Number getMutableProperty() {
        return null;
    }

    /**
     */
    @software.amazon.jsii.Optional
    default void setMutableProperty(final @org.jetbrains.annotations.Nullable java.lang.Number value) {
        throw new UnsupportedOperationException("'void " + getClass().getCanonicalName() + "#setMutableProperty(@org.jetbrains.annotations.Nullable java.lang.Number)' is not implemented!");
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    void method();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IStableInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public @org.jetbrains.annotations.Nullable java.lang.Number getMutableProperty() {
            return this.jsiiGet("mutableProperty", java.lang.Number.class);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public void setMutableProperty(final @org.jetbrains.annotations.Nullable java.lang.Number value) {
            this.jsiiSet("mutableProperty", value);
        }

        /**
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public void method() {
            this.jsiiCall("method", software.amazon.jsii.NativeType.VOID);
        }
    }
}
