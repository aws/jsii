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
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public MyClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
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
}
