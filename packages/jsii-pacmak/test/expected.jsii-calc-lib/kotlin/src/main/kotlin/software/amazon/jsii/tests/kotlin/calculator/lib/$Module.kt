package software.amazon.jsii.tests.kotlin.calculator.lib

class `$Module`: software.amazon.jsii.JsiiModule("@scope/jsii-calc-lib", "0.0.0", `$Module`::class.java, "jsii-calc-lib@0.0.0.jsii.tgz") {
    override fun resolveClass(fqn: String?): Class<*> {
        return when (fqn) {
            "@scope/jsii-calc-lib.EnumFromScopedModule" -> software.amazon.jsii.tests.kotlin.calculator.lib.EnumFromScopedModule::class.java
            "@scope/jsii-calc-lib.IDoublable" -> software.amazon.jsii.tests.kotlin.calculator.lib.IDoublable::class.java
            "@scope/jsii-calc-lib.IFriendly" -> software.amazon.jsii.tests.kotlin.calculator.lib.IFriendly::class.java
            "@scope/jsii-calc-lib.IThreeLevelsInterface" -> software.amazon.jsii.tests.kotlin.calculator.lib.IThreeLevelsInterface::class.java
            "@scope/jsii-calc-lib.MyFirstStruct" -> software.amazon.jsii.tests.kotlin.calculator.lib.MyFirstStruct::class.java
            "@scope/jsii-calc-lib.Number" -> software.amazon.jsii.tests.kotlin.calculator.lib.Number::class.java
            "@scope/jsii-calc-lib.Operation" -> software.amazon.jsii.tests.kotlin.calculator.lib.Operation::class.java
            "@scope/jsii-calc-lib.StructWithOnlyOptionals" -> software.amazon.jsii.tests.kotlin.calculator.lib.StructWithOnlyOptionals::class.java
            "@scope/jsii-calc-lib.Value" -> software.amazon.jsii.tests.kotlin.calculator.lib.Value::class.java
            "@scope/jsii-calc-lib.submodule.IReflectable" -> software.amazon.jsii.tests.kotlin.calculator.lib.submodule.IReflectable::class.java
            "@scope/jsii-calc-lib.submodule.ReflectableEntry" -> software.amazon.jsii.tests.kotlin.calculator.lib.submodule.ReflectableEntry::class.java
            "@scope/jsii-calc-lib.submodule.Reflector" -> software.amazon.jsii.tests.kotlin.calculator.lib.submodule.Reflector::class.java
            else -> throw ClassNotFoundException("Unknown JSII type: $fqn")
        }
    }
}
