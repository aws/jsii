package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface ExtendsInternalInterface extends software.amazon.jsii.JsiiSerializable {
    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Boolean getBoom();
    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getProp();

    /**
     * @return a {@link Builder} of {@link ExtendsInternalInterface}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link ExtendsInternalInterface}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Builder {
        private java.lang.Boolean _boom;
        private java.lang.String _prop;

        /**
         * Sets the value of Boom
         * @param value the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withBoom(final java.lang.Boolean value) {
            this._boom = java.util.Objects.requireNonNull(value, "boom is required");
            return this;
        }
        /**
         * Sets the value of Prop
         * @param value the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withProp(final java.lang.String value) {
            this._prop = java.util.Objects.requireNonNull(value, "prop is required");
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link ExtendsInternalInterface}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public ExtendsInternalInterface build() {
            return new ExtendsInternalInterface() {
                private final java.lang.Boolean $boom = java.util.Objects.requireNonNull(_boom, "boom is required");
                private final java.lang.String $prop = java.util.Objects.requireNonNull(_prop, "prop is required");

                @Override
                public java.lang.Boolean getBoom() {
                    return this.$boom;
                }

                @Override
                public java.lang.String getProp() {
                    return this.$prop;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    obj.set("boom", om.valueToTree(this.getBoom()));
                    obj.set("prop", om.valueToTree(this.getProp()));
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

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public java.lang.Boolean getBoom() {
            return this.jsiiGet("boom", java.lang.Boolean.class);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public java.lang.String getProp() {
            return this.jsiiGet("prop", java.lang.String.class);
        }
    }
}
