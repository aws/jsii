package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.EraseUndefinedHashValues")
public class EraseUndefinedHashValues extends software.amazon.jsii.JsiiObject {
    protected EraseUndefinedHashValues(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public EraseUndefinedHashValues() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Returns `true` if `key` is defined in `opts`.
     * 
     * Used to check that undefined/null hash values
     * are being erased when sending values from native code to JS.
     */
    public static java.lang.Boolean doesKeyExist(final software.amazon.jsii.tests.calculator.EraseUndefinedHashValuesOptions opts, final java.lang.String key) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.EraseUndefinedHashValues.class, "doesKeyExist", java.lang.Boolean.class, new Object[] { java.util.Objects.requireNonNull(opts, "opts is required"), java.util.Objects.requireNonNull(key, "key is required") });
    }

    /**
     * We expect "prop1" to be erased.
     */
    @javax.annotation.Nullable
    public static java.lang.Object prop1IsNull() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.EraseUndefinedHashValues.class, "prop1IsNull", java.lang.Object.class);
    }

    /**
     * We expect "prop2" to be erased.
     */
    @javax.annotation.Nullable
    public static java.lang.Object prop2IsUndefined() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.EraseUndefinedHashValues.class, "prop2IsUndefined", java.lang.Object.class);
    }
}
