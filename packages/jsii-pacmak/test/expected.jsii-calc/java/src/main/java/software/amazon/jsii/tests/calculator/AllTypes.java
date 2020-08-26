package software.amazon.jsii.tests.calculator;

/**
 * This class includes property for all types supported by jsii.
 * <p>
 * The setters will validate
 * that the value set is of the expected type and throw otherwise.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AllTypes")
public class AllTypes extends software.amazon.jsii.JsiiObject {

    protected AllTypes(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected AllTypes(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public AllTypes() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * @param inp This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void anyIn(final @org.jetbrains.annotations.NotNull java.lang.Object inp) {
        this.jsiiCall("anyIn", software.amazon.jsii.NativeType.VOID, new Object[] { inp });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Object anyOut() {
        return this.jsiiCall("anyOut", java.lang.Object.class);
    }

    /**
     * @param value This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.StringEnum enumMethod(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.StringEnum value) {
        return this.jsiiCall("enumMethod", software.amazon.jsii.tests.calculator.StringEnum.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Number getEnumPropertyValue() {
        return this.jsiiGet("enumPropertyValue", java.lang.Number.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.util.List<java.lang.Object> getAnyArrayProperty() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("anyArrayProperty", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class))));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setAnyArrayProperty(final @org.jetbrains.annotations.NotNull java.util.List<java.lang.Object> value) {
        this.jsiiSet("anyArrayProperty", java.util.Objects.requireNonNull(value, "anyArrayProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> getAnyMapProperty() {
        return java.util.Collections.unmodifiableMap(this.jsiiGet("anyMapProperty", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class))));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setAnyMapProperty(final @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> value) {
        this.jsiiSet("anyMapProperty", java.util.Objects.requireNonNull(value, "anyMapProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Object getAnyProperty() {
        return this.jsiiGet("anyProperty", java.lang.Object.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setAnyProperty(final @org.jetbrains.annotations.NotNull java.lang.Object value) {
        this.jsiiSet("anyProperty", java.util.Objects.requireNonNull(value, "anyProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.util.List<java.lang.String> getArrayProperty() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("arrayProperty", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class))));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setArrayProperty(final @org.jetbrains.annotations.NotNull java.util.List<java.lang.String> value) {
        this.jsiiSet("arrayProperty", java.util.Objects.requireNonNull(value, "arrayProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Boolean getBooleanProperty() {
        return this.jsiiGet("booleanProperty", java.lang.Boolean.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setBooleanProperty(final @org.jetbrains.annotations.NotNull java.lang.Boolean value) {
        this.jsiiSet("booleanProperty", java.util.Objects.requireNonNull(value, "booleanProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.time.Instant getDateProperty() {
        return this.jsiiGet("dateProperty", java.time.Instant.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setDateProperty(final @org.jetbrains.annotations.NotNull java.time.Instant value) {
        this.jsiiSet("dateProperty", java.util.Objects.requireNonNull(value, "dateProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.AllTypesEnum getEnumProperty() {
        return this.jsiiGet("enumProperty", software.amazon.jsii.tests.calculator.AllTypesEnum.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setEnumProperty(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.AllTypesEnum value) {
        this.jsiiSet("enumProperty", java.util.Objects.requireNonNull(value, "enumProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull com.fasterxml.jackson.databind.node.ObjectNode getJsonProperty() {
        return this.jsiiGet("jsonProperty", com.fasterxml.jackson.databind.node.ObjectNode.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setJsonProperty(final @org.jetbrains.annotations.NotNull com.fasterxml.jackson.databind.node.ObjectNode value) {
        this.jsiiSet("jsonProperty", java.util.Objects.requireNonNull(value, "jsonProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Number> getMapProperty() {
        return java.util.Collections.unmodifiableMap(this.jsiiGet("mapProperty", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.lib.Number.class))));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setMapProperty(final @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Number> value) {
        this.jsiiSet("mapProperty", java.util.Objects.requireNonNull(value, "mapProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Number getNumberProperty() {
        return this.jsiiGet("numberProperty", java.lang.Number.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setNumberProperty(final @org.jetbrains.annotations.NotNull java.lang.Number value) {
        this.jsiiSet("numberProperty", java.util.Objects.requireNonNull(value, "numberProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String getStringProperty() {
        return this.jsiiGet("stringProperty", java.lang.String.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setStringProperty(final @org.jetbrains.annotations.NotNull java.lang.String value) {
        this.jsiiSet("stringProperty", java.util.Objects.requireNonNull(value, "stringProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.util.List<java.lang.Object> getUnionArrayProperty() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("unionArrayProperty", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class))));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setUnionArrayProperty(final @org.jetbrains.annotations.NotNull java.util.List<java.lang.Object> value) {
        this.jsiiSet("unionArrayProperty", java.util.Objects.requireNonNull(value, "unionArrayProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> getUnionMapProperty() {
        return java.util.Collections.unmodifiableMap(this.jsiiGet("unionMapProperty", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class))));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setUnionMapProperty(final @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> value) {
        this.jsiiSet("unionMapProperty", java.util.Objects.requireNonNull(value, "unionMapProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Object getUnionProperty() {
        return this.jsiiGet("unionProperty", java.lang.Object.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setUnionProperty(final @org.jetbrains.annotations.NotNull java.lang.String value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setUnionProperty(final @org.jetbrains.annotations.NotNull java.lang.Number value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setUnionProperty(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.Multiply value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setUnionProperty(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Number value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.util.List<java.lang.Object> getUnknownArrayProperty() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("unknownArrayProperty", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class))));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setUnknownArrayProperty(final @org.jetbrains.annotations.NotNull java.util.List<java.lang.Object> value) {
        this.jsiiSet("unknownArrayProperty", java.util.Objects.requireNonNull(value, "unknownArrayProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> getUnknownMapProperty() {
        return java.util.Collections.unmodifiableMap(this.jsiiGet("unknownMapProperty", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class))));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setUnknownMapProperty(final @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> value) {
        this.jsiiSet("unknownMapProperty", java.util.Objects.requireNonNull(value, "unknownMapProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Object getUnknownProperty() {
        return this.jsiiGet("unknownProperty", java.lang.Object.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setUnknownProperty(final @org.jetbrains.annotations.NotNull java.lang.Object value) {
        this.jsiiSet("unknownProperty", java.util.Objects.requireNonNull(value, "unknownProperty is required"));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.StringEnum getOptionalEnumValue() {
        return this.jsiiGet("optionalEnumValue", software.amazon.jsii.tests.calculator.StringEnum.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setOptionalEnumValue(final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.StringEnum value) {
        this.jsiiSet("optionalEnumValue", value);
    }
}
