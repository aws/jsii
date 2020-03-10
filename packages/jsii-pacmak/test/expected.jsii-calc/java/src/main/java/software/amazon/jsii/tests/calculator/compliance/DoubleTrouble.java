package software.amazon.jsii.tests.calculator.compliance;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.DoubleTrouble")
public class DoubleTrouble extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator {

    protected DoubleTrouble(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected DoubleTrouble(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public DoubleTrouble() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Say hello!
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @Override
    public @org.jetbrains.annotations.NotNull java.lang.String hello() {
        return this.jsiiCall("hello", java.lang.String.class);
    }

    /**
     * Returns another random number.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @Override
    public @org.jetbrains.annotations.NotNull java.lang.Number next() {
        return this.jsiiCall("next", java.lang.Number.class);
    }
}
