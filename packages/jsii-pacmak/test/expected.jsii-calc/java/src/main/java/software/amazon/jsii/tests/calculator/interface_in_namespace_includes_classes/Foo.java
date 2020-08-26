package software.amazon.jsii.tests.calculator.interface_in_namespace_includes_classes;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.InterfaceInNamespaceIncludesClasses.Foo")
public class Foo extends software.amazon.jsii.JsiiObject {

    protected Foo(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Foo(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public Foo() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.Nullable java.lang.String getBar() {
        return this.jsiiGet("bar", java.lang.String.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setBar(final @org.jetbrains.annotations.Nullable java.lang.String value) {
        this.jsiiSet("bar", value);
    }
}
