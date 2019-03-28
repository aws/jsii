package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ConstructorPassesThisOut")
public class ConstructorPassesThisOut extends software.amazon.jsii.JsiiObject {
    protected ConstructorPassesThisOut(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public ConstructorPassesThisOut(final software.amazon.jsii.tests.calculator.PartiallyInitializedThisConsumer consumer) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(java.util.Objects.requireNonNull(consumer, "consumer is required")).toArray());
    }
}
