package software.amazon.jsii.tests.calculator.compliance;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.TopLevelStruct")
@software.amazon.jsii.Jsii.Proxy(TopLevelStruct.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface TopLevelStruct extends software.amazon.jsii.JsiiSerializable {

    /**
     * This is a required field.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.String getRequired();

    /**
     * A union to really stress test our serialization.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.Object getSecondLevel();

    /**
     * You don't have to pass this.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default @org.jetbrains.annotations.Nullable java.lang.String getOptional() {
        return null;
    }

    /**
     * @return a {@link Builder} of {@link TopLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link TopLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.lang.String required;
        private java.lang.Object secondLevel;
        private java.lang.String optional;

        /**
         * Sets the value of {@link TopLevelStruct#getRequired}
         * @param required This is a required field. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder required(java.lang.String required) {
            this.required = required;
            return this;
        }

        /**
         * Sets the value of {@link TopLevelStruct#getSecondLevel}
         * @param secondLevel A union to really stress test our serialization. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder secondLevel(java.lang.Number secondLevel) {
            this.secondLevel = secondLevel;
            return this;
        }

        /**
         * Sets the value of {@link TopLevelStruct#getSecondLevel}
         * @param secondLevel A union to really stress test our serialization. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder secondLevel(software.amazon.jsii.tests.calculator.compliance.SecondLevelStruct secondLevel) {
            this.secondLevel = secondLevel;
            return this;
        }

        /**
         * Sets the value of {@link TopLevelStruct#getOptional}
         * @param optional You don't have to pass this.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder optional(java.lang.String optional) {
            this.optional = optional;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link TopLevelStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public TopLevelStruct build() {
            return new Jsii$Proxy(required, secondLevel, optional);
        }
    }

    /**
     * An implementation for {@link TopLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements TopLevelStruct {
        private final java.lang.String required;
        private final java.lang.Object secondLevel;
        private final java.lang.String optional;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.required = this.jsiiGet("required", java.lang.String.class);
            this.secondLevel = this.jsiiGet("secondLevel", java.lang.Object.class);
            this.optional = this.jsiiGet("optional", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.String required, final java.lang.Object secondLevel, final java.lang.String optional) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.required = java.util.Objects.requireNonNull(required, "required is required");
            this.secondLevel = java.util.Objects.requireNonNull(secondLevel, "secondLevel is required");
            this.optional = optional;
        }

        @Override
        public java.lang.String getRequired() {
            return this.required;
        }

        @Override
        public java.lang.Object getSecondLevel() {
            return this.secondLevel;
        }

        @Override
        public java.lang.String getOptional() {
            return this.optional;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("required", om.valueToTree(this.getRequired()));
            data.set("secondLevel", om.valueToTree(this.getSecondLevel()));
            if (this.getOptional() != null) {
                data.set("optional", om.valueToTree(this.getOptional()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.compliance.TopLevelStruct"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            TopLevelStruct.Jsii$Proxy that = (TopLevelStruct.Jsii$Proxy) o;

            if (!required.equals(that.required)) return false;
            if (!secondLevel.equals(that.secondLevel)) return false;
            return this.optional != null ? this.optional.equals(that.optional) : that.optional == null;
        }

        @Override
        public int hashCode() {
            int result = this.required.hashCode();
            result = 31 * result + (this.secondLevel.hashCode());
            result = 31 * result + (this.optional != null ? this.optional.hashCode() : 0);
            return result;
        }
    }
}
