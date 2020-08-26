package software.amazon.jsii.tests.calculator;

/**
 * Even though this interface has only properties, it is disqualified from being a datatype because it inherits from an interface that is not a datatype.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IInterfaceThatShouldNotBeADataType")
@software.amazon.jsii.Jsii.Proxy(IInterfaceThatShouldNotBeADataType.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface IInterfaceThatShouldNotBeADataType extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.IInterfaceWithMethods {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @org.jetbrains.annotations.NotNull java.lang.String getOtherValue();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IInterfaceThatShouldNotBeADataType {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public @org.jetbrains.annotations.NotNull java.lang.String getOtherValue() {
            return this.jsiiGet("otherValue", java.lang.String.class);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public @org.jetbrains.annotations.NotNull java.lang.String getValue() {
            return this.jsiiGet("value", java.lang.String.class);
        }

        /**
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public void doThings() {
            this.jsiiCall("doThings", software.amazon.jsii.NativeType.VOID);
        }
    }
}
