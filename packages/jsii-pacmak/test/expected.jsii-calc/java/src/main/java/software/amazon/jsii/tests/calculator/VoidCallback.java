package software.amazon.jsii.tests.calculator;

/**
 * This test is used to validate the runtimes can return correctly from a void callback.
 * <p>
 * <ul>
 * <li>Implement <code>overrideMe</code> (method does not have to do anything).</li>
 * <li>Invoke <code>callMe</code></li>
 * <li>Verify that <code>methodWasCalled</code> is <code>true</code>.</li>
 * </ul>
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.VoidCallback")
public abstract class VoidCallback extends software.amazon.jsii.JsiiObject {

    protected VoidCallback(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected VoidCallback(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected VoidCallback() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void callMe() {
        this.jsiiCall("callMe", software.amazon.jsii.NativeType.VOID);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected abstract void overrideMe();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Boolean getMethodWasCalled() {
        return this.jsiiGet("methodWasCalled", java.lang.Boolean.class);
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.VoidCallback {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        protected void overrideMe() {
            this.jsiiCall("overrideMe", software.amazon.jsii.NativeType.VOID);
        }
    }
}
