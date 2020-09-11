package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.VirtualMethodPlayground")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class VirtualMethodPlayground : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun overrideMeAsync(index: kotlin.Number): kotlin.Number {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            index
        )
        return this.jsiiCall("overrideMeAsync", kotlin.Number::class.java, args) ?: error("Method 'overrideMeAsync()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun overrideMeSync(index: kotlin.Number): kotlin.Number {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            index
        )
        return this.jsiiCall("overrideMeSync", kotlin.Number::class.java, args) ?: error("Method 'overrideMeSync()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun parallelSumAsync(count: kotlin.Number): kotlin.Number {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            count
        )
        return this.jsiiCall("parallelSumAsync", kotlin.Number::class.java, args) ?: error("Method 'parallelSumAsync()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun serialSumAsync(count: kotlin.Number): kotlin.Number {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            count
        )
        return this.jsiiCall("serialSumAsync", kotlin.Number::class.java, args) ?: error("Method 'serialSumAsync()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun sumSync(count: kotlin.Number): kotlin.Number {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            count
        )
        return this.jsiiCall("sumSync", kotlin.Number::class.java, args) ?: error("Method 'sumSync()' returned null value")
    }
}
