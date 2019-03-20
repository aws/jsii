package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.PartiallyInitializedThisConsumer")
public abstract class PartiallyInitializedThisConsumer extends software.amazon.jsii.JsiiObject {
    protected PartiallyInitializedThisConsumer(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public PartiallyInitializedThisConsumer() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public abstract java.lang.String consumePartiallyInitializedThis(final software.amazon.jsii.tests.calculator.ConstructorPassesThisOut obj);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.PartiallyInitializedThisConsumer {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String consumePartiallyInitializedThis(final software.amazon.jsii.tests.calculator.ConstructorPassesThisOut obj) {
            return this.jsiiCall("consumePartiallyInitializedThis", java.lang.String.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(obj, "obj is required")).toArray());
        }
    }
}
