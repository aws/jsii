package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface ImplictBaseOfBase : software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.kotlin.calculator.base.BaseProps {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val goo: java.time.Instant

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var foo: software.amazon.jsii.tests.kotlin.calculator.baseofbase.Very? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var bar: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var goo: java.time.Instant? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.ImplictBaseOfBase {
            val foo = this.foo ?: kotlin.error("Value for property 'foo' must be specified")
            val bar = this.bar ?: kotlin.error("Value for property 'bar' must be specified")
            val goo = this.goo ?: kotlin.error("Value for property 'goo' must be specified")
            return `Jsii$Proxy`(foo, bar, goo)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.ImplictBaseOfBase {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val foo: software.amazon.jsii.tests.kotlin.calculator.baseofbase.Very

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val bar: kotlin.String

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val goo: java.time.Instant

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.foo = this.jsiiCall("foo", software.amazon.jsii.tests.kotlin.calculator.baseofbase.Very::class.java) ?: error("'foo' should be present")
            this.bar = this.jsiiCall("bar", kotlin.String::class.java) ?: error("'bar' should be present")
            this.goo = this.jsiiCall("goo", java.time.Instant::class.java) ?: error("'goo' should be present")
        }

        constructor(foo: software.amazon.jsii.tests.kotlin.calculator.baseofbase.Very, bar: kotlin.String, goo: java.time.Instant) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.foo = foo
            this.bar = bar
            this.goo = goo
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.ImplictBaseOfBase
            if (foo != other.foo) return false
            if (bar != other.bar) return false
            if (goo != other.goo) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.foo.hashCode()
            result = 31 * result + (this.bar.hashCode())
            result = 31 * result + (this.goo.hashCode())
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("foo", om.valueToTree(this.foo))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("bar", om.valueToTree(this.bar))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("goo", om.valueToTree(this.goo))
            return obj
        }
    }
}
