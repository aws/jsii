package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.EraseUndefinedHashValues")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class EraseUndefinedHashValues : software.amazon.jsii.JsiiObject {
    companion object {
        /**
         * Returns `true` if `key` is defined in `opts`.
         * 
         * Used to check that undefined/null hash values
         * are being erased when sending values from native code to JS.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun doesKeyExist(opts: software.amazon.jsii.tests.kotlin.calculator.EraseUndefinedHashValuesOptions, key: kotlin.String): kotlin.Boolean {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                opts,
                key
            )
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.EraseUndefinedHashValues::class.java, "doesKeyExist", kotlin.Boolean::class.java, args) ?: error("Method 'doesKeyExist()' returned null value")
        }

        /**
         * We expect "prop1" to be erased.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun prop1IsNull(): kotlin.collections.Map<kotlin.String, kotlin.Any> {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.EraseUndefinedHashValues::class.java, "prop1IsNull", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, kotlin.Any> ?: error("Method 'prop1IsNull()' returned null value")
        }

        /**
         * We expect "prop2" to be erased.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun prop2IsUndefined(): kotlin.collections.Map<kotlin.String, kotlin.Any> {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.EraseUndefinedHashValues::class.java, "prop2IsUndefined", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, kotlin.Any> ?: error("Method 'prop2IsUndefined()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }
}
