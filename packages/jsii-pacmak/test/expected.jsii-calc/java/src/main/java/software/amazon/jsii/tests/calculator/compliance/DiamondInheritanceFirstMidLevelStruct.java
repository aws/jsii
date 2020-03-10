package software.amazon.jsii.tests.calculator.compliance;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.DiamondInheritanceFirstMidLevelStruct")
@software.amazon.jsii.Jsii.Proxy(DiamondInheritanceFirstMidLevelStruct.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface DiamondInheritanceFirstMidLevelStruct extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.compliance.DiamondInheritanceBaseLevelStruct {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.String getFirstMidLevelProperty();

    /**
     * @return a {@link Builder} of {@link DiamondInheritanceFirstMidLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link DiamondInheritanceFirstMidLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.lang.String firstMidLevelProperty;
        private java.lang.String baseLevelProperty;

        /**
         * Sets the value of {@link DiamondInheritanceFirstMidLevelStruct#getFirstMidLevelProperty}
         * @param firstMidLevelProperty the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder firstMidLevelProperty(java.lang.String firstMidLevelProperty) {
            this.firstMidLevelProperty = firstMidLevelProperty;
            return this;
        }

        /**
         * Sets the value of {@link DiamondInheritanceFirstMidLevelStruct#getBaseLevelProperty}
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
         * @return a new instance of {@link DiamondInheritanceFirstMidLevelStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public DiamondInheritanceFirstMidLevelStruct build() {
            return new Jsii$Proxy(firstMidLevelProperty, baseLevelProperty);
        }
    }

    /**
     * An implementation for {@link DiamondInheritanceFirstMidLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements DiamondInheritanceFirstMidLevelStruct {
        private final java.lang.String firstMidLevelProperty;
        private final java.lang.String baseLevelProperty;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.firstMidLevelProperty = this.jsiiGet("firstMidLevelProperty", java.lang.String.class);
            this.baseLevelProperty = this.jsiiGet("baseLevelProperty", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.String firstMidLevelProperty, final java.lang.String baseLevelProperty) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.firstMidLevelProperty = java.util.Objects.requireNonNull(firstMidLevelProperty, "firstMidLevelProperty is required");
            this.baseLevelProperty = java.util.Objects.requireNonNull(baseLevelProperty, "baseLevelProperty is required");
        }

        @Override
        public java.lang.String getFirstMidLevelProperty() {
            return this.firstMidLevelProperty;
        }

        @Override
        public java.lang.String getBaseLevelProperty() {
            return this.baseLevelProperty;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("firstMidLevelProperty", om.valueToTree(this.getFirstMidLevelProperty()));
            data.set("baseLevelProperty", om.valueToTree(this.getBaseLevelProperty()));

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.compliance.DiamondInheritanceFirstMidLevelStruct"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            DiamondInheritanceFirstMidLevelStruct.Jsii$Proxy that = (DiamondInheritanceFirstMidLevelStruct.Jsii$Proxy) o;

            if (!firstMidLevelProperty.equals(that.firstMidLevelProperty)) return false;
            return this.baseLevelProperty.equals(that.baseLevelProperty);
        }

        @Override
        public int hashCode() {
            int result = this.firstMidLevelProperty.hashCode();
            result = 31 * result + (this.baseLevelProperty.hashCode());
            return result;
        }
    }
}
