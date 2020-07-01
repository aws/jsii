package software.amazon.jsii.tests.calculator;

/**
 * Checks the current file permissions are cool (no funky UMASK down-scoping happened).
 * <p>
 * EXPERIMENTAL
 * <p>
 * @see https://github.com/aws/jsii/issues/1765
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UmaskCheck")
public class UmaskCheck extends software.amazon.jsii.JsiiObject {

    protected UmaskCheck(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected UmaskCheck(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * This should return 0o644 (-rw-r--r--).
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull java.lang.Number mode() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.UmaskCheck.class, "mode", java.lang.Number.class);
    }
}
