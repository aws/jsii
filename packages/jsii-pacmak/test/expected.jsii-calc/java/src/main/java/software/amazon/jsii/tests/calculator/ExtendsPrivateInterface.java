package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface ExtendsPrivateInterface extends software.amazon.jsii.JsiiSerializable {
    java.util.List<java.lang.String> getMoreThings();

    /**
     * @return a {@link Builder} of {@link ExtendsPrivateInterface}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link ExtendsPrivateInterface}
     */
    final class Builder {
        private java.util.List<java.lang.String> _moreThings;

        /**
         * Sets the value of MoreThings
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withMoreThings(final java.util.List<java.lang.String> value) {
            this._moreThings = java.util.Objects.requireNonNull(value, "moreThings is required");
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link ExtendsPrivateInterface}
         * @throws NullPointerException if any required attribute was not provided
         */
        public ExtendsPrivateInterface build() {
            return new ExtendsPrivateInterface() {
                private final java.util.List<java.lang.String> $moreThings = java.util.Objects.requireNonNull(_moreThings, "moreThings is required");

                @Override
                public java.util.List<java.lang.String> getMoreThings() {
                    return this.$moreThings;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    obj.set("moreThings", om.valueToTree(this.getMoreThings()));
                    return obj;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.ExtendsPrivateInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.util.List<java.lang.String> getMoreThings() {
            return this.jsiiGet("moreThings", java.util.List.class);
        }
    }
}
