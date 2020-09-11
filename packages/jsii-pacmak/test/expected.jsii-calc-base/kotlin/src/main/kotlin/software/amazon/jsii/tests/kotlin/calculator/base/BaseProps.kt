package software.amazon.jsii.tests.kotlin.calculator.base

@javax.annotation.Generated("jsii-pacmak")
interface BaseProps : software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.kotlin.calculator.baseofbase.VeryBaseProps {
    val bar: kotlin.String

    class Builder {
        var foo: software.amazon.jsii.tests.kotlin.calculator.baseofbase.Very? = null

        var bar: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.base.BaseProps {
            val foo = this.foo ?: kotlin.error("Value for property 'foo' must be specified")
            val bar = this.bar ?: kotlin.error("Value for property 'bar' must be specified")
            return `Jsii$Proxy`(foo, bar)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.base.BaseProps {
        override val foo: software.amazon.jsii.tests.kotlin.calculator.baseofbase.Very

        override val bar: kotlin.String

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.foo = this.jsiiCall("foo", software.amazon.jsii.tests.kotlin.calculator.baseofbase.Very::class.java) ?: error("'foo' should be present")
            this.bar = this.jsiiCall("bar", kotlin.String::class.java) ?: error("'bar' should be present")
        }

        constructor(foo: software.amazon.jsii.tests.kotlin.calculator.baseofbase.Very, bar: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.foo = foo
            this.bar = bar
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.base.BaseProps
            if (foo != other.foo) return false
            if (bar != other.bar) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.foo.hashCode()
            result = 31 * result + (this.bar.hashCode())
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("foo", om.valueToTree(this.foo))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("bar", om.valueToTree(this.bar))
            return obj
        }
    }
}
