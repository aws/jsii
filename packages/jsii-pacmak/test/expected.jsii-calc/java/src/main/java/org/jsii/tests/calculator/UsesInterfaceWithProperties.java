package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UsesInterfaceWithProperties")
public class UsesInterfaceWithProperties extends org.jsii.JsiiObject {
    protected UsesInterfaceWithProperties(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public UsesInterfaceWithProperties(final org.jsii.tests.calculator.IInterfaceWithProperties obj) {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(java.util.Objects.requireNonNull(obj, "obj is required")).toArray());
    }
    public java.lang.String justRead() {
        return this.jsiiCall("justRead", java.lang.String.class);
    }
    public java.lang.String writeAndRead(final java.lang.String value) {
        return this.jsiiCall("writeAndRead", java.lang.String.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(value, "value is required")).toArray());
    }
    public java.lang.String readStringAndNumber(final org.jsii.tests.calculator.IInterfaceWithPropertiesExtension ext) {
        return this.jsiiCall("readStringAndNumber", java.lang.String.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(ext, "ext is required")).toArray());
    }
    public org.jsii.tests.calculator.IInterfaceWithProperties getObj() {
        return this.jsiiGet("obj", org.jsii.tests.calculator.IInterfaceWithProperties.class);
    }
}
