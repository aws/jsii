package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface EraseUndefinedHashValuesOptions extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getOption1();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getOption2();

    /**
     * @return a {@link Builder} of {@link EraseUndefinedHashValuesOptions}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link EraseUndefinedHashValuesOptions}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.lang.String option1;
        private java.lang.String option2;

        /**
         * Sets the value of Option1
         * @param option1 the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder option1(java.lang.String option1) {
            this.option1 = option1;
            return this;
        }

        /**
         * Sets the value of Option2
         * @param option2 the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder option2(java.lang.String option2) {
            this.option2 = option2;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link EraseUndefinedHashValuesOptions}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public EraseUndefinedHashValuesOptions build() {
            return new Jsii$Proxy(option1, option2);
        }
    }

    /**
     * An implementation for {@link EraseUndefinedHashValuesOptions}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements EraseUndefinedHashValuesOptions {
        private final java.lang.String option1;
        private final java.lang.String option2;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.option1 = this.jsiiGet("option1", java.lang.String.class);
            this.option2 = this.jsiiGet("option2", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.lang.String option1, java.lang.String option2) {
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
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            if (this.getOption1() != null) {
                obj.set("option1", om.valueToTree(this.getOption1()));
            }
            if (this.getOption2() != null) {
                obj.set("option2", om.valueToTree(this.getOption2()));
            }
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
