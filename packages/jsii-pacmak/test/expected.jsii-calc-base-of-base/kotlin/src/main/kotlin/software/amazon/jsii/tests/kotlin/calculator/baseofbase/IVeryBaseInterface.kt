package software.amazon.jsii.tests.kotlin.calculator.baseofbase

@javax.annotation.Generated("jsii-pacmak")
interface IVeryBaseInterface : software.amazon.jsii.JsiiSerializable {
    fun foo()

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.baseofbase.IVeryBaseInterface {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        override fun foo() {
            this.jsiiCall("foo", kotlin.Unit::class.java) ?: error("Method 'foo()' returned null value")
        }
    }
}
