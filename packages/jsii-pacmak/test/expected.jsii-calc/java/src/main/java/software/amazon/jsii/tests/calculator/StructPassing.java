package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.StructPassing")
public class StructPassing extends software.amazon.jsii.JsiiObject {
    protected StructPassing(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public StructPassing() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static java.lang.Number howManyVarArgsDidIPass(final java.lang.Number _positional, final java.util.List<software.amazon.jsii.tests.calculator.TopLevelStruct> inputs) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.StructPassing.class, "howManyVarArgsDidIPass", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(_positional, "_positional is required"), java.util.Objects.requireNonNull(inputs, "inputs is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static software.amazon.jsii.tests.calculator.TopLevelStruct roundTrip(final java.lang.Number _positional, final software.amazon.jsii.tests.calculator.TopLevelStruct input) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.StructPassing.class, "roundTrip", software.amazon.jsii.tests.calculator.TopLevelStruct.class, new Object[] { java.util.Objects.requireNonNull(_positional, "_positional is required"), java.util.Objects.requireNonNull(input, "input is required") });
    }
}
