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
     * EXPERIMENTAL
     * <p>
     * @param optionalStruct
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public OptionalStructConsumer(final software.amazon.jsii.tests.calculator.OptionalStruct optionalStruct) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { optionalStruct });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public OptionalStructConsumer() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Boolean getParameterWasUndefined() {
        return this.jsiiGet("parameterWasUndefined", software.amazon.jsii.NativeType.forClass(java.lang.Boolean.class));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getFieldValue() {
        return this.jsiiGet("fieldValue", software.amazon.jsii.NativeType.forClass(java.lang.String.class));
    }

    /**
     * A fluent builder for {@link software.amazon.jsii.tests.calculator.OptionalStructConsumer}.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        /**
         * EXPERIMENTAL
         * <p>
         * @return a new instance of {@link Builder}.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public static Builder create() {
            return new Builder();
        }

        private software.amazon.jsii.tests.calculator.OptionalStruct.Builder optionalStruct;

        private Builder() {
        }

        /**
         * EXPERIMENTAL
         * <p>
         * @return {@code this}
         * @param field This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder field(final java.lang.String field) {
            this.optionalStruct().field(field);
            return this;
        }

        /**
         * @returns a newly built instance of {@link software.amazon.jsii.tests.calculator.OptionalStructConsumer}.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public software.amazon.jsii.tests.calculator.OptionalStructConsumer build() {
            return new software.amazon.jsii.tests.calculator.OptionalStructConsumer(
                this.optionalStruct != null ? this.optionalStruct.build() : null
            );
        }

        private software.amazon.jsii.tests.calculator.OptionalStruct.Builder optionalStruct() {
            if (this.optionalStruct == null) {
                this.optionalStruct = new software.amazon.jsii.tests.calculator.OptionalStruct.Builder();
            }
            return this.optionalStruct;
        }
    }
}
