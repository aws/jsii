package software.amazon.jsii.tests.kotlin.calculator.InterfaceInNamespaceOnlyInterface

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface Hello : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val foo: kotlin.Number

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var foo: kotlin.Number? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.InterfaceInNamespaceOnlyInterface.Hello {
            val foo = this.foo ?: kotlin.error("Value for property 'foo' must be specified")
            return `Jsii$Proxy`(foo)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.InterfaceInNamespaceOnlyInterface.Hello {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val foo: kotlin.Number

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.foo = this.jsiiCall("foo", kotlin.Number::class.java) ?: error("'foo' should be present")
        }

        constructor(foo: kotlin.Number) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.foo = foo
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.InterfaceInNamespaceOnlyInterface.Hello
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
