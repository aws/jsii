package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AbstractClassReturner")
public class AbstractClassReturner extends software.amazon.jsii.JsiiObject {
    protected AbstractClassReturner(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public AbstractClassReturner() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public software.amazon.jsii.tests.calculator.AbstractClass giveMeAbstract() {
        return this.jsiiCall("giveMeAbstract", software.amazon.jsii.tests.calculator.AbstractClass.class);
    }

    public software.amazon.jsii.tests.calculator.IInterfaceImplementedByAbstractClass giveMeInterface() {
        return this.jsiiCall("giveMeInterface", software.amazon.jsii.tests.calculator.IInterfaceImplementedByAbstractClass.class);
    }

    public software.amazon.jsii.tests.calculator.AbstractClassBase getReturnAbstractFromProperty() {
        return this.jsiiGet("returnAbstractFromProperty", software.amazon.jsii.tests.calculator.AbstractClassBase.class);
    }
}
