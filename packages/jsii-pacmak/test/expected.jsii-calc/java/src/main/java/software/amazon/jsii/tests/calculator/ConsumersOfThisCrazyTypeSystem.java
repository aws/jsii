package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ConsumersOfThisCrazyTypeSystem")
public class ConsumersOfThisCrazyTypeSystem extends software.amazon.jsii.JsiiObject {

    protected ConsumersOfThisCrazyTypeSystem(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ConsumersOfThisCrazyTypeSystem(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public ConsumersOfThisCrazyTypeSystem() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String consumeAnotherPublicInterface(final software.amazon.jsii.tests.calculator.IAnotherPublicInterface obj) {
        return this.jsiiCall("consumeAnotherPublicInterface", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(obj, "obj is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Object consumeNonInternalInterface(final software.amazon.jsii.tests.calculator.INonInternalInterface obj) {
        return this.jsiiCall("consumeNonInternalInterface", java.lang.Object.class, new Object[] { java.util.Objects.requireNonNull(obj, "obj is required") });
    }
}
