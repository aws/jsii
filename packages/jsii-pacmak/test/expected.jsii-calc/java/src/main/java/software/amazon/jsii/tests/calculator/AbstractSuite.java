package software.amazon.jsii.tests.calculator;

/**
 * Ensures abstract members implementations correctly register overrides in various languages. (experimental)
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AbstractSuite")
public abstract class AbstractSuite extends software.amazon.jsii.JsiiObject {

    protected AbstractSuite(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected AbstractSuite(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected AbstractSuite() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param str This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected abstract @org.jetbrains.annotations.NotNull java.lang.String someMethod(final @org.jetbrains.annotations.NotNull java.lang.String str);

    /**
     * Sets `seed` to `this.property`, then calls `someMethod` with `this.property` and returns the result. (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param seed a `string`. This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String workItAll(final @org.jetbrains.annotations.NotNull java.lang.String seed) {
        return this.jsiiCall("workItAll", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(seed, "seed is required") });
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected abstract @org.jetbrains.annotations.NotNull java.lang.String getProperty();

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected abstract void setProperty(final @org.jetbrains.annotations.NotNull java.lang.String value);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.AbstractSuite {
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
        protected @org.jetbrains.annotations.NotNull java.lang.String getProperty() {
            return this.jsiiGet("property", java.lang.String.class);
        }

        /**
         *  (experimental)
         * <p>
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        protected void setProperty(final @org.jetbrains.annotations.NotNull java.lang.String value) {
            this.jsiiSet("property", java.util.Objects.requireNonNull(value, "property is required"));
        }

        /**
         *  (experimental)
         * <p>
         * EXPERIMENTAL
         * <p>
         * @param str This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        protected @org.jetbrains.annotations.NotNull java.lang.String someMethod(final @org.jetbrains.annotations.NotNull java.lang.String str) {
            return this.jsiiCall("someMethod", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(str, "str is required") });
        }
    }
}
