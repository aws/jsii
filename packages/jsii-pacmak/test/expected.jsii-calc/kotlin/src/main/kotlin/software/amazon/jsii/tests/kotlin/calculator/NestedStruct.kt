package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface NestedStruct : software.amazon.jsii.JsiiSerializable {
    /**
     * When provided, must be > 0.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val numberProp: kotlin.Number

    class Builder {
        /**
         * When provided, must be > 0.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var numberProp: kotlin.Number? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.NestedStruct {
            val numberProp = this.numberProp ?: kotlin.error("Value for property 'numberProp' must be specified")
            return `Jsii$Proxy`(numberProp)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.NestedStruct {
        /**
         * When provided, must be > 0.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val numberProp: kotlin.Number

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.numberProp = this.jsiiCall("numberProp", kotlin.Number::class.java) ?: error("'numberProp' should be present")
        }

        constructor(numberProp: kotlin.Number) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.numberProp = numberProp
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.NestedStruct
            if (numberProp != other.numberProp) return false
            return true
        }

        override fun hashCode(): Int {
            return this.numberProp.hashCode()
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("numberProp", om.valueToTree(this.numberProp))
            return obj
        }
    }
}
