package org.jsii.tests.calculator;
/**
 * This class includes property for all types supported by jsii. The setters will validate
 * that the value set is of the expected type and throw otherwise.
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii$jsii_calc$.AllTypes")
public class AllTypes extends org.jsii.JsiiObject {
    protected AllTypes(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public AllTypes() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public java.lang.Boolean getBooleanProperty() {
        return this.jsiiGet("booleanProperty", java.lang.Boolean.class);
    }
    public void setBooleanProperty(final java.lang.Boolean value) {
        this.jsiiSet("booleanProperty", value);
    }
    public java.lang.String getStringProperty() {
        return this.jsiiGet("stringProperty", java.lang.String.class);
    }
    public void setStringProperty(final java.lang.String value) {
        this.jsiiSet("stringProperty", value);
    }
    public java.lang.Number getNumberProperty() {
        return this.jsiiGet("numberProperty", java.lang.Number.class);
    }
    public void setNumberProperty(final java.lang.Number value) {
        this.jsiiSet("numberProperty", value);
    }
    public java.time.Instant getDateProperty() {
        return this.jsiiGet("dateProperty", java.time.Instant.class);
    }
    public void setDateProperty(final java.time.Instant value) {
        this.jsiiSet("dateProperty", value);
    }
    public com.fasterxml.jackson.databind.node.ObjectNode getJsonProperty() {
        return this.jsiiGet("jsonProperty", com.fasterxml.jackson.databind.node.ObjectNode.class);
    }
    public void setJsonProperty(final com.fasterxml.jackson.databind.node.ObjectNode value) {
        this.jsiiSet("jsonProperty", value);
    }
    public java.util.Map<java.lang.String, java.lang.Number> getMapProperty() {
        return this.jsiiGet("mapProperty", java.util.Map.class);
    }
    public void setMapProperty(final java.util.Map<java.lang.String, java.lang.Number> value) {
        this.jsiiSet("mapProperty", value);
    }
    public java.util.List<java.lang.String> getArrayProperty() {
        return this.jsiiGet("arrayProperty", java.util.List.class);
    }
    public void setArrayProperty(final java.util.List<java.lang.String> value) {
        this.jsiiSet("arrayProperty", value);
    }
    public java.lang.Object getAnyProperty() {
        return this.jsiiGet("anyProperty", java.lang.Object.class);
    }
    public void setAnyProperty(final java.lang.Object value) {
        this.jsiiSet("anyProperty", value);
    }
    public java.util.List<java.lang.Object> getAnyArrayProperty() {
        return this.jsiiGet("anyArrayProperty", java.util.List.class);
    }
    public void setAnyArrayProperty(final java.util.List<java.lang.Object> value) {
        this.jsiiSet("anyArrayProperty", value);
    }
    public java.util.Map<java.lang.String, java.lang.Object> getAnyMapProperty() {
        return this.jsiiGet("anyMapProperty", java.util.Map.class);
    }
    public void setAnyMapProperty(final java.util.Map<java.lang.String, java.lang.Object> value) {
        this.jsiiSet("anyMapProperty", value);
    }
    public java.lang.Object getUnionProperty() {
        return this.jsiiGet("unionProperty", java.lang.Object.class);
    }
    public void setUnionProperty(final java.lang.String value) {
        this.jsiiSet("unionProperty", value);
    }
    public void setUnionProperty(final java.lang.Number value) {
        this.jsiiSet("unionProperty", value);
    }
    public void setUnionProperty(final org.jsii.tests.calculator.Multiply value) {
        this.jsiiSet("unionProperty", value);
    }
    public java.util.List<java.lang.Object> getUnionArrayProperty() {
        return this.jsiiGet("unionArrayProperty", java.util.List.class);
    }
    public void setUnionArrayProperty(final java.util.List<java.lang.Object> value) {
        this.jsiiSet("unionArrayProperty", value);
    }
    public java.util.Map<java.lang.String, java.lang.Object> getUnionMapProperty() {
        return this.jsiiGet("unionMapProperty", java.util.Map.class);
    }
    public void setUnionMapProperty(final java.util.Map<java.lang.String, java.lang.Object> value) {
        this.jsiiSet("unionMapProperty", value);
    }
    public org.jsii.tests.calculator.AllTypesEnum getEnumProperty() {
        return this.jsiiGet("enumProperty", org.jsii.tests.calculator.AllTypesEnum.class);
    }
    public void setEnumProperty(final org.jsii.tests.calculator.AllTypesEnum value) {
        this.jsiiSet("enumProperty", value);
    }
    public java.lang.Number getEnumPropertyValue() {
        return this.jsiiGet("enumPropertyValue", java.lang.Number.class);
    }
}
