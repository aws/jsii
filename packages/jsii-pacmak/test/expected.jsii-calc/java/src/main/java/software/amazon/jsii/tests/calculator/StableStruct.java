package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface StableStruct extends software.amazon.jsii.JsiiSerializable {
    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    java.lang.String getReadonlyProperty();

    /**
     * @return a {@link Builder} of {@link StableStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link StableStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    final class Builder {
        private java.lang.String _readonlyProperty;

        /**
         * Sets the value of ReadonlyProperty
         * @param value the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder withReadonlyProperty(final java.lang.String value) {
            this._readonlyProperty = java.util.Objects.requireNonNull(value, "readonlyProperty is required");
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link StableStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public StableStruct build() {
            return new StableStruct() {
                private final java.lang.String $readonlyProperty = java.util.Objects.requireNonNull(_readonlyProperty, "readonlyProperty is required");

                @Override
                public java.lang.String getReadonlyProperty() {
                    return this.$readonlyProperty;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    obj.set("readonlyProperty", om.valueToTree(this.getReadonlyProperty()));
                    return obj;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.StableStruct {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public java.lang.String getReadonlyProperty() {
            return this.jsiiGet("readonlyProperty", java.lang.String.class);
        }
    }
}
