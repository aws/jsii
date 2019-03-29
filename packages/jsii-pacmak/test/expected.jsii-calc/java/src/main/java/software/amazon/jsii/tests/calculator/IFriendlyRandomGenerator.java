package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface IFriendlyRandomGenerator extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.IRandomNumberGenerator, software.amazon.jsii.tests.calculator.lib.IFriendly {

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator {
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

        /**
         * Say hello!.
         * 
         */
        @Override
        public java.lang.String hello() {
            return this.jsiiCall("hello", java.lang.String.class);
        }
    }
}
