package software.amazon.jsii.tests.calculator.base;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.base.$Module.class, fqn = "@scope/jsii-calc-base.BaseProps")
@software.amazon.jsii.Jsii.Proxy(BaseProps.Jsii$Proxy.class)
public interface BaseProps extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.baseofbase.VeryBaseProps {

    @org.jetbrains.annotations.NotNull java.lang.String getBar();

    /**
     * @return a {@link Builder} of {@link BaseProps}
     */
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link BaseProps}
     */
    public static final class Builder implements software.amazon.jsii.Builder<BaseProps> {
        private java.lang.String bar;
        private software.amazon.jsii.tests.calculator.baseofbase.Very foo;

        /**
         * Sets the value of {@link BaseProps#getBar}
         * @param bar the value to be set. This parameter is required.
         * @return {@code this}
         */
        public Builder bar(java.lang.String bar) {
            this.bar = bar;
            return this;
        }

        /**
         * Sets the value of {@link BaseProps#getFoo}
         * @param foo the value to be set. This parameter is required.
         * @return {@code this}
         */
        public Builder foo(software.amazon.jsii.tests.calculator.baseofbase.Very foo) {
            this.foo = foo;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link BaseProps}
         * @throws NullPointerException if any required attribute was not provided
         */
        @Override
        public BaseProps build() {
            return new Jsii$Proxy(bar, foo);
        }
    }

    /**
     * An implementation for {@link BaseProps}
     */
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements BaseProps {
        private final java.lang.String bar;
        private final software.amazon.jsii.tests.calculator.baseofbase.Very foo;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.bar = this.jsiiGet("bar", java.lang.String.class);
            this.foo = this.jsiiGet("foo", software.amazon.jsii.tests.calculator.baseofbase.Very.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.String bar, final software.amazon.jsii.tests.calculator.baseofbase.Very foo) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.bar = java.util.Objects.requireNonNull(bar, "bar is required");
            this.foo = java.util.Objects.requireNonNull(foo, "foo is required");
        }

        @Override
        public java.lang.String getBar() {
            return this.bar;
        }

        @Override
        public software.amazon.jsii.tests.calculator.baseofbase.Very getFoo() {
            return this.foo;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("bar", om.valueToTree(this.getBar()));
            data.set("foo", om.valueToTree(this.getFoo()));

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("@scope/jsii-calc-base.BaseProps"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            BaseProps.Jsii$Proxy that = (BaseProps.Jsii$Proxy) o;

            if (!bar.equals(that.bar)) return false;
            return this.foo.equals(that.foo);
        }

        @Override
        public int hashCode() {
            int result = this.bar.hashCode();
            result = 31 * result + (this.foo.hashCode());
            return result;
        }
    }
}
