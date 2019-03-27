package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface ExtendsInternalInterface extends software.amazon.jsii.JsiiSerializable {
    java.lang.Boolean getBoom();

    /**
     * @return a {@link Builder} of {@link ExtendsInternalInterface}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link ExtendsInternalInterface}
     */
    final class Builder {
        private java.lang.Boolean _boom;

        /**
         * Sets the value of Boom
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withBoom(final java.lang.Boolean value) {
            this._boom = java.util.Objects.requireNonNull(value, "boom is required");
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link ExtendsInternalInterface}
         * @throws NullPointerException if any required attribute was not provided
         */
        public ExtendsInternalInterface build() {
            return new ExtendsInternalInterface() {
                private final java.lang.Boolean $boom = java.util.Objects.requireNonNull(_boom, "boom is required");

                @Override
                public java.lang.Boolean getBoom() {
                    return this.$boom;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    obj.set("boom", om.valueToTree(this.getBoom()));
                    return obj;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.ExtendsInternalInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.Boolean getBoom() {
            return this.jsiiGet("boom", java.lang.Boolean.class);
        }
    }
}
