package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface TopLevelStruct extends software.amazon.jsii.JsiiSerializable {
    /**
     * This is a required field.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getRequired();
    /**
     * A union to really stress test our serialization.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Object getSecondLevel();
    /**
     * You don't have to pass this.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getOptional();

    /**
     * @return a {@link Builder} of {@link TopLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link TopLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Builder {
        private java.lang.String _required;
        private java.lang.Object _secondLevel;
        @javax.annotation.Nullable
        private java.lang.String _optional;

        /**
         * Sets the value of Required
         * @param value This is a required field.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withRequired(final java.lang.String value) {
            this._required = java.util.Objects.requireNonNull(value, "required is required");
            return this;
        }
        /**
         * Sets the value of SecondLevel
         * @param value A union to really stress test our serialization.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withSecondLevel(final java.lang.Number value) {
            this._secondLevel = java.util.Objects.requireNonNull(value, "secondLevel is required");
            return this;
        }
        /**
         * Sets the value of SecondLevel
         * @param value A union to really stress test our serialization.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withSecondLevel(final software.amazon.jsii.tests.calculator.SecondLevelStruct value) {
            this._secondLevel = java.util.Objects.requireNonNull(value, "secondLevel is required");
            return this;
        }
        /**
         * Sets the value of Optional
         * @param value You don't have to pass this.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withOptional(@javax.annotation.Nullable final java.lang.String value) {
            this._optional = value;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link TopLevelStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public TopLevelStruct build() {
            return new TopLevelStruct() {
                private final java.lang.String $required = java.util.Objects.requireNonNull(_required, "required is required");
                private final java.lang.Object $secondLevel = java.util.Objects.requireNonNull(_secondLevel, "secondLevel is required");
                @javax.annotation.Nullable
                private final java.lang.String $optional = _optional;

                @Override
                public java.lang.String getRequired() {
                    return this.$required;
                }

                @Override
                public java.lang.Object getSecondLevel() {
                    return this.$secondLevel;
                }

                @Override
                public java.lang.String getOptional() {
                    return this.$optional;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    obj.set("required", om.valueToTree(this.getRequired()));
                    obj.set("secondLevel", om.valueToTree(this.getSecondLevel()));
                    if (this.getOptional() != null) {
                        obj.set("optional", om.valueToTree(this.getOptional()));
                    }
                    return obj;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.TopLevelStruct {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * This is a required field.
         * 
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public java.lang.String getRequired() {
            return this.jsiiGet("required", java.lang.String.class);
        }

        /**
         * A union to really stress test our serialization.
         * 
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public java.lang.Object getSecondLevel() {
            return this.jsiiGet("secondLevel", java.lang.Object.class);
        }

        /**
         * You don't have to pass this.
         * 
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @javax.annotation.Nullable
        public java.lang.String getOptional() {
            return this.jsiiGet("optional", java.lang.String.class);
        }
    }
}
