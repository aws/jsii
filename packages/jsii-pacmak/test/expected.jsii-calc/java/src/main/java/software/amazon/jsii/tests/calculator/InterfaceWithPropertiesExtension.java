package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface InterfaceWithPropertiesExtension extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.InterfaceWithProperties {
    java.lang.Number getFoo();
    void setFoo(final java.lang.Number value);

    /**
     * @return a {@link Builder} of {@link InterfaceWithPropertiesExtension}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link InterfaceWithPropertiesExtension}
     */
    final class Builder {
        private java.lang.Number _foo;
        private java.lang.String _readOnlyString;
        private java.lang.String _readWriteString;

        /**
         * Sets the value of Foo
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withFoo(final java.lang.Number value) {
            this._foo = java.util.Objects.requireNonNull(value, "foo is required");
            return this;
        }
        /**
         * Sets the value of ReadOnlyString
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withReadOnlyString(final java.lang.String value) {
            this._readOnlyString = java.util.Objects.requireNonNull(value, "readOnlyString is required");
            return this;
        }
        /**
         * Sets the value of ReadWriteString
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withReadWriteString(final java.lang.String value) {
            this._readWriteString = java.util.Objects.requireNonNull(value, "readWriteString is required");
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link InterfaceWithPropertiesExtension}
         * @throws NullPointerException if any required attribute was not provided
         */
        public InterfaceWithPropertiesExtension build() {
            return new InterfaceWithPropertiesExtension() {
                private java.lang.Number $foo = java.util.Objects.requireNonNull(_foo, "foo is required");
                private final java.lang.String $readOnlyString = java.util.Objects.requireNonNull(_readOnlyString, "readOnlyString is required");
                private java.lang.String $readWriteString = java.util.Objects.requireNonNull(_readWriteString, "readWriteString is required");

                @Override
                public java.lang.Number getFoo() {
                    return this.$foo;
                }

                @Override
                public void setFoo(final java.lang.Number value) {
                    this.$foo = java.util.Objects.requireNonNull(value, "foo is required");
                }

                @Override
                public java.lang.String getReadOnlyString() {
                    return this.$readOnlyString;
                }

                @Override
                public java.lang.String getReadWriteString() {
                    return this.$readWriteString;
                }

                @Override
                public void setReadWriteString(final java.lang.String value) {
                    this.$readWriteString = java.util.Objects.requireNonNull(value, "readWriteString is required");
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    software.amazon.jsii.JsiiObjectMapper om = software.amazon.jsii.JsiiObjectMapper.instance;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    obj.set("foo", om.valueToTree(this.getFoo()));
                    obj.set("readOnlyString", om.valueToTree(this.getReadOnlyString()));
                    obj.set("readWriteString", om.valueToTree(this.getReadWriteString()));
                    return obj;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.InterfaceWithPropertiesExtension {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.Number getFoo() {
            return this.jsiiGet("foo", java.lang.Number.class);
        }

        @Override
        public void setFoo(final java.lang.Number value) {
            this.jsiiSet("foo", java.util.Objects.requireNonNull(value, "foo is required"));
        }

        @Override
        public java.lang.String getReadOnlyString() {
            return this.jsiiGet("readOnlyString", java.lang.String.class);
        }

        @Override
        public java.lang.String getReadWriteString() {
            return this.jsiiGet("readWriteString", java.lang.String.class);
        }

        @Override
        public void setReadWriteString(final java.lang.String value) {
            this.jsiiSet("readWriteString", java.util.Objects.requireNonNull(value, "readWriteString is required"));
        }
    }
}
