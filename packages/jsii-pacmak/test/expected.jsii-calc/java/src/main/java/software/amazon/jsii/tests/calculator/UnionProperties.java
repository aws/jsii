package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface UnionProperties extends software.amazon.jsii.JsiiSerializable {
    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Object getBar();
    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Object getFoo();

    /**
     * @return a {@link Builder} of {@link UnionProperties}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link UnionProperties}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Builder {
        private java.lang.Object _bar;
        @javax.annotation.Nullable
        private java.lang.Object _foo;

        /**
         * Sets the value of Bar
         * @param value the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withBar(final java.lang.String value) {
            this._bar = java.util.Objects.requireNonNull(value, "bar is required");
            return this;
        }
        /**
         * Sets the value of Bar
         * @param value the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withBar(final java.lang.Number value) {
            this._bar = java.util.Objects.requireNonNull(value, "bar is required");
            return this;
        }
        /**
         * Sets the value of Bar
         * @param value the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withBar(final software.amazon.jsii.tests.calculator.AllTypes value) {
            this._bar = java.util.Objects.requireNonNull(value, "bar is required");
            return this;
        }
        /**
         * Sets the value of Foo
         * @param value the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withFoo(@javax.annotation.Nullable final java.lang.String value) {
            this._foo = value;
            return this;
        }
        /**
         * Sets the value of Foo
         * @param value the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder withFoo(@javax.annotation.Nullable final java.lang.Number value) {
            this._foo = value;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link UnionProperties}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public UnionProperties build() {
            return new UnionProperties() {
                private final java.lang.Object $bar = java.util.Objects.requireNonNull(_bar, "bar is required");
                @javax.annotation.Nullable
                private final java.lang.Object $foo = _foo;

                @Override
                public java.lang.Object getBar() {
                    return this.$bar;
                }

                @Override
                public java.lang.Object getFoo() {
                    return this.$foo;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    obj.set("bar", om.valueToTree(this.getBar()));
                    obj.set("foo", om.valueToTree(this.getFoo()));
                    return obj;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.UnionProperties {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public java.lang.Object getBar() {
            return this.jsiiGet("bar", java.lang.Object.class);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @javax.annotation.Nullable
        public java.lang.Object getFoo() {
            return this.jsiiGet("foo", java.lang.Object.class);
        }
    }
}
