package software.amazon.jsii.tests.calculator.python_self;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.PythonSelf.ClassWithSelfKwarg")
public class ClassWithSelfKwarg extends software.amazon.jsii.JsiiObject {

    protected ClassWithSelfKwarg(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ClassWithSelfKwarg(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @param props This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public ClassWithSelfKwarg(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.python_self.StructWithSelf props) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(props, "props is required") });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.python_self.StructWithSelf getProps() {
        return this.jsiiGet("props", software.amazon.jsii.tests.calculator.python_self.StructWithSelf.class);
    }

    /**
     * A fluent builder for {@link software.amazon.jsii.tests.calculator.python_self.ClassWithSelfKwarg}.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static final class Builder implements software.amazon.jsii.Builder<software.amazon.jsii.tests.calculator.python_self.ClassWithSelfKwarg> {
        /**
         * @return a new instance of {@link Builder}.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public static Builder create() {
            return new Builder();
        }

        private final software.amazon.jsii.tests.calculator.python_self.StructWithSelf.Builder props;

        private Builder() {
            this.props = new software.amazon.jsii.tests.calculator.python_self.StructWithSelf.Builder();
        }

        /**
         * @return {@code this}
         * @param self This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder self(final java.lang.String self) {
            this.props.self(self);
            return this;
        }

        /**
         * @returns a newly built instance of {@link software.amazon.jsii.tests.calculator.python_self.ClassWithSelfKwarg}.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public software.amazon.jsii.tests.calculator.python_self.ClassWithSelfKwarg build() {
            return new software.amazon.jsii.tests.calculator.python_self.ClassWithSelfKwarg(
                this.props.build()
            );
        }
    }
}
