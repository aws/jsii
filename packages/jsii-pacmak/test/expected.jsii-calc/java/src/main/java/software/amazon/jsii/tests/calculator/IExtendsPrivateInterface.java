package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface IExtendsPrivateInterface extends software.amazon.jsii.JsiiSerializable {
    java.util.List<java.lang.String> getMoreThings();
    java.lang.String getPrivate();
    void setPrivate(final java.lang.String value);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IExtendsPrivateInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.util.List<java.lang.String> getMoreThings() {
            return this.jsiiGet("moreThings", java.util.List.class);
        }

        @Override
        public java.lang.String getPrivate() {
            return this.jsiiGet("private", java.lang.String.class);
        }

        @Override
        public void setPrivate(final java.lang.String value) {
            this.jsiiSet("private", java.util.Objects.requireNonNull(value, "private is required"));
        }
    }
}
