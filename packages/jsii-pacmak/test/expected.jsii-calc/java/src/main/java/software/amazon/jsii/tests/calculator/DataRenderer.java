package software.amazon.jsii.tests.calculator;

/**
 * Verifies proper type handling through dynamic overrides.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DataRenderer")
public class DataRenderer extends software.amazon.jsii.JsiiObject {
    protected DataRenderer(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public DataRenderer() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String render(@javax.annotation.Nullable final software.amazon.jsii.tests.calculator.lib.MyFirstStruct data) {
        return this.jsiiCall("render", java.lang.String.class, new Object[] { data });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String render() {
        return this.jsiiCall("render", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String renderMap(final java.util.Map<java.lang.String, java.lang.Object> map) {
        return this.jsiiCall("renderMap", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(map, "map is required") });
    }
}
