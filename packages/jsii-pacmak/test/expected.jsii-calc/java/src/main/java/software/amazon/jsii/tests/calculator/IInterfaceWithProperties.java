package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface IInterfaceWithProperties extends software.amazon.jsii.JsiiSerializable {
    java.lang.String getReadOnlyString();
    java.lang.String getReadWriteString();
    void setReadWriteString(final java.lang.String value);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IInterfaceWithProperties {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String getReadOnlyString() {
            return this.jsiiGet("readOnlyString", java.lang.String.class);
        }

        @Override
        public java.lang.String getReadWriteString() {
            return this.jsiiGet("readWriteString", java.lang.String.class);
        }

        @Override
        public void setReadWriteString(final java.lang.String value) {
            this.jsiiSet("readWriteString", java.util.Objects.requireNonNull(value, "readWriteString is required"));
        }
    }
}
