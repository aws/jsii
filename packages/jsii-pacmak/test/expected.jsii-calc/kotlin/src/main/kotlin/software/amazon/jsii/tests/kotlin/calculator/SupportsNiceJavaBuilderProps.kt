package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface SupportsNiceJavaBuilderProps : software.amazon.jsii.JsiiSerializable {
    /**
     * Some number, like 42.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val bar: kotlin.Number

    /**
     * An `id` field here is terrible API design, because the constructor of `SupportsNiceJavaBuilder` already has a parameter named `id`.
     * 
     * But here we are, doing it like we didn't care.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val id: kotlin.String?

    class Builder {
        /**
         * Some number, like 42.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var bar: kotlin.Number? = null

        /**
         * An `id` field here is terrible API design, because the constructor of `SupportsNiceJavaBuilder` already has a parameter named `id`.
         * 
         * But here we are, doing it like we didn't care.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var id: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.SupportsNiceJavaBuilderProps {
            val bar = this.bar ?: kotlin.error("Value for property 'bar' must be specified")
            val id = this.id
            return `Jsii$Proxy`(bar, id)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.SupportsNiceJavaBuilderProps {
        /**
         * Some number, like 42.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val bar: kotlin.Number

        /**
         * An `id` field here is terrible API design, because the constructor of `SupportsNiceJavaBuilder` already has a parameter named `id`.
         * 
         * But here we are, doing it like we didn't care.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val id: kotlin.String?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.bar = this.jsiiCall("bar", kotlin.Number::class.java) ?: error("'bar' should be present")
            this.id = this.jsiiCall("id", kotlin.String::class.java)
        }

        constructor(bar: kotlin.Number, id: kotlin.String?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.bar = bar
            this.id = id
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.SupportsNiceJavaBuilderProps
            if (bar != other.bar) return false
            if (id != other.id) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.bar.hashCode()
            result = 31 * result + (this.id?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("bar", om.valueToTree(this.bar))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("id", om.valueToTree(this.id))
            return obj
        }
    }
}
