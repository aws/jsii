package software.amazon.jsii.tests.calculator;

/**
 * Represents an operation with two operands.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.BinaryOperation")
public abstract class BinaryOperation extends software.amazon.jsii.tests.calculator.lib.Operation implements software.amazon.jsii.tests.calculator.lib.IFriendly {

    protected BinaryOperation(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected BinaryOperation(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * Creates a BinaryOperation.
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param lhs Left-hand side operand. This parameter is required.
     * @param rhs Right-hand side operand. This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected BinaryOperation(final software.amazon.jsii.tests.calculator.lib.Value lhs, final software.amazon.jsii.tests.calculator.lib.Value rhs) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(lhs, "lhs is required"), java.util.Objects.requireNonNull(rhs, "rhs is required") });
    }

    /**
     * Say hello!
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @Override
    public java.lang.String hello() {
        return this.jsiiCall("hello", software.amazon.jsii.NativeType.forClass(java.lang.String.class));
    }

    /**
     * Left-hand side operand.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.lib.Value getLhs() {
        return this.jsiiGet("lhs", software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.lib.Value.class));
    }

    /**
     * Right-hand side operand.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.lib.Value getRhs() {
        return this.jsiiGet("rhs", software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.lib.Value.class));
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.BinaryOperation {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * The value.
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        public java.lang.Number getValue() {
            return this.jsiiGet("value", software.amazon.jsii.NativeType.forClass(java.lang.Number.class));
        }

        /**
         * Say hello!
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        @Override
        public java.lang.String hello() {
            return this.jsiiCall("hello", software.amazon.jsii.NativeType.forClass(java.lang.String.class));
        }

        /**
         * String representation of the value.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        @Override
        public java.lang.String toString() {
            return this.jsiiCall("toString", software.amazon.jsii.NativeType.forClass(java.lang.String.class));
        }
    }
}
