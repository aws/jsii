package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface IJSII417PublicBaseOfBase extends software.amazon.jsii.JsiiSerializable {
    java.lang.Boolean getHasRoot();
    void foo();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IJSII417PublicBaseOfBase {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.Boolean getHasRoot() {
            return this.jsiiGet("hasRoot", java.lang.Boolean.class);
        }

        @Override
        public void foo() {
            this.jsiiCall("foo", Void.class);
        }
    }
}
