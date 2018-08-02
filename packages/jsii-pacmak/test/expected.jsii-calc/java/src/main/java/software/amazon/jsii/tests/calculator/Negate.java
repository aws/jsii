package software.amazon.jsii.tests.calculator;
/**
 * The negation operation ("-value")
 */
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Negate")
public class Negate extends software.amazon.jsii.tests.calculator.UnaryOperation implements software.amazon.jsii.tests.calculator.IFriendlier {
    protected Negate(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public Negate(final software.amazon.jsii.tests.calculator.lib.Value operand) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(java.util.Objects.requireNonNull(operand, "operand is required")).toArray());
    }
    /**
     * String representation of the value.
     */
    public java.lang.String toString() {
        return this.jsiiCall("toString", java.lang.String.class);
    }
    /**
     * Say hello!
     */
    public java.lang.String hello() {
        return this.jsiiCall("hello", java.lang.String.class);
    }
    /**
     * Say goodbye.
     */
    public java.lang.String goodbye() {
        return this.jsiiCall("goodbye", java.lang.String.class);
    }
    /**
     * Say farewell.
     */
    public java.lang.String farewell() {
        return this.jsiiCall("farewell", java.lang.String.class);
    }
    /**
     * The value.
     */
    public java.lang.Number getValue() {
        return this.jsiiGet("value", java.lang.Number.class);
    }
}
