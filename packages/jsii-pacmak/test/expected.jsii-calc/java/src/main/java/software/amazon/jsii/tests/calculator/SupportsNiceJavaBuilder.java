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
     * EXPERIMENTAL
     * 
     * @param id This parameter is required.
     * @param defaultBar
     * @param props
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public SupportsNiceJavaBuilder(final java.lang.Number id, final java.lang.Number defaultBar, final software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps props) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(id, "id is required"), defaultBar, props }));
    }

    /**
     * EXPERIMENTAL
     * 
     * @param id This parameter is required.
     * @param defaultBar
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public SupportsNiceJavaBuilder(final java.lang.Number id, final java.lang.Number defaultBar) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(id, "id is required"), defaultBar }));
    }

    /**
     * EXPERIMENTAL
     * 
     * @param id This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
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

    /**
     * A fluent builder for {@link software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilder}.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        /**
         * EXPERIMENTAL
         * 
         * @return a new instance of {@link Builder}.
         * @param id This parameter is required.
         * @param defaultBar
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public static Builder create(final java.lang.Number id, final java.lang.Number defaultBar) {
            return new Builder(id, defaultBar);
        }

        private final java.lang.Number id;
        private final java.lang.Number defaultBar;
        private software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilderProps.Builder props;

        private Builder(final java.lang.Number id, final java.lang.Number defaultBar) {
            this.id = id;
            this.defaultBar = defaultBar;
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder bar(final java.lang.Number bar) {
            this.props().bar(bar);
            return this;
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder id(final java.lang.String id) {
            this.props().id(id);
            return this;
        }

        /**
         * @returns a newly built instance of {@link software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilder}.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilder build() {
            return new software.amazon.jsii.tests.calculator.SupportsNiceJavaBuilder(
                this.id,
                this.defaultBar,
                this.props != null ? this.props.build() : null
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
