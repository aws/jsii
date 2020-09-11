package software.amazon.jsii.tests.kotlin.calculator

/**
 * Verifies that collections of interfaces or structs are correctly handled.
 * 
 * See: https://github.com/aws/jsii/issues/1196
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.InterfaceCollections")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class InterfaceCollections : software.amazon.jsii.JsiiObject {
    companion object {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun listOfInterfaces(): kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.IBell> {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.InterfaceCollections::class.java, "listOfInterfaces", kotlin.collections.List::class.java) as? kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.IBell> ?: error("Method 'listOfInterfaces()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun listOfStructs(): kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.StructA> {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.InterfaceCollections::class.java, "listOfStructs", kotlin.collections.List::class.java) as? kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.StructA> ?: error("Method 'listOfStructs()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun mapOfInterfaces(): kotlin.collections.Map<kotlin.String, software.amazon.jsii.tests.kotlin.calculator.IBell> {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.InterfaceCollections::class.java, "mapOfInterfaces", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, software.amazon.jsii.tests.kotlin.calculator.IBell> ?: error("Method 'mapOfInterfaces()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun mapOfStructs(): kotlin.collections.Map<kotlin.String, software.amazon.jsii.tests.kotlin.calculator.StructA> {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.InterfaceCollections::class.java, "mapOfStructs", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, software.amazon.jsii.tests.kotlin.calculator.StructA> ?: error("Method 'mapOfStructs()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)
}
