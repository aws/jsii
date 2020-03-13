package software.amazon.jsii.tests.calculator.submodule.nested_submodule;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.submodule.nested_submodule.Namespaced")
public class Namespaced extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.submodule.nested_submodule.deeply_nested.INamespaced {

    protected Namespaced(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Namespaced(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getDefinedAt() {
        return this.jsiiGet("definedAt", java.lang.String.class);
    }
}
