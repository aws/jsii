package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IJSII417PublicBaseOfBase")
@software.amazon.jsii.Jsii.Proxy(IJSII417PublicBaseOfBase.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IJSII417PublicBaseOfBase extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Boolean getHasRoot();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    void foo();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IJSII417PublicBaseOfBase {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public java.lang.Boolean getHasRoot() {
            return this.jsiiGet("hasRoot", software.amazon.jsii.NativeType.forClass(java.lang.Boolean.class));
        }

        /**
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public void foo() {
            this.jsiiCall("foo", software.amazon.jsii.NativeType.VOID);
        }
    }
}
