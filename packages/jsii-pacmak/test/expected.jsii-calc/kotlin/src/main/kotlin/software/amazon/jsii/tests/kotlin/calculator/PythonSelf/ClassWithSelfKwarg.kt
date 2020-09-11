package software.amazon.jsii.tests.kotlin.calculator.PythonSelf

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.PythonSelf.ClassWithSelfKwarg")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ClassWithSelfKwarg : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(props: software.amazon.jsii.tests.kotlin.calculator.PythonSelf.StructWithSelf) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            props
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val props: software.amazon.jsii.tests.kotlin.calculator.PythonSelf.StructWithSelf
        get() {
            return this.jsiiGet("props", software.amazon.jsii.tests.kotlin.calculator.PythonSelf.StructWithSelf::class.java) ?: error("'props' should be present")
        }

}
