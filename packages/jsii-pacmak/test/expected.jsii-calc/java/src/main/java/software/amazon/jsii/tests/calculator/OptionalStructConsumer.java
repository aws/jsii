package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.OptionalStructConsumer")
public class OptionalStructConsumer extends software.amazon.jsii.JsiiObject {

    protected OptionalStructConsumer(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected OptionalStructConsumer(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @param optionalStruct
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public OptionalStructConsumer(final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.OptionalStruct optionalStruct) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { optionalStruct });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public OptionalStructConsumer() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Boolean getParameterWasUndefined() {
        return this.jsiiGet("parameterWasUndefined", java.lang.Boolean.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.Nullable java.lang.String getFieldValue() {
        return this.jsiiGet("fieldValue", java.lang.String.class);
    }

    /**
     * A fluent builder for {@link software.amazon.jsii.tests.calculator.OptionalStructConsumer}.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static final class Builder implements software.amazon.jsii.Builder<software.amazon.jsii.tests.calculator.OptionalStructConsumer> {
        /**
         * @return a new instance of {@link Builder}.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public static Builder create() {
            return new Builder();
        }

        private software.amazon.jsii.tests.calculator.OptionalStruct.Builder optionalStruct;

        private Builder() {
        }

        /**
         * @return {@code this}
         * @param field This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder field(final java.lang.String field) {
            this.optionalStruct().field(field);
            return this;
        }

        /**
         * @returns a newly built instance of {@link software.amazon.jsii.tests.calculator.OptionalStructConsumer}.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
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
