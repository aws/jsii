package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.SecondLevelStruct")
@software.amazon.jsii.Jsii.Proxy(SecondLevelStruct.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface SecondLevelStruct extends software.amazon.jsii.JsiiSerializable {

    /**
     * It's long and required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @org.jetbrains.annotations.NotNull java.lang.String getDeeperRequiredProp();

    /**
     * It's long, but you'll almost never pass it.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    default @org.jetbrains.annotations.Nullable java.lang.String getDeeperOptionalProp() {
        return null;
    }

    /**
     * @return a {@link Builder} of {@link SecondLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link SecondLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static final class Builder implements software.amazon.jsii.Builder<SecondLevelStruct> {
        private java.lang.String deeperRequiredProp;
        private java.lang.String deeperOptionalProp;

        /**
         * Sets the value of {@link SecondLevelStruct#getDeeperRequiredProp}
         * @param deeperRequiredProp It's long and required. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder deeperRequiredProp(java.lang.String deeperRequiredProp) {
            this.deeperRequiredProp = deeperRequiredProp;
            return this;
        }

        /**
         * Sets the value of {@link SecondLevelStruct#getDeeperOptionalProp}
         * @param deeperOptionalProp It's long, but you'll almost never pass it.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder deeperOptionalProp(java.lang.String deeperOptionalProp) {
            this.deeperOptionalProp = deeperOptionalProp;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link SecondLevelStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public SecondLevelStruct build() {
            return new Jsii$Proxy(deeperRequiredProp, deeperOptionalProp);
        }
    }

    /**
     * An implementation for {@link SecondLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements SecondLevelStruct {
        private final java.lang.String deeperRequiredProp;
        private final java.lang.String deeperOptionalProp;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.deeperRequiredProp = this.jsiiGet("deeperRequiredProp", java.lang.String.class);
            this.deeperOptionalProp = this.jsiiGet("deeperOptionalProp", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.String deeperRequiredProp, final java.lang.String deeperOptionalProp) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.deeperRequiredProp = java.util.Objects.requireNonNull(deeperRequiredProp, "deeperRequiredProp is required");
            this.deeperOptionalProp = deeperOptionalProp;
        }

        @Override
        public java.lang.String getDeeperRequiredProp() {
            return this.deeperRequiredProp;
        }

        @Override
        public java.lang.String getDeeperOptionalProp() {
            return this.deeperOptionalProp;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("deeperRequiredProp", om.valueToTree(this.getDeeperRequiredProp()));
            if (this.getDeeperOptionalProp() != null) {
                data.set("deeperOptionalProp", om.valueToTree(this.getDeeperOptionalProp()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.SecondLevelStruct"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            SecondLevelStruct.Jsii$Proxy that = (SecondLevelStruct.Jsii$Proxy) o;

            if (!deeperRequiredProp.equals(that.deeperRequiredProp)) return false;
            return this.deeperOptionalProp != null ? this.deeperOptionalProp.equals(that.deeperOptionalProp) : that.deeperOptionalProp == null;
        }

        @Override
        public int hashCode() {
            int result = this.deeperRequiredProp.hashCode();
            result = 31 * result + (this.deeperOptionalProp != null ? this.deeperOptionalProp.hashCode() : 0);
            return result;
        }
    }
}
