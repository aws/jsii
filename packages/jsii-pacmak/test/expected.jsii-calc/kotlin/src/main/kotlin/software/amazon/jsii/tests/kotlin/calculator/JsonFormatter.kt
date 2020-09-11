package software.amazon.jsii.tests.kotlin.calculator

/**
 * Make sure structs are un-decorated on the way in.
 * 
 * @see https://github.com/aws/aws-cdk/issues/5066
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.JsonFormatter")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class JsonFormatter : software.amazon.jsii.JsiiObject {
    companion object {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun anyArray(): kotlin.Any {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsonFormatter::class.java, "anyArray", kotlin.Any::class.java) ?: error("Method 'anyArray()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun anyBooleanFalse(): kotlin.Any {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsonFormatter::class.java, "anyBooleanFalse", kotlin.Any::class.java) ?: error("Method 'anyBooleanFalse()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun anyBooleanTrue(): kotlin.Any {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsonFormatter::class.java, "anyBooleanTrue", kotlin.Any::class.java) ?: error("Method 'anyBooleanTrue()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun anyDate(): kotlin.Any {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsonFormatter::class.java, "anyDate", kotlin.Any::class.java) ?: error("Method 'anyDate()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun anyEmptyString(): kotlin.Any {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsonFormatter::class.java, "anyEmptyString", kotlin.Any::class.java) ?: error("Method 'anyEmptyString()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun anyFunction(): kotlin.Any {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsonFormatter::class.java, "anyFunction", kotlin.Any::class.java) ?: error("Method 'anyFunction()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun anyHash(): kotlin.Any {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsonFormatter::class.java, "anyHash", kotlin.Any::class.java) ?: error("Method 'anyHash()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun anyNull(): kotlin.Any {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsonFormatter::class.java, "anyNull", kotlin.Any::class.java) ?: error("Method 'anyNull()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun anyNumber(): kotlin.Any {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsonFormatter::class.java, "anyNumber", kotlin.Any::class.java) ?: error("Method 'anyNumber()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun anyRef(): kotlin.Any {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsonFormatter::class.java, "anyRef", kotlin.Any::class.java) ?: error("Method 'anyRef()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun anyString(): kotlin.Any {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsonFormatter::class.java, "anyString", kotlin.Any::class.java) ?: error("Method 'anyString()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun anyUndefined(): kotlin.Any {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsonFormatter::class.java, "anyUndefined", kotlin.Any::class.java) ?: error("Method 'anyUndefined()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun anyZero(): kotlin.Any {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsonFormatter::class.java, "anyZero", kotlin.Any::class.java) ?: error("Method 'anyZero()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun stringify(value: kotlin.Any?): kotlin.String? {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                value ?: error("'value' should be present")
            )
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsonFormatter::class.java, "stringify", kotlin.String::class.java, args)
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)
}
