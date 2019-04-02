package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface OptionalStruct extends software.amazon.jsii.JsiiSerializable {
    java.lang.String getField();

    /**
     * @return a {@link Builder} of {@link OptionalStruct}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link OptionalStruct}
     */
    final class Builder {
        @javax.annotation.Nullable
        private java.lang.String _field;

        /**
         * Sets the value of Field
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withField(@javax.annotation.Nullable final java.lang.String value) {
            this._field = value;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link OptionalStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        public OptionalStruct build() {
            return new OptionalStruct() {
                @javax.annotation.Nullable
                private final java.lang.String $field = _field;

                @Override
                public java.lang.String getField() {
                    return this.$field;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    obj.set("field", om.valueToTree(this.getField()));
                    return obj;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.OptionalStruct {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        @javax.annotation.Nullable
        public java.lang.String getField() {
            return this.jsiiGet("field", java.lang.String.class);
        }
    }
}
