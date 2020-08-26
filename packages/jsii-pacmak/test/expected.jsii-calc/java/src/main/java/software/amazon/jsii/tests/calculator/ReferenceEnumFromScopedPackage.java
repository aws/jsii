package software.amazon.jsii.tests.calculator;

/**
 * See awslabs/jsii#138.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ReferenceEnumFromScopedPackage")
public class ReferenceEnumFromScopedPackage extends software.amazon.jsii.JsiiObject {

    protected ReferenceEnumFromScopedPackage(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ReferenceEnumFromScopedPackage(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public ReferenceEnumFromScopedPackage() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule loadFoo() {
        return this.jsiiCall("loadFoo", software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule.class);
    }

    /**
     * @param value This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void saveFoo(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule value) {
        this.jsiiCall("saveFoo", software.amazon.jsii.NativeType.VOID, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule getFoo() {
        return this.jsiiGet("foo", software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setFoo(final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule value) {
        this.jsiiSet("foo", value);
    }
}
