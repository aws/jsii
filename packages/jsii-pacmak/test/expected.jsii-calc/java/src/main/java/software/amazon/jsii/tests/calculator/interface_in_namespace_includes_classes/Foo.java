package software.amazon.jsii.tests.calculator.interface_in_namespace_includes_classes;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.InterfaceInNamespaceIncludesClasses.Foo")
public class Foo extends software.amazon.jsii.JsiiObject {

    protected Foo(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Foo(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public Foo() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.Nullable java.lang.String getBar() {
        return this.jsiiGet("bar", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setBar(final @org.jetbrains.annotations.Nullable java.lang.String value) {
        this.jsiiSet("bar", value);
    }
}
