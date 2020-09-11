package software.amazon.jsii.tests.kotlin.calculator

/**
 * This intentionally overlaps with StructA (where only requiredString is provided) to test htat the kernel properly disambiguates those.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface StructB : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val requiredString: kotlin.String

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val optionalBoolean: kotlin.Boolean?

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val optionalStructA: software.amazon.jsii.tests.kotlin.calculator.StructA?

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var requiredString: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var optionalBoolean: kotlin.Boolean? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var optionalStructA: software.amazon.jsii.tests.kotlin.calculator.StructA? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.StructB {
            val requiredString = this.requiredString ?: kotlin.error("Value for property 'requiredString' must be specified")
            val optionalBoolean = this.optionalBoolean
            val optionalStructA = this.optionalStructA
            return `Jsii$Proxy`(requiredString, optionalBoolean, optionalStructA)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.StructB {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val requiredString: kotlin.String

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val optionalBoolean: kotlin.Boolean?

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val optionalStructA: software.amazon.jsii.tests.kotlin.calculator.StructA?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.requiredString = this.jsiiCall("requiredString", kotlin.String::class.java) ?: error("'requiredString' should be present")
            this.optionalBoolean = this.jsiiCall("optionalBoolean", kotlin.Boolean::class.java)
            this.optionalStructA = this.jsiiCall("optionalStructA", software.amazon.jsii.tests.kotlin.calculator.StructA::class.java)
        }

        constructor(requiredString: kotlin.String, optionalBoolean: kotlin.Boolean?, optionalStructA: software.amazon.jsii.tests.kotlin.calculator.StructA?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.requiredString = requiredString
            this.optionalBoolean = optionalBoolean
            this.optionalStructA = optionalStructA
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.StructB
            if (requiredString != other.requiredString) return false
            if (optionalBoolean != other.optionalBoolean) return false
            if (optionalStructA != other.optionalStructA) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.requiredString.hashCode()
            result = 31 * result + (this.optionalBoolean?.hashCode() ?: 0)
            result = 31 * result + (this.optionalStructA?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("requiredString", om.valueToTree(this.requiredString))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("optionalBoolean", om.valueToTree(this.optionalBoolean))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("optionalStructA", om.valueToTree(this.optionalStructA))
            return obj
        }
    }
}
