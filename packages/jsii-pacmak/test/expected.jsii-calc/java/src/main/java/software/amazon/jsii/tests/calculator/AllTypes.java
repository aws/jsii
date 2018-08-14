package software.amazon.jsii.tests.calculator;

/**
 * This class includes property for all types supported by jsii. The setters will validate
 * that the value set is of the expected type and throw otherwise.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AllTypes")
public class AllTypes extends software.amazon.jsii.JsiiObject {
    protected AllTypes(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public AllTypes() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public software.amazon.jsii.tests.calculator.StringEnum enumMethod(final software.amazon.jsii.tests.calculator.StringEnum value) {
        return this.jsiiCall("enumMethod", software.amazon.jsii.tests.calculator.StringEnum.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(value, "value is required")).toArray());
    }
    public java.lang.Number getEnumPropertyValue() {
        return this.jsiiGet("enumPropertyValue", java.lang.Number.class);
    }
    public java.util.List<java.lang.Object> getAnyArrayProperty() {
        return this.jsiiGet("anyArrayProperty", java.util.List.class);
    }
    public void setAnyArrayProperty(final java.util.List<java.lang.Object> value) {
        this.jsiiSet("anyArrayProperty", java.util.Objects.requireNonNull(value, "anyArrayProperty is required"));
    }
    public java.util.Map<java.lang.String, java.lang.Object> getAnyMapProperty() {
        return this.jsiiGet("anyMapProperty", java.util.Map.class);
    }
    public void setAnyMapProperty(final java.util.Map<java.lang.String, java.lang.Object> value) {
        this.jsiiSet("anyMapProperty", java.util.Objects.requireNonNull(value, "anyMapProperty is required"));
    }
    public java.lang.Object getAnyProperty() {
        return this.jsiiGet("anyProperty", java.lang.Object.class);
    }
    public void setAnyProperty(final java.lang.Object value) {
        this.jsiiSet("anyProperty", java.util.Objects.requireNonNull(value, "anyProperty is required"));
    }
    public java.util.List<java.lang.String> getArrayProperty() {
        return this.jsiiGet("arrayProperty", java.util.List.class);
    }
    public void setArrayProperty(final java.util.List<java.lang.String> value) {
        this.jsiiSet("arrayProperty", java.util.Objects.requireNonNull(value, "arrayProperty is required"));
    }
    public java.lang.Boolean getBooleanProperty() {
        return this.jsiiGet("booleanProperty", java.lang.Boolean.class);
    }
    public void setBooleanProperty(final java.lang.Boolean value) {
        this.jsiiSet("booleanProperty", java.util.Objects.requireNonNull(value, "booleanProperty is required"));
    }
    public java.time.Instant getDateProperty() {
        return this.jsiiGet("dateProperty", java.time.Instant.class);
    }
    public void setDateProperty(final java.time.Instant value) {
        this.jsiiSet("dateProperty", java.util.Objects.requireNonNull(value, "dateProperty is required"));
    }
    public software.amazon.jsii.tests.calculator.AllTypesEnum getEnumProperty() {
        return this.jsiiGet("enumProperty", software.amazon.jsii.tests.calculator.AllTypesEnum.class);
    }
    public void setEnumProperty(final software.amazon.jsii.tests.calculator.AllTypesEnum value) {
        this.jsiiSet("enumProperty", java.util.Objects.requireNonNull(value, "enumProperty is required"));
    }
    public com.fasterxml.jackson.databind.node.ObjectNode getJsonProperty() {
        return this.jsiiGet("jsonProperty", com.fasterxml.jackson.databind.node.ObjectNode.class);
    }
    public void setJsonProperty(final com.fasterxml.jackson.databind.node.ObjectNode value) {
        this.jsiiSet("jsonProperty", java.util.Objects.requireNonNull(value, "jsonProperty is required"));
    }
    public java.util.Map<java.lang.String, java.lang.Number> getMapProperty() {
        return this.jsiiGet("mapProperty", java.util.Map.class);
    }
    public void setMapProperty(final java.util.Map<java.lang.String, java.lang.Number> value) {
        this.jsiiSet("mapProperty", java.util.Objects.requireNonNull(value, "mapProperty is required"));
    }
    public java.lang.Number getNumberProperty() {
        return this.jsiiGet("numberProperty", java.lang.Number.class);
    }
    public void setNumberProperty(final java.lang.Number value) {
        this.jsiiSet("numberProperty", java.util.Objects.requireNonNull(value, "numberProperty is required"));
    }
    public java.lang.String getStringProperty() {
        return this.jsiiGet("stringProperty", java.lang.String.class);
    }
    public void setStringProperty(final java.lang.String value) {
        this.jsiiSet("stringProperty", java.util.Objects.requireNonNull(value, "stringProperty is required"));
    }
    public java.util.List<java.lang.Object> getUnionArrayProperty() {
        return this.jsiiGet("unionArrayProperty", java.util.List.class);
    }
    public void setUnionArrayProperty(final java.util.List<java.lang.Object> value) {
        this.jsiiSet("unionArrayProperty", java.util.Objects.requireNonNull(value, "unionArrayProperty is required"));
    }
    public java.util.Map<java.lang.String, java.lang.Object> getUnionMapProperty() {
        return this.jsiiGet("unionMapProperty", java.util.Map.class);
    }
    public void setUnionMapProperty(final java.util.Map<java.lang.String, java.lang.Object> value) {
        this.jsiiSet("unionMapProperty", java.util.Objects.requireNonNull(value, "unionMapProperty is required"));
    }
    public java.lang.Object getUnionProperty() {
        return this.jsiiGet("unionProperty", java.lang.Object.class);
    }
    public void setUnionProperty(final java.lang.String value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }
    public void setUnionProperty(final java.lang.Number value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }
    public void setUnionProperty(final software.amazon.jsii.tests.calculator.Multiply value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }
    public java.util.List<java.lang.Object> getUnknownArrayProperty() {
        return this.jsiiGet("unknownArrayProperty", java.util.List.class);
    }
    public void setUnknownArrayProperty(final java.util.List<java.lang.Object> value) {
        this.jsiiSet("unknownArrayProperty", java.util.Objects.requireNonNull(value, "unknownArrayProperty is required"));
    }
    public java.util.Map<java.lang.String, java.lang.Object> getUnknownMapProperty() {
        return this.jsiiGet("unknownMapProperty", java.util.Map.class);
    }
    public void setUnknownMapProperty(final java.util.Map<java.lang.String, java.lang.Object> value) {
        this.jsiiSet("unknownMapProperty", java.util.Objects.requireNonNull(value, "unknownMapProperty is required"));
    }
    public java.lang.Object getUnknownProperty() {
        return this.jsiiGet("unknownProperty", java.lang.Object.class);
    }
    public void setUnknownProperty(final java.lang.Object value) {
        this.jsiiSet("unknownProperty", java.util.Objects.requireNonNull(value, "unknownProperty is required"));
    }
    @javax.annotation.Nullable
    public software.amazon.jsii.tests.calculator.StringEnum getOptionalEnumValue() {
        return this.jsiiGet("optionalEnumValue", software.amazon.jsii.tests.calculator.StringEnum.class);
    }
    public void setOptionalEnumValue(@javax.annotation.Nullable final software.amazon.jsii.tests.calculator.StringEnum value) {
        this.jsiiSet("optionalEnumValue", value);
    }
}
