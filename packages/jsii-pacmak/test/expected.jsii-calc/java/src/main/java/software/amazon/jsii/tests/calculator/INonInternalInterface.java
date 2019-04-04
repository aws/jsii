package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface INonInternalInterface extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.IAnotherPublicInterface {
    java.lang.String getB();
    void setB(final java.lang.String value);
    java.lang.String getC();
    void setC(final java.lang.String value);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.INonInternalInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String getB() {
            return this.jsiiGet("b", java.lang.String.class);
        }

        @Override
        public void setB(final java.lang.String value) {
            this.jsiiSet("b", java.util.Objects.requireNonNull(value, "b is required"));
        }

        @Override
        public java.lang.String getC() {
            return this.jsiiGet("c", java.lang.String.class);
        }

        @Override
        public void setC(final java.lang.String value) {
            this.jsiiSet("c", java.util.Objects.requireNonNull(value, "c is required"));
        }

        @Override
        public java.lang.String getA() {
            return this.jsiiGet("a", java.lang.String.class);
        }

        @Override
        public void setA(final java.lang.String value) {
            this.jsiiSet("a", java.util.Objects.requireNonNull(value, "a is required"));
        }
    }
}
