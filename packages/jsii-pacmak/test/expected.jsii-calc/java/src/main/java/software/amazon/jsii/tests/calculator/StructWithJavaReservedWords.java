package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.StructWithJavaReservedWords")
@software.amazon.jsii.Jsii.Proxy(StructWithJavaReservedWords.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface StructWithJavaReservedWords extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.String getDefaultValue();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default @org.jetbrains.annotations.Nullable java.lang.String getAssertValue() {
        return null;
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default @org.jetbrains.annotations.Nullable java.lang.String getResult() {
        return null;
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default @org.jetbrains.annotations.Nullable java.lang.String getThat() {
        return null;
    }

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
    public static final class Builder implements software.amazon.jsii.Builder<StructWithJavaReservedWords> {
        private java.lang.String defaultValue;
        private java.lang.String assertValue;
        private java.lang.String result;
        private java.lang.String that;

        /**
         * Sets the value of {@link StructWithJavaReservedWords#getDefaultValue}
         * @param defaultValue the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder defaultValue(java.lang.String defaultValue) {
            this.defaultValue = defaultValue;
            return this;
        }

        /**
         * Sets the value of {@link StructWithJavaReservedWords#getAssertValue}
         * @param assertValue the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder assertValue(java.lang.String assertValue) {
            this.assertValue = assertValue;
            return this;
        }

        /**
         * Sets the value of {@link StructWithJavaReservedWords#getResult}
         * @param result the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder result(java.lang.String result) {
            this.result = result;
            return this;
        }

        /**
         * Sets the value of {@link StructWithJavaReservedWords#getThat}
         * @param that the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder that(java.lang.String that) {
            this.that = that;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link StructWithJavaReservedWords}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public StructWithJavaReservedWords build() {
            return new Jsii$Proxy(defaultValue, assertValue, result, that);
        }
    }

    /**
     * An implementation for {@link StructWithJavaReservedWords}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements StructWithJavaReservedWords {
        private final java.lang.String defaultValue;
        private final java.lang.String assertValue;
        private final java.lang.String result;
        private final java.lang.String that;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.defaultValue = this.jsiiGet("default", java.lang.String.class);
            this.assertValue = this.jsiiGet("assert", java.lang.String.class);
            this.result = this.jsiiGet("result", java.lang.String.class);
            this.that = this.jsiiGet("that", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.String defaultValue, final java.lang.String assertValue, final java.lang.String result, final java.lang.String that) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.defaultValue = java.util.Objects.requireNonNull(defaultValue, "defaultValue is required");
            this.assertValue = assertValue;
            this.result = result;
            this.that = that;
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
        public java.lang.String getResult() {
            return this.result;
        }

        @Override
        public java.lang.String getThat() {
            return this.that;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("default", om.valueToTree(this.getDefaultValue()));
            if (this.getAssertValue() != null) {
                data.set("assert", om.valueToTree(this.getAssertValue()));
            }
            if (this.getResult() != null) {
                data.set("result", om.valueToTree(this.getResult()));
            }
            if (this.getThat() != null) {
                data.set("that", om.valueToTree(this.getThat()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.StructWithJavaReservedWords"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            StructWithJavaReservedWords.Jsii$Proxy that = (StructWithJavaReservedWords.Jsii$Proxy) o;

            if (!defaultValue.equals(that.defaultValue)) return false;
            if (this.assertValue != null ? !this.assertValue.equals(that.assertValue) : that.assertValue != null) return false;
            if (this.result != null ? !this.result.equals(that.result) : that.result != null) return false;
            return this.that != null ? this.that.equals(that.that) : that.that == null;
        }

        @Override
        public int hashCode() {
            int result = this.defaultValue.hashCode();
            result = 31 * result + (this.assertValue != null ? this.assertValue.hashCode() : 0);
            result = 31 * result + (this.result != null ? this.result.hashCode() : 0);
            result = 31 * result + (this.that != null ? this.that.hashCode() : 0);
            return result;
        }
    }
}
