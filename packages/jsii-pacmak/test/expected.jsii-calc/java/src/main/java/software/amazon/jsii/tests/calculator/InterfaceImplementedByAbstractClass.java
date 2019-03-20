package software.amazon.jsii.tests.calculator;

/**
 * awslabs/jsii#220
 * Abstract return type
 */
@javax.annotation.Generated(value = "jsii-pacmak")
public interface InterfaceImplementedByAbstractClass extends software.amazon.jsii.JsiiSerializable {
    java.lang.String getPropFromInterface();

    /**
     * @return a {@link Builder} of {@link InterfaceImplementedByAbstractClass}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link InterfaceImplementedByAbstractClass}
     */
    final class Builder {
        private java.lang.String _propFromInterface;

        /**
         * Sets the value of PropFromInterface
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withPropFromInterface(final java.lang.String value) {
            this._propFromInterface = java.util.Objects.requireNonNull(value, "propFromInterface is required");
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link InterfaceImplementedByAbstractClass}
         * @throws NullPointerException if any required attribute was not provided
         */
        public InterfaceImplementedByAbstractClass build() {
            return new InterfaceImplementedByAbstractClass() {
                private final java.lang.String $propFromInterface = java.util.Objects.requireNonNull(_propFromInterface, "propFromInterface is required");

                @Override
                public java.lang.String getPropFromInterface() {
                    return this.$propFromInterface;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    software.amazon.jsii.JsiiObjectMapper om = software.amazon.jsii.JsiiObjectMapper.instance;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    obj.set("propFromInterface", om.valueToTree(this.getPropFromInterface()));
                    return obj;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.InterfaceImplementedByAbstractClass {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String getPropFromInterface() {
            return this.jsiiGet("propFromInterface", java.lang.String.class);
        }
    }
}
