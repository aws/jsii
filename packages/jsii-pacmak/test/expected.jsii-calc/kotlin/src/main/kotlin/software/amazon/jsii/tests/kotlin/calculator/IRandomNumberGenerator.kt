package software.amazon.jsii.tests.kotlin.calculator

/**
 * Generates random numbers.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IRandomNumberGenerator : software.amazon.jsii.JsiiSerializable {
    /**
     * Returns another random number.
     * 
     * @return A random number.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun next(): kotlin.Number

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IRandomNumberGenerator {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        /**
         * Returns another random number.
         * 
         * @return A random number.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun next(): kotlin.Number {
            return this.jsiiCall("next", kotlin.Number::class.java) ?: error("Method 'next()' returned null value")
        }
    }
}
