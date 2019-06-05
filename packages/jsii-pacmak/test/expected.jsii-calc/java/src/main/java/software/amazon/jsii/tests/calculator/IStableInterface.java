package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface IStableInterface extends software.amazon.jsii.JsiiSerializable {
    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    java.lang.Number getMutableProperty();
    /**
     */
    void setMutableProperty(final java.lang.Number value);
    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    void method();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IStableInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @javax.annotation.Nullable
        public java.lang.Number getMutableProperty() {
            return this.jsiiGet("mutableProperty", java.lang.Number.class);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public void setMutableProperty(@javax.annotation.Nullable final java.lang.Number value) {
            this.jsiiSet("mutableProperty", value);
        }

        /**
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public void method() {
            this.jsiiCall("method", Void.class);
        }
    }
}
