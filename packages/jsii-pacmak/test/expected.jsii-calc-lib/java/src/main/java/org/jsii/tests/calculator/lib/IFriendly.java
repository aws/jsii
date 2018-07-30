package org.jsii.tests.calculator.lib;
/**
 * Applies to classes that are considered friendly. These classes can be greeted with
 * a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
 */
public interface IFriendly extends org.jsii.JsiiSerializable {
    /**
     * Say hello!
     */
    java.lang.String hello();

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    class Jsii$Proxy extends org.jsii.JsiiObject implements org.jsii.tests.calculator.lib.IFriendly {
        protected Jsii$Proxy(final org.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }
        /**
         * Say hello!
         */
        public java.lang.String hello() {
            return this.jsiiCall("hello", java.lang.String.class);
        }
    }
}
