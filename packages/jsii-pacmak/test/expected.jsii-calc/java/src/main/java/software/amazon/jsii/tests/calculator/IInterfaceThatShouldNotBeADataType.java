package software.amazon.jsii.tests.calculator;

/**
 * Even though this interface has only properties, it is disqualified from being a datatype because it inherits from an interface that is not a datatype.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
public interface IInterfaceThatShouldNotBeADataType extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.IInterfaceWithMethods {
    java.lang.String getOtherValue();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IInterfaceThatShouldNotBeADataType {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String getOtherValue() {
            return this.jsiiGet("otherValue", java.lang.String.class);
        }

        @Override
        public java.lang.String getValue() {
            return this.jsiiGet("value", java.lang.String.class);
        }

        @Override
        public void doThings() {
            this.jsiiCall("doThings", Void.class);
        }
    }
}
