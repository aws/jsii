package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface DiamondInheritanceBaseLevelStruct extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getBaseLevelProperty();

    /**
     * @return a {@link Builder} of {@link DiamondInheritanceBaseLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link DiamondInheritanceBaseLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.lang.String baseLevelProperty;

        /**
         * Sets the value of BaseLevelProperty
         * @param baseLevelProperty the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder baseLevelProperty(java.lang.String baseLevelProperty) {
            this.baseLevelProperty = baseLevelProperty;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link DiamondInheritanceBaseLevelStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public DiamondInheritanceBaseLevelStruct build() {
            return new Jsii$Proxy(baseLevelProperty);
        }
    }

    /**
     * An implementation for {@link DiamondInheritanceBaseLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements DiamondInheritanceBaseLevelStruct {
        private final java.lang.String baseLevelProperty;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.baseLevelProperty = this.jsiiGet("baseLevelProperty", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.lang.String baseLevelProperty) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.baseLevelProperty = java.util.Objects.requireNonNull(baseLevelProperty, "baseLevelProperty is required");
        }

        @Override
        public java.lang.String getBaseLevelProperty() {
            return this.baseLevelProperty;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("baseLevelProperty", om.valueToTree(this.getBaseLevelProperty()));
            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            DiamondInheritanceBaseLevelStruct.Jsii$Proxy that = (DiamondInheritanceBaseLevelStruct.Jsii$Proxy) o;

            return this.baseLevelProperty.equals(that.baseLevelProperty);
        }

        @Override
        public int hashCode() {
            int result = this.baseLevelProperty.hashCode();
            return result;
        }
    }
}
