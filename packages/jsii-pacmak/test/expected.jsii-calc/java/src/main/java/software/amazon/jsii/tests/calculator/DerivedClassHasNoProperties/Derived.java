package software.amazon.jsii.tests.calculator.DerivedClassHasNoProperties;
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DerivedClassHasNoProperties.Derived")
public class Derived extends software.amazon.jsii.tests.calculator.DerivedClassHasNoProperties.Base {
    protected Derived(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public Derived() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
}
