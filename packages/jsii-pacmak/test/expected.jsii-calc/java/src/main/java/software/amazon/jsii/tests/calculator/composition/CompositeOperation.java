package software.amazon.jsii.tests.calculator.composition;
/**
 * Abstract operation composed from an expression of other operations.
 */
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.composition.CompositeOperation")
public abstract class CompositeOperation extends software.amazon.jsii.tests.calculator.lib.Operation {
    protected CompositeOperation(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * String representation of the value.
     */
    public java.lang.String toString() {
        return this.jsiiCall("toString", java.lang.String.class);
    }
    /**
     * The .toString() style.
     */
    public software.amazon.jsii.tests.calculator.composition.CompositionStringStyle getStringStyle() {
        return this.jsiiGet("stringStyle", software.amazon.jsii.tests.calculator.composition.CompositionStringStyle.class);
    }
    /**
     * The .toString() style.
     */
    public void setStringStyle(final software.amazon.jsii.tests.calculator.composition.CompositionStringStyle value) {
        this.jsiiSet("stringStyle", java.util.Objects.requireNonNull(value, "stringStyle is required"));
    }
    /**
     * A set of prefixes to include in a decorated .toString().
     */
    public java.util.List<java.lang.String> getDecorationPrefixes() {
        return this.jsiiGet("decorationPrefixes", java.util.List.class);
    }
    /**
     * A set of prefixes to include in a decorated .toString().
     */
    public void setDecorationPrefixes(final java.util.List<java.lang.String> value) {
        this.jsiiSet("decorationPrefixes", java.util.Objects.requireNonNull(value, "decorationPrefixes is required"));
    }
    /**
     * A set of postfixes to include in a decorated .toString().
     */
    public java.util.List<java.lang.String> getDecorationPostfixes() {
        return this.jsiiGet("decorationPostfixes", java.util.List.class);
    }
    /**
     * A set of postfixes to include in a decorated .toString().
     */
    public void setDecorationPostfixes(final java.util.List<java.lang.String> value) {
        this.jsiiSet("decorationPostfixes", java.util.Objects.requireNonNull(value, "decorationPostfixes is required"));
    }
    /**
     * The value.
     */
    public java.lang.Number getValue() {
        return this.jsiiGet("value", java.lang.Number.class);
    }
    /**
     * The expression that this operation consists of.
     * Must be implemented by derived classes.
     */
    public software.amazon.jsii.tests.calculator.lib.Value getExpression() {
        return this.jsiiGet("expression", software.amazon.jsii.tests.calculator.lib.Value.class);
    }
}
