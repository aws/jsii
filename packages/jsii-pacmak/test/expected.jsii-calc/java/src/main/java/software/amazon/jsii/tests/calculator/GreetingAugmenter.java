package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.GreetingAugmenter")
public class GreetingAugmenter extends software.amazon.jsii.JsiiObject {

    protected GreetingAugmenter(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected GreetingAugmenter(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public GreetingAugmenter() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param friendly This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String betterGreeting(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.IFriendly friendly) {
        return this.jsiiCall("betterGreeting", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(friendly, "friendly is required") });
    }
}
