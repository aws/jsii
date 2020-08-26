package software.amazon.jsii.tests.calculator;

/**
 * Verifies proper type handling through dynamic overrides.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DataRenderer")
public class DataRenderer extends software.amazon.jsii.JsiiObject {

    protected DataRenderer(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected DataRenderer(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public DataRenderer() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * @param data
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String render(final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.lib.MyFirstStruct data) {
        return this.jsiiCall("render", java.lang.String.class, new Object[] { data });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String render() {
        return this.jsiiCall("render", java.lang.String.class);
    }

    /**
     * @param data This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String renderArbitrary(final @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> data) {
        return this.jsiiCall("renderArbitrary", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(data, "data is required") });
    }

    /**
     * @param map This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String renderMap(final @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> map) {
        return this.jsiiCall("renderMap", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(map, "map is required") });
    }
}
