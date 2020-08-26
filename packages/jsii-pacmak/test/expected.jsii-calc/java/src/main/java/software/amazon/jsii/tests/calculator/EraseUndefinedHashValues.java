package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.EraseUndefinedHashValues")
public class EraseUndefinedHashValues extends software.amazon.jsii.JsiiObject {

    protected EraseUndefinedHashValues(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected EraseUndefinedHashValues(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public EraseUndefinedHashValues() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Returns `true` if `key` is defined in `opts`.
     * <p>
     * Used to check that undefined/null hash values
     * are being erased when sending values from native code to JS.
     * <p>
     * @param opts This parameter is required.
     * @param key This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static @org.jetbrains.annotations.NotNull java.lang.Boolean doesKeyExist(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.EraseUndefinedHashValuesOptions opts, final @org.jetbrains.annotations.NotNull java.lang.String key) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.EraseUndefinedHashValues.class, "doesKeyExist", java.lang.Boolean.class, new Object[] { java.util.Objects.requireNonNull(opts, "opts is required"), java.util.Objects.requireNonNull(key, "key is required") });
    }

    /**
     * We expect "prop1" to be erased.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> prop1IsNull() {
        return java.util.Collections.unmodifiableMap(software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.EraseUndefinedHashValues.class, "prop1IsNull", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class))));
    }

    /**
     * We expect "prop2" to be erased.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> prop2IsUndefined() {
        return java.util.Collections.unmodifiableMap(software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.EraseUndefinedHashValues.class, "prop2IsUndefined", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class))));
    }
}
