package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.VariadicMethod")
public class VariadicMethod extends org.jsii.JsiiObject {
    protected VariadicMethod(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public VariadicMethod(final java.lang.Number... prefix) {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.Arrays.stream(prefix).toArray());
    }
    public java.util.List<java.lang.Number> asArray(final java.lang.Number first, final java.lang.Number... others) {
        return this.jsiiCall("asArray", java.util.List.class, java.util.stream.Stream.concat(java.util.stream.Stream.of(first), java.util.Arrays.stream(others)).toArray());
    }
}
