package software.amazon.jsii.tests.kotlin.calculator

/**
 * awslabs/jsii#175 Interface proxies (and builders) do not respect optional arguments in methods.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IInterfaceWithOptionalMethodArguments : software.amazon.jsii.JsiiSerializable {
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun hello(arg1: kotlin.String, arg2: kotlin.Number?)

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IInterfaceWithOptionalMethodArguments {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun hello(arg1: kotlin.String, arg2: kotlin.Number?) {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                arg1,
                arg2 ?: error("'arg2' should be present")
            )
            this.jsiiCall("hello", kotlin.Unit::class.java, args) ?: error("Method 'hello()' returned null value")
        }
    }
}
