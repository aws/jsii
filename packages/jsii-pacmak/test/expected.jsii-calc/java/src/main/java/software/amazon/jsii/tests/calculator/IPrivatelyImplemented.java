package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface IPrivatelyImplemented extends software.amazon.jsii.JsiiSerializable {
    java.lang.Boolean getSuccess();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IPrivatelyImplemented {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.Boolean getSuccess() {
            return this.jsiiGet("success", java.lang.Boolean.class);
        }
    }
}
