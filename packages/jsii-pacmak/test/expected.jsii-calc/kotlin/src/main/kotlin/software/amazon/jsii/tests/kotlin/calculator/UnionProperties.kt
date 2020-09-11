package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface UnionProperties : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val bar: kotlin.Any

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val foo: kotlin.Any?

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var bar: kotlin.Any? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var foo: kotlin.Any? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.UnionProperties {
            val bar = this.bar ?: kotlin.error("Value for property 'bar' must be specified")
            val foo = this.foo
            return `Jsii$Proxy`(bar, foo)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.UnionProperties {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val bar: kotlin.Any

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val foo: kotlin.Any?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.bar = this.jsiiCall("bar", kotlin.Any::class.java) ?: error("'bar' should be present")
            this.foo = this.jsiiCall("foo", kotlin.Any::class.java)
        }

        constructor(bar: kotlin.Any, foo: kotlin.Any?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.bar = bar
            this.foo = foo
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.UnionProperties
            if (bar != other.bar) return false
            if (foo != other.foo) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.bar.hashCode()
            result = 31 * result + (this.foo?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("bar", om.valueToTree(this.bar))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("foo", om.valueToTree(this.foo))
            return obj
        }
    }
}
