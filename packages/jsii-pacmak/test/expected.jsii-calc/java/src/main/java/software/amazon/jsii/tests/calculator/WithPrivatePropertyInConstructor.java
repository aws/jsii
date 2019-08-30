package software.amazon.jsii.tests.calculator;

/**
 * Verifies that private property declarations in constructor arguments are hidden.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.WithPrivatePropertyInConstructor")
public class WithPrivatePropertyInConstructor extends software.amazon.jsii.JsiiObject {

    protected WithPrivatePropertyInConstructor(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected WithPrivatePropertyInConstructor(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public WithPrivatePropertyInConstructor(final java.lang.String privateField) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { privateField }));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public WithPrivatePropertyInConstructor() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Boolean getSuccess() {
        return this.jsiiGet("success", java.lang.Boolean.class);
    }
}
