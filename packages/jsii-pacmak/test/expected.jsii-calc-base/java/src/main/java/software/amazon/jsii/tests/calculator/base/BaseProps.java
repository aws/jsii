package software.amazon.jsii.tests.calculator.base;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface BaseProps extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.baseofbase.VeryBaseProps {
    java.lang.String getBar();

    /**
     * @return a {@link Builder} of {@link BaseProps}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link BaseProps}
     */
    final class Builder {
        private java.lang.String _bar;
        private software.amazon.jsii.tests.calculator.baseofbase.Very _foo;

        /**
         * Sets the value of Bar
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withBar(final java.lang.String value) {
            this._bar = java.util.Objects.requireNonNull(value, "bar is required");
            return this;
        }
        /**
         * Sets the value of Foo
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withFoo(final software.amazon.jsii.tests.calculator.baseofbase.Very value) {
            this._foo = java.util.Objects.requireNonNull(value, "foo is required");
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link BaseProps}
         * @throws NullPointerException if any required attribute was not provided
         */
        public BaseProps build() {
            return new BaseProps() {
                private final java.lang.String $bar = java.util.Objects.requireNonNull(_bar, "bar is required");
                private final software.amazon.jsii.tests.calculator.baseofbase.Very $foo = java.util.Objects.requireNonNull(_foo, "foo is required");

                @Override
                public java.lang.String getBar() {
                    return this.$bar;
                }

                @Override
                public software.amazon.jsii.tests.calculator.baseofbase.Very getFoo() {
                    return this.$foo;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    software.amazon.jsii.JsiiObjectMapper om = software.amazon.jsii.JsiiObjectMapper.instance;
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
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.base.BaseProps {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String getBar() {
            return this.jsiiGet("bar", java.lang.String.class);
        }

        @Override
        public software.amazon.jsii.tests.calculator.baseofbase.Very getFoo() {
            return this.jsiiGet("foo", software.amazon.jsii.tests.calculator.baseofbase.Very.class);
        }
    }
}
