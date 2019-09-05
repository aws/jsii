package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface StableStruct extends software.amazon.jsii.JsiiSerializable {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    java.lang.String getReadonlyProperty();

    /**
     * @return a {@link Builder} of {@link StableStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link StableStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static final class Builder {
        private java.lang.String readonlyProperty;

        /**
         * Sets the value of ReadonlyProperty
         * @param readonlyProperty the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder readonlyProperty(java.lang.String readonlyProperty) {
            this.readonlyProperty = readonlyProperty;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link StableStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public StableStruct build() {
            return new Jsii$Proxy(readonlyProperty);
        }
    }

    /**
     * An implementation for {@link StableStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements StableStruct {
        private final java.lang.String readonlyProperty;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.readonlyProperty = this.jsiiGet("readonlyProperty", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.lang.String readonlyProperty) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.readonlyProperty = java.util.Objects.requireNonNull(readonlyProperty, "readonlyProperty is required");
        }

        @Override
        public java.lang.String getReadonlyProperty() {
            return this.readonlyProperty;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("readonlyProperty", om.valueToTree(this.getReadonlyProperty()));
            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            StableStruct.Jsii$Proxy that = (StableStruct.Jsii$Proxy) o;

            return this.readonlyProperty.equals(that.readonlyProperty);
        }

        @Override
        public int hashCode() {
            int result = this.readonlyProperty.hashCode();
            return result;
        }
    }
}
