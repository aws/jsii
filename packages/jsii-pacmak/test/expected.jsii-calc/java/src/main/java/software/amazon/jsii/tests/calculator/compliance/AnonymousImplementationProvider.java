package software.amazon.jsii.tests.calculator.compliance;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.AnonymousImplementationProvider")
public class AnonymousImplementationProvider extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.compliance.IAnonymousImplementationProvider {

    protected AnonymousImplementationProvider(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected AnonymousImplementationProvider(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public AnonymousImplementationProvider() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @Override
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.Implementation provideAsClass() {
        return this.jsiiCall("provideAsClass", software.amazon.jsii.tests.calculator.compliance.Implementation.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @Override
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.IAnonymouslyImplementMe provideAsInterface() {
        return this.jsiiCall("provideAsInterface", software.amazon.jsii.tests.calculator.compliance.IAnonymouslyImplementMe.class);
    }
}
