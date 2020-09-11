package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface ChildStruct982 : software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.kotlin.calculator.ParentStruct982 {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val bar: kotlin.Number

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var foo: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var bar: kotlin.Number? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.ChildStruct982 {
            val foo = this.foo ?: kotlin.error("Value for property 'foo' must be specified")
            val bar = this.bar ?: kotlin.error("Value for property 'bar' must be specified")
            return `Jsii$Proxy`(foo, bar)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.ChildStruct982 {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val foo: kotlin.String

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val bar: kotlin.Number

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.foo = this.jsiiCall("foo", kotlin.String::class.java) ?: error("'foo' should be present")
            this.bar = this.jsiiCall("bar", kotlin.Number::class.java) ?: error("'bar' should be present")
        }

        constructor(foo: kotlin.String, bar: kotlin.Number) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.foo = foo
            this.bar = bar
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.ChildStruct982
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
