package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DontComplainAboutVariadicAfterOptional")
public class DontComplainAboutVariadicAfterOptional extends software.amazon.jsii.JsiiObject {

    protected DontComplainAboutVariadicAfterOptional(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected DontComplainAboutVariadicAfterOptional(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public DontComplainAboutVariadicAfterOptional() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String optionalAndVariadic(final java.lang.String optional, final java.lang.String... things) {
        return this.jsiiCall("optionalAndVariadic", java.lang.String.class, java.util.stream.Stream.concat(java.util.Arrays.<Object>stream(new Object[] { optional }), java.util.Arrays.<Object>stream(things)).toArray(Object[]::new));
    }
}
