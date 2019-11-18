package software.amazon.jsii.tests.calculator;

/**
 * Make sure structs are un-decorated on the way in.
 * 
 * EXPERIMENTAL
 * 
 * @see https://github.com/aws/aws-cdk/issues/5066
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.JsonFormatter")
public class JsonFormatter extends software.amazon.jsii.JsiiObject {

    protected JsonFormatter(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected JsonFormatter(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * 
     * @param value This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static java.lang.String stringify(final java.lang.Object value) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.JsonFormatter.class, "stringify", java.lang.String.class, new Object[] { value });
    }
}
