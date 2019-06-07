package software.amazon.jsii.tests.calculator.lib;

/**
 * This is a struct with only optional properties.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@Deprecated
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
public interface StructWithOnlyOptionals extends software.amazon.jsii.JsiiSerializable {
    /**
     * The first optional!
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    java.lang.String getOptional1();
    /**
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    java.lang.Number getOptional2();
    /**
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    java.lang.Boolean getOptional3();

    /**
     * @return a {@link Builder} of {@link StructWithOnlyOptionals}
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link StructWithOnlyOptionals}
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    final class Builder {
        @javax.annotation.Nullable
        private java.lang.String _optional1;
        @javax.annotation.Nullable
        private java.lang.Number _optional2;
        @javax.annotation.Nullable
        private java.lang.Boolean _optional3;

        /**
         * Sets the value of Optional1
         * @param value The first optional!
         * @return {@code this}
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public Builder withOptional1(@javax.annotation.Nullable final java.lang.String value) {
            this._optional1 = value;
            return this;
        }
        /**
         * Sets the value of Optional2
         * @param value the value to be set
         * @return {@code this}
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public Builder withOptional2(@javax.annotation.Nullable final java.lang.Number value) {
            this._optional2 = value;
            return this;
        }
        /**
         * Sets the value of Optional3
         * @param value the value to be set
         * @return {@code this}
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public Builder withOptional3(@javax.annotation.Nullable final java.lang.Boolean value) {
            this._optional3 = value;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link StructWithOnlyOptionals}
         * @throws NullPointerException if any required attribute was not provided
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public StructWithOnlyOptionals build() {
            return new StructWithOnlyOptionals() {
                @javax.annotation.Nullable
                private final java.lang.String $optional1 = _optional1;
                @javax.annotation.Nullable
                private final java.lang.Number $optional2 = _optional2;
                @javax.annotation.Nullable
                private final java.lang.Boolean $optional3 = _optional3;

                @Override
                public java.lang.String getOptional1() {
                    return this.$optional1;
                }

                @Override
                public java.lang.Number getOptional2() {
                    return this.$optional2;
                }

                @Override
                public java.lang.Boolean getOptional3() {
                    return this.$optional3;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    if (this.getOptional1() != null) {
                        obj.set("optional1", om.valueToTree(this.getOptional1()));
                    }
                    if (this.getOptional2() != null) {
                        obj.set("optional2", om.valueToTree(this.getOptional2()));
                    }
                    if (this.getOptional3() != null) {
                        obj.set("optional3", om.valueToTree(this.getOptional3()));
                    }
                    return obj;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.lib.StructWithOnlyOptionals {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * The first optional!
         */
        @Override
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @javax.annotation.Nullable
        public java.lang.String getOptional1() {
            return this.jsiiGet("optional1", java.lang.String.class);
        }

        /**
         */
        @Override
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @javax.annotation.Nullable
        public java.lang.Number getOptional2() {
            return this.jsiiGet("optional2", java.lang.Number.class);
        }

        /**
         */
        @Override
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @javax.annotation.Nullable
        public java.lang.Boolean getOptional3() {
            return this.jsiiGet("optional3", java.lang.Boolean.class);
        }
    }
}
