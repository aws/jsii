package software.amazon.jsii.tests.calculator;

/**
 * This test is used to validate the runtimes can return correctly from a void callback.
 * 
 * - Implement `overrideMe` (method does not have to do anything).
 * - Invoke `callMe`
 * - Verify that `methodWasCalled` is `true`.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.VoidCallback")
public abstract class VoidCallback extends software.amazon.jsii.JsiiObject {
    protected VoidCallback(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public VoidCallback() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public void callMe() {
        this.jsiiCall("callMe", Void.class);
    }

    protected abstract void overrideMe();

    public java.lang.Boolean getMethodWasCalled() {
        return this.jsiiGet("methodWasCalled", java.lang.Boolean.class);
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.VoidCallback {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        protected void overrideMe() {
            this.jsiiCall("overrideMe", Void.class);
        }
    }
}
