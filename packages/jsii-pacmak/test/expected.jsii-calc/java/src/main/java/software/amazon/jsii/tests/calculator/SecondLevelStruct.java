package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface SecondLevelStruct extends software.amazon.jsii.JsiiSerializable {

    /**
     * It's long and required.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getDeeperRequiredProp();

    /**
     * It's long, but you'll almost never pass it.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getDeeperOptionalProp();

    /**
     * @return a {@link Builder} of {@link SecondLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link SecondLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.lang.String deeperRequiredProp;
        private java.lang.String deeperOptionalProp;

        /**
         * Sets the value of DeeperRequiredProp
         * @param deeperRequiredProp It's long and required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder deeperRequiredProp(java.lang.String deeperRequiredProp) {
            this.deeperRequiredProp = deeperRequiredProp;
            return this;
        }

        /**
         * Sets the value of DeeperOptionalProp
         * @param deeperOptionalProp It's long, but you'll almost never pass it.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder deeperOptionalProp(java.lang.String deeperOptionalProp) {
            this.deeperOptionalProp = deeperOptionalProp;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link SecondLevelStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public SecondLevelStruct build() {
            return new Jsii$Proxy(deeperRequiredProp, deeperOptionalProp);
        }
    }

    /**
     * An implementation for {@link SecondLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements SecondLevelStruct {
        private final java.lang.String deeperRequiredProp;
        private final java.lang.String deeperOptionalProp;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.deeperRequiredProp = this.jsiiGet("deeperRequiredProp", java.lang.String.class);
            this.deeperOptionalProp = this.jsiiGet("deeperOptionalProp", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.lang.String deeperRequiredProp, java.lang.String deeperOptionalProp) {
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
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("deeperRequiredProp", om.valueToTree(this.getDeeperRequiredProp()));
            if (this.getDeeperOptionalProp() != null) {
                obj.set("deeperOptionalProp", om.valueToTree(this.getDeeperOptionalProp()));
            }
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
