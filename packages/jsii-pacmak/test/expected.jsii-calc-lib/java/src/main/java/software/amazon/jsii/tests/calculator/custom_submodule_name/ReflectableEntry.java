package software.amazon.jsii.tests.calculator.custom_submodule_name;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.lib.$Module.class, fqn = "@scope/jsii-calc-lib.submodule.ReflectableEntry")
@software.amazon.jsii.Jsii.Proxy(ReflectableEntry.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@Deprecated
public interface ReflectableEntry extends software.amazon.jsii.JsiiSerializable {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    @org.jetbrains.annotations.NotNull java.lang.String getKey();

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    @org.jetbrains.annotations.NotNull java.lang.Object getValue();

    /**
     * @return a {@link Builder} of {@link ReflectableEntry}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link ReflectableEntry}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    public static final class Builder implements software.amazon.jsii.Builder<ReflectableEntry> {
        private java.lang.String key;
        private java.lang.Object value;

        /**
         * Sets the value of {@link ReflectableEntry#getKey}
         * @param key the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        public Builder key(java.lang.String key) {
            this.key = key;
            return this;
        }

        /**
         * Sets the value of {@link ReflectableEntry#getValue}
         * @param value the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        public Builder value(java.lang.Object value) {
            this.value = value;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link ReflectableEntry}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        @Override
        public ReflectableEntry build() {
            return new Jsii$Proxy(key, value);
        }
    }

    /**
     * An implementation for {@link ReflectableEntry}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements ReflectableEntry {
        private final java.lang.String key;
        private final java.lang.Object value;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.key = this.jsiiGet("key", java.lang.String.class);
            this.value = this.jsiiGet("value", java.lang.Object.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.String key, final java.lang.Object value) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.key = java.util.Objects.requireNonNull(key, "key is required");
            this.value = java.util.Objects.requireNonNull(value, "value is required");
        }

        @Override
        public java.lang.String getKey() {
            return this.key;
        }

        @Override
        public java.lang.Object getValue() {
            return this.value;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("key", om.valueToTree(this.getKey()));
            data.set("value", om.valueToTree(this.getValue()));

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("@scope/jsii-calc-lib.submodule.ReflectableEntry"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            ReflectableEntry.Jsii$Proxy that = (ReflectableEntry.Jsii$Proxy) o;

            if (!key.equals(that.key)) return false;
            return this.value.equals(that.value);
        }

        @Override
        public int hashCode() {
            int result = this.key.hashCode();
            result = 31 * result + (this.value.hashCode());
            return result;
        }
    }
}
