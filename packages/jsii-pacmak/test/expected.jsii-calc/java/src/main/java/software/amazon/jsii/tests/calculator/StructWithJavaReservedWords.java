package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface StructWithJavaReservedWords extends software.amazon.jsii.JsiiSerializable {
    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getDefaultValue();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getAssertValue();

    /**
     * @return a {@link Builder} of {@link StructWithJavaReservedWords}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link StructWithJavaReservedWords}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Builder {
        private java.lang.String defaultValue;
        private java.lang.String assertValue;

        /**
         * Sets the value of DefaultValue
         * @param defaultValue the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder defaultValue(java.lang.String defaultValue) {
            this.defaultValue = defaultValue;
            return this;
        }

        /**
         * Sets the value of AssertValue
         * @param assertValue the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder assertValue(java.lang.String assertValue) {
            this.assertValue = assertValue;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link StructWithJavaReservedWords}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public StructWithJavaReservedWords build() {
            return new Jsii$Proxy(defaultValue, assertValue);
        }

    }

    /**
     * An implementation for {@link StructWithJavaReservedWords}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements StructWithJavaReservedWords {
        private final java.lang.String defaultValue;
        private final java.lang.String assertValue;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.defaultValue = this.jsiiGet("default", java.lang.String.class);
            this.assertValue = this.jsiiGet("assert", java.lang.String.class);
        }


        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.lang.String defaultValue, java.lang.String assertValue) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.defaultValue = java.util.Objects.requireNonNull(defaultValue, "defaultValue is required");
            this.assertValue = assertValue;
        }

        @Override
        public java.lang.String getDefaultValue() {
            return this.defaultValue;
        }

        @Override
        public java.lang.String getAssertValue() {
            return this.assertValue;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("default", om.valueToTree(this.getDefaultValue()));
            if (this.getAssertValue() != null) {
                obj.set("assert", om.valueToTree(this.getAssertValue()));
            }
            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            StructWithJavaReservedWords.Jsii$Proxy that = (StructWithJavaReservedWords.Jsii$Proxy) o;

            if (!defaultValue.equals(that.defaultValue)) return false;
            return assertValue != null ? assertValue.equals(that.assertValue) : that.assertValue == null;
        }

        @Override
        public int hashCode() {
            int result = defaultValue.hashCode();
            result = 31 * result + (assertValue != null ? assertValue.hashCode() : 0);
            return result;
        }

    }
}
