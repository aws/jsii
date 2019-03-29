package software.amazon.jsii.tests.calculator;

/**
 * Verify that object references can be passed inside collections.
 * 
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ObjectRefsInCollections")
public class ObjectRefsInCollections extends software.amazon.jsii.JsiiObject {
    protected ObjectRefsInCollections(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public ObjectRefsInCollections() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Returns the sum of all values.
     * 
     */
    public java.lang.Number sumFromArray(final java.util.List<software.amazon.jsii.tests.calculator.lib.Value> values) {
        return this.jsiiCall("sumFromArray", java.lang.Number.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(values, "values is required")).toArray());
    }

    /**
     * Returns the sum of all values in a map.
     * 
     */
    public java.lang.Number sumFromMap(final java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> values) {
        return this.jsiiCall("sumFromMap", java.lang.Number.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(values, "values is required")).toArray());
    }
}
