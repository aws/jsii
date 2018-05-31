package org.jsii.tests.calculator;
/**
 * Verify that object references can be passed inside collections.
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii$jsii_calc$.ObjectRefsInCollections")
public class ObjectRefsInCollections extends org.jsii.JsiiObject {
    protected ObjectRefsInCollections(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public ObjectRefsInCollections() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    /**
     * Returns the sum of all values
     */
    public java.lang.Number sumFromArray(final java.util.List<org.jsii.tests.calculator.lib.Value> values) {
        return this.jsiiCall("sumFromArray", java.lang.Number.class, java.util.stream.Stream.of(values).toArray());
    }
    /**
     * Returns the sum of all values in a map
     */
    public java.lang.Number sumFromMap(final java.util.Map<java.lang.String, org.jsii.tests.calculator.lib.Value> values) {
        return this.jsiiCall("sumFromMap", java.lang.Number.class, java.util.stream.Stream.of(values).toArray());
    }
}
