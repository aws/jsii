package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ConsumersOfThisCrazyTypeSystem")
public class ConsumersOfThisCrazyTypeSystem extends software.amazon.jsii.JsiiObject {

    protected ConsumersOfThisCrazyTypeSystem(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ConsumersOfThisCrazyTypeSystem(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public ConsumersOfThisCrazyTypeSystem() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * @param obj This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String consumeAnotherPublicInterface(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IAnotherPublicInterface obj) {
        return this.jsiiCall("consumeAnotherPublicInterface", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(obj, "obj is required") });
    }

    /**
     * @param obj This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Object consumeNonInternalInterface(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.INonInternalInterface obj) {
        return this.jsiiCall("consumeNonInternalInterface", java.lang.Object.class, new Object[] { java.util.Objects.requireNonNull(obj, "obj is required") });
    }
}
