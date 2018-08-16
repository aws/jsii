package software.amazon.jsii.tests.calculator;

/**
 * Depend on a type from jsii-calc-base as a test for awslabs/jsii#128
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UseCalcBase")
public class UseCalcBase extends software.amazon.jsii.JsiiObject {
    protected UseCalcBase(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public UseCalcBase() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public software.amazon.jsii.tests.calculator.base.Base hello() {
        return this.jsiiCall("hello", software.amazon.jsii.tests.calculator.base.Base.class);
    }
}
