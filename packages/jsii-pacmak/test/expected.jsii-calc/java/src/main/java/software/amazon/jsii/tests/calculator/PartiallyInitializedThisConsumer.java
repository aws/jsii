package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.PartiallyInitializedThisConsumer")
public abstract class PartiallyInitializedThisConsumer extends software.amazon.jsii.JsiiObject {

    protected PartiallyInitializedThisConsumer(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected PartiallyInitializedThisConsumer(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    protected PartiallyInitializedThisConsumer() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public abstract java.lang.String consumePartiallyInitializedThis(final software.amazon.jsii.tests.calculator.ConstructorPassesThisOut obj, final java.time.Instant dt, final software.amazon.jsii.tests.calculator.AllTypesEnum ev);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.PartiallyInitializedThisConsumer {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public java.lang.String consumePartiallyInitializedThis(final software.amazon.jsii.tests.calculator.ConstructorPassesThisOut obj, final java.time.Instant dt, final software.amazon.jsii.tests.calculator.AllTypesEnum ev) {
            return this.jsiiCall("consumePartiallyInitializedThis", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(obj, "obj is required"), java.util.Objects.requireNonNull(dt, "dt is required"), java.util.Objects.requireNonNull(ev, "ev is required") });
        }
    }
}
