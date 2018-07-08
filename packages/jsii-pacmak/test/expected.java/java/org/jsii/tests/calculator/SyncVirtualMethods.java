package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.SyncVirtualMethods")
public class SyncVirtualMethods extends org.jsii.JsiiObject {
    protected SyncVirtualMethods(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public SyncVirtualMethods() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public java.lang.Number callerIsMethod() {
        return this.jsiiCall("callerIsMethod", java.lang.Number.class);
    }
    public java.lang.Number callerIsAsync() {
        return this.jsiiAsyncCall("callerIsAsync", java.lang.Number.class);
    }
    public java.lang.Number virtualMethod(final java.lang.Number n) {
        return this.jsiiCall("virtualMethod", java.lang.Number.class, java.util.stream.Stream.of(n).toArray());
    }
    public void modifyValueOfTheProperty(final java.lang.String value) {
        this.jsiiCall("modifyValueOfTheProperty", Void.class, java.util.stream.Stream.of(value).toArray());
    }
    public java.lang.String retrieveValueOfTheProperty() {
        return this.jsiiCall("retrieveValueOfTheProperty", java.lang.String.class);
    }
    public java.lang.String retrieveReadOnlyProperty() {
        return this.jsiiCall("retrieveReadOnlyProperty", java.lang.String.class);
    }
    public void modifyOtherProperty(final java.lang.String value) {
        this.jsiiCall("modifyOtherProperty", Void.class, java.util.stream.Stream.of(value).toArray());
    }
    public java.lang.String retrieveOtherProperty() {
        return this.jsiiCall("retrieveOtherProperty", java.lang.String.class);
    }
    public java.lang.Number readA() {
        return this.jsiiCall("readA", java.lang.Number.class);
    }
    public void writeA(final java.lang.Number value) {
        this.jsiiCall("writeA", Void.class, java.util.stream.Stream.of(value).toArray());
    }
    public java.lang.Number getCallerIsProperty() {
        return this.jsiiGet("callerIsProperty", java.lang.Number.class);
    }
    public void setCallerIsProperty(final java.lang.Number value) {
        this.jsiiSet("callerIsProperty", value);
    }
    public java.lang.String getTheProperty() {
        return this.jsiiGet("theProperty", java.lang.String.class);
    }
    public void setTheProperty(final java.lang.String value) {
        this.jsiiSet("theProperty", value);
    }
    public java.lang.String getReadonlyProperty() {
        return this.jsiiGet("readonlyProperty", java.lang.String.class);
    }
    public java.lang.String getOtherProperty() {
        return this.jsiiGet("otherProperty", java.lang.String.class);
    }
    public void setOtherProperty(final java.lang.String value) {
        this.jsiiSet("otherProperty", value);
    }
    public java.lang.String getValueOfOtherProperty() {
        return this.jsiiGet("valueOfOtherProperty", java.lang.String.class);
    }
    public void setValueOfOtherProperty(final java.lang.String value) {
        this.jsiiSet("valueOfOtherProperty", value);
    }
    public java.lang.Number getA() {
        return this.jsiiGet("a", java.lang.Number.class);
    }
    public void setA(final java.lang.Number value) {
        this.jsiiSet("a", value);
    }
}
