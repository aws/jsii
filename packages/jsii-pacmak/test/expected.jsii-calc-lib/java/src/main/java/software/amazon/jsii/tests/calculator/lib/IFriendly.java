package software.amazon.jsii.tests.calculator.lib;

/**
 * Applies to classes that are considered friendly.
 * 
 * These classes can be greeted with
 * a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
public interface IFriendly extends software.amazon.jsii.JsiiSerializable {
    /**
     * Say hello!
     */
    java.lang.String hello();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.lib.IFriendly {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * Say hello!
         */
        @Override
        public java.lang.String hello() {
            return this.jsiiCall("hello", java.lang.String.class);
        }
    }
}
