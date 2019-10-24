package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ClassWithMutableObjectLiteralProperty")
public class ClassWithMutableObjectLiteralProperty extends software.amazon.jsii.JsiiObject {

    protected ClassWithMutableObjectLiteralProperty(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ClassWithMutableObjectLiteralProperty(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public ClassWithMutableObjectLiteralProperty() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.IMutableObjectLiteral getMutableObject() {
        return this.jsiiGet("mutableObject", software.amazon.jsii.tests.calculator.IMutableObjectLiteral.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setMutableObject(final software.amazon.jsii.tests.calculator.IMutableObjectLiteral value) {
        this.jsiiSet("mutableObject", java.util.Objects.requireNonNull(value, "mutableObject is required"));
    }
}
