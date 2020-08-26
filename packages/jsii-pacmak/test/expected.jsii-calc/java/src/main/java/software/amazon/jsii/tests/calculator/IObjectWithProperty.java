package software.amazon.jsii.tests.calculator;

/**
 * Make sure that setters are properly called on objects with interfaces.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IObjectWithProperty")
@software.amazon.jsii.Jsii.Proxy(IObjectWithProperty.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface IObjectWithProperty extends software.amazon.jsii.JsiiSerializable {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @org.jetbrains.annotations.NotNull java.lang.String getProperty();

    /**
     */
    void setProperty(final @org.jetbrains.annotations.NotNull java.lang.String value);

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @org.jetbrains.annotations.NotNull java.lang.Boolean wasSet();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IObjectWithProperty {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public @org.jetbrains.annotations.NotNull java.lang.String getProperty() {
            return this.jsiiGet("property", java.lang.String.class);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public void setProperty(final @org.jetbrains.annotations.NotNull java.lang.String value) {
            this.jsiiSet("property", java.util.Objects.requireNonNull(value, "property is required"));
        }

        /**
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public @org.jetbrains.annotations.NotNull java.lang.Boolean wasSet() {
            return this.jsiiCall("wasSet", java.lang.Boolean.class);
        }
    }
}
