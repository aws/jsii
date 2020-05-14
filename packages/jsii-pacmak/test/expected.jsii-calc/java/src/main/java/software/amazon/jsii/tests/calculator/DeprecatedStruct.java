package software.amazon.jsii.tests.calculator;

/**
 * @deprecated it just wraps a string
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DeprecatedStruct")
@software.amazon.jsii.Jsii.Proxy(DeprecatedStruct.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@Deprecated
public interface DeprecatedStruct extends software.amazon.jsii.JsiiSerializable {

    /**
     * @deprecated well, yeah
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    @org.jetbrains.annotations.NotNull java.lang.String getReadonlyProperty();

    /**
     * @return a {@link Builder} of {@link DeprecatedStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link DeprecatedStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    public static final class Builder implements software.amazon.jsii.Builder<DeprecatedStruct> {
        private java.lang.String readonlyProperty;

        /**
         * Sets the value of {@link DeprecatedStruct#getReadonlyProperty}
         * @param readonlyProperty the value to be set. This parameter is required.
         * @return {@code this}
         * @deprecated well, yeah
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        public Builder readonlyProperty(java.lang.String readonlyProperty) {
            this.readonlyProperty = readonlyProperty;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link DeprecatedStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        @Override
        public DeprecatedStruct build() {
            return new Jsii$Proxy(readonlyProperty);
        }
    }

    /**
     * An implementation for {@link DeprecatedStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements DeprecatedStruct {
        private final java.lang.String readonlyProperty;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.readonlyProperty = this.jsiiGet("readonlyProperty", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.String readonlyProperty) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.readonlyProperty = java.util.Objects.requireNonNull(readonlyProperty, "readonlyProperty is required");
        }

        @Override
        public java.lang.String getReadonlyProperty() {
            return this.readonlyProperty;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("readonlyProperty", om.valueToTree(this.getReadonlyProperty()));

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.DeprecatedStruct"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            DeprecatedStruct.Jsii$Proxy that = (DeprecatedStruct.Jsii$Proxy) o;

            return this.readonlyProperty.equals(that.readonlyProperty);
        }

        @Override
        public int hashCode() {
            int result = this.readonlyProperty.hashCode();
            return result;
        }
    }
}
