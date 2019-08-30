package software.amazon.jsii.tests.calculator;

/**
 * This allows us to test that a reference can be stored for objects that implement interfaces.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.NumberGenerator")
public class NumberGenerator extends software.amazon.jsii.JsiiObject {

    protected NumberGenerator(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected NumberGenerator(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public NumberGenerator(final software.amazon.jsii.tests.calculator.IRandomNumberGenerator generator) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(generator, "generator is required") }));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Boolean isSameGenerator(final software.amazon.jsii.tests.calculator.IRandomNumberGenerator gen) {
        return this.jsiiCall("isSameGenerator", java.lang.Boolean.class, new Object[] { java.util.Objects.requireNonNull(gen, "gen is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number nextTimes100() {
        return this.jsiiCall("nextTimes100", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.IRandomNumberGenerator getGenerator() {
        return this.jsiiGet("generator", software.amazon.jsii.tests.calculator.IRandomNumberGenerator.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setGenerator(final software.amazon.jsii.tests.calculator.IRandomNumberGenerator value) {
        this.jsiiSet("generator", java.util.Objects.requireNonNull(value, "generator is required"));
    }
}
