package software.amazon.jsii.tests.calculator;

/**
 * This class includes property for all types supported by jsii.
 * 
 * The setters will validate
 * that the value set is of the expected type and throw otherwise.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AllTypes")
public class AllTypes extends software.amazon.jsii.JsiiObject {

    protected AllTypes(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected AllTypes(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public AllTypes() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void anyIn(final java.lang.Object inp) {
        this.jsiiCall("anyIn", Void.class, new Object[] { inp });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Object anyOut() {
        return this.jsiiCall("anyOut", java.lang.Object.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.StringEnum enumMethod(final software.amazon.jsii.tests.calculator.StringEnum value) {
        return this.jsiiCall("enumMethod", software.amazon.jsii.tests.calculator.StringEnum.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number getEnumPropertyValue() {
        return this.jsiiGet("enumPropertyValue", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.List<java.lang.Object> getAnyArrayProperty() {
        return this.jsiiGet("anyArrayProperty", java.util.List.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setAnyArrayProperty(final java.util.List<java.lang.Object> value) {
        this.jsiiSet("anyArrayProperty", java.util.Objects.requireNonNull(value, "anyArrayProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.Map<java.lang.String, java.lang.Object> getAnyMapProperty() {
        return this.jsiiGet("anyMapProperty", java.util.Map.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setAnyMapProperty(final java.util.Map<java.lang.String, java.lang.Object> value) {
        this.jsiiSet("anyMapProperty", java.util.Objects.requireNonNull(value, "anyMapProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Object getAnyProperty() {
        return this.jsiiGet("anyProperty", java.lang.Object.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setAnyProperty(final java.lang.Object value) {
        this.jsiiSet("anyProperty", java.util.Objects.requireNonNull(value, "anyProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.List<java.lang.String> getArrayProperty() {
        return this.jsiiGet("arrayProperty", java.util.List.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setArrayProperty(final java.util.List<java.lang.String> value) {
        this.jsiiSet("arrayProperty", java.util.Objects.requireNonNull(value, "arrayProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Boolean getBooleanProperty() {
        return this.jsiiGet("booleanProperty", java.lang.Boolean.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setBooleanProperty(final java.lang.Boolean value) {
        this.jsiiSet("booleanProperty", java.util.Objects.requireNonNull(value, "booleanProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.time.Instant getDateProperty() {
        return this.jsiiGet("dateProperty", java.time.Instant.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setDateProperty(final java.time.Instant value) {
        this.jsiiSet("dateProperty", java.util.Objects.requireNonNull(value, "dateProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.AllTypesEnum getEnumProperty() {
        return this.jsiiGet("enumProperty", software.amazon.jsii.tests.calculator.AllTypesEnum.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setEnumProperty(final software.amazon.jsii.tests.calculator.AllTypesEnum value) {
        this.jsiiSet("enumProperty", java.util.Objects.requireNonNull(value, "enumProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public com.fasterxml.jackson.databind.node.ObjectNode getJsonProperty() {
        return this.jsiiGet("jsonProperty", com.fasterxml.jackson.databind.node.ObjectNode.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setJsonProperty(final com.fasterxml.jackson.databind.node.ObjectNode value) {
        this.jsiiSet("jsonProperty", java.util.Objects.requireNonNull(value, "jsonProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Number> getMapProperty() {
        return this.jsiiGet("mapProperty", java.util.Map.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setMapProperty(final java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Number> value) {
        this.jsiiSet("mapProperty", java.util.Objects.requireNonNull(value, "mapProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number getNumberProperty() {
        return this.jsiiGet("numberProperty", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setNumberProperty(final java.lang.Number value) {
        this.jsiiSet("numberProperty", java.util.Objects.requireNonNull(value, "numberProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getStringProperty() {
        return this.jsiiGet("stringProperty", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setStringProperty(final java.lang.String value) {
        this.jsiiSet("stringProperty", java.util.Objects.requireNonNull(value, "stringProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.List<java.lang.Object> getUnionArrayProperty() {
        return this.jsiiGet("unionArrayProperty", java.util.List.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionArrayProperty(final java.util.List<java.lang.Object> value) {
        this.jsiiSet("unionArrayProperty", java.util.Objects.requireNonNull(value, "unionArrayProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.Map<java.lang.String, java.lang.Object> getUnionMapProperty() {
        return this.jsiiGet("unionMapProperty", java.util.Map.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionMapProperty(final java.util.Map<java.lang.String, java.lang.Object> value) {
        this.jsiiSet("unionMapProperty", java.util.Objects.requireNonNull(value, "unionMapProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Object getUnionProperty() {
        return this.jsiiGet("unionProperty", java.lang.Object.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final java.lang.String value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final java.lang.Number value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final software.amazon.jsii.tests.calculator.Multiply value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final software.amazon.jsii.tests.calculator.lib.Number value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.List<java.lang.Object> getUnknownArrayProperty() {
        return this.jsiiGet("unknownArrayProperty", java.util.List.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnknownArrayProperty(final java.util.List<java.lang.Object> value) {
        this.jsiiSet("unknownArrayProperty", java.util.Objects.requireNonNull(value, "unknownArrayProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.Map<java.lang.String, java.lang.Object> getUnknownMapProperty() {
        return this.jsiiGet("unknownMapProperty", java.util.Map.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnknownMapProperty(final java.util.Map<java.lang.String, java.lang.Object> value) {
        this.jsiiSet("unknownMapProperty", java.util.Objects.requireNonNull(value, "unknownMapProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Object getUnknownProperty() {
        return this.jsiiGet("unknownProperty", java.lang.Object.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnknownProperty(final java.lang.Object value) {
        this.jsiiSet("unknownProperty", java.util.Objects.requireNonNull(value, "unknownProperty is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.StringEnum getOptionalEnumValue() {
        return this.jsiiGet("optionalEnumValue", software.amazon.jsii.tests.calculator.StringEnum.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setOptionalEnumValue(final software.amazon.jsii.tests.calculator.StringEnum value) {
        this.jsiiSet("optionalEnumValue", value);
    }
}
