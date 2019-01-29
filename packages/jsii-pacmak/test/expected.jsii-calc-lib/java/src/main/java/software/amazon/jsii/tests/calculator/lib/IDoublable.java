package software.amazon.jsii.tests.calculator.lib;

/**
 * The general contract for a concrete number.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
public interface IDoublable extends software.amazon.jsii.JsiiSerializable {
    java.lang.Number getDoubleValue();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.lib.IDoublable {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.Number getDoubleValue() {
            return this.jsiiGet("doubleValue", java.lang.Number.class);
        }
    }
}
