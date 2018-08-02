package software.amazon.jsii.tests.calculator;
/**
 * Generates random numbers.
 */
public interface IRandomNumberGenerator extends software.amazon.jsii.JsiiSerializable {
    /**
     * Returns another random number.
     * @return A random number.
     */
    java.lang.Number next();

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IRandomNumberGenerator {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }
        /**
         * Returns another random number.
         * @return A random number.
         */
        public java.lang.Number next() {
            return this.jsiiCall("next", java.lang.Number.class);
        }
    }
}
