package software.amazon.jsii.tests.calculator;

/**
 * Generates random numbers.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IRandomNumberGenerator")
@software.amazon.jsii.Jsii.Proxy(IRandomNumberGenerator.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface IRandomNumberGenerator extends software.amazon.jsii.JsiiSerializable {

    /**
     * Returns another random number.
     * <p>
     * @return A random number.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @org.jetbrains.annotations.NotNull java.lang.Number next();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IRandomNumberGenerator {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * Returns another random number.
         * <p>
         * @return A random number.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public @org.jetbrains.annotations.NotNull java.lang.Number next() {
            return this.jsiiCall("next", java.lang.Number.class);
        }
    }
}
