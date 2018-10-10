package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ClassWithMutableObjectLiteralProperty")
public class ClassWithMutableObjectLiteralProperty extends software.amazon.jsii.JsiiObject {
    protected ClassWithMutableObjectLiteralProperty(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public ClassWithMutableObjectLiteralProperty() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public software.amazon.jsii.tests.calculator.MutableObjectLiteral getMutableObject() {
        return this.jsiiGet("mutableObject", software.amazon.jsii.tests.calculator.MutableObjectLiteral.class);
    }

    public void setMutableObject(final software.amazon.jsii.tests.calculator.MutableObjectLiteral value) {
        this.jsiiSet("mutableObject", java.util.Objects.requireNonNull(value, "mutableObject is required"));
    }
}
