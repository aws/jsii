package software.amazon.jsii.tests.calculator;

/**
 *  (experimental)
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.GiveMeStructs")
public class GiveMeStructs extends software.amazon.jsii.JsiiObject {

    protected GiveMeStructs(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected GiveMeStructs(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public GiveMeStructs() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct. (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param derived This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.MyFirstStruct derivedToFirst(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.DerivedStruct derived) {
        return this.jsiiCall("derivedToFirst", software.amazon.jsii.tests.calculator.lib.MyFirstStruct.class, new Object[] { java.util.Objects.requireNonNull(derived, "derived is required") });
    }

    /**
     * Returns the boolean from a DerivedStruct struct. (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param derived This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.DoubleTrouble readDerivedNonPrimitive(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.DerivedStruct derived) {
        return this.jsiiCall("readDerivedNonPrimitive", software.amazon.jsii.tests.calculator.DoubleTrouble.class, new Object[] { java.util.Objects.requireNonNull(derived, "derived is required") });
    }

    /**
     * Returns the "anumber" from a MyFirstStruct struct; (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param first This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Number readFirstNumber(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.MyFirstStruct first) {
        return this.jsiiCall("readFirstNumber", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(first, "first is required") });
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.StructWithOnlyOptionals getStructLiteral() {
        return this.jsiiGet("structLiteral", software.amazon.jsii.tests.calculator.lib.StructWithOnlyOptionals.class);
    }
}
