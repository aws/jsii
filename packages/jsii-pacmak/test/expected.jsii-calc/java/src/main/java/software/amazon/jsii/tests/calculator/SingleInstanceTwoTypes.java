package software.amazon.jsii.tests.calculator;

/**
 * Test that a single instance can be returned under two different FQNs
 * 
 * JSII clients can instantiate 2 different strongly-typed wrappers for the same
 * object. Unfortunately, this will break object equality, but if we didn't do
 * this it would break runtime type checks in the JVM or CLR.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.SingleInstanceTwoTypes")
public class SingleInstanceTwoTypes extends software.amazon.jsii.JsiiObject {
    protected SingleInstanceTwoTypes(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public SingleInstanceTwoTypes() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public software.amazon.jsii.tests.calculator.InbetweenClass interface1() {
        return this.jsiiCall("interface1", software.amazon.jsii.tests.calculator.InbetweenClass.class);
    }

    public software.amazon.jsii.tests.calculator.IPublicInterface interface2() {
        return this.jsiiCall("interface2", software.amazon.jsii.tests.calculator.IPublicInterface.class);
    }
}
