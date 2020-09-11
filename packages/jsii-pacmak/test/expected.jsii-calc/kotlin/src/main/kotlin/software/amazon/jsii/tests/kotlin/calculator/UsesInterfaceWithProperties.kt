package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.UsesInterfaceWithProperties")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class UsesInterfaceWithProperties : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(obj: software.amazon.jsii.tests.kotlin.calculator.IInterfaceWithProperties) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            obj
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val obj: software.amazon.jsii.tests.kotlin.calculator.IInterfaceWithProperties
        get() {
            return this.jsiiGet("obj", software.amazon.jsii.tests.kotlin.calculator.IInterfaceWithProperties::class.java) ?: error("'obj' should be present")
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun justRead(): kotlin.String {
        return this.jsiiCall("justRead", kotlin.String::class.java) ?: error("Method 'justRead()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun readStringAndNumber(ext: software.amazon.jsii.tests.kotlin.calculator.IInterfaceWithPropertiesExtension): kotlin.String {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            ext
        )
        return this.jsiiCall("readStringAndNumber", kotlin.String::class.java, args) ?: error("Method 'readStringAndNumber()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun writeAndRead(value: kotlin.String): kotlin.String {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            value
        )
        return this.jsiiCall("writeAndRead", kotlin.String::class.java, args) ?: error("Method 'writeAndRead()' returned null value")
    }
}
