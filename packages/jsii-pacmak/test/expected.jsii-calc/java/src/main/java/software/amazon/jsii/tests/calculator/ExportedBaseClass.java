package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ExportedBaseClass")
public class ExportedBaseClass extends software.amazon.jsii.JsiiObject {

    protected ExportedBaseClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ExportedBaseClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @param success This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public ExportedBaseClass(final @org.jetbrains.annotations.NotNull java.lang.Boolean success) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(success, "success is required") });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Boolean getSuccess() {
        return this.jsiiGet("success", java.lang.Boolean.class);
    }
}
