package software.amazon.jsii.tests.calculator.InterfaceInNamespaceOnlyInterface;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface Hello extends software.amazon.jsii.JsiiSerializable {
    java.lang.Number getFoo();
    void setFoo(final java.lang.Number value);

    /**
     * @return a {@link Builder} of {@link Hello}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link Hello}
     */
    final class Builder {
        private java.lang.Number _foo;

        /**
         * Sets the value of Foo
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withFoo(final java.lang.Number value) {
            this._foo = java.util.Objects.requireNonNull(value, "foo is required");
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link Hello}
         * @throws NullPointerException if any required attribute was not provided
         */
        public Hello build() {
            return new Hello() {
                private java.lang.Number $foo = java.util.Objects.requireNonNull(_foo, "foo is required");

                @Override
                public java.lang.Number getFoo() {
                    return this.$foo;
                }

                @Override
                public void setFoo(final java.lang.Number value) {
                    this.$foo = java.util.Objects.requireNonNull(value, "foo is required");
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.InterfaceInNamespaceOnlyInterface.Hello {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.Number getFoo() {
            return this.jsiiGet("foo", java.lang.Number.class);
        }

        @Override
        public void setFoo(final java.lang.Number value) {
            this.jsiiSet("foo", java.util.Objects.requireNonNull(value, "foo is required"));
        }
    }
}
