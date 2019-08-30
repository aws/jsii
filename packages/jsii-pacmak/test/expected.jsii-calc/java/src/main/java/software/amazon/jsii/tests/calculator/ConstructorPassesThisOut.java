package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ConstructorPassesThisOut")
public class ConstructorPassesThisOut extends software.amazon.jsii.JsiiObject {

    protected ConstructorPassesThisOut(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ConstructorPassesThisOut(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public ConstructorPassesThisOut(final software.amazon.jsii.tests.calculator.PartiallyInitializedThisConsumer consumer) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(consumer, "consumer is required") }));
    }
}
