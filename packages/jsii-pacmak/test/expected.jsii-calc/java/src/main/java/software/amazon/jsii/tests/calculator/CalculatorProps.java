package software.amazon.jsii.tests.calculator;

/**
 * Properties for Calculator.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
public interface CalculatorProps extends software.amazon.jsii.JsiiSerializable {
    java.lang.Number getInitialValue();
    void setInitialValue(final java.lang.Number value);
    java.lang.Number getMaximumValue();
    void setMaximumValue(final java.lang.Number value);

    /**
     * @return a {@link Builder} of {@link CalculatorProps}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link CalculatorProps}
     */
    final class Builder {
        @javax.annotation.Nullable
        private java.lang.Number _initialValue;
        @javax.annotation.Nullable
        private java.lang.Number _maximumValue;

        /**
         * Sets the value of InitialValue
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withInitialValue(@javax.annotation.Nullable final java.lang.Number value) {
            this._initialValue = value;
            return this;
        }
        /**
         * Sets the value of MaximumValue
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withMaximumValue(@javax.annotation.Nullable final java.lang.Number value) {
            this._maximumValue = value;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link CalculatorProps}
         * @throws NullPointerException if any required attribute was not provided
         */
        public CalculatorProps build() {
            return new CalculatorProps() {
                @javax.annotation.Nullable
                private java.lang.Number $initialValue = _initialValue;
                @javax.annotation.Nullable
                private java.lang.Number $maximumValue = _maximumValue;

                @Override
                public java.lang.Number getInitialValue() {
                    return this.$initialValue;
                }

                @Override
                public void setInitialValue(@javax.annotation.Nullable final java.lang.Number value) {
                    this.$initialValue = value;
                }

                @Override
                public java.lang.Number getMaximumValue() {
                    return this.$maximumValue;
                }

                @Override
                public void setMaximumValue(@javax.annotation.Nullable final java.lang.Number value) {
                    this.$maximumValue = value;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.CalculatorProps {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        @javax.annotation.Nullable
        public java.lang.Number getInitialValue() {
            return this.jsiiGet("initialValue", java.lang.Number.class);
        }

        @Override
        public void setInitialValue(@javax.annotation.Nullable final java.lang.Number value) {
            this.jsiiSet("initialValue", value);
        }

        @Override
        @javax.annotation.Nullable
        public java.lang.Number getMaximumValue() {
            return this.jsiiGet("maximumValue", java.lang.Number.class);
        }

        @Override
        public void setMaximumValue(@javax.annotation.Nullable final java.lang.Number value) {
            this.jsiiSet("maximumValue", value);
        }
    }
}
