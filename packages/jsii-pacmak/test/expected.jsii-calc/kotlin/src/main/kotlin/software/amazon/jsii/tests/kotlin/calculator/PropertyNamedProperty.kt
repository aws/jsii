package software.amazon.jsii.tests.kotlin.calculator

/**
 * Reproduction for https://github.com/aws/jsii/issues/1113 Where a method or property named "property" would result in impossible to load Python code.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.PropertyNamedProperty")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class PropertyNamedProperty : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val propertyValue: kotlin.String
        get() {
            return this.jsiiGet("property", kotlin.String::class.java) ?: error("'property' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val yetAnoterOne: kotlin.Boolean
        get() {
            return this.jsiiGet("yetAnoterOne", kotlin.Boolean::class.java) ?: error("'yetAnoterOne' should be present")
        }

}
