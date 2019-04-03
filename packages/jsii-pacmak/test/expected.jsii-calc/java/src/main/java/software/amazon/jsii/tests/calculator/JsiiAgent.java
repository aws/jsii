package software.amazon.jsii.tests.calculator;

/**
 * Host runtime version should be set via JSII_AGENT.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.JsiiAgent")
public class JsiiAgent extends software.amazon.jsii.JsiiObject {
    protected JsiiAgent(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public JsiiAgent() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Returns the value of the JSII_AGENT environment variable.
     */
    @javax.annotation.Nullable
    public static java.lang.String getJsiiAgent() {
        return software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.JsiiAgent.class, "jsiiAgent", java.lang.String.class);
    }
}
