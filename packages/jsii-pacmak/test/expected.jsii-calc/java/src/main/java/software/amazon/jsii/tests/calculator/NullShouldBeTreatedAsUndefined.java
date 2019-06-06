package software.amazon.jsii.tests.calculator;

/**
 * jsii#282, aws-cdk#157: null should be treated as "undefined".
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.NullShouldBeTreatedAsUndefined")
public class NullShouldBeTreatedAsUndefined extends software.amazon.jsii.JsiiObject {
    protected NullShouldBeTreatedAsUndefined(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public NullShouldBeTreatedAsUndefined(final java.lang.String _param1, @javax.annotation.Nullable final java.lang.Object optional) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(_param1, "_param1 is required"), optional });
    }
    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public NullShouldBeTreatedAsUndefined(final java.lang.String _param1) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(_param1, "_param1 is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void giveMeUndefined(@javax.annotation.Nullable final java.lang.Object value) {
        this.jsiiCall("giveMeUndefined", Void.class, new Object[] { value });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void giveMeUndefined() {
        this.jsiiCall("giveMeUndefined", Void.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void giveMeUndefinedInsideAnObject(final software.amazon.jsii.tests.calculator.NullShouldBeTreatedAsUndefinedData input) {
        this.jsiiCall("giveMeUndefinedInsideAnObject", Void.class, new Object[] { java.util.Objects.requireNonNull(input, "input is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void verifyPropertyIsUndefined() {
        this.jsiiCall("verifyPropertyIsUndefined", Void.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @javax.annotation.Nullable
    public java.lang.String getChangeMeToUndefined() {
        return this.jsiiGet("changeMeToUndefined", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setChangeMeToUndefined(@javax.annotation.Nullable final java.lang.String value) {
        this.jsiiSet("changeMeToUndefined", value);
    }
}
