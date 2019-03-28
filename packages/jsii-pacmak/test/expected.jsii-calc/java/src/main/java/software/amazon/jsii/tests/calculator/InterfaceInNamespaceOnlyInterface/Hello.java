package software.amazon.jsii.tests.calculator.InterfaceInNamespaceOnlyInterface;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface Hello extends software.amazon.jsii.JsiiSerializable {
    java.lang.Number getFoo();

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
                private final java.lang.Number $foo = java.util.Objects.requireNonNull(_foo, "foo is required");

                @Override
                public java.lang.Number getFoo() {
                    return this.$foo;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    obj.set("foo", om.valueToTree(this.getFoo()));
                    return obj;
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
    }
}
