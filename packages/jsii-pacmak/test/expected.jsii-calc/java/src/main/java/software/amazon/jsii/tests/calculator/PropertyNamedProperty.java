package software.amazon.jsii.tests.calculator;

/**
 * Reproduction for https://github.com/aws/jsii/issues/1113 Where a method or property named "property" would result in impossible to load Python code.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.PropertyNamedProperty")
public class PropertyNamedProperty extends software.amazon.jsii.JsiiObject {

    protected PropertyNamedProperty(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected PropertyNamedProperty(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public PropertyNamedProperty() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String getProperty() {
        return this.jsiiGet("property", java.lang.String.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Boolean getYetAnoterOne() {
        return this.jsiiGet("yetAnoterOne", java.lang.Boolean.class);
    }
}
