package software.amazon.jsii.tests.calculator;

/**
 * Depend on a type from jsii-calc-base as a test for awslabs/jsii#128.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UseCalcBase")
public class UseCalcBase extends software.amazon.jsii.JsiiObject {

    protected UseCalcBase(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected UseCalcBase(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public UseCalcBase() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.base.Base hello() {
        return this.jsiiCall("hello", software.amazon.jsii.tests.calculator.base.Base.class);
    }
}
