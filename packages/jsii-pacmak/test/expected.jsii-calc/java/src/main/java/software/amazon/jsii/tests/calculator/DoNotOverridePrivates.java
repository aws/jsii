package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DoNotOverridePrivates")
public class DoNotOverridePrivates extends software.amazon.jsii.JsiiObject {

    protected DoNotOverridePrivates(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected DoNotOverridePrivates(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public DoNotOverridePrivates() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * @param newValue This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void changePrivatePropertyValue(final @org.jetbrains.annotations.NotNull java.lang.String newValue) {
        this.jsiiCall("changePrivatePropertyValue", software.amazon.jsii.NativeType.VOID, new Object[] { java.util.Objects.requireNonNull(newValue, "newValue is required") });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String privateMethodValue() {
        return this.jsiiCall("privateMethodValue", java.lang.String.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String privatePropertyValue() {
        return this.jsiiCall("privatePropertyValue", java.lang.String.class);
    }
}
