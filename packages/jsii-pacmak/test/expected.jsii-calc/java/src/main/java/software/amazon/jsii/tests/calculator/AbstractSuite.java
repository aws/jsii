package software.amazon.jsii.tests.calculator;

/**
 * Ensures abstract members implementations correctly register overrides in various languages.
 * 
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

    protected AbstractSuite() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     * 
     * @param str This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected abstract java.lang.String someMethod(final java.lang.String str);

    /**
     * Sets `seed` to `this.property`, then calls `someMethod` with `this.property` and returns the result.
     * 
     * EXPERIMENTAL
     * 
     * @param seed a `string`. This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String workItAll(final java.lang.String seed) {
        return this.jsiiCall("workItAll", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(seed, "seed is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected abstract java.lang.String getProperty();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected abstract void setProperty(final java.lang.String value);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.AbstractSuite {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        protected java.lang.String getProperty() {
            return this.jsiiGet("property", java.lang.String.class);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        protected void setProperty(final java.lang.String value) {
            this.jsiiSet("property", java.util.Objects.requireNonNull(value, "property is required"));
        }

        /**
         * EXPERIMENTAL
         * 
         * @param str This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        protected java.lang.String someMethod(final java.lang.String str) {
            return this.jsiiCall("someMethod", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(str, "str is required") });
        }
    }
}
