package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.JSII417PublicBaseOfBase")
public class JSII417PublicBaseOfBase extends software.amazon.jsii.JsiiObject {

    protected JSII417PublicBaseOfBase(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected JSII417PublicBaseOfBase(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public JSII417PublicBaseOfBase() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.JSII417PublicBaseOfBase makeInstance() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.JSII417PublicBaseOfBase.class, "makeInstance", software.amazon.jsii.tests.calculator.JSII417PublicBaseOfBase.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void foo() {
        this.jsiiCall("foo", software.amazon.jsii.NativeType.VOID);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Boolean getHasRoot() {
        return this.jsiiGet("hasRoot", java.lang.Boolean.class);
    }
}
