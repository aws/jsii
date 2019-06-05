package software.amazon.jsii.tests.calculator;

/**
 * @deprecated it just wraps a string
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@Deprecated
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
public interface DeprecatedStruct extends software.amazon.jsii.JsiiSerializable {
    /**
     * @deprecated well, yeah
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    java.lang.String getReadonlyProperty();

    /**
     * @return a {@link Builder} of {@link DeprecatedStruct}
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link DeprecatedStruct}
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    final class Builder {
        private java.lang.String _readonlyProperty;

        /**
         * Sets the value of ReadonlyProperty
         * @param value the value to be set
         * @return {@code this}
         * @deprecated well, yeah
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public Builder withReadonlyProperty(final java.lang.String value) {
            this._readonlyProperty = java.util.Objects.requireNonNull(value, "readonlyProperty is required");
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link DeprecatedStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public DeprecatedStruct build() {
            return new DeprecatedStruct() {
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
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.DeprecatedStruct {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * @deprecated well, yeah
         */
        @Override
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public java.lang.String getReadonlyProperty() {
            return this.jsiiGet("readonlyProperty", java.lang.String.class);
        }
    }
}
