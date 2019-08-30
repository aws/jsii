package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UsesInterfaceWithProperties")
public class UsesInterfaceWithProperties extends software.amazon.jsii.JsiiObject {

    protected UsesInterfaceWithProperties(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected UsesInterfaceWithProperties(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public UsesInterfaceWithProperties(final software.amazon.jsii.tests.calculator.IInterfaceWithProperties obj) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(obj, "obj is required") }));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String justRead() {
        return this.jsiiCall("justRead", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String readStringAndNumber(final software.amazon.jsii.tests.calculator.IInterfaceWithPropertiesExtension ext) {
        return this.jsiiCall("readStringAndNumber", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(ext, "ext is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String writeAndRead(final java.lang.String value) {
        return this.jsiiCall("writeAndRead", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.IInterfaceWithProperties getObj() {
        return this.jsiiGet("obj", software.amazon.jsii.tests.calculator.IInterfaceWithProperties.class);
    }
}
