package software.amazon.jsii.tests.calculator;

/**
 * Helps ensure the JSII kernel & runtime cooperate correctly when an un-exported instance of a class is returned with a declared type that is an exported interface, and the instance inherits from an exported class.
 * <p>
 * @return an instance of an un-exported class that extends `ExportedBaseClass`, declared as `IPrivatelyImplemented`.
 * @see https://github.com/aws/jsii/issues/320
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ReturnsPrivateImplementationOfInterface")
public class ReturnsPrivateImplementationOfInterface extends software.amazon.jsii.JsiiObject {

    protected ReturnsPrivateImplementationOfInterface(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ReturnsPrivateImplementationOfInterface(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public ReturnsPrivateImplementationOfInterface() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IPrivatelyImplemented getPrivateImplementation() {
        return this.jsiiGet("privateImplementation", software.amazon.jsii.tests.calculator.IPrivatelyImplemented.class);
    }
}
