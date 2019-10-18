package software.amazon.jsii.tests.calculator;

/**
 * We can generate fancy builders in Java for classes which take a mix of positional & struct parameters.
 * 
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
     * A builder facility for {@link SupportsNiceJavaBuilderWithRequiredProps}.
     */
    protected static final class Builder {
        private final java.lang.Number id;
        private final software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps.Builder props = software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps.builder();

        /**
         * Creates a new {@link Builder} for {@link SupportsNiceJavaBuilderWithRequiredProps}.
         *
         * @param id 
         *
         * @returns a new {@link Builder} instance
         */
        public static Builder create(final java.lang.Number id) {
            return new Builder(id);
        }

        private Builder(final java.lang.Number id) {
            this.id = id;
        }

        /**
         * Defines the value of props.bar
         *
         * @param bar 
         *
         * @returns {@code this}
         */
        public Builder bar(final java.lang.Number bar) {
            this.props.bar(bar);
            return this;
        }

        /**
         * Defines the value of props.id
         *
         * @param id 
         *
         * @returns {@code this}
         */
        public Builder id(final java.lang.String id) {
            this.props.id(id);
            return this;
        }

        /**
         * @returns a new instance of {@link SupportsNiceJavaBuilderWithRequiredProps}
         */
        public SupportsNiceJavaBuilderWithRequiredProps build() {
            return new software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderWithRequiredProps(this.id, this.props.build());
        }
    }

    /**
     * EXPERIMENTAL
     * 
     * @param id This parameter is required.
     * @param props This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected SupportsNiceJavaBuilderWithRequiredProps(final java.lang.Number id, final software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps props) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(id, "id is required"), java.util.Objects.requireNonNull(props, "props is required") }));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number getBar() {
        return this.jsiiGet("bar", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number getId() {
        return this.jsiiGet("id", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getPropId() {
        return this.jsiiGet("propId", java.lang.String.class);
    }
}
