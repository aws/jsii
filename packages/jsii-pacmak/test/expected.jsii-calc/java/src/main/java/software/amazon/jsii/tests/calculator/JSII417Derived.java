package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.JSII417Derived")
public class JSII417Derived extends software.amazon.jsii.tests.calculator.JSII417PublicBaseOfBase {

    protected JSII417Derived(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected JSII417Derived(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param property This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public JSII417Derived(final @org.jetbrains.annotations.NotNull java.lang.String property) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(property, "property is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void bar() {
        this.jsiiCall("bar", software.amazon.jsii.NativeType.VOID);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void baz() {
        this.jsiiCall("baz", software.amazon.jsii.NativeType.VOID);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected @org.jetbrains.annotations.NotNull java.lang.String getProperty() {
        return this.jsiiGet("property", java.lang.String.class);
    }
}
