package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ClassWithMutableObjectLiteralProperty")
public class ClassWithMutableObjectLiteralProperty extends software.amazon.jsii.JsiiObject {

    protected ClassWithMutableObjectLiteralProperty(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ClassWithMutableObjectLiteralProperty(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public ClassWithMutableObjectLiteralProperty() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IMutableObjectLiteral getMutableObject() {
        return this.jsiiGet("mutableObject", software.amazon.jsii.tests.calculator.IMutableObjectLiteral.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setMutableObject(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IMutableObjectLiteral value) {
        this.jsiiSet("mutableObject", java.util.Objects.requireNonNull(value, "mutableObject is required"));
    }
}
