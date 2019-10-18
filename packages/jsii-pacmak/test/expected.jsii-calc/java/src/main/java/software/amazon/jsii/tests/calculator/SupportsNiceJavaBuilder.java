package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.SupportsNiceJavaBuilder")
public class SupportsNiceJavaBuilder extends software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderWithRequiredProps {

    protected SupportsNiceJavaBuilder(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected SupportsNiceJavaBuilder(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * A builder facility for {@link SupportsNiceJavaBuilder}.
     */
    public static final class Builder {
        private final java.lang.Number id;
        private final java.lang.Number defaultBar;
        private software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps.Builder props;

        /**
         * Creates a new {@link Builder} for {@link SupportsNiceJavaBuilder}.
         *
         * @param id 
         * @param defaultBar 
         *
         * @returns a new {@link Builder} instance
         */
        public static Builder create(final java.lang.Number id, final java.lang.Number defaultBar) {
            return new Builder(id, defaultBar);
        }

        private Builder(final java.lang.Number id, final java.lang.Number defaultBar) {
            this.id = id;
            this.defaultBar = defaultBar;
        }

        /**
         * Defines the value of props.bar
         *
         * @param bar 
         *
         * @returns {@code this}
         */
        public Builder bar(final java.lang.Number bar) {
            if (this.props == null) {
                this.props = software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps.builder();
            }
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
            if (this.props == null) {
                this.props = software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps.builder();
            }
            this.props.id(id);
            return this;
        }

        /**
         * @returns a new instance of {@link SupportsNiceJavaBuilder}
         */
        public SupportsNiceJavaBuilder build() {
            return new software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilder(this.id, this.defaultBar, (this.props != null ? this.props.build() : null));
        }
    }

    /**
     * @deprecated This constructor will be made 'protected' in a future version. Use the builder at {@link SupportsNiceJavaBuilder.Builder#create} instead.
     * @param id This parameter is required.
     * @param defaultBar
     * @param props
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public SupportsNiceJavaBuilder(final java.lang.Number id, final java.lang.Number defaultBar, final software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps props) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(id, "id is required"), defaultBar, props }));
    }

    /**
     * @deprecated This constructor will be made 'protected' in a future version. Use the builder at {@link SupportsNiceJavaBuilder.Builder#create} instead.
     * @param id This parameter is required.
     * @param defaultBar
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public SupportsNiceJavaBuilder(final java.lang.Number id, final java.lang.Number defaultBar) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(id, "id is required"), defaultBar }));
    }

    /**
     * @deprecated This constructor will be made 'protected' in a future version. Use the builder at {@link SupportsNiceJavaBuilder.Builder#create} instead.
     * @param id This parameter is required.
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public SupportsNiceJavaBuilder(final java.lang.Number id) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(id, "id is required") }));
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number getId() {
        return this.jsiiGet("id", java.lang.Number.class);
    }
}
