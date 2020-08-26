package software.amazon.jsii.tests.calculator;

/**
 * Verifies that private property declarations in constructor arguments are hidden.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.WithPrivatePropertyInConstructor")
public class WithPrivatePropertyInConstructor extends software.amazon.jsii.JsiiObject {

    protected WithPrivatePropertyInConstructor(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected WithPrivatePropertyInConstructor(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @param privateField
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public WithPrivatePropertyInConstructor(final @org.jetbrains.annotations.Nullable java.lang.String privateField) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { privateField });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public WithPrivatePropertyInConstructor() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Boolean getSuccess() {
        return this.jsiiGet("success", java.lang.Boolean.class);
    }
}
