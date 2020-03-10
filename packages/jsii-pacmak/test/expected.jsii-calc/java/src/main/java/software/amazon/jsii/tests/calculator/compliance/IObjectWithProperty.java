package software.amazon.jsii.tests.calculator.compliance;

/**
 * Make sure that setters are properly called on objects with interfaces.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.IObjectWithProperty")
@software.amazon.jsii.Jsii.Proxy(IObjectWithProperty.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IObjectWithProperty extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.String getProperty();

    /**
     * EXPERIMENTAL
     */
    void setProperty(final @org.jetbrains.annotations.NotNull java.lang.String value);

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.Boolean wasSet();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.compliance.IObjectWithProperty {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public @org.jetbrains.annotations.NotNull java.lang.String getProperty() {
            return this.jsiiGet("property", java.lang.String.class);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public void setProperty(final @org.jetbrains.annotations.NotNull java.lang.String value) {
            this.jsiiSet("property", java.util.Objects.requireNonNull(value, "property is required"));
        }

        /**
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public @org.jetbrains.annotations.NotNull java.lang.Boolean wasSet() {
            return this.jsiiCall("wasSet", java.lang.Boolean.class);
        }
    }
}
