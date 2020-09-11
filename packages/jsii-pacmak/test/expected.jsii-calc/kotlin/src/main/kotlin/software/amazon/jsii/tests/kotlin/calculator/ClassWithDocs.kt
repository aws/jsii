package software.amazon.jsii.tests.kotlin.calculator

/**
 * This class has docs.
 * 
 * The docs are great. They're a bunch of tags.
 * 
 * Example: 
 * function anExample() {
 * }
 * 
 * @see https://aws.amazon.com/
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ClassWithDocs")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
open class ClassWithDocs : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }
}
