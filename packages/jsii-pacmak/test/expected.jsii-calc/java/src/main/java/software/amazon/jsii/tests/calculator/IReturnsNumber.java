package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface IReturnsNumber extends software.amazon.jsii.JsiiSerializable {
    software.amazon.jsii.tests.calculator.lib.Number getNumberProp();
    software.amazon.jsii.tests.calculator.lib.IDoublable obtainNumber();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IReturnsNumber {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public software.amazon.jsii.tests.calculator.lib.Number getNumberProp() {
            return this.jsiiGet("numberProp", software.amazon.jsii.tests.calculator.lib.Number.class);
        }

        @Override
        public software.amazon.jsii.tests.calculator.lib.IDoublable obtainNumber() {
            return this.jsiiCall("obtainNumber", software.amazon.jsii.tests.calculator.lib.IDoublable.class);
        }
    }
}
