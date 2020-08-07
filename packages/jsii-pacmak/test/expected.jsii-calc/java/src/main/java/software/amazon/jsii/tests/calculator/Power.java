package software.amazon.jsii.tests.calculator;

/**
 * The power operation. (experimental)
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Power")
public class Power extends software.amazon.jsii.tests.calculator.composition.CompositeOperation {

    protected Power(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Power(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * Creates a Power operation. (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param base The base of the power. This parameter is required.
     * @param pow The number of times to multiply. This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public Power(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Value base, final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Value pow) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(base, "base is required"), java.util.Objects.requireNonNull(pow, "pow is required") });
    }

    /**
     * The base of the power. (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Value getBase() {
        return this.jsiiGet("base", software.amazon.jsii.tests.calculator.lib.Value.class);
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
     * The number of times to multiply. (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Value getPow() {
        return this.jsiiGet("pow", software.amazon.jsii.tests.calculator.lib.Value.class);
    }
}
