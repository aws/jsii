package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii$jsii_calc$.AsyncVirtualMethods")
public class AsyncVirtualMethods extends org.jsii.JsiiObject {
    protected AsyncVirtualMethods(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public AsyncVirtualMethods() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public java.lang.Number callMe() {
        return this.jsiiAsyncCall("callMe", java.lang.Number.class);
    }
    public java.lang.Number overrideMe(final java.lang.Number mult) {
        return this.jsiiAsyncCall("overrideMe", java.lang.Number.class, java.util.stream.Stream.of(mult).toArray());
    }
    public java.lang.Number overrideMeToo() {
        return this.jsiiAsyncCall("overrideMeToo", java.lang.Number.class);
    }
    /**
     * Just calls "overrideMeToo"
     */
    public java.lang.Number callMe2() {
        return this.jsiiAsyncCall("callMe2", java.lang.Number.class);
    }
    /**
     * This method calls the "callMe" async method indirectly, which will then
     * invoke a virtual method. This is a "double promise" situation, which
     * means that callbacks are not going to be available immediate, but only
     * after an "immediates" cycle.
     */
    public java.lang.Number callMeDoublePromise() {
        return this.jsiiAsyncCall("callMeDoublePromise", java.lang.Number.class);
    }
    public java.lang.Number dontOverrideMe() {
        return this.jsiiCall("dontOverrideMe", java.lang.Number.class);
    }
}
