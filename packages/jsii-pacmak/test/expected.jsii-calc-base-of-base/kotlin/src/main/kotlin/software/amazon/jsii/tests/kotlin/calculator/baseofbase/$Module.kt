package software.amazon.jsii.tests.kotlin.calculator.baseofbase

class `$Module`: software.amazon.jsii.JsiiModule("@scope/jsii-calc-base-of-base", "0.0.0", `$Module`::class.java, "jsii-calc-base-of-base@0.0.0.jsii.tgz") {
    override fun resolveClass(fqn: String?): Class<*> {
        return when (fqn) {
            "@scope/jsii-calc-base-of-base.IVeryBaseInterface" -> software.amazon.jsii.tests.kotlin.calculator.baseofbase.IVeryBaseInterface::class.java
            "@scope/jsii-calc-base-of-base.Very" -> software.amazon.jsii.tests.kotlin.calculator.baseofbase.Very::class.java
            "@scope/jsii-calc-base-of-base.VeryBaseProps" -> software.amazon.jsii.tests.kotlin.calculator.baseofbase.VeryBaseProps::class.java
            else -> throw ClassNotFoundException("Unknown JSII type: $fqn")
        }
    }
}
