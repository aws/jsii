package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ExperimentalClass")
public class ExperimentalClass extends software.amazon.jsii.JsiiObject {

    protected ExperimentalClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ExperimentalClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param readonlyString This parameter is required.
     * @param mutableNumber
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public ExperimentalClass(final @org.jetbrains.annotations.NotNull java.lang.String readonlyString, final @org.jetbrains.annotations.Nullable java.lang.Number mutableNumber) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(readonlyString, "readonlyString is required"), mutableNumber });
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param readonlyString This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public ExperimentalClass(final @org.jetbrains.annotations.NotNull java.lang.String readonlyString) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(readonlyString, "readonlyString is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void method() {
        this.jsiiCall("method", software.amazon.jsii.NativeType.VOID);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getReadonlyProperty() {
        return this.jsiiGet("readonlyProperty", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.Nullable java.lang.Number getMutableProperty() {
        return this.jsiiGet("mutableProperty", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setMutableProperty(final @org.jetbrains.annotations.Nullable java.lang.Number value) {
        this.jsiiSet("mutableProperty", value);
    }
}
