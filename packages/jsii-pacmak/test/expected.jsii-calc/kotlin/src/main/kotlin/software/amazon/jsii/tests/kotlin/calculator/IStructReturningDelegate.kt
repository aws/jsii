package software.amazon.jsii.tests.kotlin.calculator

/**
 * Verifies that a "pure" implementation of an interface works correctly.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IStructReturningDelegate : software.amazon.jsii.JsiiSerializable {
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun returnStruct(): software.amazon.jsii.tests.kotlin.calculator.StructB

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IStructReturningDelegate {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun returnStruct(): software.amazon.jsii.tests.kotlin.calculator.StructB {
            return this.jsiiCall("returnStruct", software.amazon.jsii.tests.kotlin.calculator.StructB::class.java) ?: error("Method 'returnStruct()' returned null value")
        }
    }
}
