package software.amazon.jsii.tests.calculator;

/**
 * Even friendlier classes can implement this interface.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IFriendlier extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.lib.IFriendly {

    /**
     * Say farewell.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String farewell();

    /**
     * Say goodbye.
     * 
     * EXPERIMENTAL
     * 
     * @return A goodbye blessing.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String goodbye();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IFriendlier {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        /**
         * Say farewell.
         * 
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public java.lang.String farewell() {
            return this.jsiiCall("farewell", java.lang.String.class);
        }

        /**
         * Say goodbye.
         * 
         * EXPERIMENTAL
         * 
         * @return A goodbye blessing.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public java.lang.String goodbye() {
            return this.jsiiCall("goodbye", java.lang.String.class);
        }

        /**
         * Say hello!
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Override
        public java.lang.String hello() {
            return this.jsiiCall("hello", java.lang.String.class);
        }
    }
}
