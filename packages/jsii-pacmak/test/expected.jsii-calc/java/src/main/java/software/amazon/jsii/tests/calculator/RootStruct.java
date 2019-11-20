package software.amazon.jsii.tests.calculator;

/**
 * This is here to check that we can pass a nested struct into a kwargs by specifying it as an in-line dictionary.
 * 
 * <p>This is cheating with the (current) declared types, but this is the &quot;more
 * idiomatic&quot; way for Pythonists.</p>
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.RootStruct")
@software.amazon.jsii.Jsii.Proxy(RootStruct.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface RootStruct extends software.amazon.jsii.JsiiSerializable {

    /**
     * May not be empty.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getStringProp();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default software.amazon.jsii.tests.calculator.NestedStruct getNestedStruct() {
        return null;
    }

    /**
     * @return a {@link Builder} of {@link RootStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link RootStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.lang.String stringProp;
        private software.amazon.jsii.tests.calculator.NestedStruct nestedStruct;

        /**
         * Sets the value of StringProp
         * @param stringProp May not be empty. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder stringProp(java.lang.String stringProp) {
            this.stringProp = stringProp;
            return this;
        }

        /**
         * Sets the value of NestedStruct
         * @param nestedStruct the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder nestedStruct(software.amazon.jsii.tests.calculator.NestedStruct nestedStruct) {
            this.nestedStruct = nestedStruct;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link RootStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public RootStruct build() {
            return new Jsii$Proxy(stringProp, nestedStruct);
        }
    }

    /**
     * An implementation for {@link RootStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements RootStruct {
        private final java.lang.String stringProp;
        private final software.amazon.jsii.tests.calculator.NestedStruct nestedStruct;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.stringProp = this.jsiiGet("stringProp", java.lang.String.class);
            this.nestedStruct = this.jsiiGet("nestedStruct", software.amazon.jsii.tests.calculator.NestedStruct.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.String stringProp, final software.amazon.jsii.tests.calculator.NestedStruct nestedStruct) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.stringProp = java.util.Objects.requireNonNull(stringProp, "stringProp is required");
            this.nestedStruct = nestedStruct;
        }

        @Override
        public java.lang.String getStringProp() {
            return this.stringProp;
        }

        @Override
        public software.amazon.jsii.tests.calculator.NestedStruct getNestedStruct() {
            return this.nestedStruct;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("stringProp", om.valueToTree(this.getStringProp()));
            if (this.getNestedStruct() != null) {
                data.set("nestedStruct", om.valueToTree(this.getNestedStruct()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.RootStruct"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            RootStruct.Jsii$Proxy that = (RootStruct.Jsii$Proxy) o;

            if (!stringProp.equals(that.stringProp)) return false;
            return this.nestedStruct != null ? this.nestedStruct.equals(that.nestedStruct) : that.nestedStruct == null;
        }

        @Override
        public int hashCode() {
            int result = this.stringProp.hashCode();
            result = 31 * result + (this.nestedStruct != null ? this.nestedStruct.hashCode() : 0);
            return result;
        }
    }
}
