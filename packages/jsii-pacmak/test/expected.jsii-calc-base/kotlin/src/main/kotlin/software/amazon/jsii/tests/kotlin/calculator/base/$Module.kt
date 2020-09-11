package software.amazon.jsii.tests.kotlin.calculator.base

class `$Module`: software.amazon.jsii.JsiiModule("@scope/jsii-calc-base", "0.0.0", `$Module`::class.java, "jsii-calc-base@0.0.0.jsii.tgz") {
    override fun resolveClass(fqn: String?): Class<*> {
        return when (fqn) {
            "@scope/jsii-calc-base.Base" -> software.amazon.jsii.tests.kotlin.calculator.base.Base::class.java
            "@scope/jsii-calc-base.BaseProps" -> software.amazon.jsii.tests.kotlin.calculator.base.BaseProps::class.java
            "@scope/jsii-calc-base.IBaseInterface" -> software.amazon.jsii.tests.kotlin.calculator.base.IBaseInterface::class.java
            else -> throw ClassNotFoundException("Unknown JSII type: $fqn")
        }
    }
}
