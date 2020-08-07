package software.amazon.jsii.tests.calculator;

/**
 *  (experimental)
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.SmellyStruct")
@software.amazon.jsii.Jsii.Proxy(SmellyStruct.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface SmellyStruct extends software.amazon.jsii.JsiiSerializable {

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.String getProperty();

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.Boolean getYetAnoterOne();

    /**
     * @return a {@link Builder} of {@link SmellyStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link SmellyStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder implements software.amazon.jsii.Builder<SmellyStruct> {
        private java.lang.String property;
        private java.lang.Boolean yetAnoterOne;

        /**
         * Sets the value of {@link SmellyStruct#getProperty}
         * @param property  (experimental). This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder property(java.lang.String property) {
            this.property = property;
            return this;
        }

        /**
         * Sets the value of {@link SmellyStruct#getYetAnoterOne}
         * @param yetAnoterOne  (experimental). This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder yetAnoterOne(java.lang.Boolean yetAnoterOne) {
            this.yetAnoterOne = yetAnoterOne;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link SmellyStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public SmellyStruct build() {
            return new Jsii$Proxy(property, yetAnoterOne);
        }
    }

    /**
     * An implementation for {@link SmellyStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements SmellyStruct {
        private final java.lang.String property;
        private final java.lang.Boolean yetAnoterOne;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.property = this.jsiiGet("property", java.lang.String.class);
            this.yetAnoterOne = this.jsiiGet("yetAnoterOne", java.lang.Boolean.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.String property, final java.lang.Boolean yetAnoterOne) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.property = java.util.Objects.requireNonNull(property, "property is required");
            this.yetAnoterOne = java.util.Objects.requireNonNull(yetAnoterOne, "yetAnoterOne is required");
        }

        @Override
        public java.lang.String getProperty() {
            return this.property;
        }

        @Override
        public java.lang.Boolean getYetAnoterOne() {
            return this.yetAnoterOne;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("property", om.valueToTree(this.getProperty()));
            data.set("yetAnoterOne", om.valueToTree(this.getYetAnoterOne()));

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.SmellyStruct"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            SmellyStruct.Jsii$Proxy that = (SmellyStruct.Jsii$Proxy) o;

            if (!property.equals(that.property)) return false;
            return this.yetAnoterOne.equals(that.yetAnoterOne);
        }

        @Override
        public int hashCode() {
            int result = this.property.hashCode();
            result = 31 * result + (this.yetAnoterOne.hashCode());
            return result;
        }
    }
}
