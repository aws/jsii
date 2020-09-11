package software.amazon.jsii.tests.kotlin.calculator.lib

/**
 * Applies to classes that are considered friendly.
 * 
 * These classes can be greeted with
 * a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
 */
@javax.annotation.Generated("jsii-pacmak")
@Deprecated("Declaration is deprecated.")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
interface IFriendly : software.amazon.jsii.JsiiSerializable {
    /**
     * Say hello!
     */
    @Deprecated("Declaration is deprecated.")
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    fun hello(): kotlin.String

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.lib.IFriendly {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        /**
         * Say hello!
         */
        @Deprecated("Declaration is deprecated.")
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override fun hello(): kotlin.String {
            return this.jsiiCall("hello", kotlin.String::class.java) ?: error("Method 'hello()' returned null value")
        }
    }
}
