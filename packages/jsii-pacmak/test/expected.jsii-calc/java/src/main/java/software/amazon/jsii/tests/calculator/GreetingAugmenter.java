package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.GreetingAugmenter")
public class GreetingAugmenter extends software.amazon.jsii.JsiiObject {
    protected GreetingAugmenter(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public GreetingAugmenter() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public java.lang.String betterGreeting(final software.amazon.jsii.tests.calculator.lib.IFriendly friendly) {
        return this.jsiiCall("betterGreeting", java.lang.String.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(friendly, "friendly is required")).toArray());
    }
}
