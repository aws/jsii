package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface IPublicInterface2 extends software.amazon.jsii.JsiiSerializable {
    java.lang.String ciao();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IPublicInterface2 {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String ciao() {
            return this.jsiiCall("ciao", java.lang.String.class);
        }
    }
}
