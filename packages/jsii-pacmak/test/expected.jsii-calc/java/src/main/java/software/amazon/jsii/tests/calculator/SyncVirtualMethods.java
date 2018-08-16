package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.SyncVirtualMethods")
public class SyncVirtualMethods extends software.amazon.jsii.JsiiObject {
    protected SyncVirtualMethods(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public SyncVirtualMethods() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public java.lang.Number callerIsAsync() {
        return this.jsiiAsyncCall("callerIsAsync", java.lang.Number.class);
    }

    public java.lang.Number callerIsMethod() {
        return this.jsiiCall("callerIsMethod", java.lang.Number.class);
    }

    public void modifyOtherProperty(final java.lang.String value) {
        this.jsiiCall("modifyOtherProperty", Void.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(value, "value is required")).toArray());
    }

    public void modifyValueOfTheProperty(final java.lang.String value) {
        this.jsiiCall("modifyValueOfTheProperty", Void.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(value, "value is required")).toArray());
    }

    public java.lang.Number readA() {
        return this.jsiiCall("readA", java.lang.Number.class);
    }

    public java.lang.String retrieveOtherProperty() {
        return this.jsiiCall("retrieveOtherProperty", java.lang.String.class);
    }

    public java.lang.String retrieveReadOnlyProperty() {
        return this.jsiiCall("retrieveReadOnlyProperty", java.lang.String.class);
    }

    public java.lang.String retrieveValueOfTheProperty() {
        return this.jsiiCall("retrieveValueOfTheProperty", java.lang.String.class);
    }

    public java.lang.Number virtualMethod(final java.lang.Number n) {
        return this.jsiiCall("virtualMethod", java.lang.Number.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(n, "n is required")).toArray());
    }

    public void writeA(final java.lang.Number value) {
        this.jsiiCall("writeA", Void.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(value, "value is required")).toArray());
    }

    public java.lang.String getReadonlyProperty() {
        return this.jsiiGet("readonlyProperty", java.lang.String.class);
    }

    public java.lang.Number getA() {
        return this.jsiiGet("a", java.lang.Number.class);
    }

    public void setA(final java.lang.Number value) {
        this.jsiiSet("a", java.util.Objects.requireNonNull(value, "a is required"));
    }

    public java.lang.Number getCallerIsProperty() {
        return this.jsiiGet("callerIsProperty", java.lang.Number.class);
    }

    public void setCallerIsProperty(final java.lang.Number value) {
        this.jsiiSet("callerIsProperty", java.util.Objects.requireNonNull(value, "callerIsProperty is required"));
    }

    public java.lang.String getOtherProperty() {
        return this.jsiiGet("otherProperty", java.lang.String.class);
    }

    public void setOtherProperty(final java.lang.String value) {
        this.jsiiSet("otherProperty", java.util.Objects.requireNonNull(value, "otherProperty is required"));
    }

    public java.lang.String getTheProperty() {
        return this.jsiiGet("theProperty", java.lang.String.class);
    }

    public void setTheProperty(final java.lang.String value) {
        this.jsiiSet("theProperty", java.util.Objects.requireNonNull(value, "theProperty is required"));
    }

    public java.lang.String getValueOfOtherProperty() {
        return this.jsiiGet("valueOfOtherProperty", java.lang.String.class);
    }

    public void setValueOfOtherProperty(final java.lang.String value) {
        this.jsiiSet("valueOfOtherProperty", java.util.Objects.requireNonNull(value, "valueOfOtherProperty is required"));
    }
}
