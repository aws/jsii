package software.amazon.jsii.tests.calculator.submodule;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.submodule.MyClass")
public class MyClass extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.submodule.nested_submodule.deeply_nested.INamespaced {

    protected MyClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected MyClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param props This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public MyClass(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.submodule.child.SomeStruct props) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(props, "props is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.submodule.child.Awesomeness getAwesomeness() {
        return this.jsiiGet("awesomeness", software.amazon.jsii.tests.calculator.submodule.child.Awesomeness.class);
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getDefinedAt() {
        return this.jsiiGet("definedAt", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.submodule.child.Goodness getGoodness() {
        return this.jsiiGet("goodness", software.amazon.jsii.tests.calculator.submodule.child.Goodness.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.submodule.child.SomeStruct getProps() {
        return this.jsiiGet("props", software.amazon.jsii.tests.calculator.submodule.child.SomeStruct.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.AllTypes getAllTypes() {
        return this.jsiiGet("allTypes", software.amazon.jsii.tests.calculator.AllTypes.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setAllTypes(final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.AllTypes value) {
        this.jsiiSet("allTypes", value);
    }

    /**
     * A fluent builder for {@link software.amazon.jsii.tests.calculator.submodule.MyClass}.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder implements software.amazon.jsii.Builder<software.amazon.jsii.tests.calculator.submodule.MyClass> {
        /**
         * EXPERIMENTAL
         * <p>
         * @return a new instance of {@link Builder}.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public static Builder create() {
            return new Builder();
        }

        private final software.amazon.jsii.tests.calculator.submodule.child.SomeStruct.Builder props;

        private Builder() {
            this.props = new software.amazon.jsii.tests.calculator.submodule.child.SomeStruct.Builder();
        }

        /**
         * EXPERIMENTAL
         * <p>
         * @return {@code this}
         * @param prop This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder prop(final software.amazon.jsii.tests.calculator.submodule.child.SomeEnum prop) {
            this.props.prop(prop);
            return this;
        }

        /**
         * @returns a newly built instance of {@link software.amazon.jsii.tests.calculator.submodule.MyClass}.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public software.amazon.jsii.tests.calculator.submodule.MyClass build() {
            return new software.amazon.jsii.tests.calculator.submodule.MyClass(
                this.props.build()
            );
        }
    }
}
