package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.SupportsNiceJavaBuilderProps")
@software.amazon.jsii.Jsii.Proxy(SupportsNiceJavaBuilderProps.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface SupportsNiceJavaBuilderProps extends software.amazon.jsii.JsiiSerializable {

    /**
     * Some number, like 42.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.Number getBar();

    /**
     * An `id` field here is terrible API design, because the constructor of `SupportsNiceJavaBuilder` already has a parameter named `id`.
     * <p>
     * But here we are, doing it like we didn't care.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default @org.jetbrains.annotations.Nullable java.lang.String getId() {
        return null;
    }

    /**
     * @return a {@link Builder} of {@link SupportsNiceJavaBuilderProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link SupportsNiceJavaBuilderProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder implements software.amazon.jsii.Builder<SupportsNiceJavaBuilderProps> {
        private java.lang.Number bar;
        private java.lang.String id;

        /**
         * Sets the value of {@link SupportsNiceJavaBuilderProps#getBar}
         * @param bar Some number, like 42. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder bar(java.lang.Number bar) {
            this.bar = bar;
            return this;
        }

        /**
         * Sets the value of {@link SupportsNiceJavaBuilderProps#getId}
         * @param id An `id` field here is terrible API design, because the constructor of `SupportsNiceJavaBuilder` already has a parameter named `id`.
         *           But here we are, doing it like we didn't care.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder id(java.lang.String id) {
            this.id = id;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link SupportsNiceJavaBuilderProps}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public SupportsNiceJavaBuilderProps build() {
            return new Jsii$Proxy(bar, id);
        }
    }

    /**
     * An implementation for {@link SupportsNiceJavaBuilderProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements SupportsNiceJavaBuilderProps {
        private final java.lang.Number bar;
        private final java.lang.String id;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.bar = this.jsiiGet("bar", java.lang.Number.class);
            this.id = this.jsiiGet("id", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.Number bar, final java.lang.String id) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.bar = java.util.Objects.requireNonNull(bar, "bar is required");
            this.id = id;
        }

        @Override
        public java.lang.Number getBar() {
            return this.bar;
        }

        @Override
        public java.lang.String getId() {
            return this.id;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("bar", om.valueToTree(this.getBar()));
            if (this.getId() != null) {
                data.set("id", om.valueToTree(this.getId()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.SupportsNiceJavaBuilderProps"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            SupportsNiceJavaBuilderProps.Jsii$Proxy that = (SupportsNiceJavaBuilderProps.Jsii$Proxy) o;

            if (!bar.equals(that.bar)) return false;
            return this.id != null ? this.id.equals(that.id) : that.id == null;
        }

        @Override
        public int hashCode() {
            int result = this.bar.hashCode();
            result = 31 * result + (this.id != null ? this.id.hashCode() : 0);
            return result;
        }
    }
}
