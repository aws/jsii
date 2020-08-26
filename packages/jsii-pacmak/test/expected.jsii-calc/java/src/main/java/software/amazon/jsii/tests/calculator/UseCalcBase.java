package software.amazon.jsii.tests.calculator;

/**
 * Depend on a type from jsii-calc-base as a test for awslabs/jsii#128.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UseCalcBase")
public class UseCalcBase extends software.amazon.jsii.JsiiObject {

    protected UseCalcBase(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected UseCalcBase(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public UseCalcBase() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.base.Base hello() {
        return this.jsiiCall("hello", software.amazon.jsii.tests.calculator.base.Base.class);
    }
}
