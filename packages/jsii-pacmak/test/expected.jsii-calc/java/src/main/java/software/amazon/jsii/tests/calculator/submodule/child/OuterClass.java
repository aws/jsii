package software.amazon.jsii.tests.calculator.submodule.child;

/**
 * Checks that classes can self-reference during initialization.
 * <p>
 * EXPERIMENTAL
 * <p>
 * @see : https://github.com/aws/jsii/pull/1706
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.submodule.child.OuterClass")
public class OuterClass extends software.amazon.jsii.JsiiObject {

    protected OuterClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected OuterClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public OuterClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.submodule.child.InnerClass getInnerClass() {
        return this.jsiiGet("innerClass", software.amazon.jsii.tests.calculator.submodule.child.InnerClass.class);
    }
}
