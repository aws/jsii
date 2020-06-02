package software.amazon.jsii.tests.calculator.custom_submodule_name;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@Deprecated
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.lib.$Module.class, fqn = "@scope/jsii-calc-lib.submodule.Reflector")
public class Reflector extends software.amazon.jsii.JsiiObject {

    protected Reflector(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Reflector(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    public Reflector() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * @param reflectable This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    public @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> asMap(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.custom_submodule_name.IReflectable reflectable) {
        return java.util.Collections.unmodifiableMap(this.jsiiCall("asMap", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class)), new Object[] { java.util.Objects.requireNonNull(reflectable, "reflectable is required") }));
    }
}
