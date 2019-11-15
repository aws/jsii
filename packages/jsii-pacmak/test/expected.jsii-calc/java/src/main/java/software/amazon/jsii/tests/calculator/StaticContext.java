package software.amazon.jsii.tests.calculator;

/**
 * This is used to validate the ability to use `this` from within a static context.
 * <p>
 * https://github.com/awslabs/aws-cdk/issues/2304
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.StaticContext")
public class StaticContext extends software.amazon.jsii.JsiiObject {

    protected StaticContext(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected StaticContext(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static java.lang.Boolean canAccessStaticContext() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.StaticContext.class, "canAccessStaticContext", java.lang.Boolean.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static java.lang.Boolean getStaticVariable() {
        return software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.StaticContext.class, "staticVariable", java.lang.Boolean.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static void setStaticVariable(final java.lang.Boolean value) {
        software.amazon.jsii.JsiiObject.jsiiStaticSet(software.amazon.jsii.tests.calculator.StaticContext.class, "staticVariable", java.util.Objects.requireNonNull(value, "staticVariable is required"));
    }
}
