package software.amazon.jsii.tests.calculator.compliance;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.AbstractClassReturner")
public class AbstractClassReturner extends software.amazon.jsii.JsiiObject {

    protected AbstractClassReturner(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected AbstractClassReturner(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public AbstractClassReturner() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.AbstractClass giveMeAbstract() {
        return this.jsiiCall("giveMeAbstract", software.amazon.jsii.tests.calculator.compliance.AbstractClass.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.IInterfaceImplementedByAbstractClass giveMeInterface() {
        return this.jsiiCall("giveMeInterface", software.amazon.jsii.tests.calculator.compliance.IInterfaceImplementedByAbstractClass.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.AbstractClassBase getReturnAbstractFromProperty() {
        return this.jsiiGet("returnAbstractFromProperty", software.amazon.jsii.tests.calculator.compliance.AbstractClassBase.class);
    }
}
