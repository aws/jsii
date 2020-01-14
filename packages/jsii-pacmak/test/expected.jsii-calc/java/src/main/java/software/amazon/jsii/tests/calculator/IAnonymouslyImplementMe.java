package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IAnonymouslyImplementMe")
@software.amazon.jsii.Jsii.Proxy(IAnonymouslyImplementMe.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IAnonymouslyImplementMe extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Number getValue();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String verb();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IAnonymouslyImplementMe {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public java.lang.Number getValue() {
            return this.jsiiGet("value", software.amazon.jsii.NativeType.forClass(java.lang.Number.class));
        }

        /**
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public java.lang.String verb() {
            return this.jsiiCall("verb", software.amazon.jsii.NativeType.forClass(java.lang.String.class));
        }
    }
}
