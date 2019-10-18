package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.OptionalStructConsumer")
public class OptionalStructConsumer extends software.amazon.jsii.JsiiObject {

    protected OptionalStructConsumer(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected OptionalStructConsumer(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * A builder facility for {@link OptionalStructConsumer}.
     */
    public static final class Builder {
        private software.amazon.jsii.tests.calculator.OptionalStruct.Builder optionalStruct;

        /**
         * Creates a new {@link Builder} for {@link OptionalStructConsumer}.
         *
         *
         * @returns a new {@link Builder} instance
         */
        public static Builder create() {
            return new Builder();
        }

        private Builder() {
        }

        /**
         * Defines the value of optionalStruct.field
         *
         * @param field 
         *
         * @returns {@code this}
         */
        public Builder field(final java.lang.String field) {
            if (this.optionalStruct == null) {
                this.optionalStruct = software.amazon.jsii.tests.calculator.OptionalStruct.builder();
            }
            this.optionalStruct.field(field);
            return this;
        }

        /**
         * @returns a new instance of {@link OptionalStructConsumer}
         */
        public OptionalStructConsumer build() {
            return new software.amazon.jsii.tests.calculator.OptionalStructConsumer((this.optionalStruct != null ? this.optionalStruct.build() : null));
        }
    }

    /**
     * @deprecated This constructor will be made 'protected' in a future version. Use the builder at {@link OptionalStructConsumer.Builder#create} instead.
     * @param optionalStruct
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public OptionalStructConsumer(final software.amazon.jsii.tests.calculator.OptionalStruct optionalStruct) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { optionalStruct }));
    }

    /**
     * @deprecated This constructor will be made 'protected' in a future version. Use the builder at {@link OptionalStructConsumer.Builder#create} instead.
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public OptionalStructConsumer() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Boolean getParameterWasUndefined() {
        return this.jsiiGet("parameterWasUndefined", java.lang.Boolean.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getFieldValue() {
        return this.jsiiGet("fieldValue", java.lang.String.class);
    }
}
