package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.RootStructValidator")
public class RootStructValidator extends software.amazon.jsii.JsiiObject {

    protected RootStructValidator(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected RootStructValidator(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param struct This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static void validate(final software.amazon.jsii.tests.calculator.RootStruct struct) {
        software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.RootStructValidator.class, "validate", Void.class, new Object[] { java.util.Objects.requireNonNull(struct, "struct is required") });
    }
}
