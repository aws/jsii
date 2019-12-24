package software.amazon.jsii.tests.calculator;

/**
 * We can return arrays of interfaces See aws/aws-cdk#2362.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.InterfacesMaker")
public class InterfacesMaker extends software.amazon.jsii.JsiiObject {

    protected InterfacesMaker(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected InterfacesMaker(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param count This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static java.util.List<software.amazon.jsii.tests.calculator.lib.IDoublable> makeInterfaces(final java.lang.Number count) {
        return java.util.Collections.unmodifiableList(software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.InterfacesMaker.class, "makeInterfaces", java.util.List.class, new Object[] { java.util.Objects.requireNonNull(count, "count is required") }));
    }
}
