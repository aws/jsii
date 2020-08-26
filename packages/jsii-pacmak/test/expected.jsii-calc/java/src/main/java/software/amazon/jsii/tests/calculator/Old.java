package software.amazon.jsii.tests.calculator;

/**
 * Old class. (deprecated)
 * <p>
 * @deprecated Use the new class
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@Deprecated
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Old")
public class Old extends software.amazon.jsii.JsiiObject {

    protected Old(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Old(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public Old() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Doo wop that thing. (deprecated)
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    public void doAThing() {
        this.jsiiCall("doAThing", software.amazon.jsii.NativeType.VOID);
    }
}
