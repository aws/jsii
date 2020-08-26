package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.SupportsNiceJavaBuilder")
public class SupportsNiceJavaBuilder extends software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderWithRequiredProps {

    protected SupportsNiceJavaBuilder(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected SupportsNiceJavaBuilder(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @param id some identifier. This parameter is required.
     * @param defaultBar the default value of `bar`.
     * @param props some props once can provide.
     * @param rest a variadic continuation. This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public SupportsNiceJavaBuilder(final @org.jetbrains.annotations.NotNull java.lang.Number id, final @org.jetbrains.annotations.Nullable java.lang.Number defaultBar, final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps props, final @org.jetbrains.annotations.NotNull java.lang.String... rest) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.concat(java.util.Arrays.<Object>stream(new Object[] { java.util.Objects.requireNonNull(id, "id is required"), defaultBar, props }), java.util.Arrays.<Object>stream(rest)).toArray(Object[]::new));
    }

    /**
     * some identifier.
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Number getId() {
        return this.jsiiGet("id", java.lang.Number.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.util.List<java.lang.String> getRest() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("rest", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class))));
    }

    /**
     * A fluent builder for {@link software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilder}.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static final class Builder implements software.amazon.jsii.Builder<software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilder> {
        /**
         * @return a new instance of {@link Builder}.
         * @param id some identifier. This parameter is required.
         * @param defaultBar the default value of `bar`.
         * @param rest a variadic continuation. This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public static Builder create(final java.lang.Number id, final java.lang.Number defaultBar, final java.lang.String... rest) {
            return new Builder(id, defaultBar, rest);
        }
        /**
         * @return a new instance of {@link Builder}.
         * @param id some identifier. This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public static Builder create(final java.lang.Number id) {
            return new Builder(id, null, null);
        }

        private final java.lang.Number id;
        private final java.lang.Number defaultBar;
        private final java.lang.String[] rest;
        private software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps.Builder props;

        private Builder(final java.lang.Number id, final java.lang.Number defaultBar, final java.lang.String... rest) {
            this.id = id;
            this.defaultBar = defaultBar;
            this.rest = rest;
        }

        /**
         * Some number, like 42.
         * <p>
         * @return {@code this}
         * @param bar Some number, like 42. This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder bar(final java.lang.Number bar) {
            this.props().bar(bar);
            return this;
        }

        /**
         * An `id` field here is terrible API design, because the constructor of `SupportsNiceJavaBuilder` already has a parameter named `id`.
         * <p>
         * But here we are, doing it like we didn't care.
         * <p>
         * @return {@code this}
         * @param id An `id` field here is terrible API design, because the constructor of `SupportsNiceJavaBuilder` already has a parameter named `id`. This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder id(final java.lang.String id) {
            this.props().id(id);
            return this;
        }

        /**
         * @returns a newly built instance of {@link software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilder}.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilder build() {
            return new software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilder(
                this.id,
                this.defaultBar,
                this.props != null ? this.props.build() : null,
                this.rest
            );
        }

        private software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps.Builder props() {
            if (this.props == null) {
                this.props = new software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps.Builder();
            }
            return this.props;
        }
    }
}
