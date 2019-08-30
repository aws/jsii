package software.amazon.jsii.tests.calculator;

/**
 * Just because we can.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.External)
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
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.External)
    public static java.lang.Number howManyVarArgsDidIPass(final java.lang.Number _positional, final software.amazon.jsii.tests.calculator.TopLevelStruct... inputs) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.StructPassing.class, "howManyVarArgsDidIPass", java.lang.Number.class, java.util.stream.Stream.concat(java.util.Arrays.<Object>stream(new Object[] { java.util.Objects.requireNonNull(_positional, "_positional is required") }), java.util.Arrays.<Object>stream(inputs)).toArray(Object[]::new));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.External)
    public static software.amazon.jsii.tests.calculator.TopLevelStruct roundTrip(final java.lang.Number _positional, final software.amazon.jsii.tests.calculator.TopLevelStruct input) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.StructPassing.class, "roundTrip", software.amazon.jsii.tests.calculator.TopLevelStruct.class, new Object[] { java.util.Objects.requireNonNull(_positional, "_positional is required"), java.util.Objects.requireNonNull(input, "input is required") });
    }
}
