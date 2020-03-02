package software.amazon.jsii.tests.calculator;

/**
 * We can generate fancy builders in Java for classes which take a mix of positional & struct parameters.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.SupportsNiceJavaBuilderWithRequiredProps")
public class SupportsNiceJavaBuilderWithRequiredProps extends software.amazon.jsii.JsiiObject {

    protected SupportsNiceJavaBuilderWithRequiredProps(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected SupportsNiceJavaBuilderWithRequiredProps(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param id some identifier of your choice. This parameter is required.
     * @param props some properties. This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public SupportsNiceJavaBuilderWithRequiredProps(final @org.jetbrains.annotations.NotNull java.lang.Number id, final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps props) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(id, "id is required"), java.util.Objects.requireNonNull(props, "props is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Number getBar() {
        return this.jsiiGet("bar", java.lang.Number.class);
    }

    /**
     * some identifier of your choice.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Number getId() {
        return this.jsiiGet("id", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.Nullable java.lang.String getPropId() {
        return this.jsiiGet("propId", java.lang.String.class);
    }

    /**
     * A fluent builder for {@link software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderWithRequiredProps}.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        /**
         * EXPERIMENTAL
         * <p>
         * @return a new instance of {@link Builder}.
         * @param id some identifier of your choice. This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public static Builder create(final java.lang.Number id) {
            return new Builder(id);
        }

        private final java.lang.Number id;
        private final software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps.Builder props;

        private Builder(final java.lang.Number id) {
            this.id = id;
            this.props = new software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps.Builder();
        }

        /**
         * Some number, like 42.
         * <p>
         * EXPERIMENTAL
         * <p>
         * @return {@code this}
         * @param bar Some number, like 42. This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder bar(final java.lang.Number bar) {
            this.props.bar(bar);
            return this;
        }

        /**
         * An `id` field here is terrible API design, because the constructor of `SupportsNiceJavaBuilder` already has a parameter named `id`.
         * <p>
         * But here we are, doing it like we didn't care.
         * <p>
         * EXPERIMENTAL
         * <p>
         * @return {@code this}
         * @param id An `id` field here is terrible API design, because the constructor of `SupportsNiceJavaBuilder` already has a parameter named `id`. This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder id(final java.lang.String id) {
            this.props.id(id);
            return this;
        }

        /**
         * @returns a newly built instance of {@link software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderWithRequiredProps}.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderWithRequiredProps build() {
            return new software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderWithRequiredProps(
                this.id,
                this.props.build()
            );
        }
    }
}
