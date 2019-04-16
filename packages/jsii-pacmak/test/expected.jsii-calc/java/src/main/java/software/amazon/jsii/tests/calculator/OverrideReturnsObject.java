package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.OverrideReturnsObject")
public class OverrideReturnsObject extends software.amazon.jsii.JsiiObject {
    protected OverrideReturnsObject(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public OverrideReturnsObject() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public java.lang.Number test(final software.amazon.jsii.tests.calculator.IReturnsNumber obj) {
        return this.jsiiCall("test", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(obj, "obj is required") });
    }
}
