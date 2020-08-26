package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AbstractClassReturner")
public class AbstractClassReturner extends software.amazon.jsii.JsiiObject {

    protected AbstractClassReturner(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected AbstractClassReturner(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public AbstractClassReturner() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.AbstractClass giveMeAbstract() {
        return this.jsiiCall("giveMeAbstract", software.amazon.jsii.tests.calculator.AbstractClass.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IInterfaceImplementedByAbstractClass giveMeInterface() {
        return this.jsiiCall("giveMeInterface", software.amazon.jsii.tests.calculator.IInterfaceImplementedByAbstractClass.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.AbstractClassBase getReturnAbstractFromProperty() {
        return this.jsiiGet("returnAbstractFromProperty", software.amazon.jsii.tests.calculator.AbstractClassBase.class);
    }
}
