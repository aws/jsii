package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.NullShouldBeTreatedAsUndefinedData")
@software.amazon.jsii.Jsii.Proxy(NullShouldBeTreatedAsUndefinedData.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface NullShouldBeTreatedAsUndefinedData extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.util.List<java.lang.Object> getArrayWithThreeElementsAndUndefinedAsSecondArgument();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default @org.jetbrains.annotations.Nullable java.lang.Object getThisShouldBeUndefined() {
        return null;
    }

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
    public static final class Builder implements software.amazon.jsii.Builder<NullShouldBeTreatedAsUndefinedData> {
        private java.util.List<java.lang.Object> arrayWithThreeElementsAndUndefinedAsSecondArgument;
        private java.lang.Object thisShouldBeUndefined;

        /**
         * Sets the value of {@link NullShouldBeTreatedAsUndefinedData#getArrayWithThreeElementsAndUndefinedAsSecondArgument}
         * @param arrayWithThreeElementsAndUndefinedAsSecondArgument the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @SuppressWarnings("unchecked")
        public Builder arrayWithThreeElementsAndUndefinedAsSecondArgument(java.util.List<? extends java.lang.Object> arrayWithThreeElementsAndUndefinedAsSecondArgument) {
            this.arrayWithThreeElementsAndUndefinedAsSecondArgument = (java.util.List<java.lang.Object>)arrayWithThreeElementsAndUndefinedAsSecondArgument;
            return this;
        }

        /**
         * Sets the value of {@link NullShouldBeTreatedAsUndefinedData#getThisShouldBeUndefined}
         * @param thisShouldBeUndefined the value to be set.
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
        @Override
        public NullShouldBeTreatedAsUndefinedData build() {
            return new Jsii$Proxy(arrayWithThreeElementsAndUndefinedAsSecondArgument, thisShouldBeUndefined);
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
            super(objRef);
            this.arrayWithThreeElementsAndUndefinedAsSecondArgument = this.jsiiGet("arrayWithThreeElementsAndUndefinedAsSecondArgument", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.Object.class)));
            this.thisShouldBeUndefined = this.jsiiGet("thisShouldBeUndefined", java.lang.Object.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        @SuppressWarnings("unchecked")
        private Jsii$Proxy(final java.util.List<? extends java.lang.Object> arrayWithThreeElementsAndUndefinedAsSecondArgument, final java.lang.Object thisShouldBeUndefined) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.arrayWithThreeElementsAndUndefinedAsSecondArgument = (java.util.List<java.lang.Object>)java.util.Objects.requireNonNull(arrayWithThreeElementsAndUndefinedAsSecondArgument, "arrayWithThreeElementsAndUndefinedAsSecondArgument is required");
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
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("arrayWithThreeElementsAndUndefinedAsSecondArgument", om.valueToTree(this.getArrayWithThreeElementsAndUndefinedAsSecondArgument()));
            if (this.getThisShouldBeUndefined() != null) {
                data.set("thisShouldBeUndefined", om.valueToTree(this.getThisShouldBeUndefined()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.NullShouldBeTreatedAsUndefinedData"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

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
