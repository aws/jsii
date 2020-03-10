package software.amazon.jsii.tests.calculator.compliance;

/**
 * awslabs/jsii#220 Abstract return type.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.IInterfaceImplementedByAbstractClass")
@software.amazon.jsii.Jsii.Proxy(IInterfaceImplementedByAbstractClass.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IInterfaceImplementedByAbstractClass extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.String getPropFromInterface();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.compliance.IInterfaceImplementedByAbstractClass {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public @org.jetbrains.annotations.NotNull java.lang.String getPropFromInterface() {
            return this.jsiiGet("propFromInterface", java.lang.String.class);
        }
    }
}
