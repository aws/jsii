package software.amazon.jsii.tests.kotlin.calculator.PythonSelf

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IInterfaceWithSelf : software.amazon.jsii.JsiiSerializable {
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun method(self: kotlin.Number): kotlin.String

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.PythonSelf.IInterfaceWithSelf {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun method(self: kotlin.Number): kotlin.String {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                self
            )
            return this.jsiiCall("method", kotlin.String::class.java, args) ?: error("Method 'method()' returned null value")
        }
    }
}
