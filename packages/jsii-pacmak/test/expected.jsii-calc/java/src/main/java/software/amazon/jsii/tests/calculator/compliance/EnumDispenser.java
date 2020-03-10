package software.amazon.jsii.tests.calculator.compliance;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.EnumDispenser")
public class EnumDispenser extends software.amazon.jsii.JsiiObject {

    protected EnumDispenser(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected EnumDispenser(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.AllTypesEnum randomIntegerLikeEnum() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.compliance.EnumDispenser.class, "randomIntegerLikeEnum", software.amazon.jsii.tests.calculator.compliance.AllTypesEnum.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.StringEnum randomStringLikeEnum() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.compliance.EnumDispenser.class, "randomStringLikeEnum", software.amazon.jsii.tests.calculator.compliance.StringEnum.class);
    }
}
