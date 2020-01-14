package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IReturnsNumber")
@software.amazon.jsii.Jsii.Proxy(IReturnsNumber.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IReturnsNumber extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    software.amazon.jsii.tests.calculator.lib.Number getNumberProp();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    software.amazon.jsii.tests.calculator.lib.IDoublable obtainNumber();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IReturnsNumber {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public software.amazon.jsii.tests.calculator.lib.Number getNumberProp() {
            return this.jsiiGet("numberProp", software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.lib.Number.class));
        }

        /**
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public software.amazon.jsii.tests.calculator.lib.IDoublable obtainNumber() {
            return this.jsiiCall("obtainNumber", software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.lib.IDoublable.class));
        }
    }
}
