package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ClassWithJavaReservedWords")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ClassWithJavaReservedWords : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(int: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            int
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val int: kotlin.String
        get() {
            return this.jsiiGet("int", kotlin.String::class.java) ?: error("'int' should be present")
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun doImport(assert: kotlin.String): kotlin.String {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            assert
        )
        return this.jsiiCall("import", kotlin.String::class.java, args) ?: error("Method 'import()' returned null value")
    }
}
