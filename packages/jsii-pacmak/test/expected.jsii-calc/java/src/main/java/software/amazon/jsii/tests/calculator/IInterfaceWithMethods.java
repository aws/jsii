package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface IInterfaceWithMethods extends software.amazon.jsii.JsiiSerializable {
    java.lang.String getValue();
    void doThings();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IInterfaceWithMethods {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String getValue() {
            return this.jsiiGet("value", java.lang.String.class);
        }

        @Override
        public void doThings() {
            this.jsiiCall("doThings", Void.class);
        }
    }
}
