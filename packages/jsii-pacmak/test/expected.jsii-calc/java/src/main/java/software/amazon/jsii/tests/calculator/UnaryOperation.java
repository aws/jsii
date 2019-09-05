package software.amazon.jsii.tests.calculator;

/**
 * An operation on a single operand.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UnaryOperation")
public abstract class UnaryOperation extends software.amazon.jsii.tests.calculator.lib.Operation {

    protected UnaryOperation(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected UnaryOperation(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected UnaryOperation(final software.amazon.jsii.tests.calculator.lib.Value operand) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(operand, "operand is required") }));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.lib.Value getOperand() {
        return this.jsiiGet("operand", software.amazon.jsii.tests.calculator.lib.Value.class);
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.UnaryOperation {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        /**
         * The value.
         */
        @Override
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public java.lang.Number getValue() {
            return this.jsiiGet("value", java.lang.Number.class);
        }

        /**
         * String representation of the value.
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Override
        public java.lang.String toString() {
            return this.jsiiCall("toString", java.lang.String.class);
        }
    }
}
