package software.amazon.jsii.tests.calculator.lib;

/**
 * The general contract for a concrete number.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.lib.$Module.class, fqn = "@scope/jsii-calc-lib.IDoublable")
@software.amazon.jsii.Jsii.Proxy(IDoublable.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@Deprecated
public interface IDoublable extends software.amazon.jsii.JsiiSerializable {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    @org.jetbrains.annotations.NotNull java.lang.Number getDoubleValue();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.lib.IDoublable {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        public @org.jetbrains.annotations.NotNull java.lang.Number getDoubleValue() {
            return this.jsiiGet("doubleValue", java.lang.Number.class);
        }
    }
}
