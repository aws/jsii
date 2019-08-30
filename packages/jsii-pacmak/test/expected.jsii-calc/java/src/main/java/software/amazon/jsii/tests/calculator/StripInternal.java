package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.StripInternal")
public class StripInternal extends software.amazon.jsii.JsiiObject {

    protected StripInternal(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected StripInternal(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public StripInternal() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getYouSeeMe() {
        return this.jsiiGet("youSeeMe", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setYouSeeMe(final java.lang.String value) {
        this.jsiiSet("youSeeMe", java.util.Objects.requireNonNull(value, "youSeeMe is required"));
    }
}
