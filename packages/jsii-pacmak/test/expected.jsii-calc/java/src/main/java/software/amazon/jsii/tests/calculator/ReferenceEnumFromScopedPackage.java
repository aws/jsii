package software.amazon.jsii.tests.calculator;

/**
 * See awslabs/jsii#138.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ReferenceEnumFromScopedPackage")
public class ReferenceEnumFromScopedPackage extends software.amazon.jsii.JsiiObject {
    protected ReferenceEnumFromScopedPackage(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public ReferenceEnumFromScopedPackage() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @javax.annotation.Nullable
    public software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule loadFoo() {
        return this.jsiiCall("loadFoo", software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void saveFoo(final software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule value) {
        this.jsiiCall("saveFoo", Void.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @javax.annotation.Nullable
    public software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule getFoo() {
        return this.jsiiGet("foo", software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setFoo(@javax.annotation.Nullable final software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule value) {
        this.jsiiSet("foo", value);
    }
}
