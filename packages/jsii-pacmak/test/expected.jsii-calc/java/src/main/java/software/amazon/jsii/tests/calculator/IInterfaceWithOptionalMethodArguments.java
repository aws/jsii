package software.amazon.jsii.tests.calculator;

/**
 * awslabs/jsii#175 Interface proxies (and builders) do not respect optional arguments in methods.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IInterfaceWithOptionalMethodArguments extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    void hello(final java.lang.String arg1, final java.lang.Number arg2);

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    void hello(final java.lang.String arg1);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IInterfaceWithOptionalMethodArguments {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public void hello(final java.lang.String arg1, final java.lang.Number arg2) {
            this.jsiiCall("hello", Void.class, new Object[] { java.util.Objects.requireNonNull(arg1, "arg1 is required"), arg2 });
        }

        /**
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public void hello(final java.lang.String arg1) {
            this.jsiiCall("hello", Void.class, new Object[] { java.util.Objects.requireNonNull(arg1, "arg1 is required") });
        }
    }
}
