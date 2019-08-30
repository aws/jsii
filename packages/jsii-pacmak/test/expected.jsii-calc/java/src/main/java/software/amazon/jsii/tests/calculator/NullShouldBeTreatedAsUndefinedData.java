package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface NullShouldBeTreatedAsUndefinedData extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.util.List<java.lang.Object> getArrayWithThreeElementsAndUndefinedAsSecondArgument();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Object getThisShouldBeUndefined();

    /**
     * @return a {@link Builder} of {@link NullShouldBeTreatedAsUndefinedData}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link NullShouldBeTreatedAsUndefinedData}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private final software.amazon.jsii.JsiiBuilderList<java.lang.Object> arrayWithThreeElementsAndUndefinedAsSecondArgument = new software.amazon.jsii.JsiiBuilderList<>();
        private java.lang.Object thisShouldBeUndefined;

        /**
         * Sets the value of the collection property 'ArrayWithThreeElementsAndUndefinedAsSecondArgument'. This method will take a copy of the supplied
         * collection or remove the existing collection from the builder if 'null' is supplied.
         * @param arrayWithThreeElementsAndUndefinedAsSecondArgument the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder arrayWithThreeElementsAndUndefinedAsSecondArgument(java.util.List<java.lang.Object> arrayWithThreeElementsAndUndefinedAsSecondArgument) {
            this.arrayWithThreeElementsAndUndefinedAsSecondArgument.set(arrayWithThreeElementsAndUndefinedAsSecondArgument);
            return this;
        }

        /**
         * Adds a single value to the existing list referenced by the property 'ArrayWithThreeElementsAndUndefinedAsSecondArgument'.
         * @param value the value to add to the list
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder addToArrayWithThreeElementsAndUndefinedAsSecondArgument(java.lang.Object value) {
            this.arrayWithThreeElementsAndUndefinedAsSecondArgument.add(value);
            return this;
        }

        /**
         * Sets the value of ThisShouldBeUndefined
         * @param thisShouldBeUndefined the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder thisShouldBeUndefined(java.lang.Object thisShouldBeUndefined) {
            this.thisShouldBeUndefined = thisShouldBeUndefined;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link NullShouldBeTreatedAsUndefinedData}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public NullShouldBeTreatedAsUndefinedData build() {
            return new Jsii$Proxy(arrayWithThreeElementsAndUndefinedAsSecondArgument.unmodifiableCopy(), thisShouldBeUndefined);
        }
    }

    /**
     * An implementation for {@link NullShouldBeTreatedAsUndefinedData}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements NullShouldBeTreatedAsUndefinedData {
        private final java.util.List<java.lang.Object> arrayWithThreeElementsAndUndefinedAsSecondArgument;
        private final java.lang.Object thisShouldBeUndefined;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.arrayWithThreeElementsAndUndefinedAsSecondArgument = this.jsiiGet("arrayWithThreeElementsAndUndefinedAsSecondArgument", java.util.List.class);
            this.thisShouldBeUndefined = this.jsiiGet("thisShouldBeUndefined", java.lang.Object.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.util.List<java.lang.Object> arrayWithThreeElementsAndUndefinedAsSecondArgument, java.lang.Object thisShouldBeUndefined) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.arrayWithThreeElementsAndUndefinedAsSecondArgument = java.util.Objects.requireNonNull(arrayWithThreeElementsAndUndefinedAsSecondArgument, "arrayWithThreeElementsAndUndefinedAsSecondArgument is required");
            this.thisShouldBeUndefined = thisShouldBeUndefined;
        }

        @Override
        public java.util.List<java.lang.Object> getArrayWithThreeElementsAndUndefinedAsSecondArgument() {
            return this.arrayWithThreeElementsAndUndefinedAsSecondArgument;
        }

        @Override
        public java.lang.Object getThisShouldBeUndefined() {
            return this.thisShouldBeUndefined;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("arrayWithThreeElementsAndUndefinedAsSecondArgument", om.valueToTree(this.getArrayWithThreeElementsAndUndefinedAsSecondArgument()));
            if (this.getThisShouldBeUndefined() != null) {
                obj.set("thisShouldBeUndefined", om.valueToTree(this.getThisShouldBeUndefined()));
            }
            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            NullShouldBeTreatedAsUndefinedData.Jsii$Proxy that = (NullShouldBeTreatedAsUndefinedData.Jsii$Proxy) o;

            if (!arrayWithThreeElementsAndUndefinedAsSecondArgument.equals(that.arrayWithThreeElementsAndUndefinedAsSecondArgument)) return false;
            return this.thisShouldBeUndefined != null ? this.thisShouldBeUndefined.equals(that.thisShouldBeUndefined) : that.thisShouldBeUndefined == null;
        }

        @Override
        public int hashCode() {
            int result = this.arrayWithThreeElementsAndUndefinedAsSecondArgument.hashCode();
            result = 31 * result + (this.thisShouldBeUndefined != null ? this.thisShouldBeUndefined.hashCode() : 0);
            return result;
        }
    }
}
