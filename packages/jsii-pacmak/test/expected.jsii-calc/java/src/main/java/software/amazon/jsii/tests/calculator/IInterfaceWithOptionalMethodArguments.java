package software.amazon.jsii.tests.calculator;

/**
 * awslabs/jsii#175 Interface proxies (and builders) do not respect optional arguments in methods.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
public interface IInterfaceWithOptionalMethodArguments extends software.amazon.jsii.JsiiSerializable {
    void hello(final java.lang.String arg1, @javax.annotation.Nullable final java.lang.Number arg2);
    void hello(final java.lang.String arg1);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IInterfaceWithOptionalMethodArguments {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public void hello(final java.lang.String arg1, @javax.annotation.Nullable final java.lang.Number arg2) {
            this.jsiiCall("hello", Void.class, new Object[] { java.util.Objects.requireNonNull(arg1, "arg1 is required"), arg2 });
        }

        @Override
        public void hello(final java.lang.String arg1) {
            this.jsiiCall("hello", Void.class, new Object[] { java.util.Objects.requireNonNull(arg1, "arg1 is required") });
        }
    }
}
