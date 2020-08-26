package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.StripInternal")
public class StripInternal extends software.amazon.jsii.JsiiObject {

    protected StripInternal(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected StripInternal(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public StripInternal() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String getYouSeeMe() {
        return this.jsiiGet("youSeeMe", java.lang.String.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setYouSeeMe(final @org.jetbrains.annotations.NotNull java.lang.String value) {
        this.jsiiSet("youSeeMe", java.util.Objects.requireNonNull(value, "youSeeMe is required"));
    }
}
