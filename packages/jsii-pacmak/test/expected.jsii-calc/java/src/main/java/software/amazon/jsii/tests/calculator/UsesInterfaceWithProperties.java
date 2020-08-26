package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UsesInterfaceWithProperties")
public class UsesInterfaceWithProperties extends software.amazon.jsii.JsiiObject {

    protected UsesInterfaceWithProperties(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected UsesInterfaceWithProperties(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @param obj This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public UsesInterfaceWithProperties(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IInterfaceWithProperties obj) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(obj, "obj is required") });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String justRead() {
        return this.jsiiCall("justRead", java.lang.String.class);
    }

    /**
     * @param ext This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String readStringAndNumber(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IInterfaceWithPropertiesExtension ext) {
        return this.jsiiCall("readStringAndNumber", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(ext, "ext is required") });
    }

    /**
     * @param value This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String writeAndRead(final @org.jetbrains.annotations.NotNull java.lang.String value) {
        return this.jsiiCall("writeAndRead", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IInterfaceWithProperties getObj() {
        return this.jsiiGet("obj", software.amazon.jsii.tests.calculator.IInterfaceWithProperties.class);
    }
}
