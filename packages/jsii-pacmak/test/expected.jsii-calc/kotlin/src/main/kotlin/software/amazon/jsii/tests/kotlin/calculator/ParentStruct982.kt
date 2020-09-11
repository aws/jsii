package software.amazon.jsii.tests.kotlin.calculator

/**
 * https://github.com/aws/jsii/issues/982.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface ParentStruct982 : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val foo: kotlin.String

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var foo: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.ParentStruct982 {
            val foo = this.foo ?: kotlin.error("Value for property 'foo' must be specified")
            return `Jsii$Proxy`(foo)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.ParentStruct982 {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val foo: kotlin.String

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.foo = this.jsiiCall("foo", kotlin.String::class.java) ?: error("'foo' should be present")
        }

        constructor(foo: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.foo = foo
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.ParentStruct982
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
