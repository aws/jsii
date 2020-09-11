package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.Statics")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class Statics : software.amazon.jsii.JsiiObject {
    companion object {
        /**
         * Constants may also use all-caps.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        val BAR: kotlin.Number
            get() {
                return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Statics::class.java, "BAR", kotlin.Number::class.java) ?: error("'BAR' should be present")
            }

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        val ConstObj: software.amazon.jsii.tests.kotlin.calculator.DoubleTrouble
            get() {
                return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Statics::class.java, "ConstObj", software.amazon.jsii.tests.kotlin.calculator.DoubleTrouble::class.java) ?: error("'ConstObj' should be present")
            }

        /**
         * Jsdocs for static property.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        val Foo: kotlin.String
            get() {
                return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Statics::class.java, "Foo", kotlin.String::class.java) ?: error("'Foo' should be present")
            }

        /**
         * Constants can also use camelCase.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        val zooBar: kotlin.collections.Map<kotlin.String, kotlin.String>
            get() {
                return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Statics::class.java, "zooBar", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, kotlin.String> ?: error("'zooBar' should be present")
            }

        /**
         * Jsdocs for static getter.
         * 
         * Jsdocs for static setter.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var instance: software.amazon.jsii.tests.kotlin.calculator.Statics
            get() {
                return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Statics::class.java, "instance", software.amazon.jsii.tests.kotlin.calculator.Statics::class.java) ?: error("'instance' should be present")
            }
            set(v) {
                software.amazon.jsii.JsiiObject.jsiiStaticSet(software.amazon.jsii.tests.kotlin.calculator.Statics::class.java, "instance", v)
            }

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var nonConstStatic: kotlin.Number
            get() {
                return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Statics::class.java, "nonConstStatic", kotlin.Number::class.java) ?: error("'nonConstStatic' should be present")
            }
            set(v) {
                software.amazon.jsii.JsiiObject.jsiiStaticSet(software.amazon.jsii.tests.kotlin.calculator.Statics::class.java, "nonConstStatic", v)
            }

        /**
         * Jsdocs for static method.
         * 
         * @param nameThe name of the person to say hello to.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun staticMethod(name: kotlin.String): kotlin.String {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                name
            )
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Statics::class.java, "staticMethod", kotlin.String::class.java, args) ?: error("Method 'staticMethod()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(value: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            value
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val value: kotlin.String
        get() {
            return this.jsiiGet("value", kotlin.String::class.java) ?: error("'value' should be present")
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun justMethod(): kotlin.String {
        return this.jsiiCall("justMethod", kotlin.String::class.java) ?: error("Method 'justMethod()' returned null value")
    }
}
