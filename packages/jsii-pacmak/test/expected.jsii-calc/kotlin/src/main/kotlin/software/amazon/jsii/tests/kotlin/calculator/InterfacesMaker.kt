package software.amazon.jsii.tests.kotlin.calculator

/**
 * We can return arrays of interfaces See aws/aws-cdk#2362.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.InterfacesMaker")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class InterfacesMaker : software.amazon.jsii.JsiiObject {
    companion object {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun makeInterfaces(count: kotlin.Number): kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.lib.IDoublable> {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                count
            )
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.InterfacesMaker::class.java, "makeInterfaces", kotlin.collections.List::class.java, args) as? kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.lib.IDoublable> ?: error("Method 'makeInterfaces()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)
}
