package software.amazon.jsii.tests.calculator;

/**
 * An operation on a single operand.
 * 
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UnaryOperation")
public abstract class UnaryOperation extends software.amazon.jsii.tests.calculator.lib.Operation {
    protected UnaryOperation(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public UnaryOperation(final software.amazon.jsii.tests.calculator.lib.Value operand) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(java.util.Objects.requireNonNull(operand, "operand is required")).toArray());
    }

    public software.amazon.jsii.tests.calculator.lib.Value getOperand() {
        return this.jsiiGet("operand", software.amazon.jsii.tests.calculator.lib.Value.class);
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.UnaryOperation {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * The value.
         * 
         */
        @Override
        public java.lang.Number getValue() {
            return this.jsiiGet("value", java.lang.Number.class);
        }

        /**
         * String representation of the value.
         * 
         */
        @Override
        public java.lang.String toString() {
            return this.jsiiCall("toString", java.lang.String.class);
        }
    }
}
