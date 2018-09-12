package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface ReturnsNumber extends software.amazon.jsii.JsiiSerializable {
    java.lang.Number getNumberProp();
    java.lang.Number obtainNumber();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.ReturnsNumber {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.Number getNumberProp() {
            return this.jsiiGet("numberProp", java.lang.Number.class);
        }

        @Override
        public java.lang.Number obtainNumber() {
            return this.jsiiCall("obtainNumber", java.lang.Number.class);
        }
    }
}
