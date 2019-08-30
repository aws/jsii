package software.amazon.jsii.tests.calculator;

/**
 * Properties for Calculator.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface CalculatorProps extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Number getInitialValue();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Number getMaximumValue();

    /**
     * @return a {@link Builder} of {@link CalculatorProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link CalculatorProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.lang.Number initialValue;
        private java.lang.Number maximumValue;

        /**
         * Sets the value of InitialValue
         * @param initialValue the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder initialValue(java.lang.Number initialValue) {
            this.initialValue = initialValue;
            return this;
        }

        /**
         * Sets the value of MaximumValue
         * @param maximumValue the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder maximumValue(java.lang.Number maximumValue) {
            this.maximumValue = maximumValue;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link CalculatorProps}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public CalculatorProps build() {
            return new Jsii$Proxy(initialValue, maximumValue);
        }
    }

    /**
     * An implementation for {@link CalculatorProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements CalculatorProps {
        private final java.lang.Number initialValue;
        private final java.lang.Number maximumValue;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.initialValue = this.jsiiGet("initialValue", java.lang.Number.class);
            this.maximumValue = this.jsiiGet("maximumValue", java.lang.Number.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.lang.Number initialValue, java.lang.Number maximumValue) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.initialValue = initialValue;
            this.maximumValue = maximumValue;
        }

        @Override
        public java.lang.Number getInitialValue() {
            return this.initialValue;
        }

        @Override
        public java.lang.Number getMaximumValue() {
            return this.maximumValue;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            if (this.getInitialValue() != null) {
                obj.set("initialValue", om.valueToTree(this.getInitialValue()));
            }
            if (this.getMaximumValue() != null) {
                obj.set("maximumValue", om.valueToTree(this.getMaximumValue()));
            }
            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            CalculatorProps.Jsii$Proxy that = (CalculatorProps.Jsii$Proxy) o;

            if (this.initialValue != null ? !this.initialValue.equals(that.initialValue) : that.initialValue != null) return false;
            return this.maximumValue != null ? this.maximumValue.equals(that.maximumValue) : that.maximumValue == null;
        }

        @Override
        public int hashCode() {
            int result = this.initialValue != null ? this.initialValue.hashCode() : 0;
            result = 31 * result + (this.maximumValue != null ? this.maximumValue.hashCode() : 0);
            return result;
        }
    }
}
