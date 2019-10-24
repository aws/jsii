package software.amazon.jsii.tests.calculator;

/**
 * Helps ensure the JSII kernel & runtime cooperate correctly when an un-exported instance of a class is returned with a declared type that is an exported interface, and the instance inherits from an exported class.
 * 
 * EXPERIMENTAL
 * 
 * @return an instance of an un-exported class that extends `ExportedBaseClass`, declared as `IPrivatelyImplemented`.
 * @see https://github.com/aws/jsii/issues/320
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ReturnsPrivateImplementationOfInterface")
public class ReturnsPrivateImplementationOfInterface extends software.amazon.jsii.JsiiObject {

    protected ReturnsPrivateImplementationOfInterface(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ReturnsPrivateImplementationOfInterface(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public ReturnsPrivateImplementationOfInterface() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.IPrivatelyImplemented getPrivateImplementation() {
        return this.jsiiGet("privateImplementation", software.amazon.jsii.tests.calculator.IPrivatelyImplemented.class);
    }
}
