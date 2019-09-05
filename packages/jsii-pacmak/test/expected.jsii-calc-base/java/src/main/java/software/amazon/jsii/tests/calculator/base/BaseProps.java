package software.amazon.jsii.tests.calculator.base;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface BaseProps extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.baseofbase.VeryBaseProps {

    java.lang.String getBar();

    /**
     * @return a {@link Builder} of {@link BaseProps}
     */
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link BaseProps}
     */
    public static final class Builder {
        private java.lang.String bar;
        private software.amazon.jsii.tests.calculator.baseofbase.Very foo;

        /**
         * Sets the value of Bar
         * @param bar the value to be set
         * @return {@code this}
         */
        public Builder bar(java.lang.String bar) {
            this.bar = bar;
            return this;
        }

        /**
         * Sets the value of Foo
         * @param foo the value to be set
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
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.bar = this.jsiiGet("bar", java.lang.String.class);
            this.foo = this.jsiiGet("foo", software.amazon.jsii.tests.calculator.baseofbase.Very.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.lang.String bar, software.amazon.jsii.tests.calculator.baseofbase.Very foo) {
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
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("bar", om.valueToTree(this.getBar()));
            obj.set("foo", om.valueToTree(this.getFoo()));
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
