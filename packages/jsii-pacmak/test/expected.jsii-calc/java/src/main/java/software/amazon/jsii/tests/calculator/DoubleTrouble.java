package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DoubleTrouble")
public class DoubleTrouble extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator {
    protected DoubleTrouble(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public DoubleTrouble() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    /**
     * Say hello!
     */
    public java.lang.String hello() {
        return this.jsiiCall("hello", java.lang.String.class);
    }
    /**
     * Returns another random number.
     */
    public java.lang.Number next() {
        return this.jsiiCall("next", java.lang.Number.class);
    }
}
