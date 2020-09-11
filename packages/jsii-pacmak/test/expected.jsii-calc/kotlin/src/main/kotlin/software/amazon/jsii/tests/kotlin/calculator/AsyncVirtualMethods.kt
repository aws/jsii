package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.AsyncVirtualMethods")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class AsyncVirtualMethods : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun callMe(): kotlin.Number {
        return this.jsiiCall("callMe", kotlin.Number::class.java) ?: error("Method 'callMe()' returned null value")
    }

    /**
     * Just calls "overrideMeToo".
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun callMe2(): kotlin.Number {
        return this.jsiiCall("callMe2", kotlin.Number::class.java) ?: error("Method 'callMe2()' returned null value")
    }

    /**
     * This method calls the "callMe" async method indirectly, which will then invoke a virtual method.
     * 
     * This is a "double promise" situation, which
     * means that callbacks are not going to be available immediate, but only
     * after an "immediates" cycle.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun callMeDoublePromise(): kotlin.Number {
        return this.jsiiCall("callMeDoublePromise", kotlin.Number::class.java) ?: error("Method 'callMeDoublePromise()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun dontOverrideMe(): kotlin.Number {
        return this.jsiiCall("dontOverrideMe", kotlin.Number::class.java) ?: error("Method 'dontOverrideMe()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun overrideMe(mult: kotlin.Number): kotlin.Number {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            mult
        )
        return this.jsiiCall("overrideMe", kotlin.Number::class.java, args) ?: error("Method 'overrideMe()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun overrideMeToo(): kotlin.Number {
        return this.jsiiCall("overrideMeToo", kotlin.Number::class.java) ?: error("Method 'overrideMeToo()' returned null value")
    }
}
