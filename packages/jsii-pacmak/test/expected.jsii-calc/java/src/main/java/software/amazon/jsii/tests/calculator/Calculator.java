package software.amazon.jsii.tests.calculator;

/**
 * A calculator which maintains a current value and allows adding operations.
 * <p>
 * Here's how you use it:
 * <p>
 * <blockquote><pre>
 * // Example automatically generated. See https://github.com/aws/jsii/issues/826
 * Calculator calculator = new Calculator();
 * calculator.add(5);
 * calculator.mul(3);
 * System.out.println(calculator.expression.getValue());
 * </pre></blockquote>
 * <p>
 * I will repeat this example again, but in an &#64;example tag.
 * <p>
 * Example:
 * <p>
 * <blockquote><pre>{@code
 * // Example automatically generated. See https://github.com/aws/jsii/issues/826
 * Calculator calculator = new Calculator();
 * calculator.add(5);
 * calculator.mul(3);
 * System.out.println(calculator.expression.getValue());}</pre></blockquote>
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Calculator")
public class Calculator extends software.amazon.jsii.tests.calculator.composition.CompositeOperation {

    protected Calculator(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Calculator(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * Creates a Calculator object.
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param props Initialization properties.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public Calculator(final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.CalculatorProps props) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { props });
    }

    /**
     * Creates a Calculator object.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public Calculator() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Adds a number to the current value.
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param value This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void add(final @org.jetbrains.annotations.NotNull java.lang.Number value) {
        this.jsiiCall("add", software.amazon.jsii.NativeType.VOID, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * Multiplies the current value by a number.
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param value This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void mul(final @org.jetbrains.annotations.NotNull java.lang.Number value) {
        this.jsiiCall("mul", software.amazon.jsii.NativeType.VOID, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * Negates the current value.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void neg() {
        this.jsiiCall("neg", software.amazon.jsii.NativeType.VOID);
    }

    /**
     * Raises the current value by a power.
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param value This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void pow(final @org.jetbrains.annotations.NotNull java.lang.Number value) {
        this.jsiiCall("pow", software.amazon.jsii.NativeType.VOID, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * Returns teh value of the union property (if defined).
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Number readUnionValue() {
        return this.jsiiCall("readUnionValue", java.lang.Number.class);
    }

    /**
     * Returns the expression.
     * <p>
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Value getExpression() {
        return this.jsiiGet("expression", software.amazon.jsii.tests.calculator.lib.Value.class);
    }

    /**
     * A log of all operations.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.util.List<software.amazon.jsii.tests.calculator.lib.Value> getOperationsLog() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("operationsLog", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.lib.Value.class))));
    }

    /**
     * A map of per operation name of all operations performed.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.util.List<software.amazon.jsii.tests.calculator.lib.Value>> getOperationsMap() {
        return java.util.Collections.unmodifiableMap(this.jsiiGet("operationsMap", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.lib.Value.class)))));
    }

    /**
     * The current value.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Value getCurr() {
        return this.jsiiGet("curr", software.amazon.jsii.tests.calculator.lib.Value.class);
    }

    /**
     * The current value.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setCurr(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Value value) {
        this.jsiiSet("curr", java.util.Objects.requireNonNull(value, "curr is required"));
    }

    /**
     * The maximum value allows in this calculator.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.Nullable java.lang.Number getMaxValue() {
        return this.jsiiGet("maxValue", java.lang.Number.class);
    }

    /**
     * The maximum value allows in this calculator.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setMaxValue(final @org.jetbrains.annotations.Nullable java.lang.Number value) {
        this.jsiiSet("maxValue", value);
    }

    /**
     * Example of a property that accepts a union of types.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.Nullable java.lang.Object getUnionProperty() {
        return this.jsiiGet("unionProperty", java.lang.Object.class);
    }

    /**
     * Example of a property that accepts a union of types.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.Add value) {
        this.jsiiSet("unionProperty", value);
    }

    /**
     * Example of a property that accepts a union of types.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.Multiply value) {
        this.jsiiSet("unionProperty", value);
    }

    /**
     * Example of a property that accepts a union of types.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.Power value) {
        this.jsiiSet("unionProperty", value);
    }

    /**
     * A fluent builder for {@link software.amazon.jsii.tests.calculator.Calculator}.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder implements software.amazon.jsii.Builder<software.amazon.jsii.tests.calculator.Calculator> {
        /**
         * EXPERIMENTAL
         * <p>
         * @return a new instance of {@link Builder}.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public static Builder create() {
            return new Builder();
        }

        private software.amazon.jsii.tests.calculator.CalculatorProps.Builder props;

        private Builder() {
        }

        /**
         * The initial value of the calculator.
         * <p>
         * NOTE: Any number works here, it's fine.
         * <p>
         * Default: 0
         * <p>
         * EXPERIMENTAL
         * <p>
         * @return {@code this}
         * @param initialValue The initial value of the calculator. This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder initialValue(final java.lang.Number initialValue) {
            this.props().initialValue(initialValue);
            return this;
        }

        /**
         * The maximum value the calculator can store.
         * <p>
         * Default: none
         * <p>
         * EXPERIMENTAL
         * <p>
         * @return {@code this}
         * @param maximumValue The maximum value the calculator can store. This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder maximumValue(final java.lang.Number maximumValue) {
            this.props().maximumValue(maximumValue);
            return this;
        }

        /**
         * @returns a newly built instance of {@link software.amazon.jsii.tests.calculator.Calculator}.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public software.amazon.jsii.tests.calculator.Calculator build() {
            return new software.amazon.jsii.tests.calculator.Calculator(
                this.props != null ? this.props.build() : null
            );
        }

        private software.amazon.jsii.tests.calculator.CalculatorProps.Builder props() {
            if (this.props == null) {
                this.props = new software.amazon.jsii.tests.calculator.CalculatorProps.Builder();
            }
            return this.props;
        }
    }
}
