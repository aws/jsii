package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.OptionalStructConsumer")
public class OptionalStructConsumer extends software.amazon.jsii.JsiiObject {
    protected OptionalStructConsumer(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public OptionalStructConsumer(@javax.annotation.Nullable final software.amazon.jsii.tests.calculator.OptionalStruct optionalStruct) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(optionalStruct).toArray());
    }
    public OptionalStructConsumer() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    @javax.annotation.Nullable
    public java.lang.String getFieldValue() {
        return this.jsiiGet("fieldValue", java.lang.String.class);
    }

    public java.lang.Boolean getParameterWasUndefined() {
        return this.jsiiGet("parameterWasUndefined", java.lang.Boolean.class);
    }
}
