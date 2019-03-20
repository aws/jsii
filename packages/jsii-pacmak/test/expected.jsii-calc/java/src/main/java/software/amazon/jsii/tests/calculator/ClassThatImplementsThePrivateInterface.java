package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ClassThatImplementsThePrivateInterface")
public class ClassThatImplementsThePrivateInterface extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.INonInternalInterface {
    protected ClassThatImplementsThePrivateInterface(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public ClassThatImplementsThePrivateInterface() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    @Override
    public java.lang.String getA() {
        return this.jsiiGet("a", java.lang.String.class);
    }

    @Override
    public void setA(final java.lang.String value) {
        this.jsiiSet("a", java.util.Objects.requireNonNull(value, "a is required"));
    }

    public java.lang.String getB() {
        return this.jsiiGet("b", java.lang.String.class);
    }

    public void setB(final java.lang.String value) {
        this.jsiiSet("b", java.util.Objects.requireNonNull(value, "b is required"));
    }

    @Override
    public java.lang.String getC() {
        return this.jsiiGet("c", java.lang.String.class);
    }

    @Override
    public void setC(final java.lang.String value) {
        this.jsiiSet("c", java.util.Objects.requireNonNull(value, "c is required"));
    }

    public java.lang.String getE() {
        return this.jsiiGet("e", java.lang.String.class);
    }

    public void setE(final java.lang.String value) {
        this.jsiiSet("e", java.util.Objects.requireNonNull(value, "e is required"));
    }
}
