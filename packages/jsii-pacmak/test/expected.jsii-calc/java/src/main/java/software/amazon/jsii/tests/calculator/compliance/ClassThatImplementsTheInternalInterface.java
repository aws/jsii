package software.amazon.jsii.tests.calculator.compliance;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.ClassThatImplementsTheInternalInterface")
public class ClassThatImplementsTheInternalInterface extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.compliance.INonInternalInterface {

    protected ClassThatImplementsTheInternalInterface(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ClassThatImplementsTheInternalInterface(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public ClassThatImplementsTheInternalInterface() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getA() {
        return this.jsiiGet("a", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setA(final @org.jetbrains.annotations.NotNull java.lang.String value) {
        this.jsiiSet("a", java.util.Objects.requireNonNull(value, "a is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getB() {
        return this.jsiiGet("b", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setB(final @org.jetbrains.annotations.NotNull java.lang.String value) {
        this.jsiiSet("b", java.util.Objects.requireNonNull(value, "b is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getC() {
        return this.jsiiGet("c", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setC(final @org.jetbrains.annotations.NotNull java.lang.String value) {
        this.jsiiSet("c", java.util.Objects.requireNonNull(value, "c is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getD() {
        return this.jsiiGet("d", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setD(final @org.jetbrains.annotations.NotNull java.lang.String value) {
        this.jsiiSet("d", java.util.Objects.requireNonNull(value, "d is required"));
    }
}
