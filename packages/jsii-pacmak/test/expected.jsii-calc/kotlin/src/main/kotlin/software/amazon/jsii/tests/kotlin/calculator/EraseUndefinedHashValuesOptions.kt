package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface EraseUndefinedHashValuesOptions : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val option1: kotlin.String?

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val option2: kotlin.String?

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var option1: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var option2: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.EraseUndefinedHashValuesOptions {
            val option1 = this.option1
            val option2 = this.option2
            return `Jsii$Proxy`(option1, option2)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.EraseUndefinedHashValuesOptions {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val option1: kotlin.String?

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val option2: kotlin.String?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.option1 = this.jsiiCall("option1", kotlin.String::class.java)
            this.option2 = this.jsiiCall("option2", kotlin.String::class.java)
        }

        constructor(option1: kotlin.String?, option2: kotlin.String?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.option1 = option1
            this.option2 = option2
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.EraseUndefinedHashValuesOptions
            if (option1 != other.option1) return false
            if (option2 != other.option2) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.option1?.hashCode() ?: 0
            result = 31 * result + (this.option2?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("option1", om.valueToTree(this.option1))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("option2", om.valueToTree(this.option2))
            return obj
        }
    }
}
