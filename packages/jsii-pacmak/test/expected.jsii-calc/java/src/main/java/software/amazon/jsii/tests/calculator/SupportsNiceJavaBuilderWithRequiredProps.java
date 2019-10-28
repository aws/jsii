package software.amazon.jsii.tests.calculator;

/**
 * We can generate fancy builders in Java for classes which take a mix of positional & struct parameters.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.SupportsNiceJavaBuilderWithRequiredProps")
public class SupportsNiceJavaBuilderWithRequiredProps extends software.amazon.jsii.JsiiObject {

    protected SupportsNiceJavaBuilderWithRequiredProps(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected SupportsNiceJavaBuilderWithRequiredProps(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * 
     * @param id This parameter is required.
     * @param props This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected SupportsNiceJavaBuilderWithRequiredProps(final java.lang.Number id, final software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps props) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(id, "id is required"), java.util.Objects.requireNonNull(props, "props is required") }));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number getBar() {
        return this.jsiiGet("bar", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number getId() {
        return this.jsiiGet("id", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getPropId() {
        return this.jsiiGet("propId", java.lang.String.class);
    }
}
