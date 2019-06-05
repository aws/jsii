package software.amazon.jsii.tests.calculator;

/**
 * @deprecated for the show
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@Deprecated
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
public interface IDeprecatedInterface extends software.amazon.jsii.JsiiSerializable {
    /**
     * @deprecated for the show
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    java.lang.Number getMutableProperty();
    /**
     * @deprecated for the show
     */
    void setMutableProperty(final java.lang.Number value);
    /**
     * @deprecated for the show
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    void method();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IDeprecatedInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * @deprecated for the show
         */
        @Override
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @javax.annotation.Nullable
        public java.lang.Number getMutableProperty() {
            return this.jsiiGet("mutableProperty", java.lang.Number.class);
        }

        /**
         * @deprecated for the show
         */
        @Override
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public void setMutableProperty(@javax.annotation.Nullable final java.lang.Number value) {
            this.jsiiSet("mutableProperty", value);
        }

        /**
         * @deprecated for the show
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Override
        public void method() {
            this.jsiiCall("method", Void.class);
        }
    }
}
