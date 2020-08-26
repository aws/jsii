package software.amazon.jsii.tests.calculator.submodule.isolated;

/**
 * Ensures imports are correctly registered for kwargs lifted properties from super-structs.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.submodule.isolated.Kwargs")
public class Kwargs extends software.amazon.jsii.JsiiObject {

    protected Kwargs(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Kwargs(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @param props
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static @org.jetbrains.annotations.NotNull java.lang.Boolean method(final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.submodule.child.KwargsProps props) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.submodule.isolated.Kwargs.class, "method", java.lang.Boolean.class, new Object[] { props });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static @org.jetbrains.annotations.NotNull java.lang.Boolean method() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.submodule.isolated.Kwargs.class, "method", java.lang.Boolean.class);
    }
}
