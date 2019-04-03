package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.JSII417Derived")
public class JSII417Derived extends software.amazon.jsii.tests.calculator.JSII417PublicBaseOfBase {
    protected JSII417Derived(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public JSII417Derived(final java.lang.String property) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(java.util.Objects.requireNonNull(property, "property is required")).toArray());
    }

    public void bar() {
        this.jsiiCall("bar", Void.class);
    }

    public void baz() {
        this.jsiiCall("baz", Void.class);
    }

    protected java.lang.String getProperty() {
        return this.jsiiGet("property", java.lang.String.class);
    }
}
