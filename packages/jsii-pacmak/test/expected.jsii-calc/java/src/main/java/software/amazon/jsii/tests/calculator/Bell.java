package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Bell")
public class Bell extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IBell {

    protected Bell(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Bell(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public Bell() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @Override
    public void ring() {
        this.jsiiCall("ring", software.amazon.jsii.NativeType.VOID);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Boolean getRung() {
        return this.jsiiGet("rung", java.lang.Boolean.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setRung(final @org.jetbrains.annotations.NotNull java.lang.Boolean value) {
        this.jsiiSet("rung", java.util.Objects.requireNonNull(value, "rung is required"));
    }
}
