package software.amazon.jsii.tests.kotlin.calculator

/**
 * Takes the object parameter as a calss.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IConcreteBellRinger : software.amazon.jsii.JsiiSerializable {
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun yourTurn(bell: software.amazon.jsii.tests.kotlin.calculator.Bell)

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IConcreteBellRinger {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun yourTurn(bell: software.amazon.jsii.tests.kotlin.calculator.Bell) {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                bell
            )
            this.jsiiCall("yourTurn", kotlin.Unit::class.java, args) ?: error("Method 'yourTurn()' returned null value")
        }
    }
}
