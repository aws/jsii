package software.amazon.jsii.tests.calculator.lib;

/**
 * Represents an operation on values.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@Deprecated
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.lib.$Module.class, fqn = "@scope/jsii-calc-lib.Operation")
public abstract class Operation extends software.amazon.jsii.tests.calculator.lib.Value {

    protected Operation(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Operation(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    protected Operation() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * String representation of the value.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    @Override
    public abstract java.lang.String toString();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.lib.Operation {
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
