package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface SecondLevelStruct extends software.amazon.jsii.JsiiSerializable {
    /**
     * It's long and required.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getDeeperRequiredProp();
    /**
     * It's long, but you'll almost never pass it.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getDeeperOptionalProp();

    /**
     * @return a {@link Builder} of {@link SecondLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link SecondLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Builder {
        private java.lang.String _deeperRequiredProp;
        @javax.annotation.Nullable
        private java.lang.String _deeperOptionalProp;

        /**
         * Sets the value of DeeperRequiredProp
         * @param value It's long and required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withDeeperRequiredProp(final java.lang.String value) {
            this._deeperRequiredProp = java.util.Objects.requireNonNull(value, "deeperRequiredProp is required");
            return this;
        }
        /**
         * Sets the value of DeeperOptionalProp
         * @param value It's long, but you'll almost never pass it.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withDeeperOptionalProp(@javax.annotation.Nullable final java.lang.String value) {
            this._deeperOptionalProp = value;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link SecondLevelStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public SecondLevelStruct build() {
            return new SecondLevelStruct() {
                private final java.lang.String $deeperRequiredProp = java.util.Objects.requireNonNull(_deeperRequiredProp, "deeperRequiredProp is required");
                @javax.annotation.Nullable
                private final java.lang.String $deeperOptionalProp = _deeperOptionalProp;

                @Override
                public java.lang.String getDeeperRequiredProp() {
                    return this.$deeperRequiredProp;
                }

                @Override
                public java.lang.String getDeeperOptionalProp() {
                    return this.$deeperOptionalProp;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    obj.set("deeperRequiredProp", om.valueToTree(this.getDeeperRequiredProp()));
                    if (this.getDeeperOptionalProp() != null) {
                        obj.set("deeperOptionalProp", om.valueToTree(this.getDeeperOptionalProp()));
                    }
                    return obj;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.SecondLevelStruct {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * It's long and required.
         * 
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public java.lang.String getDeeperRequiredProp() {
            return this.jsiiGet("deeperRequiredProp", java.lang.String.class);
        }

        /**
         * It's long, but you'll almost never pass it.
         * 
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @javax.annotation.Nullable
        public java.lang.String getDeeperOptionalProp() {
            return this.jsiiGet("deeperOptionalProp", java.lang.String.class);
        }
    }
}
