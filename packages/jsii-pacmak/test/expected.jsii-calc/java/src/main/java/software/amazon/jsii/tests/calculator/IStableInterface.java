package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface IStableInterface extends software.amazon.jsii.JsiiSerializable {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    default java.lang.Number getMutableProperty() {
        return null;
    }

    /**
     */
    default void setMutableProperty(final java.lang.Number value) {
        throw new RuntimeException("'void " + getClass().getCanonicalName() + "#setMutableProperty(java.lang.Number)' is not implemented!");
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    void method();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IStableInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public java.lang.Number getMutableProperty() {
            return this.jsiiGet("mutableProperty", java.lang.Number.class);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public void setMutableProperty(final java.lang.Number value) {
            this.jsiiSet("mutableProperty", value);
        }

        /**
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public void method() {
            this.jsiiCall("method", Void.class);
        }
    }
}
