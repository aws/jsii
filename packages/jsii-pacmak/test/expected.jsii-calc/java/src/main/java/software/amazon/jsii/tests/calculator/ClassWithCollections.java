package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ClassWithCollections")
public class ClassWithCollections extends software.amazon.jsii.JsiiObject {

    protected ClassWithCollections(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ClassWithCollections(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param map This parameter is required.
     * @param array This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public ClassWithCollections(final java.util.Map<java.lang.String, java.lang.String> map, final java.util.List<java.lang.String> array) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(map, "map is required"), java.util.Objects.requireNonNull(array, "array is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static java.util.List<java.lang.String> createAList() {
        return java.util.Collections.unmodifiableList(software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.ClassWithCollections.class, "createAList", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class))));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static java.util.Map<java.lang.String, java.lang.String> createAMap() {
        return java.util.Collections.unmodifiableMap(software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.ClassWithCollections.class, "createAMap", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class))));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static java.util.List<java.lang.String> getStaticArray() {
        return java.util.Collections.unmodifiableList(software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.ClassWithCollections.class, "staticArray", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class))));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static void setStaticArray(final java.util.List<java.lang.String> value) {
        software.amazon.jsii.JsiiObject.jsiiStaticSet(software.amazon.jsii.tests.calculator.ClassWithCollections.class, "staticArray", java.util.Objects.requireNonNull(value, "staticArray is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static java.util.Map<java.lang.String, java.lang.String> getStaticMap() {
        return java.util.Collections.unmodifiableMap(software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.ClassWithCollections.class, "staticMap", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class))));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static void setStaticMap(final java.util.Map<java.lang.String, java.lang.String> value) {
        software.amazon.jsii.JsiiObject.jsiiStaticSet(software.amazon.jsii.tests.calculator.ClassWithCollections.class, "staticMap", java.util.Objects.requireNonNull(value, "staticMap is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.List<java.lang.String> getArray() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("array", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class))));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setArray(final java.util.List<java.lang.String> value) {
        this.jsiiSet("array", java.util.Objects.requireNonNull(value, "array is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.Map<java.lang.String, java.lang.String> getMap() {
        return java.util.Collections.unmodifiableMap(this.jsiiGet("map", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class))));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setMap(final java.util.Map<java.lang.String, java.lang.String> value) {
        this.jsiiSet("map", java.util.Objects.requireNonNull(value, "map is required"));
    }
}
