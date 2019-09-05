package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ClassWithJavaReservedWords")
public class ClassWithJavaReservedWords extends software.amazon.jsii.JsiiObject {

    protected ClassWithJavaReservedWords(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ClassWithJavaReservedWords(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public ClassWithJavaReservedWords(final java.lang.String intValue) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(intValue, "intValue is required") }));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String doImport(final java.lang.String assertValue) {
        return this.jsiiCall("import", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(assertValue, "assertValue is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getIntValue() {
        return this.jsiiGet("int", java.lang.String.class);
    }
}
