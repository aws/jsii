package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IFriendlyRandomGenerator")
@software.amazon.jsii.Jsii.Proxy(IFriendlyRandomGenerator.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IFriendlyRandomGenerator extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.IRandomNumberGenerator, software.amazon.jsii.tests.calculator.lib.IFriendly {

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * Returns another random number.
         * <p>
         * EXPERIMENTAL
         * <p>
         * @return A random number.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public @org.jetbrains.annotations.NotNull java.lang.Number next() {
            return this.jsiiCall("next", java.lang.Number.class);
        }

        /**
         * Say hello!
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        @Override
        public @org.jetbrains.annotations.NotNull java.lang.String hello() {
            return this.jsiiCall("hello", java.lang.String.class);
        }
    }
}
