package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IExtendsPrivateInterface")
@software.amazon.jsii.Jsii.Proxy(IExtendsPrivateInterface.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface IExtendsPrivateInterface extends software.amazon.jsii.JsiiSerializable {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @org.jetbrains.annotations.NotNull java.util.List<java.lang.String> getMoreThings();

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @org.jetbrains.annotations.NotNull java.lang.String getPrivateValue();

    /**
     */
    void setPrivateValue(final @org.jetbrains.annotations.NotNull java.lang.String value);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IExtendsPrivateInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public @org.jetbrains.annotations.NotNull java.util.List<java.lang.String> getMoreThings() {
            return java.util.Collections.unmodifiableList(this.jsiiGet("moreThings", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class))));
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public @org.jetbrains.annotations.NotNull java.lang.String getPrivateValue() {
            return this.jsiiGet("private", java.lang.String.class);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public void setPrivateValue(final @org.jetbrains.annotations.NotNull java.lang.String value) {
            this.jsiiSet("private", java.util.Objects.requireNonNull(value, "private is required"));
        }
    }
}
