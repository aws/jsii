package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ConsumersOfThisCrazyTypeSystem")
public class ConsumersOfThisCrazyTypeSystem extends software.amazon.jsii.JsiiObject {
    protected ConsumersOfThisCrazyTypeSystem(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public ConsumersOfThisCrazyTypeSystem() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public java.lang.String consumeAnotherPublicInterface(final software.amazon.jsii.tests.calculator.IAnotherPublicInterface obj) {
        return this.jsiiCall("consumeAnotherPublicInterface", java.lang.String.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(obj, "obj is required")).toArray());
    }

    public java.lang.Object consumeNonInternalInterface(final software.amazon.jsii.tests.calculator.INonInternalInterface obj) {
        return this.jsiiCall("consumeNonInternalInterface", java.lang.Object.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(obj, "obj is required")).toArray());
    }
}
