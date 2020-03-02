package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.INonInternalInterface")
@software.amazon.jsii.Jsii.Proxy(INonInternalInterface.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface INonInternalInterface extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.IAnotherPublicInterface {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.String getB();

    /**
     * EXPERIMENTAL
     */
    void setB(final @org.jetbrains.annotations.NotNull java.lang.String value);

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.String getC();

    /**
     * EXPERIMENTAL
     */
    void setC(final @org.jetbrains.annotations.NotNull java.lang.String value);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.INonInternalInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public @org.jetbrains.annotations.NotNull java.lang.String getB() {
            return this.jsiiGet("b", java.lang.String.class);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public void setB(final @org.jetbrains.annotations.NotNull java.lang.String value) {
            this.jsiiSet("b", java.util.Objects.requireNonNull(value, "b is required"));
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public @org.jetbrains.annotations.NotNull java.lang.String getC() {
            return this.jsiiGet("c", java.lang.String.class);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public void setC(final @org.jetbrains.annotations.NotNull java.lang.String value) {
            this.jsiiSet("c", java.util.Objects.requireNonNull(value, "c is required"));
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public @org.jetbrains.annotations.NotNull java.lang.String getA() {
            return this.jsiiGet("a", java.lang.String.class);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public void setA(final @org.jetbrains.annotations.NotNull java.lang.String value) {
            this.jsiiSet("a", java.util.Objects.requireNonNull(value, "a is required"));
        }
    }
}
