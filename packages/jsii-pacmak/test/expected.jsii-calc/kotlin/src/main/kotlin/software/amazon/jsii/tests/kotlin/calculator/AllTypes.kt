package software.amazon.jsii.tests.kotlin.calculator

/**
 * This class includes property for all types supported by jsii.
 * 
 * The setters will validate
 * that the value set is of the expected type and throw otherwise.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.AllTypes")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class AllTypes : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val enumPropertyValue: kotlin.Number
        get() {
            return this.jsiiGet("enumPropertyValue", kotlin.Number::class.java) ?: error("'enumPropertyValue' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var anyArrayProperty: kotlin.collections.List<kotlin.Any>
        get() {
            return this.jsiiGet("anyArrayProperty", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.Any> ?: error("'anyArrayProperty' should be present")
        }
        set(v) {
            this.jsiiSet("anyArrayProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var anyMapProperty: kotlin.collections.Map<kotlin.String, kotlin.Any>
        get() {
            return this.jsiiGet("anyMapProperty", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, kotlin.Any> ?: error("'anyMapProperty' should be present")
        }
        set(v) {
            this.jsiiSet("anyMapProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var anyProperty: kotlin.Any
        get() {
            return this.jsiiGet("anyProperty", kotlin.Any::class.java) ?: error("'anyProperty' should be present")
        }
        set(v) {
            this.jsiiSet("anyProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var arrayProperty: kotlin.collections.List<kotlin.String>
        get() {
            return this.jsiiGet("arrayProperty", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.String> ?: error("'arrayProperty' should be present")
        }
        set(v) {
            this.jsiiSet("arrayProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var booleanProperty: kotlin.Boolean
        get() {
            return this.jsiiGet("booleanProperty", kotlin.Boolean::class.java) ?: error("'booleanProperty' should be present")
        }
        set(v) {
            this.jsiiSet("booleanProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var dateProperty: java.time.Instant
        get() {
            return this.jsiiGet("dateProperty", java.time.Instant::class.java) ?: error("'dateProperty' should be present")
        }
        set(v) {
            this.jsiiSet("dateProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var enumProperty: software.amazon.jsii.tests.kotlin.calculator.AllTypesEnum
        get() {
            return this.jsiiGet("enumProperty", software.amazon.jsii.tests.kotlin.calculator.AllTypesEnum::class.java) ?: error("'enumProperty' should be present")
        }
        set(v) {
            this.jsiiSet("enumProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var jsonProperty: com.fasterxml.jackson.databind.node.ObjectNode
        get() {
            return this.jsiiGet("jsonProperty", com.fasterxml.jackson.databind.node.ObjectNode::class.java) ?: error("'jsonProperty' should be present")
        }
        set(v) {
            this.jsiiSet("jsonProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var mapProperty: kotlin.collections.Map<kotlin.String, software.amazon.jsii.tests.kotlin.calculator.lib.Number>
        get() {
            return this.jsiiGet("mapProperty", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, software.amazon.jsii.tests.kotlin.calculator.lib.Number> ?: error("'mapProperty' should be present")
        }
        set(v) {
            this.jsiiSet("mapProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var numberProperty: kotlin.Number
        get() {
            return this.jsiiGet("numberProperty", kotlin.Number::class.java) ?: error("'numberProperty' should be present")
        }
        set(v) {
            this.jsiiSet("numberProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var stringProperty: kotlin.String
        get() {
            return this.jsiiGet("stringProperty", kotlin.String::class.java) ?: error("'stringProperty' should be present")
        }
        set(v) {
            this.jsiiSet("stringProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var unionArrayProperty: kotlin.collections.List<kotlin.Any>
        get() {
            return this.jsiiGet("unionArrayProperty", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.Any> ?: error("'unionArrayProperty' should be present")
        }
        set(v) {
            this.jsiiSet("unionArrayProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var unionMapProperty: kotlin.collections.Map<kotlin.String, kotlin.Any>
        get() {
            return this.jsiiGet("unionMapProperty", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, kotlin.Any> ?: error("'unionMapProperty' should be present")
        }
        set(v) {
            this.jsiiSet("unionMapProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var unionProperty: kotlin.Any
        get() {
            return this.jsiiGet("unionProperty", kotlin.Any::class.java) ?: error("'unionProperty' should be present")
        }
        set(v) {
            this.jsiiSet("unionProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var unknownArrayProperty: kotlin.collections.List<kotlin.Any>
        get() {
            return this.jsiiGet("unknownArrayProperty", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.Any> ?: error("'unknownArrayProperty' should be present")
        }
        set(v) {
            this.jsiiSet("unknownArrayProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var unknownMapProperty: kotlin.collections.Map<kotlin.String, kotlin.Any>
        get() {
            return this.jsiiGet("unknownMapProperty", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, kotlin.Any> ?: error("'unknownMapProperty' should be present")
        }
        set(v) {
            this.jsiiSet("unknownMapProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var unknownProperty: kotlin.Any
        get() {
            return this.jsiiGet("unknownProperty", kotlin.Any::class.java) ?: error("'unknownProperty' should be present")
        }
        set(v) {
            this.jsiiSet("unknownProperty", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var optionalEnumValue: software.amazon.jsii.tests.kotlin.calculator.StringEnum?
        get() {
            return this.jsiiGet("optionalEnumValue", software.amazon.jsii.tests.kotlin.calculator.StringEnum::class.java)
        }
        set(v) {
            this.jsiiSet("optionalEnumValue", v)
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun anyIn(inp: kotlin.Any) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            inp
        )
        this.jsiiCall("anyIn", kotlin.Unit::class.java, args) ?: error("Method 'anyIn()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun anyOut(): kotlin.Any {
        return this.jsiiCall("anyOut", kotlin.Any::class.java) ?: error("Method 'anyOut()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun enumMethod(value: software.amazon.jsii.tests.kotlin.calculator.StringEnum): software.amazon.jsii.tests.kotlin.calculator.StringEnum {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            value
        )
        return this.jsiiCall("enumMethod", software.amazon.jsii.tests.kotlin.calculator.StringEnum::class.java, args) ?: error("Method 'enumMethod()' returned null value")
    }
}
