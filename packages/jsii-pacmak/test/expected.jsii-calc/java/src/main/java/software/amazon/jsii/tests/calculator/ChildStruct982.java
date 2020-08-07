package software.amazon.jsii.tests.calculator;

/**
 *  (experimental)
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ChildStruct982")
@software.amazon.jsii.Jsii.Proxy(ChildStruct982.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface ChildStruct982 extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.ParentStruct982 {

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.Number getBar();

    /**
     * @return a {@link Builder} of {@link ChildStruct982}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link ChildStruct982}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder implements software.amazon.jsii.Builder<ChildStruct982> {
        private java.lang.Number bar;
        private java.lang.String foo;

        /**
         * Sets the value of {@link ChildStruct982#getBar}
         * @param bar  (experimental). This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder bar(java.lang.Number bar) {
            this.bar = bar;
            return this;
        }

        /**
         * Sets the value of {@link ChildStruct982#getFoo}
         * @param foo  (experimental). This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder foo(java.lang.String foo) {
            this.foo = foo;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link ChildStruct982}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public ChildStruct982 build() {
            return new Jsii$Proxy(bar, foo);
        }
    }

    /**
     * An implementation for {@link ChildStruct982}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements ChildStruct982 {
        private final java.lang.Number bar;
        private final java.lang.String foo;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.bar = this.jsiiGet("bar", java.lang.Number.class);
            this.foo = this.jsiiGet("foo", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.Number bar, final java.lang.String foo) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.bar = java.util.Objects.requireNonNull(bar, "bar is required");
            this.foo = java.util.Objects.requireNonNull(foo, "foo is required");
        }

        @Override
        public java.lang.Number getBar() {
            return this.bar;
        }

        @Override
        public java.lang.String getFoo() {
            return this.foo;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("bar", om.valueToTree(this.getBar()));
            data.set("foo", om.valueToTree(this.getFoo()));

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.ChildStruct982"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            ChildStruct982.Jsii$Proxy that = (ChildStruct982.Jsii$Proxy) o;

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
