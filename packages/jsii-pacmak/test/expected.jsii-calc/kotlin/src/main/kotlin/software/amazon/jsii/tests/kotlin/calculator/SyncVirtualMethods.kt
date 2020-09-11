package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.SyncVirtualMethods")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class SyncVirtualMethods : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val readonlyProperty: kotlin.String
        get() {
            return this.jsiiGet("readonlyProperty", kotlin.String::class.java) ?: error("'readonlyProperty' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var a: kotlin.Number
        get() {
            return this.jsiiGet("a", kotlin.Number::class.java) ?: error("'a' should be present")
        }
        set(v) {
            this.jsiiSet("a", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var callerIsProperty: kotlin.Number
        get() {
            return this.jsiiGet("callerIsProperty", kotlin.Number::class.java) ?: error("'callerIsProperty' should be present")
        }
        set(v) {
            this.jsiiSet("callerIsProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var otherProperty: kotlin.String
        get() {
            return this.jsiiGet("otherProperty", kotlin.String::class.java) ?: error("'otherProperty' should be present")
        }
        set(v) {
            this.jsiiSet("otherProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var theProperty: kotlin.String
        get() {
            return this.jsiiGet("theProperty", kotlin.String::class.java) ?: error("'theProperty' should be present")
        }
        set(v) {
            this.jsiiSet("theProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var valueOfOtherProperty: kotlin.String
        get() {
            return this.jsiiGet("valueOfOtherProperty", kotlin.String::class.java) ?: error("'valueOfOtherProperty' should be present")
        }
        set(v) {
            this.jsiiSet("valueOfOtherProperty", v)
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun callerIsAsync(): kotlin.Number {
        return this.jsiiCall("callerIsAsync", kotlin.Number::class.java) ?: error("Method 'callerIsAsync()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun callerIsMethod(): kotlin.Number {
        return this.jsiiCall("callerIsMethod", kotlin.Number::class.java) ?: error("Method 'callerIsMethod()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun modifyOtherProperty(value: kotlin.String) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            value
        )
        this.jsiiCall("modifyOtherProperty", kotlin.Unit::class.java, args) ?: error("Method 'modifyOtherProperty()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun modifyValueOfTheProperty(value: kotlin.String) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            value
        )
        this.jsiiCall("modifyValueOfTheProperty", kotlin.Unit::class.java, args) ?: error("Method 'modifyValueOfTheProperty()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun readA(): kotlin.Number {
        return this.jsiiCall("readA", kotlin.Number::class.java) ?: error("Method 'readA()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun retrieveOtherProperty(): kotlin.String {
        return this.jsiiCall("retrieveOtherProperty", kotlin.String::class.java) ?: error("Method 'retrieveOtherProperty()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun retrieveReadOnlyProperty(): kotlin.String {
        return this.jsiiCall("retrieveReadOnlyProperty", kotlin.String::class.java) ?: error("Method 'retrieveReadOnlyProperty()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun retrieveValueOfTheProperty(): kotlin.String {
        return this.jsiiCall("retrieveValueOfTheProperty", kotlin.String::class.java) ?: error("Method 'retrieveValueOfTheProperty()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun virtualMethod(n: kotlin.Number): kotlin.Number {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            n
        )
        return this.jsiiCall("virtualMethod", kotlin.Number::class.java, args) ?: error("Method 'virtualMethod()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun writeA(value: kotlin.Number) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            value
        )
        this.jsiiCall("writeA", kotlin.Unit::class.java, args) ?: error("Method 'writeA()' returned null value")
    }
}
