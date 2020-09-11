package software.amazon.jsii.tests.kotlin.calculator

/**
 * This is here to check that we can pass a nested struct into a kwargs by specifying it as an in-line dictionary.
 * 
 * This is cheating with the (current) declared types, but this is the "more
 * idiomatic" way for Pythonists.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface RootStruct : software.amazon.jsii.JsiiSerializable {
    /**
     * May not be empty.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val stringProp: kotlin.String

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val nestedStruct: software.amazon.jsii.tests.kotlin.calculator.NestedStruct?

    class Builder {
        /**
         * May not be empty.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var stringProp: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var nestedStruct: software.amazon.jsii.tests.kotlin.calculator.NestedStruct? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.RootStruct {
            val stringProp = this.stringProp ?: kotlin.error("Value for property 'stringProp' must be specified")
            val nestedStruct = this.nestedStruct
            return `Jsii$Proxy`(stringProp, nestedStruct)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.RootStruct {
        /**
         * May not be empty.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val stringProp: kotlin.String

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val nestedStruct: software.amazon.jsii.tests.kotlin.calculator.NestedStruct?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.stringProp = this.jsiiCall("stringProp", kotlin.String::class.java) ?: error("'stringProp' should be present")
            this.nestedStruct = this.jsiiCall("nestedStruct", software.amazon.jsii.tests.kotlin.calculator.NestedStruct::class.java)
        }

        constructor(stringProp: kotlin.String, nestedStruct: software.amazon.jsii.tests.kotlin.calculator.NestedStruct?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.stringProp = stringProp
            this.nestedStruct = nestedStruct
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.RootStruct
            if (stringProp != other.stringProp) return false
            if (nestedStruct != other.nestedStruct) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.stringProp.hashCode()
            result = 31 * result + (this.nestedStruct?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("stringProp", om.valueToTree(this.stringProp))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("nestedStruct", om.valueToTree(this.nestedStruct))
            return obj
        }
    }
}
