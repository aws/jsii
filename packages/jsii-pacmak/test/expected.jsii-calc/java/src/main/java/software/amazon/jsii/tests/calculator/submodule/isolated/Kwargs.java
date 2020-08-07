package software.amazon.jsii.tests.calculator.submodule.isolated;

/**
 * Ensures imports are correctly registered for kwargs lifted properties from super-structs. (experimental)
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.submodule.isolated.Kwargs")
public class Kwargs extends software.amazon.jsii.JsiiObject {

    protected Kwargs(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Kwargs(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param props
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull java.lang.Boolean method(final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.submodule.child.KwargsProps props) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.submodule.isolated.Kwargs.class, "method", java.lang.Boolean.class, new Object[] { props });
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull java.lang.Boolean method() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.submodule.isolated.Kwargs.class, "method", java.lang.Boolean.class);
    }
}
