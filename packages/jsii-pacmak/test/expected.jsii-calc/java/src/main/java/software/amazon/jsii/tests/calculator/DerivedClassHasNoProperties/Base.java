package software.amazon.jsii.tests.calculator.DerivedClassHasNoProperties;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DerivedClassHasNoProperties.Base")
public class Base extends software.amazon.jsii.JsiiObject {

    protected Base(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Base(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public Base() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getProp() {
        return this.jsiiGet("prop", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setProp(final java.lang.String value) {
        this.jsiiSet("prop", java.util.Objects.requireNonNull(value, "prop is required"));
    }
}
