package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface ConfusingToJacksonStruct : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val unionProperty: kotlin.Any?

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var unionProperty: kotlin.Any? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.ConfusingToJacksonStruct {
            val unionProperty = this.unionProperty
            return `Jsii$Proxy`(unionProperty)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.ConfusingToJacksonStruct {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val unionProperty: kotlin.Any?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.unionProperty = this.jsiiCall("unionProperty", kotlin.Any::class.java)
        }

        constructor(unionProperty: kotlin.Any?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.unionProperty = unionProperty
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.ConfusingToJacksonStruct
            if (unionProperty != other.unionProperty) return false
            return true
        }

        override fun hashCode(): Int {
            return this.unionProperty?.hashCode() ?: 0
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("unionProperty", om.valueToTree(this.unionProperty))
            return obj
        }
    }
}
