package software.amazon.jsii.tests.calculator;

/**
 * Checks the "same instance" isomorphism is preserved within the constructor.
 * <p>
 * Create a subclass of this, and assert that <code>this.myself()</code> actually returns
 * <code>this</code> from within the constructor.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Isomorphism")
public abstract class Isomorphism extends software.amazon.jsii.JsiiObject {

    protected Isomorphism(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Isomorphism(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    protected Isomorphism() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.Isomorphism myself() {
        return this.jsiiCall("myself", software.amazon.jsii.tests.calculator.Isomorphism.class);
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.Isomorphism {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }
    }
}
