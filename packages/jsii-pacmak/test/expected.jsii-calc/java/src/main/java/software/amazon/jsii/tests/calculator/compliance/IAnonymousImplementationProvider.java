package software.amazon.jsii.tests.calculator.compliance;

/**
 * We can return an anonymous interface implementation from an override without losing the interface declarations.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.IAnonymousImplementationProvider")
@software.amazon.jsii.Jsii.Proxy(IAnonymousImplementationProvider.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IAnonymousImplementationProvider extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.Implementation provideAsClass();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.IAnonymouslyImplementMe provideAsInterface();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.compliance.IAnonymousImplementationProvider {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.Implementation provideAsClass() {
            return this.jsiiCall("provideAsClass", software.amazon.jsii.tests.calculator.compliance.Implementation.class);
        }

        /**
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.IAnonymouslyImplementMe provideAsInterface() {
            return this.jsiiCall("provideAsInterface", software.amazon.jsii.tests.calculator.compliance.IAnonymouslyImplementMe.class);
        }
    }
}
