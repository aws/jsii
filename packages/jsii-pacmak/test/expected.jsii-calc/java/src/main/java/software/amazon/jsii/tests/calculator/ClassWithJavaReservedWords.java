package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ClassWithJavaReservedWords")
public class ClassWithJavaReservedWords extends software.amazon.jsii.JsiiObject {

    protected ClassWithJavaReservedWords(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ClassWithJavaReservedWords(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @param int This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public ClassWithJavaReservedWords(final @org.jetbrains.annotations.NotNull java.lang.String intValue) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(intValue, "intValue is required") });
    }

    /**
     * @param assert This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String doImport(final @org.jetbrains.annotations.NotNull java.lang.String assertValue) {
        return this.jsiiCall("import", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(assertValue, "assertValue is required") });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String getIntValue() {
        return this.jsiiGet("int", java.lang.String.class);
    }
}
