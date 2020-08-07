package software.amazon.jsii.tests.calculator.submodule.child;

/**
 *  (experimental)
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.submodule.child.KwargsProps")
@software.amazon.jsii.Jsii.Proxy(KwargsProps.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface KwargsProps extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.submodule.child.SomeStruct {

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default @org.jetbrains.annotations.Nullable java.lang.String getExtra() {
        return null;
    }

    /**
     * @return a {@link Builder} of {@link KwargsProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link KwargsProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder implements software.amazon.jsii.Builder<KwargsProps> {
        private java.lang.String extra;
        private software.amazon.jsii.tests.calculator.submodule.child.SomeEnum prop;

        /**
         * Sets the value of {@link KwargsProps#getExtra}
         * @param extra  (experimental).
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder extra(java.lang.String extra) {
            this.extra = extra;
            return this;
        }

        /**
         * Sets the value of {@link KwargsProps#getProp}
         * @param prop  (experimental). This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder prop(software.amazon.jsii.tests.calculator.submodule.child.SomeEnum prop) {
            this.prop = prop;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link KwargsProps}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public KwargsProps build() {
            return new Jsii$Proxy(extra, prop);
        }
    }

    /**
     * An implementation for {@link KwargsProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements KwargsProps {
        private final java.lang.String extra;
        private final software.amazon.jsii.tests.calculator.submodule.child.SomeEnum prop;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.extra = this.jsiiGet("extra", java.lang.String.class);
            this.prop = this.jsiiGet("prop", software.amazon.jsii.tests.calculator.submodule.child.SomeEnum.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.String extra, final software.amazon.jsii.tests.calculator.submodule.child.SomeEnum prop) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.extra = extra;
            this.prop = java.util.Objects.requireNonNull(prop, "prop is required");
        }

        @Override
        public java.lang.String getExtra() {
            return this.extra;
        }

        @Override
        public software.amazon.jsii.tests.calculator.submodule.child.SomeEnum getProp() {
            return this.prop;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            if (this.getExtra() != null) {
                data.set("extra", om.valueToTree(this.getExtra()));
            }
            data.set("prop", om.valueToTree(this.getProp()));

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.submodule.child.KwargsProps"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            KwargsProps.Jsii$Proxy that = (KwargsProps.Jsii$Proxy) o;

            if (this.extra != null ? !this.extra.equals(that.extra) : that.extra != null) return false;
            return this.prop.equals(that.prop);
        }

        @Override
        public int hashCode() {
            int result = this.extra != null ? this.extra.hashCode() : 0;
            result = 31 * result + (this.prop.hashCode());
            return result;
        }
    }
}
