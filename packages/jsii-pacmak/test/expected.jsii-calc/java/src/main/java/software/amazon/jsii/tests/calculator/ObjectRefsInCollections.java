package software.amazon.jsii.tests.calculator;

/**
 * Verify that object references can be passed inside collections.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ObjectRefsInCollections")
public class ObjectRefsInCollections extends software.amazon.jsii.JsiiObject {

    protected ObjectRefsInCollections(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ObjectRefsInCollections(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public ObjectRefsInCollections() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Returns the sum of all values.
     * <p>
     * @param values This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Number sumFromArray(final @org.jetbrains.annotations.NotNull java.util.List<software.amazon.jsii.tests.calculator.lib.Value> values) {
        return this.jsiiCall("sumFromArray", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(values, "values is required") });
    }

    /**
     * Returns the sum of all values in a map.
     * <p>
     * @param values This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Number sumFromMap(final @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> values) {
        return this.jsiiCall("sumFromMap", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(values, "values is required") });
    }
}
