package software.amazon.jsii.tests.calculator;

/**
 * We can return arrays of interfaces See aws/aws-cdk#2362. (experimental)
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
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param count This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull java.util.List<software.amazon.jsii.tests.calculator.lib.IDoublable> makeInterfaces(final @org.jetbrains.annotations.NotNull java.lang.Number count) {
        return java.util.Collections.unmodifiableList(software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.InterfacesMaker.class, "makeInterfaces", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.lib.IDoublable.class)), new Object[] { java.util.Objects.requireNonNull(count, "count is required") }));
    }
}
