package software.amazon.jsii.tests.kotlin.calculator

/**
 * We can serialize and deserialize structs without silently ignoring optional fields.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface StructA : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val requiredString: kotlin.String

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val optionalNumber: kotlin.Number?

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val optionalString: kotlin.String?

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var requiredString: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var optionalNumber: kotlin.Number? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var optionalString: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.StructA {
            val requiredString = this.requiredString ?: kotlin.error("Value for property 'requiredString' must be specified")
            val optionalNumber = this.optionalNumber
            val optionalString = this.optionalString
            return `Jsii$Proxy`(requiredString, optionalNumber, optionalString)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.StructA {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val requiredString: kotlin.String

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val optionalNumber: kotlin.Number?

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val optionalString: kotlin.String?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.requiredString = this.jsiiCall("requiredString", kotlin.String::class.java) ?: error("'requiredString' should be present")
            this.optionalNumber = this.jsiiCall("optionalNumber", kotlin.Number::class.java)
            this.optionalString = this.jsiiCall("optionalString", kotlin.String::class.java)
        }

        constructor(requiredString: kotlin.String, optionalNumber: kotlin.Number?, optionalString: kotlin.String?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.requiredString = requiredString
            this.optionalNumber = optionalNumber
            this.optionalString = optionalString
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.StructA
            if (requiredString != other.requiredString) return false
            if (optionalNumber != other.optionalNumber) return false
            if (optionalString != other.optionalString) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.requiredString.hashCode()
            result = 31 * result + (this.optionalNumber?.hashCode() ?: 0)
            result = 31 * result + (this.optionalString?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("requiredString", om.valueToTree(this.requiredString))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("optionalNumber", om.valueToTree(this.optionalNumber))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("optionalString", om.valueToTree(this.optionalString))
            return obj
        }
    }
}
