package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.GiveMeStructs")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class GiveMeStructs : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val structLiteral: software.amazon.jsii.tests.kotlin.calculator.lib.StructWithOnlyOptionals
        get() {
            return this.jsiiGet("structLiteral", software.amazon.jsii.tests.kotlin.calculator.lib.StructWithOnlyOptionals::class.java) ?: error("'structLiteral' should be present")
        }

    /**
     * Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun derivedToFirst(derived: software.amazon.jsii.tests.kotlin.calculator.DerivedStruct): software.amazon.jsii.tests.kotlin.calculator.lib.MyFirstStruct {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            derived
        )
        return this.jsiiCall("derivedToFirst", software.amazon.jsii.tests.kotlin.calculator.lib.MyFirstStruct::class.java, args) ?: error("Method 'derivedToFirst()' returned null value")
    }

    /**
     * Returns the boolean from a DerivedStruct struct.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun readDerivedNonPrimitive(derived: software.amazon.jsii.tests.kotlin.calculator.DerivedStruct): software.amazon.jsii.tests.kotlin.calculator.DoubleTrouble {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            derived
        )
        return this.jsiiCall("readDerivedNonPrimitive", software.amazon.jsii.tests.kotlin.calculator.DoubleTrouble::class.java, args) ?: error("Method 'readDerivedNonPrimitive()' returned null value")
    }

    /**
     * Returns the "anumber" from a MyFirstStruct struct;
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun readFirstNumber(first: software.amazon.jsii.tests.kotlin.calculator.lib.MyFirstStruct): kotlin.Number {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            first
        )
        return this.jsiiCall("readFirstNumber", kotlin.Number::class.java, args) ?: error("Method 'readFirstNumber()' returned null value")
    }
}
