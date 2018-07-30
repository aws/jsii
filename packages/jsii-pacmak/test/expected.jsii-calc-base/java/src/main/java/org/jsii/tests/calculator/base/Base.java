package org.jsii.tests.calculator.base;
/**
 * A base class.
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.base.$Module.class, fqn = "@scope/jsii-calc-base.Base")
public abstract class Base extends org.jsii.JsiiObject {
    protected Base(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * @return the name of the class (to verify native type names are created for derived classes).
     */
    public java.lang.Object typeName() {
        return this.jsiiCall("typeName", java.lang.Object.class);
    }
}
