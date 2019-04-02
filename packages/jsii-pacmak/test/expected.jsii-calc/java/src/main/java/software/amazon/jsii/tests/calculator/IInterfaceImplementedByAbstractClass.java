package software.amazon.jsii.tests.calculator;

/**
 * awslabs/jsii#220
 * Abstract return type
 */
@javax.annotation.Generated(value = "jsii-pacmak")
public interface IInterfaceImplementedByAbstractClass extends software.amazon.jsii.JsiiSerializable {
    java.lang.String getPropFromInterface();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IInterfaceImplementedByAbstractClass {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String getPropFromInterface() {
            return this.jsiiGet("propFromInterface", java.lang.String.class);
        }
    }
}
