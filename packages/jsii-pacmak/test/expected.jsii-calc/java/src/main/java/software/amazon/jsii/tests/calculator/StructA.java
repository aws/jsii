package software.amazon.jsii.tests.calculator;

/**
 * We can serialize and deserialize structs without silently ignoring optional fields.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.StructA")
@software.amazon.jsii.Jsii.Proxy(StructA.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface StructA extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getRequiredString();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default java.lang.Number getOptionalNumber() {
        return null;
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default java.lang.String getOptionalString() {
        return null;
    }

    /**
     * @return a {@link Builder} of {@link StructA}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link StructA}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.lang.String requiredString;
        private java.lang.Number optionalNumber;
        private java.lang.String optionalString;

        /**
         * Sets the value of RequiredString
         * @param requiredString the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder requiredString(java.lang.String requiredString) {
            this.requiredString = requiredString;
            return this;
        }

        /**
         * Sets the value of OptionalNumber
         * @param optionalNumber the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder optionalNumber(java.lang.Number optionalNumber) {
            this.optionalNumber = optionalNumber;
            return this;
        }

        /**
         * Sets the value of OptionalString
         * @param optionalString the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder optionalString(java.lang.String optionalString) {
            this.optionalString = optionalString;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link StructA}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public StructA build() {
            return new Jsii$Proxy(requiredString, optionalNumber, optionalString);
        }
    }

    /**
     * An implementation for {@link StructA}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements StructA {
        private final java.lang.String requiredString;
        private final java.lang.Number optionalNumber;
        private final java.lang.String optionalString;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.requiredString = this.jsiiGet("requiredString", java.lang.String.class);
            this.optionalNumber = this.jsiiGet("optionalNumber", java.lang.Number.class);
            this.optionalString = this.jsiiGet("optionalString", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.String requiredString, final java.lang.Number optionalNumber, final java.lang.String optionalString) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.requiredString = java.util.Objects.requireNonNull(requiredString, "requiredString is required");
            this.optionalNumber = optionalNumber;
            this.optionalString = optionalString;
        }

        @Override
        public java.lang.String getRequiredString() {
            return this.requiredString;
        }

        @Override
        public java.lang.Number getOptionalNumber() {
            return this.optionalNumber;
        }

        @Override
        public java.lang.String getOptionalString() {
            return this.optionalString;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("requiredString", om.valueToTree(this.getRequiredString()));
            if (this.getOptionalNumber() != null) {
                data.set("optionalNumber", om.valueToTree(this.getOptionalNumber()));
            }
            if (this.getOptionalString() != null) {
                data.set("optionalString", om.valueToTree(this.getOptionalString()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.StructA"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            StructA.Jsii$Proxy that = (StructA.Jsii$Proxy) o;

            if (!requiredString.equals(that.requiredString)) return false;
            if (this.optionalNumber != null ? !this.optionalNumber.equals(that.optionalNumber) : that.optionalNumber != null) return false;
            return this.optionalString != null ? this.optionalString.equals(that.optionalString) : that.optionalString == null;
        }

        @Override
        public int hashCode() {
            int result = this.requiredString.hashCode();
            result = 31 * result + (this.optionalNumber != null ? this.optionalNumber.hashCode() : 0);
            result = 31 * result + (this.optionalString != null ? this.optionalString.hashCode() : 0);
            return result;
        }
    }
}
