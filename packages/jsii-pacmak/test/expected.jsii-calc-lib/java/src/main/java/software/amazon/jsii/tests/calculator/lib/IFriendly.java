package software.amazon.jsii.tests.calculator.lib;

/**
 * Applies to classes that are considered friendly.
 * <p>
 * These classes can be greeted with
 * a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.lib.$Module.class, fqn = "@scope/jsii-calc-lib.IFriendly")
@software.amazon.jsii.Jsii.Proxy(IFriendly.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@Deprecated
public interface IFriendly extends software.amazon.jsii.JsiiSerializable {

    /**
     * Say hello!
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    @org.jetbrains.annotations.NotNull java.lang.String hello();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.lib.IFriendly {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * Say hello!
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        @Override
        public @org.jetbrains.annotations.NotNull java.lang.String hello() {
            return this.jsiiCall("hello", java.lang.String.class);
        }
    }
}
