package software.amazon.jsii.tests.calculator;

/**
 * Just because we can.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.StructPassing")
public class StructPassing extends software.amazon.jsii.JsiiObject {

    protected StructPassing(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected StructPassing(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public StructPassing() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * @param _positional This parameter is required.
     * @param inputs This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static @org.jetbrains.annotations.NotNull java.lang.Number howManyVarArgsDidIPass(final @org.jetbrains.annotations.NotNull java.lang.Number _positional, final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.TopLevelStruct... inputs) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.StructPassing.class, "howManyVarArgsDidIPass", java.lang.Number.class, java.util.stream.Stream.concat(java.util.Arrays.<Object>stream(new Object[] { java.util.Objects.requireNonNull(_positional, "_positional is required") }), java.util.Arrays.<Object>stream(inputs)).toArray(Object[]::new));
    }

    /**
     * @param _positional This parameter is required.
     * @param input This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.TopLevelStruct roundTrip(final @org.jetbrains.annotations.NotNull java.lang.Number _positional, final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.TopLevelStruct input) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.StructPassing.class, "roundTrip", software.amazon.jsii.tests.calculator.TopLevelStruct.class, new Object[] { java.util.Objects.requireNonNull(_positional, "_positional is required"), java.util.Objects.requireNonNull(input, "input is required") });
    }
}
