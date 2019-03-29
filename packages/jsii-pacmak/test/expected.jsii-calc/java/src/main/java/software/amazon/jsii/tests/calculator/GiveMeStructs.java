package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.GiveMeStructs")
public class GiveMeStructs extends software.amazon.jsii.JsiiObject {
    protected GiveMeStructs(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public GiveMeStructs() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.
     * 
     */
    public software.amazon.jsii.tests.calculator.lib.MyFirstStruct derivedToFirst(final software.amazon.jsii.tests.calculator.DerivedStruct derived) {
        return this.jsiiCall("derivedToFirst", software.amazon.jsii.tests.calculator.lib.MyFirstStruct.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(derived, "derived is required")).toArray());
    }

    /**
     * Returns the boolean from a DerivedStruct struct.
     * 
     */
    public software.amazon.jsii.tests.calculator.DoubleTrouble readDerivedNonPrimitive(final software.amazon.jsii.tests.calculator.DerivedStruct derived) {
        return this.jsiiCall("readDerivedNonPrimitive", software.amazon.jsii.tests.calculator.DoubleTrouble.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(derived, "derived is required")).toArray());
    }

    /**
     * Returns the "anumber" from a MyFirstStruct struct;.
     * 
     */
    public java.lang.Number readFirstNumber(final software.amazon.jsii.tests.calculator.lib.MyFirstStruct first) {
        return this.jsiiCall("readFirstNumber", java.lang.Number.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(first, "first is required")).toArray());
    }

    public software.amazon.jsii.tests.calculator.lib.StructWithOnlyOptionals getStructLiteral() {
        return this.jsiiGet("structLiteral", software.amazon.jsii.tests.calculator.lib.StructWithOnlyOptionals.class);
    }
}
