package software.amazon.jsii.tests.calculator;

/**
 * This class includes property for all types supported by jsii. (experimental)
 * <p>
 * The setters will validate
 * that the value set is of the expected type and throw otherwise.
 * <p>
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

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public AllTypes() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param inp This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void anyIn(final @org.jetbrains.annotations.NotNull java.lang.Object inp) {
        this.jsiiCall("anyIn", software.amazon.jsii.NativeType.VOID, new Object[] { inp });
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Object anyOut() {
        return this.jsiiCall("anyOut", java.lang.Object.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param value This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.StringEnum enumMethod(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.StringEnum value) {
        return this.jsiiCall("enumMethod", software.amazon.jsii.tests.calculator.StringEnum.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Number getEnumPropertyValue() {
        return this.jsiiGet("enumPropertyValue", java.lang.Number.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.util.List<java.lang.Object> getAnyArrayProperty() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("anyArrayProperty", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class))));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setAnyArrayProperty(final @org.jetbrains.annotations.NotNull java.util.List<java.lang.Object> value) {
        this.jsiiSet("anyArrayProperty", java.util.Objects.requireNonNull(value, "anyArrayProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> getAnyMapProperty() {
        return java.util.Collections.unmodifiableMap(this.jsiiGet("anyMapProperty", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class))));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setAnyMapProperty(final @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> value) {
        this.jsiiSet("anyMapProperty", java.util.Objects.requireNonNull(value, "anyMapProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Object getAnyProperty() {
        return this.jsiiGet("anyProperty", java.lang.Object.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setAnyProperty(final @org.jetbrains.annotations.NotNull java.lang.Object value) {
        this.jsiiSet("anyProperty", java.util.Objects.requireNonNull(value, "anyProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.util.List<java.lang.String> getArrayProperty() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("arrayProperty", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class))));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setArrayProperty(final @org.jetbrains.annotations.NotNull java.util.List<java.lang.String> value) {
        this.jsiiSet("arrayProperty", java.util.Objects.requireNonNull(value, "arrayProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Boolean getBooleanProperty() {
        return this.jsiiGet("booleanProperty", java.lang.Boolean.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setBooleanProperty(final @org.jetbrains.annotations.NotNull java.lang.Boolean value) {
        this.jsiiSet("booleanProperty", java.util.Objects.requireNonNull(value, "booleanProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.time.Instant getDateProperty() {
        return this.jsiiGet("dateProperty", java.time.Instant.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setDateProperty(final @org.jetbrains.annotations.NotNull java.time.Instant value) {
        this.jsiiSet("dateProperty", java.util.Objects.requireNonNull(value, "dateProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.AllTypesEnum getEnumProperty() {
        return this.jsiiGet("enumProperty", software.amazon.jsii.tests.calculator.AllTypesEnum.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setEnumProperty(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.AllTypesEnum value) {
        this.jsiiSet("enumProperty", java.util.Objects.requireNonNull(value, "enumProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull com.fasterxml.jackson.databind.node.ObjectNode getJsonProperty() {
        return this.jsiiGet("jsonProperty", com.fasterxml.jackson.databind.node.ObjectNode.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setJsonProperty(final @org.jetbrains.annotations.NotNull com.fasterxml.jackson.databind.node.ObjectNode value) {
        this.jsiiSet("jsonProperty", java.util.Objects.requireNonNull(value, "jsonProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Number> getMapProperty() {
        return java.util.Collections.unmodifiableMap(this.jsiiGet("mapProperty", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.lib.Number.class))));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setMapProperty(final @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Number> value) {
        this.jsiiSet("mapProperty", java.util.Objects.requireNonNull(value, "mapProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Number getNumberProperty() {
        return this.jsiiGet("numberProperty", java.lang.Number.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setNumberProperty(final @org.jetbrains.annotations.NotNull java.lang.Number value) {
        this.jsiiSet("numberProperty", java.util.Objects.requireNonNull(value, "numberProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getStringProperty() {
        return this.jsiiGet("stringProperty", java.lang.String.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setStringProperty(final @org.jetbrains.annotations.NotNull java.lang.String value) {
        this.jsiiSet("stringProperty", java.util.Objects.requireNonNull(value, "stringProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.util.List<java.lang.Object> getUnionArrayProperty() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("unionArrayProperty", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class))));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionArrayProperty(final @org.jetbrains.annotations.NotNull java.util.List<java.lang.Object> value) {
        this.jsiiSet("unionArrayProperty", java.util.Objects.requireNonNull(value, "unionArrayProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> getUnionMapProperty() {
        return java.util.Collections.unmodifiableMap(this.jsiiGet("unionMapProperty", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class))));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionMapProperty(final @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> value) {
        this.jsiiSet("unionMapProperty", java.util.Objects.requireNonNull(value, "unionMapProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Object getUnionProperty() {
        return this.jsiiGet("unionProperty", java.lang.Object.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final @org.jetbrains.annotations.NotNull java.lang.String value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final @org.jetbrains.annotations.NotNull java.lang.Number value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.Multiply value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Number value) {
        this.jsiiSet("unionProperty", java.util.Objects.requireNonNull(value, "unionProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.util.List<java.lang.Object> getUnknownArrayProperty() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("unknownArrayProperty", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class))));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnknownArrayProperty(final @org.jetbrains.annotations.NotNull java.util.List<java.lang.Object> value) {
        this.jsiiSet("unknownArrayProperty", java.util.Objects.requireNonNull(value, "unknownArrayProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> getUnknownMapProperty() {
        return java.util.Collections.unmodifiableMap(this.jsiiGet("unknownMapProperty", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class))));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnknownMapProperty(final @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> value) {
        this.jsiiSet("unknownMapProperty", java.util.Objects.requireNonNull(value, "unknownMapProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Object getUnknownProperty() {
        return this.jsiiGet("unknownProperty", java.lang.Object.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnknownProperty(final @org.jetbrains.annotations.NotNull java.lang.Object value) {
        this.jsiiSet("unknownProperty", java.util.Objects.requireNonNull(value, "unknownProperty is required"));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.StringEnum getOptionalEnumValue() {
        return this.jsiiGet("optionalEnumValue", software.amazon.jsii.tests.calculator.StringEnum.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setOptionalEnumValue(final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.StringEnum value) {
        this.jsiiSet("optionalEnumValue", value);
    }
}
