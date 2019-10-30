package software.amazon.jsii.tests.calculator;

/**
 * This intentionally overlaps with StructA (where only requiredString is provided) to test htat the kernel properly disambiguates those.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.StructB")
@software.amazon.jsii.Jsii.Proxy(StructB.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface StructB extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getRequiredString();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default java.lang.Boolean getOptionalBoolean() {
        return null;
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default software.amazon.jsii.tests.calculator.StructA getOptionalStructA() {
        return null;
    }

    /**
     * @return a {@link Builder} of {@link StructB}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link StructB}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.lang.String requiredString;
        private java.lang.Boolean optionalBoolean;
        private software.amazon.jsii.tests.calculator.StructA optionalStructA;

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
         * Sets the value of OptionalBoolean
         * @param optionalBoolean the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder optionalBoolean(java.lang.Boolean optionalBoolean) {
            this.optionalBoolean = optionalBoolean;
            return this;
        }

        /**
         * Sets the value of OptionalStructA
         * @param optionalStructA the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder optionalStructA(software.amazon.jsii.tests.calculator.StructA optionalStructA) {
            this.optionalStructA = optionalStructA;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link StructB}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public StructB build() {
            return new Jsii$Proxy(requiredString, optionalBoolean, optionalStructA);
        }
    }

    /**
     * An implementation for {@link StructB}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements StructB {
        private final java.lang.String requiredString;
        private final java.lang.Boolean optionalBoolean;
        private final software.amazon.jsii.tests.calculator.StructA optionalStructA;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.requiredString = this.jsiiGet("requiredString", java.lang.String.class);
            this.optionalBoolean = this.jsiiGet("optionalBoolean", java.lang.Boolean.class);
            this.optionalStructA = this.jsiiGet("optionalStructA", software.amazon.jsii.tests.calculator.StructA.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.String requiredString, final java.lang.Boolean optionalBoolean, final software.amazon.jsii.tests.calculator.StructA optionalStructA) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.requiredString = java.util.Objects.requireNonNull(requiredString, "requiredString is required");
            this.optionalBoolean = optionalBoolean;
            this.optionalStructA = optionalStructA;
        }

        @Override
        public java.lang.String getRequiredString() {
            return this.requiredString;
        }

        @Override
        public java.lang.Boolean getOptionalBoolean() {
            return this.optionalBoolean;
        }

        @Override
        public software.amazon.jsii.tests.calculator.StructA getOptionalStructA() {
            return this.optionalStructA;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("requiredString", om.valueToTree(this.getRequiredString()));
            if (this.getOptionalBoolean() != null) {
                data.set("optionalBoolean", om.valueToTree(this.getOptionalBoolean()));
            }
            if (this.getOptionalStructA() != null) {
                data.set("optionalStructA", om.valueToTree(this.getOptionalStructA()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.StructB"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            StructB.Jsii$Proxy that = (StructB.Jsii$Proxy) o;

            if (!requiredString.equals(that.requiredString)) return false;
            if (this.optionalBoolean != null ? !this.optionalBoolean.equals(that.optionalBoolean) : that.optionalBoolean != null) return false;
            return this.optionalStructA != null ? this.optionalStructA.equals(that.optionalStructA) : that.optionalStructA == null;
        }

        @Override
        public int hashCode() {
            int result = this.requiredString.hashCode();
            result = 31 * result + (this.optionalBoolean != null ? this.optionalBoolean.hashCode() : 0);
            result = 31 * result + (this.optionalStructA != null ? this.optionalStructA.hashCode() : 0);
            return result;
        }
    }
}
