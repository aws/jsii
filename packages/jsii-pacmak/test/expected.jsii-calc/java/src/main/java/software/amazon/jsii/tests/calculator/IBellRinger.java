package software.amazon.jsii.tests.calculator;

/**
 * Takes the object parameter as an interface.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IBellRinger")
@software.amazon.jsii.Jsii.Proxy(IBellRinger.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface IBellRinger extends software.amazon.jsii.JsiiSerializable {

    /**
     * @param bell This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    void yourTurn(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IBell bell);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IBellRinger {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * @param bell This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public void yourTurn(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IBell bell) {
            this.jsiiCall("yourTurn", software.amazon.jsii.NativeType.VOID, new Object[] { java.util.Objects.requireNonNull(bell, "bell is required") });
        }
    }
}
