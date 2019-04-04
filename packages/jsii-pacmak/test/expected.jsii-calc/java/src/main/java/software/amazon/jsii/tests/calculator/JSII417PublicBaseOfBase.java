package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.JSII417PublicBaseOfBase")
public class JSII417PublicBaseOfBase extends software.amazon.jsii.JsiiObject {
    protected JSII417PublicBaseOfBase(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public JSII417PublicBaseOfBase() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public static software.amazon.jsii.tests.calculator.JSII417PublicBaseOfBase makeInstance() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.JSII417PublicBaseOfBase.class, "makeInstance", software.amazon.jsii.tests.calculator.JSII417PublicBaseOfBase.class);
    }

    public void foo() {
        this.jsiiCall("foo", Void.class);
    }

    public java.lang.Boolean getHasRoot() {
        return this.jsiiGet("hasRoot", java.lang.Boolean.class);
    }
}
