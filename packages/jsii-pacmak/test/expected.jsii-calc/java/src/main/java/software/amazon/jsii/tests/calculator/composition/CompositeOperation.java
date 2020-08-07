package software.amazon.jsii.tests.calculator.composition;

/**
 * Abstract operation composed from an expression of other operations. (experimental)
 * <p>
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
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * String representation of the value. (experimental)
     * <p>
     * (deprecated)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @Override
    public @org.jetbrains.annotations.NotNull java.lang.String toString() {
        return this.jsiiCall("toString", java.lang.String.class);
    }

    /**
     * The expression that this operation consists of. (experimental)
     * <p>
     * Must be implemented by derived classes.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public abstract @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Value getExpression();

    /**
     * The value. (experimental)
     * <p>
     * (deprecated)
     * <p>
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Number getValue() {
        return this.jsiiGet("value", java.lang.Number.class);
    }

    /**
     * A set of postfixes to include in a decorated .toString(). (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.util.List<java.lang.String> getDecorationPostfixes() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("decorationPostfixes", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class))));
    }

    /**
     * A set of postfixes to include in a decorated .toString(). (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setDecorationPostfixes(final @org.jetbrains.annotations.NotNull java.util.List<java.lang.String> value) {
        this.jsiiSet("decorationPostfixes", java.util.Objects.requireNonNull(value, "decorationPostfixes is required"));
    }

    /**
     * A set of prefixes to include in a decorated .toString(). (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.util.List<java.lang.String> getDecorationPrefixes() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("decorationPrefixes", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class))));
    }

    /**
     * A set of prefixes to include in a decorated .toString(). (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setDecorationPrefixes(final @org.jetbrains.annotations.NotNull java.util.List<java.lang.String> value) {
        this.jsiiSet("decorationPrefixes", java.util.Objects.requireNonNull(value, "decorationPrefixes is required"));
    }

    /**
     * The .toString() style. (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.composition.CompositeOperation.CompositionStringStyle getStringStyle() {
        return this.jsiiGet("stringStyle", software.amazon.jsii.tests.calculator.composition.CompositeOperation.CompositionStringStyle.class);
    }

    /**
     * The .toString() style. (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setStringStyle(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.composition.CompositeOperation.CompositionStringStyle value) {
        this.jsiiSet("stringStyle", java.util.Objects.requireNonNull(value, "stringStyle is required"));
    }
    /**
     * Style of .toString() output for CompositeOperation. (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.composition.CompositeOperation.CompositionStringStyle")
    public enum CompositionStringStyle {
        /**
         * Normal string expression. (experimental)
         * <p>
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        NORMAL,
        /**
         * Decorated string expression. (experimental)
         * <p>
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
            super(objRef);
        }

        /**
         * The expression that this operation consists of. (experimental)
         * <p>
         * Must be implemented by derived classes.
         * <p>
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Value getExpression() {
            return this.jsiiGet("expression", software.amazon.jsii.tests.calculator.lib.Value.class);
        }

        /**
         * The value. (deprecated)
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        public @org.jetbrains.annotations.NotNull java.lang.Number getValue() {
            return this.jsiiGet("value", java.lang.Number.class);
        }

        /**
         * String representation of the value. (deprecated)
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        @Override
        public @org.jetbrains.annotations.NotNull java.lang.String toString() {
            return this.jsiiCall("toString", java.lang.String.class);
        }
    }
}
