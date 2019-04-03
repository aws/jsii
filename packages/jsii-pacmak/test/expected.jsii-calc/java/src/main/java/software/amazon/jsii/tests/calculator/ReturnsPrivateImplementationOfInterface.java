package software.amazon.jsii.tests.calculator;

/**
 * Helps ensure the JSII kernel & runtime cooperate correctly when an un-exported instance of a class is returned with a declared type that is an exported interface, and the instance inherits from an exported class.
 * 
 * @return an instance of an un-exported class that extends `ExportedBaseClass`, declared as `IPrivatelyImplemented`.
 * @see https://github.com/awslabs/jsii/issues/320
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ReturnsPrivateImplementationOfInterface")
public class ReturnsPrivateImplementationOfInterface extends software.amazon.jsii.JsiiObject {
    protected ReturnsPrivateImplementationOfInterface(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public ReturnsPrivateImplementationOfInterface() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public software.amazon.jsii.tests.calculator.IPrivatelyImplemented getPrivateImplementation() {
        return this.jsiiGet("privateImplementation", software.amazon.jsii.tests.calculator.IPrivatelyImplemented.class);
    }
}
