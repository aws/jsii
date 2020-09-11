package software.amazon.jsii.tests.kotlin.calculator.PythonSelf

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface StructWithSelf : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val self: kotlin.String

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var self: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.PythonSelf.StructWithSelf {
            val self = this.self ?: kotlin.error("Value for property 'self' must be specified")
            return `Jsii$Proxy`(self)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.PythonSelf.StructWithSelf {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val self: kotlin.String

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.self = this.jsiiCall("self", kotlin.String::class.java) ?: error("'self' should be present")
        }

        constructor(self: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.self = self
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.PythonSelf.StructWithSelf
            if (self != other.self) return false
            return true
        }

        override fun hashCode(): Int {
            return this.self.hashCode()
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("self", om.valueToTree(this.self))
            return obj
        }
    }
}
