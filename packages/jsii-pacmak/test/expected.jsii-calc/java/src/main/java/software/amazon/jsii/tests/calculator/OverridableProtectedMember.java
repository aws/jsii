package software.amazon.jsii.tests.calculator;

/**
 * @see https://github.com/aws/jsii/issues/903
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.OverridableProtectedMember")
public class OverridableProtectedMember extends software.amazon.jsii.JsiiObject {

    protected OverridableProtectedMember(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected OverridableProtectedMember(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public OverridableProtectedMember() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    protected @org.jetbrains.annotations.NotNull java.lang.String overrideMe() {
        return this.jsiiCall("overrideMe", java.lang.String.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void switchModes() {
        this.jsiiCall("switchModes", software.amazon.jsii.NativeType.VOID);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String valueFromProtected() {
        return this.jsiiCall("valueFromProtected", java.lang.String.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    protected @org.jetbrains.annotations.NotNull java.lang.String getOverrideReadOnly() {
        return this.jsiiGet("overrideReadOnly", java.lang.String.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    protected @org.jetbrains.annotations.NotNull java.lang.String getOverrideReadWrite() {
        return this.jsiiGet("overrideReadWrite", java.lang.String.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    protected void setOverrideReadWrite(final @org.jetbrains.annotations.NotNull java.lang.String value) {
        this.jsiiSet("overrideReadWrite", java.util.Objects.requireNonNull(value, "overrideReadWrite is required"));
    }
}
