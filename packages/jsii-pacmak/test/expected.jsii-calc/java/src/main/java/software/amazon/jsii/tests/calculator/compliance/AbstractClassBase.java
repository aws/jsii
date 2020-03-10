package software.amazon.jsii.tests.calculator.compliance;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.AbstractClassBase")
public abstract class AbstractClassBase extends software.amazon.jsii.JsiiObject {

    protected AbstractClassBase(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected AbstractClassBase(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    protected AbstractClassBase() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public abstract @org.jetbrains.annotations.NotNull java.lang.String getAbstractProperty();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.compliance.AbstractClassBase {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public @org.jetbrains.annotations.NotNull java.lang.String getAbstractProperty() {
            return this.jsiiGet("abstractProperty", java.lang.String.class);
        }
    }
}
