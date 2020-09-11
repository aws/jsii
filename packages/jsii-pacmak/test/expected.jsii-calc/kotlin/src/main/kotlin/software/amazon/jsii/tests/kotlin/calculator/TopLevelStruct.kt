package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface TopLevelStruct : software.amazon.jsii.JsiiSerializable {
    /**
     * This is a required field.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val required: kotlin.String

    /**
     * A union to really stress test our serialization.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val secondLevel: kotlin.Any

    /**
     * You don't have to pass this.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val optional: kotlin.String?

    class Builder {
        /**
         * This is a required field.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var required: kotlin.String? = null

        /**
         * A union to really stress test our serialization.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var secondLevel: kotlin.Any? = null

        /**
         * You don't have to pass this.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var optional: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.TopLevelStruct {
            val required = this.required ?: kotlin.error("Value for property 'required' must be specified")
            val secondLevel = this.secondLevel ?: kotlin.error("Value for property 'secondLevel' must be specified")
            val optional = this.optional
            return `Jsii$Proxy`(required, secondLevel, optional)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.TopLevelStruct {
        /**
         * This is a required field.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val required: kotlin.String

        /**
         * A union to really stress test our serialization.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val secondLevel: kotlin.Any

        /**
         * You don't have to pass this.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val optional: kotlin.String?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.required = this.jsiiCall("required", kotlin.String::class.java) ?: error("'required' should be present")
            this.secondLevel = this.jsiiCall("secondLevel", kotlin.Any::class.java) ?: error("'secondLevel' should be present")
            this.optional = this.jsiiCall("optional", kotlin.String::class.java)
        }

        constructor(required: kotlin.String, secondLevel: kotlin.Any, optional: kotlin.String?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.required = required
            this.secondLevel = secondLevel
            this.optional = optional
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.TopLevelStruct
            if (required != other.required) return false
            if (secondLevel != other.secondLevel) return false
            if (optional != other.optional) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.required.hashCode()
            result = 31 * result + (this.secondLevel.hashCode())
            result = 31 * result + (this.optional?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("required", om.valueToTree(this.required))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("secondLevel", om.valueToTree(this.secondLevel))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("optional", om.valueToTree(this.optional))
            return obj
        }
    }
}
