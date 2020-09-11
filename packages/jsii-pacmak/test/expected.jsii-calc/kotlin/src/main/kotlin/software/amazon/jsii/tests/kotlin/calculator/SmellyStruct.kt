package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface SmellyStruct : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val propertyValue: kotlin.String

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val yetAnoterOne: kotlin.Boolean

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var propertyValue: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var yetAnoterOne: kotlin.Boolean? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.SmellyStruct {
            val propertyValue = this.propertyValue ?: kotlin.error("Value for property 'propertyValue' must be specified")
            val yetAnoterOne = this.yetAnoterOne ?: kotlin.error("Value for property 'yetAnoterOne' must be specified")
            return `Jsii$Proxy`(propertyValue, yetAnoterOne)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.SmellyStruct {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val propertyValue: kotlin.String

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val yetAnoterOne: kotlin.Boolean

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.propertyValue = this.jsiiCall("property", kotlin.String::class.java) ?: error("'property' should be present")
            this.yetAnoterOne = this.jsiiCall("yetAnoterOne", kotlin.Boolean::class.java) ?: error("'yetAnoterOne' should be present")
        }

        constructor(propertyValue: kotlin.String, yetAnoterOne: kotlin.Boolean) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.propertyValue = propertyValue
            this.yetAnoterOne = yetAnoterOne
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.SmellyStruct
            if (propertyValue != other.propertyValue) return false
            if (yetAnoterOne != other.yetAnoterOne) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.propertyValue.hashCode()
            result = 31 * result + (this.yetAnoterOne.hashCode())
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("propertyValue", om.valueToTree(this.propertyValue))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("yetAnoterOne", om.valueToTree(this.yetAnoterOne))
            return obj
        }
    }
}
