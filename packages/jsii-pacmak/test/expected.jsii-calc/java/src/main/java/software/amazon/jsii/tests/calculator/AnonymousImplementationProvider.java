package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AnonymousImplementationProvider")
public class AnonymousImplementationProvider extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IAnonymousImplementationProvider {

    protected AnonymousImplementationProvider(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected AnonymousImplementationProvider(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public AnonymousImplementationProvider() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @Override
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.Implementation provideAsClass() {
        return this.jsiiCall("provideAsClass", software.amazon.jsii.tests.calculator.Implementation.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @Override
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IAnonymouslyImplementMe provideAsInterface() {
        return this.jsiiCall("provideAsInterface", software.amazon.jsii.tests.calculator.IAnonymouslyImplementMe.class);
    }
}
