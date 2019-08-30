package software.amazon.jsii.tests.calculator;

/**
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

    public GiveMeStructs() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.lib.MyFirstStruct derivedToFirst(final software.amazon.jsii.tests.calculator.DerivedStruct derived) {
        return this.jsiiCall("derivedToFirst", software.amazon.jsii.tests.calculator.lib.MyFirstStruct.class, new Object[] { java.util.Objects.requireNonNull(derived, "derived is required") });
    }

    /**
     * Returns the boolean from a DerivedStruct struct.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.DoubleTrouble readDerivedNonPrimitive(final software.amazon.jsii.tests.calculator.DerivedStruct derived) {
        return this.jsiiCall("readDerivedNonPrimitive", software.amazon.jsii.tests.calculator.DoubleTrouble.class, new Object[] { java.util.Objects.requireNonNull(derived, "derived is required") });
    }

    /**
     * Returns the "anumber" from a MyFirstStruct struct;
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number readFirstNumber(final software.amazon.jsii.tests.calculator.lib.MyFirstStruct first) {
        return this.jsiiCall("readFirstNumber", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(first, "first is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.lib.StructWithOnlyOptionals getStructLiteral() {
        return this.jsiiGet("structLiteral", software.amazon.jsii.tests.calculator.lib.StructWithOnlyOptionals.class);
    }
}
