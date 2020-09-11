package software.amazon.jsii.tests.kotlin.calculator.baseofbase

@javax.annotation.Generated("jsii-pacmak")
interface VeryBaseProps : software.amazon.jsii.JsiiSerializable {
    val foo: software.amazon.jsii.tests.kotlin.calculator.baseofbase.Very

    class Builder {
        var foo: software.amazon.jsii.tests.kotlin.calculator.baseofbase.Very? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.baseofbase.VeryBaseProps {
            val foo = this.foo ?: kotlin.error("Value for property 'foo' must be specified")
            return `Jsii$Proxy`(foo)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.baseofbase.VeryBaseProps {
        override val foo: software.amazon.jsii.tests.kotlin.calculator.baseofbase.Very

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.foo = this.jsiiCall("foo", software.amazon.jsii.tests.kotlin.calculator.baseofbase.Very::class.java) ?: error("'foo' should be present")
        }

        constructor(foo: software.amazon.jsii.tests.kotlin.calculator.baseofbase.Very) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.foo = foo
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.baseofbase.VeryBaseProps
            if (foo != other.foo) return false
            return true
        }

        override fun hashCode(): Int {
            return this.foo.hashCode()
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("foo", om.valueToTree(this.foo))
            return obj
        }
    }
}
