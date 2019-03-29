package software.amazon.jsii.tests.calculator;

/**
 * This allows us to test that a reference can be stored for objects that implement interfaces.
 * 
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.NumberGenerator")
public class NumberGenerator extends software.amazon.jsii.JsiiObject {
    protected NumberGenerator(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public NumberGenerator(final software.amazon.jsii.tests.calculator.IRandomNumberGenerator generator) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(java.util.Objects.requireNonNull(generator, "generator is required")).toArray());
    }

    public java.lang.Boolean isSameGenerator(final software.amazon.jsii.tests.calculator.IRandomNumberGenerator gen) {
        return this.jsiiCall("isSameGenerator", java.lang.Boolean.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(gen, "gen is required")).toArray());
    }

    public java.lang.Number nextTimes100() {
        return this.jsiiCall("nextTimes100", java.lang.Number.class);
    }

    public software.amazon.jsii.tests.calculator.IRandomNumberGenerator getGenerator() {
        return this.jsiiGet("generator", software.amazon.jsii.tests.calculator.IRandomNumberGenerator.class);
    }

    public void setGenerator(final software.amazon.jsii.tests.calculator.IRandomNumberGenerator value) {
        this.jsiiSet("generator", java.util.Objects.requireNonNull(value, "generator is required"));
    }
}
