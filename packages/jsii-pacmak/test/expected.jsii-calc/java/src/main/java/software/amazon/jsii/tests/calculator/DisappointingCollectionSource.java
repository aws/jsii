package software.amazon.jsii.tests.calculator;

/**
 * Verifies that null/undefined can be returned for optional collections.
 * <p>
 * This source of collections is disappointing - it'll always give you nothing :(
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DisappointingCollectionSource")
public class DisappointingCollectionSource extends software.amazon.jsii.JsiiObject {

    protected DisappointingCollectionSource(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected DisappointingCollectionSource(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    static {
        MAYBE_LIST = java.util.Optional.ofNullable((java.util.List<java.lang.String>)(software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.DisappointingCollectionSource.class, "maybeList", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class))))).map(java.util.Collections::unmodifiableList).orElse(null);
        MAYBE_MAP = java.util.Optional.ofNullable((java.util.Map<java.lang.String, ? extends java.lang.Number>)(software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.DisappointingCollectionSource.class, "maybeMap", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(java.lang.Number.class))))).map(java.util.Collections::unmodifiableMap).orElse(null);
    }

    /**
     * Some List of strings, maybe?
     * <p>
     * (Nah, just a billion dollars mistake!)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public final static java.util.List<java.lang.String> MAYBE_LIST;

    /**
     * Some Map of strings to numbers, maybe?
     * <p>
     * (Nah, just a billion dollars mistake!)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public final static java.util.Map<java.lang.String, ? extends java.lang.Number> MAYBE_MAP;
}
