package software.amazon.jsii.tests.calculator.python_self;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.PythonSelf.IInterfaceWithSelf")
@software.amazon.jsii.Jsii.Proxy(IInterfaceWithSelf.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface IInterfaceWithSelf extends software.amazon.jsii.JsiiSerializable {

    /**
     * @param self This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @org.jetbrains.annotations.NotNull java.lang.String method(final @org.jetbrains.annotations.NotNull java.lang.Number self);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.python_self.IInterfaceWithSelf {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * @param self This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public @org.jetbrains.annotations.NotNull java.lang.String method(final @org.jetbrains.annotations.NotNull java.lang.Number self) {
            return this.jsiiCall("method", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(self, "self is required") });
        }
    }
}
