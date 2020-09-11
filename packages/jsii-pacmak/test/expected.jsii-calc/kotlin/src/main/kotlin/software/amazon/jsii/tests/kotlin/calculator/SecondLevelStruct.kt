package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface SecondLevelStruct : software.amazon.jsii.JsiiSerializable {
    /**
     * It's long and required.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val deeperRequiredProp: kotlin.String

    /**
     * It's long, but you'll almost never pass it.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val deeperOptionalProp: kotlin.String?

    class Builder {
        /**
         * It's long and required.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var deeperRequiredProp: kotlin.String? = null

        /**
         * It's long, but you'll almost never pass it.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var deeperOptionalProp: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.SecondLevelStruct {
            val deeperRequiredProp = this.deeperRequiredProp ?: kotlin.error("Value for property 'deeperRequiredProp' must be specified")
            val deeperOptionalProp = this.deeperOptionalProp
            return `Jsii$Proxy`(deeperRequiredProp, deeperOptionalProp)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.SecondLevelStruct {
        /**
         * It's long and required.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val deeperRequiredProp: kotlin.String

        /**
         * It's long, but you'll almost never pass it.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val deeperOptionalProp: kotlin.String?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.deeperRequiredProp = this.jsiiCall("deeperRequiredProp", kotlin.String::class.java) ?: error("'deeperRequiredProp' should be present")
            this.deeperOptionalProp = this.jsiiCall("deeperOptionalProp", kotlin.String::class.java)
        }

        constructor(deeperRequiredProp: kotlin.String, deeperOptionalProp: kotlin.String?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.deeperRequiredProp = deeperRequiredProp
            this.deeperOptionalProp = deeperOptionalProp
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.SecondLevelStruct
            if (deeperRequiredProp != other.deeperRequiredProp) return false
            if (deeperOptionalProp != other.deeperOptionalProp) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.deeperRequiredProp.hashCode()
            result = 31 * result + (this.deeperOptionalProp?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("deeperRequiredProp", om.valueToTree(this.deeperRequiredProp))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("deeperOptionalProp", om.valueToTree(this.deeperOptionalProp))
            return obj
        }
    }
}
