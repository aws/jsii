package software.amazon.jsii.tests.calculator.compliance;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.ConsumePureInterface")
public class ConsumePureInterface extends software.amazon.jsii.JsiiObject {

    protected ConsumePureInterface(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ConsumePureInterface(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param delegate This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public ConsumePureInterface(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.IStructReturningDelegate delegate) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(delegate, "delegate is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.StructB workItBaby() {
        return this.jsiiCall("workItBaby", software.amazon.jsii.tests.calculator.compliance.StructB.class);
    }
}
