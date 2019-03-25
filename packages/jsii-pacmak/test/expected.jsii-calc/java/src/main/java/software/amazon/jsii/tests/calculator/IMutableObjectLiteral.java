package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface IMutableObjectLiteral extends software.amazon.jsii.JsiiSerializable {
    java.lang.String getValue();
    void setValue(final java.lang.String value);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IMutableObjectLiteral {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String getValue() {
            return this.jsiiGet("value", java.lang.String.class);
        }

        @Override
        public void setValue(final java.lang.String value) {
            this.jsiiSet("value", java.util.Objects.requireNonNull(value, "value is required"));
        }
    }
}
