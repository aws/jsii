package software.amazon.jsii.tests.kotlin.calculator

/**
 * Even friendlier classes can implement this interface.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IFriendlier : software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.kotlin.calculator.lib.IFriendly {
    /**
     * Say farewell.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun farewell(): kotlin.String

    /**
     * Say goodbye.
     * 
     * @return A goodbye blessing.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun goodbye(): kotlin.String

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IFriendlier {
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

        /**
         * Say farewell.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun farewell(): kotlin.String {
            return this.jsiiCall("farewell", kotlin.String::class.java) ?: error("Method 'farewell()' returned null value")
        }

        /**
         * Say goodbye.
         * 
         * @return A goodbye blessing.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun goodbye(): kotlin.String {
            return this.jsiiCall("goodbye", kotlin.String::class.java) ?: error("Method 'goodbye()' returned null value")
        }
    }
}
