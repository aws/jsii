package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AllowedMethodNames")
public class AllowedMethodNames extends software.amazon.jsii.JsiiObject {
    protected AllowedMethodNames(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public AllowedMethodNames() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public void getBar(final java.lang.String _p1, final java.lang.Number _p2) {
        this.jsiiCall("getBar", Void.class, java.util.stream.Stream.concat(java.util.stream.Stream.of(java.util.Objects.requireNonNull(_p1, "_p1 is required")), java.util.stream.Stream.of(java.util.Objects.requireNonNull(_p2, "_p2 is required"))).toArray());
    }
    /**
     * getXxx() is not allowed (see negatives), but getXxx(a, ...) is okay.
     */
    public java.lang.String getFoo(final java.lang.String withParam) {
        return this.jsiiCall("getFoo", java.lang.String.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(withParam, "withParam is required")).toArray());
    }
    public void setBar(final java.lang.String _x, final java.lang.Number _y, final java.lang.Boolean _z) {
        this.jsiiCall("setBar", Void.class, java.util.stream.Stream.concat(java.util.stream.Stream.concat(java.util.stream.Stream.of(java.util.Objects.requireNonNull(_x, "_x is required")), java.util.stream.Stream.of(java.util.Objects.requireNonNull(_y, "_y is required"))), java.util.stream.Stream.of(java.util.Objects.requireNonNull(_z, "_z is required"))).toArray());
    }
    /**
     * setFoo(x) is not allowed (see negatives), but setXxx(a, b, ...) is okay.
     */
    public void setFoo(final java.lang.String _x, final java.lang.Number _y) {
        this.jsiiCall("setFoo", Void.class, java.util.stream.Stream.concat(java.util.stream.Stream.of(java.util.Objects.requireNonNull(_x, "_x is required")), java.util.stream.Stream.of(java.util.Objects.requireNonNull(_y, "_y is required"))).toArray());
    }
}
