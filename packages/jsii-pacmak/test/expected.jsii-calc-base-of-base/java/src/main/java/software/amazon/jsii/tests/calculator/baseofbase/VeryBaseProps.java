package software.amazon.jsii.tests.calculator.baseofbase;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.baseofbase.$Module.class, fqn = "@scope/jsii-calc-base-of-base.VeryBaseProps")
@software.amazon.jsii.Jsii.Proxy(VeryBaseProps.Jsii$Proxy.class)
public interface VeryBaseProps extends software.amazon.jsii.JsiiSerializable {

    software.amazon.jsii.tests.calculator.baseofbase.Very getFoo();

    /**
     * @return a {@link Builder} of {@link VeryBaseProps}
     */
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link VeryBaseProps}
     */
    public static final class Builder {
        private software.amazon.jsii.tests.calculator.baseofbase.Very foo;

        /**
         * Sets the value of Foo
         * @param foo the value to be set. This parameter is required.
         * @return {@code this}
         */
        public Builder foo(software.amazon.jsii.tests.calculator.baseofbase.Very foo) {
            this.foo = foo;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link VeryBaseProps}
         * @throws NullPointerException if any required attribute was not provided
         */
        public VeryBaseProps build() {
            return new Jsii$Proxy(foo);
        }
    }

    /**
     * An implementation for {@link VeryBaseProps}
     */
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements VeryBaseProps {
        private final software.amazon.jsii.tests.calculator.baseofbase.Very foo;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.foo = this.jsiiGet("foo", software.amazon.jsii.tests.calculator.baseofbase.Very.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final software.amazon.jsii.tests.calculator.baseofbase.Very foo) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.foo = java.util.Objects.requireNonNull(foo, "foo is required");
        }

        @Override
        public software.amazon.jsii.tests.calculator.baseofbase.Very getFoo() {
            return this.foo;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("foo", om.valueToTree(this.getFoo()));

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("@scope/jsii-calc-base-of-base.VeryBaseProps"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            VeryBaseProps.Jsii$Proxy that = (VeryBaseProps.Jsii$Proxy) o;

            return this.foo.equals(that.foo);
        }

        @Override
        public int hashCode() {
            int result = this.foo.hashCode();
            return result;
        }
    }
}
