package org.jsii.tests.calculator.DerivedClassHasNoProperties;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DerivedClassHasNoProperties.Base")
public class Base extends org.jsii.JsiiObject {
    protected Base(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public Base() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public java.lang.String getProp() {
        return this.jsiiGet("prop", java.lang.String.class);
    }
    public void setProp(final java.lang.String value) {
        this.jsiiSet("prop", java.util.Objects.requireNonNull(value, "prop is required"));
    }
}
