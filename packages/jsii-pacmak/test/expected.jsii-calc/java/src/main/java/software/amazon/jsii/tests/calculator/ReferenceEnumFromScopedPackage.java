package software.amazon.jsii.tests.calculator;

/**
 * See awslabs/jsii#138.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ReferenceEnumFromScopedPackage")
public class ReferenceEnumFromScopedPackage extends software.amazon.jsii.JsiiObject {
    protected ReferenceEnumFromScopedPackage(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public ReferenceEnumFromScopedPackage() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    @javax.annotation.Nullable
    public software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule loadFoo() {
        return this.jsiiCall("loadFoo", software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule.class);
    }

    public void saveFoo(final software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule value) {
        this.jsiiCall("saveFoo", Void.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(value, "value is required")).toArray());
    }

    @javax.annotation.Nullable
    public software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule getFoo() {
        return this.jsiiGet("foo", software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule.class);
    }

    public void setFoo(@javax.annotation.Nullable final software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule value) {
        this.jsiiSet("foo", value);
    }
}
