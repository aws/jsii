package software.amazon.jsii.tests.calculator;
public interface ReturnsNumber extends software.amazon.jsii.JsiiSerializable {
    java.lang.Number getNumberProp();
    java.lang.Number obtainNumber();

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.ReturnsNumber {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }
        public java.lang.Number getNumberProp() {
            return this.jsiiGet("numberProp", java.lang.Number.class);
        }
        public java.lang.Number obtainNumber() {
            return this.jsiiCall("obtainNumber", java.lang.Number.class);
        }
    }
}
