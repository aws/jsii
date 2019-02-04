package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ExportedBaseClass")
public class ExportedBaseClass extends software.amazon.jsii.JsiiObject {
    protected ExportedBaseClass(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public ExportedBaseClass(final java.lang.Boolean success) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(java.util.Objects.requireNonNull(success, "success is required")).toArray());
    }

    public java.lang.Boolean getSuccess() {
        return this.jsiiGet("success", java.lang.Boolean.class);
    }
}
