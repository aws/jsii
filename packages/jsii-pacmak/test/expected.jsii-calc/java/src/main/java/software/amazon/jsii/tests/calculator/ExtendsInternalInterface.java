package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ExtendsInternalInterface")
@software.amazon.jsii.Jsii.Proxy(ExtendsInternalInterface.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface ExtendsInternalInterface extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.Boolean getBoom();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.String getProp();

    /**
     * @return a {@link Builder} of {@link ExtendsInternalInterface}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link ExtendsInternalInterface}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder implements software.amazon.jsii.Builder<ExtendsInternalInterface> {
        private java.lang.Boolean boom;
        private java.lang.String prop;

        /**
         * Sets the value of {@link ExtendsInternalInterface#getBoom}
         * @param boom the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder boom(java.lang.Boolean boom) {
            this.boom = boom;
            return this;
        }

        /**
         * Sets the value of {@link ExtendsInternalInterface#getProp}
         * @param prop the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder prop(java.lang.String prop) {
            this.prop = prop;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link ExtendsInternalInterface}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public ExtendsInternalInterface build() {
            return new Jsii$Proxy(boom, prop);
        }
    }

    /**
     * An implementation for {@link ExtendsInternalInterface}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements ExtendsInternalInterface {
        private final java.lang.Boolean boom;
        private final java.lang.String prop;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.boom = this.jsiiGet("boom", java.lang.Boolean.class);
            this.prop = this.jsiiGet("prop", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.Boolean boom, final java.lang.String prop) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.boom = java.util.Objects.requireNonNull(boom, "boom is required");
            this.prop = java.util.Objects.requireNonNull(prop, "prop is required");
        }

        @Override
        public java.lang.Boolean getBoom() {
            return this.boom;
        }

        @Override
        public java.lang.String getProp() {
            return this.prop;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("boom", om.valueToTree(this.getBoom()));
            data.set("prop", om.valueToTree(this.getProp()));

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.ExtendsInternalInterface"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            ExtendsInternalInterface.Jsii$Proxy that = (ExtendsInternalInterface.Jsii$Proxy) o;

            if (!boom.equals(that.boom)) return false;
            return this.prop.equals(that.prop);
        }

        @Override
        public int hashCode() {
            int result = this.boom.hashCode();
            result = 31 * result + (this.prop.hashCode());
            return result;
        }
    }
}
