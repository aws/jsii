package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface OptionalStruct : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val fieldValue: kotlin.String?

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var fieldValue: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.OptionalStruct {
            val fieldValue = this.fieldValue
            return `Jsii$Proxy`(fieldValue)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.OptionalStruct {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val fieldValue: kotlin.String?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.fieldValue = this.jsiiCall("field", kotlin.String::class.java)
        }

        constructor(fieldValue: kotlin.String?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.fieldValue = fieldValue
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.OptionalStruct
            if (fieldValue != other.fieldValue) return false
            return true
        }

        override fun hashCode(): Int {
            return this.fieldValue?.hashCode() ?: 0
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("fieldValue", om.valueToTree(this.fieldValue))
            return obj
        }
    }
}
