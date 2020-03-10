package software.amazon.jsii.tests.calculator.compliance;

/**
 * Takes the object parameter as an interface.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.IBellRinger")
@software.amazon.jsii.Jsii.Proxy(IBellRinger.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IBellRinger extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     * <p>
     * @param bell This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    void yourTurn(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.IBell bell);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.compliance.IBellRinger {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         * <p>
         * @param bell This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public void yourTurn(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.IBell bell) {
            this.jsiiCall("yourTurn", software.amazon.jsii.NativeType.VOID, new Object[] { java.util.Objects.requireNonNull(bell, "bell is required") });
        }
    }
}
