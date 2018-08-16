package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UsesInterfaceWithProperties")
public class UsesInterfaceWithProperties extends software.amazon.jsii.JsiiObject {
    protected UsesInterfaceWithProperties(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public UsesInterfaceWithProperties(final software.amazon.jsii.tests.calculator.IInterfaceWithProperties obj) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(java.util.Objects.requireNonNull(obj, "obj is required")).toArray());
    }

    public java.lang.String justRead() {
        return this.jsiiCall("justRead", java.lang.String.class);
    }

    public java.lang.String readStringAndNumber(final software.amazon.jsii.tests.calculator.IInterfaceWithPropertiesExtension ext) {
        return this.jsiiCall("readStringAndNumber", java.lang.String.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(ext, "ext is required")).toArray());
    }

    public java.lang.String writeAndRead(final java.lang.String value) {
        return this.jsiiCall("writeAndRead", java.lang.String.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(value, "value is required")).toArray());
    }

    public software.amazon.jsii.tests.calculator.IInterfaceWithProperties getObj() {
        return this.jsiiGet("obj", software.amazon.jsii.tests.calculator.IInterfaceWithProperties.class);
    }
}
