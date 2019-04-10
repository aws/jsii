package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UseBundledDependency")
public class UseBundledDependency extends software.amazon.jsii.JsiiObject {
    protected UseBundledDependency(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public UseBundledDependency() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    @javax.annotation.Nullable
    public java.lang.Object value() {
        return this.jsiiCall("value", java.lang.Object.class);
    }
}
