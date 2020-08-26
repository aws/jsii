package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.VariadicInvoker")
public class VariadicInvoker extends software.amazon.jsii.JsiiObject {

    protected VariadicInvoker(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected VariadicInvoker(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @param method This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public VariadicInvoker(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.VariadicMethod method) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(method, "method is required") });
    }

    /**
     * @param values This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.util.List<java.lang.Number> asArray(final @org.jetbrains.annotations.NotNull java.lang.Number... values) {
        return java.util.Collections.unmodifiableList(this.jsiiCall("asArray", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.Number.class)), java.util.Arrays.<Object>stream(values).toArray(Object[]::new)));
    }
}
