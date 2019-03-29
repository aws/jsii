package software.amazon.jsii.tests.calculator;

/**
 * Generates random numbers.
 * 
 */
@javax.annotation.Generated(value = "jsii-pacmak")
public interface IRandomNumberGenerator extends software.amazon.jsii.JsiiSerializable {
    /**
     * Returns another random number.
     * 
     * @return A random number.
     */
    java.lang.Number next();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IRandomNumberGenerator {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * Returns another random number.
         * 
         * @return A random number.
         */
        @Override
        public java.lang.Number next() {
            return this.jsiiCall("next", java.lang.Number.class);
        }
    }
}
