package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AllowedMethodNames")
public class AllowedMethodNames extends software.amazon.jsii.JsiiObject {

    protected AllowedMethodNames(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected AllowedMethodNames(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public AllowedMethodNames() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void getBar(final java.lang.String _p1, final java.lang.Number _p2) {
        this.jsiiCall("getBar", Void.class, new Object[] { java.util.Objects.requireNonNull(_p1, "_p1 is required"), java.util.Objects.requireNonNull(_p2, "_p2 is required") });
    }

    /**
     * getXxx() is not allowed (see negatives), but getXxx(a, ...) is okay.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getFoo(final java.lang.String withParam) {
        return this.jsiiCall("getFoo", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(withParam, "withParam is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setBar(final java.lang.String _x, final java.lang.Number _y, final java.lang.Boolean _z) {
        this.jsiiCall("setBar", Void.class, new Object[] { java.util.Objects.requireNonNull(_x, "_x is required"), java.util.Objects.requireNonNull(_y, "_y is required"), java.util.Objects.requireNonNull(_z, "_z is required") });
    }

    /**
     * setFoo(x) is not allowed (see negatives), but setXxx(a, b, ...) is okay.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setFoo(final java.lang.String _x, final java.lang.Number _y) {
        this.jsiiCall("setFoo", Void.class, new Object[] { java.util.Objects.requireNonNull(_x, "_x is required"), java.util.Objects.requireNonNull(_y, "_y is required") });
    }
}
