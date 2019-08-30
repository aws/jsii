package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AbstractClassReturner")
public class AbstractClassReturner extends software.amazon.jsii.JsiiObject {

    protected AbstractClassReturner(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected AbstractClassReturner(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public AbstractClassReturner() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.AbstractClass giveMeAbstract() {
        return this.jsiiCall("giveMeAbstract", software.amazon.jsii.tests.calculator.AbstractClass.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.IInterfaceImplementedByAbstractClass giveMeInterface() {
        return this.jsiiCall("giveMeInterface", software.amazon.jsii.tests.calculator.IInterfaceImplementedByAbstractClass.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.AbstractClassBase getReturnAbstractFromProperty() {
        return this.jsiiGet("returnAbstractFromProperty", software.amazon.jsii.tests.calculator.AbstractClassBase.class);
    }
}
