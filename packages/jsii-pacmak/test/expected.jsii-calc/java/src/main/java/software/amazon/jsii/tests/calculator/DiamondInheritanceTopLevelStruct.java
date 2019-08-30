package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface DiamondInheritanceTopLevelStruct extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.DiamondInheritanceFirstMidLevelStruct, software.amazon.jsii.tests.calculator.DiamondInheritanceSecondMidLevelStruct {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getTopLevelProperty();

    /**
     * @return a {@link Builder} of {@link DiamondInheritanceTopLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link DiamondInheritanceTopLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.lang.String topLevelProperty;
        private java.lang.String firstMidLevelProperty;
        private java.lang.String baseLevelProperty;
        private java.lang.String secondMidLevelProperty;

        /**
         * Sets the value of TopLevelProperty
         * @param topLevelProperty the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder topLevelProperty(java.lang.String topLevelProperty) {
            this.topLevelProperty = topLevelProperty;
            return this;
        }

        /**
         * Sets the value of FirstMidLevelProperty
         * @param firstMidLevelProperty the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder firstMidLevelProperty(java.lang.String firstMidLevelProperty) {
            this.firstMidLevelProperty = firstMidLevelProperty;
            return this;
        }

        /**
         * Sets the value of BaseLevelProperty
         * @param baseLevelProperty the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder baseLevelProperty(java.lang.String baseLevelProperty) {
            this.baseLevelProperty = baseLevelProperty;
            return this;
        }

        /**
         * Sets the value of SecondMidLevelProperty
         * @param secondMidLevelProperty the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder secondMidLevelProperty(java.lang.String secondMidLevelProperty) {
            this.secondMidLevelProperty = secondMidLevelProperty;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link DiamondInheritanceTopLevelStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public DiamondInheritanceTopLevelStruct build() {
            return new Jsii$Proxy(topLevelProperty, firstMidLevelProperty, baseLevelProperty, secondMidLevelProperty);
        }
    }

    /**
     * An implementation for {@link DiamondInheritanceTopLevelStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements DiamondInheritanceTopLevelStruct {
        private final java.lang.String topLevelProperty;
        private final java.lang.String firstMidLevelProperty;
        private final java.lang.String baseLevelProperty;
        private final java.lang.String secondMidLevelProperty;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.topLevelProperty = this.jsiiGet("topLevelProperty", java.lang.String.class);
            this.firstMidLevelProperty = this.jsiiGet("firstMidLevelProperty", java.lang.String.class);
            this.baseLevelProperty = this.jsiiGet("baseLevelProperty", java.lang.String.class);
            this.secondMidLevelProperty = this.jsiiGet("secondMidLevelProperty", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.lang.String topLevelProperty, java.lang.String firstMidLevelProperty, java.lang.String baseLevelProperty, java.lang.String secondMidLevelProperty) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.topLevelProperty = java.util.Objects.requireNonNull(topLevelProperty, "topLevelProperty is required");
            this.firstMidLevelProperty = java.util.Objects.requireNonNull(firstMidLevelProperty, "firstMidLevelProperty is required");
            this.baseLevelProperty = java.util.Objects.requireNonNull(baseLevelProperty, "baseLevelProperty is required");
            this.secondMidLevelProperty = java.util.Objects.requireNonNull(secondMidLevelProperty, "secondMidLevelProperty is required");
        }

        @Override
        public java.lang.String getTopLevelProperty() {
            return this.topLevelProperty;
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
        public java.lang.String getSecondMidLevelProperty() {
            return this.secondMidLevelProperty;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("topLevelProperty", om.valueToTree(this.getTopLevelProperty()));
            obj.set("firstMidLevelProperty", om.valueToTree(this.getFirstMidLevelProperty()));
            obj.set("baseLevelProperty", om.valueToTree(this.getBaseLevelProperty()));
            obj.set("secondMidLevelProperty", om.valueToTree(this.getSecondMidLevelProperty()));
            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            DiamondInheritanceTopLevelStruct.Jsii$Proxy that = (DiamondInheritanceTopLevelStruct.Jsii$Proxy) o;

            if (!topLevelProperty.equals(that.topLevelProperty)) return false;
            if (!firstMidLevelProperty.equals(that.firstMidLevelProperty)) return false;
            if (!baseLevelProperty.equals(that.baseLevelProperty)) return false;
            return this.secondMidLevelProperty.equals(that.secondMidLevelProperty);
        }

        @Override
        public int hashCode() {
            int result = this.topLevelProperty.hashCode();
            result = 31 * result + (this.firstMidLevelProperty.hashCode());
            result = 31 * result + (this.baseLevelProperty.hashCode());
            result = 31 * result + (this.secondMidLevelProperty.hashCode());
            return result;
        }
    }
}
