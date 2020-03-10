package software.amazon.jsii.tests.calculator.compliance;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.JSObjectLiteralToNative")
public class JSObjectLiteralToNative extends software.amazon.jsii.JsiiObject {

    protected JSObjectLiteralToNative(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected JSObjectLiteralToNative(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public JSObjectLiteralToNative() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.JSObjectLiteralToNativeClass returnLiteral() {
        return this.jsiiCall("returnLiteral", software.amazon.jsii.tests.calculator.compliance.JSObjectLiteralToNativeClass.class);
    }
}
