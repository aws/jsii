package software.amazon.jsii.tests.calculator;

/**
 * Old class.
 * 
 * @deprecated Use the new class
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@Deprecated
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Old")
public class Old extends software.amazon.jsii.JsiiObject {
    protected Old(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public Old() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Doo wop that thing.
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public void doAThing() {
        this.jsiiCall("doAThing", Void.class);
    }
}
