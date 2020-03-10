package software.amazon.jsii.tests.calculator.compliance;

/**
 * Host runtime version should be set via JSII_AGENT.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.JsiiAgent")
public class JsiiAgent extends software.amazon.jsii.JsiiObject {

    protected JsiiAgent(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected JsiiAgent(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public JsiiAgent() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Returns the value of the JSII_AGENT environment variable.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.Nullable java.lang.String getJsiiAgent() {
        return software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.compliance.JsiiAgent.class, "jsiiAgent", java.lang.String.class);
    }
}
