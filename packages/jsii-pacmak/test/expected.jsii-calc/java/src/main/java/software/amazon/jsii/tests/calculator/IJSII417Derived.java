package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface IJSII417Derived extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.IJSII417PublicBaseOfBase {
    java.lang.String getProperty();
    void bar();
    void baz();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IJSII417Derived {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String getProperty() {
            return this.jsiiGet("property", java.lang.String.class);
        }

        @Override
        public java.lang.Boolean getHasRoot() {
            return this.jsiiGet("hasRoot", java.lang.Boolean.class);
        }

        @Override
        public void bar() {
            this.jsiiCall("bar", Void.class);
        }

        @Override
        public void baz() {
            this.jsiiCall("baz", Void.class);
        }

        @Override
        public void foo() {
            this.jsiiCall("foo", Void.class);
        }
    }
}
