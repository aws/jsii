package software.amazon.jsii.tests.calculator;

/**
 * Ensures submodule-imported types from dependencies can be used correctly.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UpcasingReflectable")
public class UpcasingReflectable extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.custom_submodule_name.IReflectable {

    protected UpcasingReflectable(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected UpcasingReflectable(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    static {
        REFLECTOR = software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.UpcasingReflectable.class, "reflector", software.amazon.jsii.tests.calculator.custom_submodule_name.Reflector.class);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param delegate This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public UpcasingReflectable(final @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> delegate) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(delegate, "delegate is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public final static software.amazon.jsii.tests.calculator.custom_submodule_name.Reflector REFLECTOR;

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.util.List<software.amazon.jsii.tests.calculator.custom_submodule_name.ReflectableEntry> getEntries() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("entries", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.custom_submodule_name.ReflectableEntry.class))));
    }
}
