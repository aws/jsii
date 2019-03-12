package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface MutableObjectLiteral extends software.amazon.jsii.JsiiSerializable {
    java.lang.String getValue();
    void setValue(final java.lang.String value);

    /**
     * @return a {@link Builder} of {@link MutableObjectLiteral}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link MutableObjectLiteral}
     */
    final class Builder {
        private java.lang.String _value;

        /**
         * Sets the value of Value
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withValue(final java.lang.String value) {
            this._value = java.util.Objects.requireNonNull(value, "value is required");
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link MutableObjectLiteral}
         * @throws NullPointerException if any required attribute was not provided
         */
        public MutableObjectLiteral build() {
            return new MutableObjectLiteral() {
                private java.lang.String $value = java.util.Objects.requireNonNull(_value, "value is required");

                @Override
                public java.lang.String getValue() {
                    return this.$value;
                }

                @Override
                public void setValue(final java.lang.String value) {
                    this.$value = java.util.Objects.requireNonNull(value, "value is required");
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    software.amazon.jsii.JsiiObjectMapper om = software.amazon.jsii.JsiiObjectMapper.instance;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    obj.set("value", om.valueToTree(this.getValue()));
                    return obj;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.MutableObjectLiteral {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String getValue() {
            return this.jsiiGet("value", java.lang.String.class);
        }

        @Override
        public void setValue(final java.lang.String value) {
            this.jsiiSet("value", java.util.Objects.requireNonNull(value, "value is required"));
        }
    }
}
