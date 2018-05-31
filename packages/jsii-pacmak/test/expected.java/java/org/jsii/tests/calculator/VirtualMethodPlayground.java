package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii$jsii_calc$.VirtualMethodPlayground")
public class VirtualMethodPlayground extends org.jsii.JsiiObject {
    protected VirtualMethodPlayground(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public VirtualMethodPlayground() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public java.lang.Number serialSumAsync(final java.lang.Number count) {
        return this.jsiiAsyncCall("serialSumAsync", java.lang.Number.class, java.util.stream.Stream.of(count).toArray());
    }
    public java.lang.Number parallelSumAsync(final java.lang.Number count) {
        return this.jsiiAsyncCall("parallelSumAsync", java.lang.Number.class, java.util.stream.Stream.of(count).toArray());
    }
    public java.lang.Number sumSync(final java.lang.Number count) {
        return this.jsiiCall("sumSync", java.lang.Number.class, java.util.stream.Stream.of(count).toArray());
    }
    public java.lang.Number overrideMeAsync(final java.lang.Number index) {
        return this.jsiiAsyncCall("overrideMeAsync", java.lang.Number.class, java.util.stream.Stream.of(index).toArray());
    }
    public java.lang.Number overrideMeSync(final java.lang.Number index) {
        return this.jsiiCall("overrideMeSync", java.lang.Number.class, java.util.stream.Stream.of(index).toArray());
    }
}
