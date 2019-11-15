package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.NestedStruct")
@software.amazon.jsii.Jsii.Proxy(NestedStruct.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface NestedStruct extends software.amazon.jsii.JsiiSerializable {

    /**
     * When provided, must be > 0.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Number getNumberProp();

    /**
     * @return a {@link Builder} of {@link NestedStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link NestedStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.lang.Number numberProp;

        /**
         * Sets the value of NumberProp
         * @param numberProp When provided, must be > 0. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder numberProp(java.lang.Number numberProp) {
            this.numberProp = numberProp;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link NestedStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public NestedStruct build() {
            return new Jsii$Proxy(numberProp);
        }
    }

    /**
     * An implementation for {@link NestedStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements NestedStruct {
        private final java.lang.Number numberProp;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.numberProp = this.jsiiGet("numberProp", java.lang.Number.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.Number numberProp) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.numberProp = java.util.Objects.requireNonNull(numberProp, "numberProp is required");
        }

        @Override
        public java.lang.Number getNumberProp() {
            return this.numberProp;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("numberProp", om.valueToTree(this.getNumberProp()));

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.NestedStruct"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            NestedStruct.Jsii$Proxy that = (NestedStruct.Jsii$Proxy) o;

            return this.numberProp.equals(that.numberProp);
        }

        @Override
        public int hashCode() {
            int result = this.numberProp.hashCode();
            return result;
        }
    }
}
