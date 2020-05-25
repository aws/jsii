package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AmbiguousParameters")
public class AmbiguousParameters extends software.amazon.jsii.JsiiObject {

    protected AmbiguousParameters(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected AmbiguousParameters(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param scope This parameter is required.
     * @param props This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public AmbiguousParameters(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.Bell scope, final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.StructParameterType props) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(scope, "scope is required"), java.util.Objects.requireNonNull(props, "props is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.StructParameterType getProps() {
        return this.jsiiGet("props", software.amazon.jsii.tests.calculator.StructParameterType.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.Bell getScope() {
        return this.jsiiGet("scope", software.amazon.jsii.tests.calculator.Bell.class);
    }

    /**
     * A fluent builder for {@link software.amazon.jsii.tests.calculator.AmbiguousParameters}.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder implements software.amazon.jsii.Builder<software.amazon.jsii.tests.calculator.AmbiguousParameters> {
        /**
         * EXPERIMENTAL
         * <p>
         * @return a new instance of {@link Builder}.
         * @param scope This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public static Builder create(final software.amazon.jsii.tests.calculator.Bell scope) {
            return new Builder(scope);
        }

        private final software.amazon.jsii.tests.calculator.Bell scope;
        private final software.amazon.jsii.tests.calculator.StructParameterType.Builder props;

        private Builder(final software.amazon.jsii.tests.calculator.Bell scope) {
            this.scope = scope;
            this.props = new software.amazon.jsii.tests.calculator.StructParameterType.Builder();
        }

        /**
         * EXPERIMENTAL
         * <p>
         * @return {@code this}
         * @param scope This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder scope(final java.lang.String scope) {
            this.props.scope(scope);
            return this;
        }

        /**
         * EXPERIMENTAL
         * <p>
         * @return {@code this}
         * @param props This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder props(final java.lang.Boolean props) {
            this.props.props(props);
            return this;
        }

        /**
         * @returns a newly built instance of {@link software.amazon.jsii.tests.calculator.AmbiguousParameters}.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public software.amazon.jsii.tests.calculator.AmbiguousParameters build() {
            return new software.amazon.jsii.tests.calculator.AmbiguousParameters(
                this.scope,
                this.props.build()
            );
        }
    }
}
