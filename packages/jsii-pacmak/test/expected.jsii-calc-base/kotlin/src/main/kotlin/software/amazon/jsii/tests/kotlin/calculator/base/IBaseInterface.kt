package software.amazon.jsii.tests.kotlin.calculator.base

@javax.annotation.Generated("jsii-pacmak")
interface IBaseInterface : software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.kotlin.calculator.baseofbase.IVeryBaseInterface {
    fun bar()

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.base.IBaseInterface {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        override fun foo() {
            this.jsiiCall("foo", kotlin.Unit::class.java) ?: error("Method 'foo()' returned null value")
        }

        override fun bar() {
            this.jsiiCall("bar", kotlin.Unit::class.java) ?: error("Method 'bar()' returned null value")
        }
    }
}
