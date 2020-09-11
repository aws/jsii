package software.amazon.jsii.tests.kotlin.calculator

/**
 * 1.
 * 
 * call #takeThis() -> An ObjectRef will be provisioned for the value (it'll be re-used!)
 * 2. call #takeThisToo() -> The ObjectRef from before will need to be down-cased to the ParentStruct982 type
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.Demonstrate982")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class Demonstrate982 : software.amazon.jsii.JsiiObject {
    companion object {
        /**
         * It's dangerous to go alone!
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun takeThis(): software.amazon.jsii.tests.kotlin.calculator.ChildStruct982 {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Demonstrate982::class.java, "takeThis", software.amazon.jsii.tests.kotlin.calculator.ChildStruct982::class.java) ?: error("Method 'takeThis()' returned null value")
        }

        /**
         * It's dangerous to go alone!
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun takeThisToo(): software.amazon.jsii.tests.kotlin.calculator.ParentStruct982 {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Demonstrate982::class.java, "takeThisToo", software.amazon.jsii.tests.kotlin.calculator.ParentStruct982::class.java) ?: error("Method 'takeThisToo()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }
}
