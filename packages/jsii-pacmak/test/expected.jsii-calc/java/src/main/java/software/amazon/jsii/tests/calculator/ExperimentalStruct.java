package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface ExperimentalStruct extends software.amazon.jsii.JsiiSerializable {
    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getReadonlyProperty();

    /**
     * @return a {@link Builder} of {@link ExperimentalStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link ExperimentalStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Builder {
        private java.lang.String _readonlyProperty;

        /**
         * Sets the value of ReadonlyProperty
         * @param value the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withReadonlyProperty(final java.lang.String value) {
            this._readonlyProperty = java.util.Objects.requireNonNull(value, "readonlyProperty is required");
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link ExperimentalStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public ExperimentalStruct build() {
            return new ExperimentalStruct() {
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
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.ExperimentalStruct {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public java.lang.String getReadonlyProperty() {
            return this.jsiiGet("readonlyProperty", java.lang.String.class);
        }
    }
}
