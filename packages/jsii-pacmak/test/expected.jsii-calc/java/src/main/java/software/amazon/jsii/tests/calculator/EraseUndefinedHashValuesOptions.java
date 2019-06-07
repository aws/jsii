package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface EraseUndefinedHashValuesOptions extends software.amazon.jsii.JsiiSerializable {
    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getOption1();
    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getOption2();

    /**
     * @return a {@link Builder} of {@link EraseUndefinedHashValuesOptions}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link EraseUndefinedHashValuesOptions}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Builder {
        @javax.annotation.Nullable
        private java.lang.String _option1;
        @javax.annotation.Nullable
        private java.lang.String _option2;

        /**
         * Sets the value of Option1
         * @param value the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withOption1(@javax.annotation.Nullable final java.lang.String value) {
            this._option1 = value;
            return this;
        }
        /**
         * Sets the value of Option2
         * @param value the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withOption2(@javax.annotation.Nullable final java.lang.String value) {
            this._option2 = value;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link EraseUndefinedHashValuesOptions}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public EraseUndefinedHashValuesOptions build() {
            return new EraseUndefinedHashValuesOptions() {
                @javax.annotation.Nullable
                private final java.lang.String $option1 = _option1;
                @javax.annotation.Nullable
                private final java.lang.String $option2 = _option2;

                @Override
                public java.lang.String getOption1() {
                    return this.$option1;
                }

                @Override
                public java.lang.String getOption2() {
                    return this.$option2;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    if (this.getOption1() != null) {
                        obj.set("option1", om.valueToTree(this.getOption1()));
                    }
                    if (this.getOption2() != null) {
                        obj.set("option2", om.valueToTree(this.getOption2()));
                    }
                    return obj;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.EraseUndefinedHashValuesOptions {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @javax.annotation.Nullable
        public java.lang.String getOption1() {
            return this.jsiiGet("option1", java.lang.String.class);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @javax.annotation.Nullable
        public java.lang.String getOption2() {
            return this.jsiiGet("option2", java.lang.String.class);
        }
    }
}
