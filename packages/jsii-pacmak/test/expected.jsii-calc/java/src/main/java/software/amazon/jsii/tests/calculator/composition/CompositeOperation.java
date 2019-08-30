package software.amazon.jsii.tests.calculator.composition;

/**
 * Abstract operation composed from an expression of other operations.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.composition.CompositeOperation")
public abstract class CompositeOperation extends software.amazon.jsii.tests.calculator.lib.Operation {

    protected CompositeOperation(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected CompositeOperation(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    protected CompositeOperation() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * String representation of the value.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @Override
    public java.lang.String toString() {
        return this.jsiiCall("toString", java.lang.String.class);
    }

    /**
     * The expression that this operation consists of. Must be implemented by derived classes.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.lib.Value getExpression() {
        return this.jsiiGet("expression", software.amazon.jsii.tests.calculator.lib.Value.class);
    }

    /**
     * The value.
     * 
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number getValue() {
        return this.jsiiGet("value", java.lang.Number.class);
    }

    /**
     * A set of postfixes to include in a decorated .toString().
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.List<java.lang.String> getDecorationPostfixes() {
        return this.jsiiGet("decorationPostfixes", java.util.List.class);
    }

    /**
     * A set of postfixes to include in a decorated .toString().
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setDecorationPostfixes(final java.util.List<java.lang.String> value) {
        this.jsiiSet("decorationPostfixes", java.util.Objects.requireNonNull(value, "decorationPostfixes is required"));
    }

    /**
     * A set of prefixes to include in a decorated .toString().
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.List<java.lang.String> getDecorationPrefixes() {
        return this.jsiiGet("decorationPrefixes", java.util.List.class);
    }

    /**
     * A set of prefixes to include in a decorated .toString().
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setDecorationPrefixes(final java.util.List<java.lang.String> value) {
        this.jsiiSet("decorationPrefixes", java.util.Objects.requireNonNull(value, "decorationPrefixes is required"));
    }

    /**
     * The .toString() style.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.composition.CompositeOperation.CompositionStringStyle getStringStyle() {
        return this.jsiiGet("stringStyle", software.amazon.jsii.tests.calculator.composition.CompositeOperation.CompositionStringStyle.class);
    }

    /**
     * The .toString() style.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setStringStyle(final software.amazon.jsii.tests.calculator.composition.CompositeOperation.CompositionStringStyle value) {
        this.jsiiSet("stringStyle", java.util.Objects.requireNonNull(value, "stringStyle is required"));
    }
    /**
     * Style of .toString() output for CompositeOperation.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.composition.CompositeOperation.CompositionStringStyle")
    public enum CompositionStringStyle {
        /**
         * Normal string expression.
         * 
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        NORMAL,
        /**
         * Decorated string expression.
         * 
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        DECORATED,
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.composition.CompositeOperation {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        /**
         * The expression that this operation consists of. Must be implemented by derived classes.
         * 
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public software.amazon.jsii.tests.calculator.lib.Value getExpression() {
            return this.jsiiGet("expression", software.amazon.jsii.tests.calculator.lib.Value.class);
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
