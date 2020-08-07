package software.amazon.jsii.tests.calculator;

/**
 * Verifies proper type handling through dynamic overrides. (experimental)
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DataRenderer")
public class DataRenderer extends software.amazon.jsii.JsiiObject {

    protected DataRenderer(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected DataRenderer(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public DataRenderer() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param data
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String render(final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.lib.MyFirstStruct data) {
        return this.jsiiCall("render", java.lang.String.class, new Object[] { data });
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String render() {
        return this.jsiiCall("render", java.lang.String.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param data This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String renderArbitrary(final @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> data) {
        return this.jsiiCall("renderArbitrary", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(data, "data is required") });
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param map This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String renderMap(final @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, java.lang.Object> map) {
        return this.jsiiCall("renderMap", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(map, "map is required") });
    }
}
