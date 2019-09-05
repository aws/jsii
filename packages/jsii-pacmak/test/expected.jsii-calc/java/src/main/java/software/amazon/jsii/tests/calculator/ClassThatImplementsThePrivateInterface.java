package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ClassThatImplementsThePrivateInterface")
public class ClassThatImplementsThePrivateInterface extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.INonInternalInterface {

    protected ClassThatImplementsThePrivateInterface(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ClassThatImplementsThePrivateInterface(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public ClassThatImplementsThePrivateInterface() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getA() {
        return this.jsiiGet("a", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setA(final java.lang.String value) {
        this.jsiiSet("a", java.util.Objects.requireNonNull(value, "a is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getB() {
        return this.jsiiGet("b", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setB(final java.lang.String value) {
        this.jsiiSet("b", java.util.Objects.requireNonNull(value, "b is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getC() {
        return this.jsiiGet("c", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setC(final java.lang.String value) {
        this.jsiiSet("c", java.util.Objects.requireNonNull(value, "c is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getE() {
        return this.jsiiGet("e", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setE(final java.lang.String value) {
        this.jsiiSet("e", java.util.Objects.requireNonNull(value, "e is required"));
    }
}
