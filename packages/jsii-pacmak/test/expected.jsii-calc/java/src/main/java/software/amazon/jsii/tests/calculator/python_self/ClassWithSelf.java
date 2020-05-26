package software.amazon.jsii.tests.calculator.python_self;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.PythonSelf.ClassWithSelf")
public class ClassWithSelf extends software.amazon.jsii.JsiiObject {

    protected ClassWithSelf(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ClassWithSelf(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param self This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public ClassWithSelf(final @org.jetbrains.annotations.NotNull java.lang.String self) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(self, "self is required") });
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param self This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String method(final @org.jetbrains.annotations.NotNull java.lang.Number self) {
        return this.jsiiCall("method", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(self, "self is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getSelf() {
        return this.jsiiGet("self", java.lang.String.class);
    }
}
