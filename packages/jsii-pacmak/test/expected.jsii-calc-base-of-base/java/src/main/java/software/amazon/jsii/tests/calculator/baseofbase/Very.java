package software.amazon.jsii.tests.calculator.baseofbase;

/**
 * Something here. (experimental)
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.baseofbase.$Module.class, fqn = "@scope/jsii-calc-base-of-base.Very")
public class Very extends software.amazon.jsii.JsiiObject {

    protected Very(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Very(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public Very() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Number hey() {
        return this.jsiiCall("hey", java.lang.Number.class);
    }
}
