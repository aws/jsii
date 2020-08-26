package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.EraseUndefinedHashValuesOptions")
@software.amazon.jsii.Jsii.Proxy(EraseUndefinedHashValuesOptions.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface EraseUndefinedHashValuesOptions extends software.amazon.jsii.JsiiSerializable {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    default @org.jetbrains.annotations.Nullable java.lang.String getOption1() {
        return null;
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    default @org.jetbrains.annotations.Nullable java.lang.String getOption2() {
        return null;
    }

    /**
     * @return a {@link Builder} of {@link EraseUndefinedHashValuesOptions}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link EraseUndefinedHashValuesOptions}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static final class Builder implements software.amazon.jsii.Builder<EraseUndefinedHashValuesOptions> {
        private java.lang.String option1;
        private java.lang.String option2;

        /**
         * Sets the value of {@link EraseUndefinedHashValuesOptions#getOption1}
         * @param option1 the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder option1(java.lang.String option1) {
            this.option1 = option1;
            return this;
        }

        /**
         * Sets the value of {@link EraseUndefinedHashValuesOptions#getOption2}
         * @param option2 the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder option2(java.lang.String option2) {
            this.option2 = option2;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link EraseUndefinedHashValuesOptions}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public EraseUndefinedHashValuesOptions build() {
            return new Jsii$Proxy(option1, option2);
        }
    }

    /**
     * An implementation for {@link EraseUndefinedHashValuesOptions}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements EraseUndefinedHashValuesOptions {
        private final java.lang.String option1;
        private final java.lang.String option2;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.option1 = this.jsiiGet("option1", java.lang.String.class);
            this.option2 = this.jsiiGet("option2", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.String option1, final java.lang.String option2) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.option1 = option1;
            this.option2 = option2;
        }

        @Override
        public java.lang.String getOption1() {
            return this.option1;
        }

        @Override
        public java.lang.String getOption2() {
            return this.option2;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            if (this.getOption1() != null) {
                data.set("option1", om.valueToTree(this.getOption1()));
            }
            if (this.getOption2() != null) {
                data.set("option2", om.valueToTree(this.getOption2()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.EraseUndefinedHashValuesOptions"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            EraseUndefinedHashValuesOptions.Jsii$Proxy that = (EraseUndefinedHashValuesOptions.Jsii$Proxy) o;

            if (this.option1 != null ? !this.option1.equals(that.option1) : that.option1 != null) return false;
            return this.option2 != null ? this.option2.equals(that.option2) : that.option2 == null;
        }

        @Override
        public int hashCode() {
            int result = this.option1 != null ? this.option1.hashCode() : 0;
            result = 31 * result + (this.option2 != null ? this.option2.hashCode() : 0);
            return result;
        }
    }
}
