package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.SyncVirtualMethods")
public class SyncVirtualMethods extends software.amazon.jsii.JsiiObject {

    protected SyncVirtualMethods(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected SyncVirtualMethods(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public SyncVirtualMethods() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number callerIsAsync() {
        return this.jsiiAsyncCall("callerIsAsync", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number callerIsMethod() {
        return this.jsiiCall("callerIsMethod", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void modifyOtherProperty(final java.lang.String value) {
        this.jsiiCall("modifyOtherProperty", Void.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void modifyValueOfTheProperty(final java.lang.String value) {
        this.jsiiCall("modifyValueOfTheProperty", Void.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number readA() {
        return this.jsiiCall("readA", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String retrieveOtherProperty() {
        return this.jsiiCall("retrieveOtherProperty", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String retrieveReadOnlyProperty() {
        return this.jsiiCall("retrieveReadOnlyProperty", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String retrieveValueOfTheProperty() {
        return this.jsiiCall("retrieveValueOfTheProperty", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number virtualMethod(final java.lang.Number n) {
        return this.jsiiCall("virtualMethod", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(n, "n is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void writeA(final java.lang.Number value) {
        this.jsiiCall("writeA", Void.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getReadonlyProperty() {
        return this.jsiiGet("readonlyProperty", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number getA() {
        return this.jsiiGet("a", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setA(final java.lang.Number value) {
        this.jsiiSet("a", java.util.Objects.requireNonNull(value, "a is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number getCallerIsProperty() {
        return this.jsiiGet("callerIsProperty", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setCallerIsProperty(final java.lang.Number value) {
        this.jsiiSet("callerIsProperty", java.util.Objects.requireNonNull(value, "callerIsProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getOtherProperty() {
        return this.jsiiGet("otherProperty", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setOtherProperty(final java.lang.String value) {
        this.jsiiSet("otherProperty", java.util.Objects.requireNonNull(value, "otherProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getTheProperty() {
        return this.jsiiGet("theProperty", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setTheProperty(final java.lang.String value) {
        this.jsiiSet("theProperty", java.util.Objects.requireNonNull(value, "theProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getValueOfOtherProperty() {
        return this.jsiiGet("valueOfOtherProperty", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setValueOfOtherProperty(final java.lang.String value) {
        this.jsiiSet("valueOfOtherProperty", java.util.Objects.requireNonNull(value, "valueOfOtherProperty is required"));
    }
}
