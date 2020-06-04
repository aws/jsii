package software.amazon.jsii.tests.calculator.submodule.child;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.submodule.child.SomeStruct")
@software.amazon.jsii.Jsii.Proxy(SomeStruct.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface SomeStruct extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.submodule.child.SomeEnum getProp();

    /**
     * @return a {@link Builder} of {@link SomeStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link SomeStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder implements software.amazon.jsii.Builder<SomeStruct> {
        private software.amazon.jsii.tests.calculator.submodule.child.SomeEnum prop;

        /**
         * Sets the value of {@link SomeStruct#getProp}
         * @param prop the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder prop(software.amazon.jsii.tests.calculator.submodule.child.SomeEnum prop) {
            this.prop = prop;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link SomeStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public SomeStruct build() {
            return new Jsii$Proxy(prop);
        }
    }

    /**
     * An implementation for {@link SomeStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements SomeStruct {
        private final software.amazon.jsii.tests.calculator.submodule.child.SomeEnum prop;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.prop = this.jsiiGet("prop", software.amazon.jsii.tests.calculator.submodule.child.SomeEnum.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final software.amazon.jsii.tests.calculator.submodule.child.SomeEnum prop) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.prop = java.util.Objects.requireNonNull(prop, "prop is required");
        }

        @Override
        public software.amazon.jsii.tests.calculator.submodule.child.SomeEnum getProp() {
            return this.prop;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("prop", om.valueToTree(this.getProp()));

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.submodule.child.SomeStruct"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            SomeStruct.Jsii$Proxy that = (SomeStruct.Jsii$Proxy) o;

            return this.prop.equals(that.prop);
        }

        @Override
        public int hashCode() {
            int result = this.prop.hashCode();
            return result;
        }
    }
}
