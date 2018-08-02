package software.amazon.jsii.tests.calculator;
/**
 * Even friendlier classes can implement this interface.
 */
public interface IFriendlier extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.lib.IFriendly {
    /**
     * Say goodbye.
     * @return A goodbye blessing.
     */
    java.lang.String goodbye();
    /**
     * Say farewell.
     */
    java.lang.String farewell();

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IFriendlier {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }
        /**
         * Say goodbye.
         * @return A goodbye blessing.
         */
        public java.lang.String goodbye() {
            return this.jsiiCall("goodbye", java.lang.String.class);
        }
        /**
         * Say farewell.
         */
        public java.lang.String farewell() {
            return this.jsiiCall("farewell", java.lang.String.class);
        }
        /**
         * Say hello!
         */
        public java.lang.String hello() {
            return this.jsiiCall("hello", java.lang.String.class);
        }
    }
}
