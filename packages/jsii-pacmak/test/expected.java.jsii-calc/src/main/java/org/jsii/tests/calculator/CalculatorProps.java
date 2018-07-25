package org.jsii.tests.calculator;
/**
 * Properties for Calculator.
 */
public interface CalculatorProps extends org.jsii.JsiiSerializable {
    java.lang.Number getInitialValue();
    void setInitialValue(final java.lang.Number value);
    java.lang.Number getMaximumValue();
    void setMaximumValue(final java.lang.Number value);

    // ==================================================================
    // Builder
    // ==================================================================

    static Builder builder() {
        return new Builder();
    }

    /**
     * A fluent builder class for {@link CalculatorProps}.
     */
    public static final class Builder {
        private Jsii$Pojo instance = new Jsii$Pojo();

        public Builder withInitialValue(final java.lang.Number value) {
            this.instance._initialValue = value;
            return this;
        }
        public Builder withMaximumValue(final java.lang.Number value) {
            this.instance._maximumValue = value;
            return this;
        }
        public CalculatorProps build() {
            CalculatorProps result = this.instance;
            this.instance = new Jsii$Pojo();
            return result;
        }
    }

    /**
     * A PoJo (plain-old-java-object) class that implements {@link CalculatorProps}.
     */
    final class Jsii$Pojo implements CalculatorProps {

        /**
         * Constructor used by builders.
         */
        protected Jsii$Pojo() { }


        protected java.lang.Number _initialValue;

        public java.lang.Number getInitialValue() {
            return this._initialValue;
        }
        public void setInitialValue(final java.lang.Number value) {
            this._initialValue = value;
        }

        protected java.lang.Number _maximumValue;

        public java.lang.Number getMaximumValue() {
            return this._maximumValue;
        }
        public void setMaximumValue(final java.lang.Number value) {
            this._maximumValue = value;
        }
    }

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    class Jsii$Proxy extends org.jsii.JsiiObject implements org.jsii.tests.calculator.CalculatorProps {
        protected Jsii$Proxy(final org.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }
        @javax.annotation.Nullable
        public java.lang.Number getInitialValue() {
            return this.jsiiGet("initialValue", java.lang.Number.class);
        }
        public void setInitialValue(@javax.annotation.Nullable final java.lang.Number value) {
            this.jsiiSet("initialValue", value);
        }
        @javax.annotation.Nullable
        public java.lang.Number getMaximumValue() {
            return this.jsiiGet("maximumValue", java.lang.Number.class);
        }
        public void setMaximumValue(@javax.annotation.Nullable final java.lang.Number value) {
            this.jsiiSet("maximumValue", value);
        }
    }
}
