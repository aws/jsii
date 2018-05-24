package org.jsii.tests.calculator;
/**
 * Generates random numbers.
 */
public interface IRandomNumberGenerator extends org.jsii.JsiiSerializable {
    /**
     * @returns A random number.
     * Returns another random number.
     */
    java.lang.Number next();

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    class Jsii$Proxy extends org.jsii.JsiiObject implements org.jsii.tests.calculator.IRandomNumberGenerator {
        protected Jsii$Proxy(final org.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }
        /**
         * @returns A random number.
         * Returns another random number.
         */
        public java.lang.Number next() {
            return this.jsiiCall("next", java.lang.Number.class);
        }
    }
}
