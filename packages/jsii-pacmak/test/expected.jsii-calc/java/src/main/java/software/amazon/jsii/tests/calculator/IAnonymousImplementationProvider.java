package software.amazon.jsii.tests.calculator;

/**
 * We can return an anonymous interface implementation from an override without losing the interface declarations.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IAnonymousImplementationProvider")
@software.amazon.jsii.Jsii.Proxy(IAnonymousImplementationProvider.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface IAnonymousImplementationProvider extends software.amazon.jsii.JsiiSerializable {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.Implementation provideAsClass();

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IAnonymouslyImplementMe provideAsInterface();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IAnonymousImplementationProvider {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.Implementation provideAsClass() {
            return this.jsiiCall("provideAsClass", software.amazon.jsii.tests.calculator.Implementation.class);
        }

        /**
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IAnonymouslyImplementMe provideAsInterface() {
            return this.jsiiCall("provideAsInterface", software.amazon.jsii.tests.calculator.IAnonymouslyImplementMe.class);
        }
    }
}
