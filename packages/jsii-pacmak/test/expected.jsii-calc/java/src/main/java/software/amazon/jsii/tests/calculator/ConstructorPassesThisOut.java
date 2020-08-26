package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ConstructorPassesThisOut")
public class ConstructorPassesThisOut extends software.amazon.jsii.JsiiObject {

    protected ConstructorPassesThisOut(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ConstructorPassesThisOut(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @param consumer This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public ConstructorPassesThisOut(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.PartiallyInitializedThisConsumer consumer) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(consumer, "consumer is required") });
    }
}
