package software.amazon.jsii.tests.calculator;

/**
 * Even friendlier classes can implement this interface. (experimental)
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IFriendlier")
@software.amazon.jsii.Jsii.Proxy(IFriendlier.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IFriendlier extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.lib.IFriendly {

    /**
     * Say farewell. (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.String farewell();

    /**
     * Say goodbye. (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @return A goodbye blessing.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.String goodbye();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IFriendlier {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * Say farewell. (experimental)
         * <p>
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public @org.jetbrains.annotations.NotNull java.lang.String farewell() {
            return this.jsiiCall("farewell", java.lang.String.class);
        }

        /**
         * Say goodbye. (experimental)
         * <p>
         * EXPERIMENTAL
         * <p>
         * @return A goodbye blessing.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public @org.jetbrains.annotations.NotNull java.lang.String goodbye() {
            return this.jsiiCall("goodbye", java.lang.String.class);
        }

        /**
         * Say hello! (deprecated)
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        @Override
        public @org.jetbrains.annotations.NotNull java.lang.String hello() {
            return this.jsiiCall("hello", java.lang.String.class);
        }
    }
}
