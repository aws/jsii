package software.amazon.jsii.tests.calculator;

/**
 * Takes the object parameter as a calss. (experimental)
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IConcreteBellRinger")
@software.amazon.jsii.Jsii.Proxy(IConcreteBellRinger.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IConcreteBellRinger extends software.amazon.jsii.JsiiSerializable {

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param bell This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    void yourTurn(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.Bell bell);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IConcreteBellRinger {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         *  (experimental)
         * <p>
         * EXPERIMENTAL
         * <p>
         * @param bell This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public void yourTurn(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.Bell bell) {
            this.jsiiCall("yourTurn", software.amazon.jsii.NativeType.VOID, new Object[] { java.util.Objects.requireNonNull(bell, "bell is required") });
        }
    }
}
