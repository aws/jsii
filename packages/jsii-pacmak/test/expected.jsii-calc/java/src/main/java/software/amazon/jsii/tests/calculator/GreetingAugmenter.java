package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.GreetingAugmenter")
public class GreetingAugmenter extends software.amazon.jsii.JsiiObject {

    protected GreetingAugmenter(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected GreetingAugmenter(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public GreetingAugmenter() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * @param friendly This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String betterGreeting(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.IFriendly friendly) {
        return this.jsiiCall("betterGreeting", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(friendly, "friendly is required") });
    }
}
