package software.amazon.jsii.tests.calculator;

/**
 * These are some arguments you can pass to a method.
 * 
 */
@javax.annotation.Generated(value = "jsii-pacmak")
public interface Greetee extends software.amazon.jsii.JsiiSerializable {
    /**
     * The name of the greetee.
     * 
     * Default: world
     * 
     */
    java.lang.String getName();

    /**
     * @return a {@link Builder} of {@link Greetee}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link Greetee}
     */
    final class Builder {
        @javax.annotation.Nullable
        private java.lang.String _name;

        /**
         * Sets the value of Name
         * @param value The name of the greetee.
         * @return {@code this}
         */
        public Builder withName(@javax.annotation.Nullable final java.lang.String value) {
            this._name = value;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link Greetee}
         * @throws NullPointerException if any required attribute was not provided
         */
        public Greetee build() {
            return new Greetee() {
                @javax.annotation.Nullable
                private final java.lang.String $name = _name;

                @Override
                public java.lang.String getName() {
                    return this.$name;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    obj.set("name", om.valueToTree(this.getName()));
                    return obj;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.Greetee {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * The name of the greetee.
         * 
         * Default: world
         * 
         */
        @Override
        @javax.annotation.Nullable
        public java.lang.String getName() {
            return this.jsiiGet("name", java.lang.String.class);
        }
    }
}
