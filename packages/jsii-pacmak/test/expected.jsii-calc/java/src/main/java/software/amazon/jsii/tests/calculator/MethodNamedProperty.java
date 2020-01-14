package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.MethodNamedProperty")
public class MethodNamedProperty extends software.amazon.jsii.JsiiObject {

    protected MethodNamedProperty(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected MethodNamedProperty(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public MethodNamedProperty() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String property() {
        return this.jsiiCall("property", software.amazon.jsii.NativeType.forClass(java.lang.String.class));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number getElite() {
        return this.jsiiGet("elite", software.amazon.jsii.NativeType.forClass(java.lang.Number.class));
    }
}
