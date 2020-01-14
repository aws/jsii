package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UnionProperties")
@software.amazon.jsii.Jsii.Proxy(UnionProperties.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface UnionProperties extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Object getBar();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default java.lang.Object getFoo() {
        return null;
    }

    /**
     * @return a {@link Builder} of {@link UnionProperties}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link UnionProperties}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.lang.Object bar;
        private java.lang.Object foo;

        /**
         * Sets the value of {@link UnionProperties#getBar}
         * @param bar the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder bar(java.lang.String bar) {
            this.bar = bar;
            return this;
        }

        /**
         * Sets the value of {@link UnionProperties#getBar}
         * @param bar the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder bar(java.lang.Number bar) {
            this.bar = bar;
            return this;
        }

        /**
         * Sets the value of {@link UnionProperties#getBar}
         * @param bar the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder bar(software.amazon.jsii.tests.calculator.AllTypes bar) {
            this.bar = bar;
            return this;
        }

        /**
         * Sets the value of {@link UnionProperties#getFoo}
         * @param foo the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder foo(java.lang.String foo) {
            this.foo = foo;
            return this;
        }

        /**
         * Sets the value of {@link UnionProperties#getFoo}
         * @param foo the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder foo(java.lang.Number foo) {
            this.foo = foo;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link UnionProperties}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public UnionProperties build() {
            return new Jsii$Proxy(bar, foo);
        }
    }

    /**
     * An implementation for {@link UnionProperties}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements UnionProperties {
        private final java.lang.Object bar;
        private final java.lang.Object foo;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.bar = this.jsiiGet("bar", software.amazon.jsii.NativeType.forClass(java.lang.Object.class));
            this.foo = this.jsiiGet("foo", software.amazon.jsii.NativeType.forClass(java.lang.Object.class));
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.Object bar, final java.lang.Object foo) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.bar = java.util.Objects.requireNonNull(bar, "bar is required");
            this.foo = foo;
        }

        @Override
        public java.lang.Object getBar() {
            return this.bar;
        }

        @Override
        public java.lang.Object getFoo() {
            return this.foo;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("bar", om.valueToTree(this.getBar()));
            if (this.getFoo() != null) {
                data.set("foo", om.valueToTree(this.getFoo()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.UnionProperties"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            UnionProperties.Jsii$Proxy that = (UnionProperties.Jsii$Proxy) o;

            if (!bar.equals(that.bar)) return false;
            return this.foo != null ? this.foo.equals(that.foo) : that.foo == null;
        }

        @Override
        public int hashCode() {
            int result = this.bar.hashCode();
            result = 31 * result + (this.foo != null ? this.foo.hashCode() : 0);
            return result;
        }
    }
}
