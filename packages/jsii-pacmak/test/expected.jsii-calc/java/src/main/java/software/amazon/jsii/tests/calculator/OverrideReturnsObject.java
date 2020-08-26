package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.OverrideReturnsObject")
public class OverrideReturnsObject extends software.amazon.jsii.JsiiObject {

    protected OverrideReturnsObject(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected OverrideReturnsObject(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public OverrideReturnsObject() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * @param obj This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Number test(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IReturnsNumber obj) {
        return this.jsiiCall("test", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(obj, "obj is required") });
    }
}
