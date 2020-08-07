package software.amazon.jsii.tests.calculator;

/**
 *  (experimental)
 * <p>
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

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public AllowedMethodNames() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param _p1 This parameter is required.
     * @param _p2 This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void getBar(final @org.jetbrains.annotations.NotNull java.lang.String _p1, final @org.jetbrains.annotations.NotNull java.lang.Number _p2) {
        this.jsiiCall("getBar", software.amazon.jsii.NativeType.VOID, new Object[] { java.util.Objects.requireNonNull(_p1, "_p1 is required"), java.util.Objects.requireNonNull(_p2, "_p2 is required") });
    }

    /**
     * getXxx() is not allowed (see negatives), but getXxx(a, ...) is okay. (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param withParam This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getFoo(final @org.jetbrains.annotations.NotNull java.lang.String withParam) {
        return this.jsiiCall("getFoo", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(withParam, "withParam is required") });
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param _x This parameter is required.
     * @param _y This parameter is required.
     * @param _z This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setBar(final @org.jetbrains.annotations.NotNull java.lang.String _x, final @org.jetbrains.annotations.NotNull java.lang.Number _y, final @org.jetbrains.annotations.NotNull java.lang.Boolean _z) {
        this.jsiiCall("setBar", software.amazon.jsii.NativeType.VOID, new Object[] { java.util.Objects.requireNonNull(_x, "_x is required"), java.util.Objects.requireNonNull(_y, "_y is required"), java.util.Objects.requireNonNull(_z, "_z is required") });
    }

    /**
     * setFoo(x) is not allowed (see negatives), but setXxx(a, b, ...) is okay. (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param _x This parameter is required.
     * @param _y This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setFoo(final @org.jetbrains.annotations.NotNull java.lang.String _x, final @org.jetbrains.annotations.NotNull java.lang.Number _y) {
        this.jsiiCall("setFoo", software.amazon.jsii.NativeType.VOID, new Object[] { java.util.Objects.requireNonNull(_x, "_x is required"), java.util.Objects.requireNonNull(_y, "_y is required") });
    }
}
