package software.amazon.jsii.tests.calculator.submodule.nested_submodule;

/**
 *  (experimental)
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.submodule.nested_submodule.Namespaced")
public abstract class Namespaced extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.submodule.nested_submodule.deeply_nested.INamespaced {

    protected Namespaced(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Namespaced(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getDefinedAt() {
        return this.jsiiGet("definedAt", java.lang.String.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public abstract @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.submodule.child.Goodness getGoodness();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.submodule.nested_submodule.Namespaced {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         *  (experimental)
         * <p>
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.submodule.child.Goodness getGoodness() {
            return this.jsiiGet("goodness", software.amazon.jsii.tests.calculator.submodule.child.Goodness.class);
        }

        /**
         *  (experimental)
         * <p>
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public @org.jetbrains.annotations.NotNull java.lang.String getDefinedAt() {
            return this.jsiiGet("definedAt", java.lang.String.class);
        }
    }
}
