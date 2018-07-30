package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.GiveMeStructs")
public class GiveMeStructs extends org.jsii.JsiiObject {
    protected GiveMeStructs(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public GiveMeStructs() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    /**
     * Returns the "anumber" from a MyFirstStruct struct;
     */
    public java.lang.Number readFirstNumber(final org.jsii.tests.calculator.lib.MyFirstStruct first) {
        return this.jsiiCall("readFirstNumber", java.lang.Number.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(first, "first is required")).toArray());
    }
    /**
     * Returns the boolean from a DerivedStruct struct.
     */
    public org.jsii.tests.calculator.DoubleTrouble readDerivedNonPrimitive(final org.jsii.tests.calculator.DerivedStruct derived) {
        return this.jsiiCall("readDerivedNonPrimitive", org.jsii.tests.calculator.DoubleTrouble.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(derived, "derived is required")).toArray());
    }
    /**
     * Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.
     */
    public org.jsii.tests.calculator.lib.MyFirstStruct derivedToFirst(final org.jsii.tests.calculator.DerivedStruct derived) {
        return this.jsiiCall("derivedToFirst", org.jsii.tests.calculator.lib.MyFirstStruct.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(derived, "derived is required")).toArray());
    }
    public org.jsii.tests.calculator.lib.StructWithOnlyOptionals getStructLiteral() {
        return this.jsiiGet("structLiteral", org.jsii.tests.calculator.lib.StructWithOnlyOptionals.class);
    }
}
