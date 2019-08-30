package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.VariadicMethod")
public class VariadicMethod extends software.amazon.jsii.JsiiObject {

    protected VariadicMethod(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected VariadicMethod(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * 
     * @param prefix a prefix that will be use for all values returned by `#asArray`.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public VariadicMethod(final java.lang.Number... prefix) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.Arrays.<Object>stream(prefix).toArray(Object[]::new)));
    }

    /**
     * EXPERIMENTAL
     * 
     * @param first the first element of the array to be returned (after the `prefix` provided at construction time).
     * @param others other elements to be included in the array.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.List<java.lang.Number> asArray(final java.lang.Number first, final java.lang.Number... others) {
        return this.jsiiCall("asArray", java.util.List.class, java.util.stream.Stream.concat(java.util.Arrays.<Object>stream(new Object[] { java.util.Objects.requireNonNull(first, "first is required") }), java.util.Arrays.<Object>stream(others)).toArray(Object[]::new));
    }
}
