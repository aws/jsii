package software.amazon.jsii.tests.calculator;

/**
 * Represents an operation with two operands.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.BinaryOperation")
public abstract class BinaryOperation extends software.amazon.jsii.tests.calculator.lib.Operation implements software.amazon.jsii.tests.calculator.lib.IFriendly {
    protected BinaryOperation(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * Creates a BinaryOperation.
     * 
     * @param lhs Left-hand side operand.
     * @param rhs Right-hand side operand.
     */
    public BinaryOperation(final software.amazon.jsii.tests.calculator.lib.Value lhs, final software.amazon.jsii.tests.calculator.lib.Value rhs) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(lhs, "lhs is required"), java.util.Objects.requireNonNull(rhs, "rhs is required") });
    }

    /**
     * Say hello!
     */
    @Override
    public java.lang.String hello() {
        return this.jsiiCall("hello", java.lang.String.class);
    }

    /**
     * Left-hand side operand.
     */
    public software.amazon.jsii.tests.calculator.lib.Value getLhs() {
        return this.jsiiGet("lhs", software.amazon.jsii.tests.calculator.lib.Value.class);
    }

    /**
     * Right-hand side operand.
     */
    public software.amazon.jsii.tests.calculator.lib.Value getRhs() {
        return this.jsiiGet("rhs", software.amazon.jsii.tests.calculator.lib.Value.class);
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.BinaryOperation {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * The value.
         */
        @Override
        public java.lang.Number getValue() {
            return this.jsiiGet("value", java.lang.Number.class);
        }

        /**
         * Say hello!
         */
        @Override
        public java.lang.String hello() {
            return this.jsiiCall("hello", java.lang.String.class);
        }

        /**
         * String representation of the value.
         */
        @Override
        public java.lang.String toString() {
            return this.jsiiCall("toString", java.lang.String.class);
        }
    }
}
