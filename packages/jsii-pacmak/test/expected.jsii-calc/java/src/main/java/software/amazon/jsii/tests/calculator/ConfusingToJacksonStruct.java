package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ConfusingToJacksonStruct")
@software.amazon.jsii.Jsii.Proxy(ConfusingToJacksonStruct.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface ConfusingToJacksonStruct extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default java.lang.Object getUnionProperty() {
        return null;
    }

    /**
     * @return a {@link Builder} of {@link ConfusingToJacksonStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link ConfusingToJacksonStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.lang.Object unionProperty;

        /**
         * Sets the value of UnionProperty
         * @param unionProperty the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder unionProperty(software.amazon.jsii.tests.calculator.lib.IFriendly unionProperty) {
            this.unionProperty = unionProperty;
            return this;
        }

        /**
         * Sets the value of UnionProperty
         * @param unionProperty the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder unionProperty(java.util.List<java.lang.Object> unionProperty) {
            this.unionProperty = unionProperty;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link ConfusingToJacksonStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public ConfusingToJacksonStruct build() {
            return new Jsii$Proxy(unionProperty);
        }
    }

    /**
     * An implementation for {@link ConfusingToJacksonStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements ConfusingToJacksonStruct {
        private final java.lang.Object unionProperty;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.unionProperty = this.jsiiGet("unionProperty", java.lang.Object.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.Object unionProperty) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.unionProperty = unionProperty;
        }

        @Override
        public java.lang.Object getUnionProperty() {
            return this.unionProperty;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            if (this.getUnionProperty() != null) {
                data.set("unionProperty", om.valueToTree(this.getUnionProperty()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.ConfusingToJacksonStruct"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            ConfusingToJacksonStruct.Jsii$Proxy that = (ConfusingToJacksonStruct.Jsii$Proxy) o;

            return this.unionProperty != null ? this.unionProperty.equals(that.unionProperty) : that.unionProperty == null;
        }

        @Override
        public int hashCode() {
            int result = this.unionProperty != null ? this.unionProperty.hashCode() : 0;
            return result;
        }
    }
}
