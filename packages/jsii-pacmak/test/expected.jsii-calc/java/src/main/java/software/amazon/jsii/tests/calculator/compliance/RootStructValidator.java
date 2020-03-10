package software.amazon.jsii.tests.calculator.compliance;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.RootStructValidator")
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
    public static void validate(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.RootStruct struct) {
        software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.compliance.RootStructValidator.class, "validate", software.amazon.jsii.NativeType.VOID, new Object[] { java.util.Objects.requireNonNull(struct, "struct is required") });
    }
}
