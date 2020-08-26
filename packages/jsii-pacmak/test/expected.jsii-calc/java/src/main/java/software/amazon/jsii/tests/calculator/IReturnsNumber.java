package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IReturnsNumber")
@software.amazon.jsii.Jsii.Proxy(IReturnsNumber.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface IReturnsNumber extends software.amazon.jsii.JsiiSerializable {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Number getNumberProp();

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.IDoublable obtainNumber();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IReturnsNumber {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Number getNumberProp() {
            return this.jsiiGet("numberProp", software.amazon.jsii.tests.calculator.lib.Number.class);
        }

        /**
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.IDoublable obtainNumber() {
            return this.jsiiCall("obtainNumber", software.amazon.jsii.tests.calculator.lib.IDoublable.class);
        }
    }
}
