package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.StableClass")
public class StableClass extends software.amazon.jsii.JsiiObject {
    protected StableClass(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public StableClass(final java.lang.String readonlyString, @javax.annotation.Nullable final java.lang.Number mutableNumber) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(readonlyString, "readonlyString is required"), mutableNumber });
    }
    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public StableClass(final java.lang.String readonlyString) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(readonlyString, "readonlyString is required") });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void method() {
        this.jsiiCall("method", Void.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public java.lang.String getReadonlyProperty() {
        return this.jsiiGet("readonlyProperty", java.lang.String.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @javax.annotation.Nullable
    public java.lang.Number getMutableProperty() {
        return this.jsiiGet("mutableProperty", java.lang.Number.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setMutableProperty(@javax.annotation.Nullable final java.lang.Number value) {
        this.jsiiSet("mutableProperty", value);
    }
}
