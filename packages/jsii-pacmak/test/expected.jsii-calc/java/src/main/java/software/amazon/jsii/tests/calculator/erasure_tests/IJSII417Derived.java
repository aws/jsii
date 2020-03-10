package software.amazon.jsii.tests.calculator.erasure_tests;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.erasureTests.IJSII417Derived")
@software.amazon.jsii.Jsii.Proxy(IJSII417Derived.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IJSII417Derived extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.erasure_tests.IJSII417PublicBaseOfBase {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.String getProperty();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    void bar();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    void baz();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.erasure_tests.IJSII417Derived {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public @org.jetbrains.annotations.NotNull java.lang.String getProperty() {
            return this.jsiiGet("property", java.lang.String.class);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public @org.jetbrains.annotations.NotNull java.lang.Boolean getHasRoot() {
            return this.jsiiGet("hasRoot", java.lang.Boolean.class);
        }

        /**
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public void bar() {
            this.jsiiCall("bar", software.amazon.jsii.NativeType.VOID);
        }

        /**
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public void baz() {
            this.jsiiCall("baz", software.amazon.jsii.NativeType.VOID);
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
