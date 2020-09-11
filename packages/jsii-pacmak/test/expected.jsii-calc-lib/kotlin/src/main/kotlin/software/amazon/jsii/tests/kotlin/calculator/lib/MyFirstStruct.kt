package software.amazon.jsii.tests.kotlin.calculator.lib

/**
 * This is the first struct we have created in jsii.
 */
@javax.annotation.Generated("jsii-pacmak")
@Deprecated("Declaration is deprecated.")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
interface MyFirstStruct : software.amazon.jsii.JsiiSerializable {
    /**
     * An awesome number value.
     */
    @Deprecated("Declaration is deprecated.")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    val anumber: kotlin.Number

    /**
     * A string value.
     */
    @Deprecated("Declaration is deprecated.")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    val astring: kotlin.String

    @Deprecated("Declaration is deprecated.")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    val firstOptional: kotlin.collections.List<kotlin.String>?

    class Builder {
        /**
         * An awesome number value.
         */
        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        var anumber: kotlin.Number? = null

        /**
         * A string value.
         */
        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        var astring: kotlin.String? = null

        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        var firstOptional: kotlin.collections.List<kotlin.String>? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.lib.MyFirstStruct {
            val anumber = this.anumber ?: kotlin.error("Value for property 'anumber' must be specified")
            val astring = this.astring ?: kotlin.error("Value for property 'astring' must be specified")
            val firstOptional = this.firstOptional
            return `Jsii$Proxy`(anumber, astring, firstOptional)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.lib.MyFirstStruct {
        /**
         * An awesome number value.
         */
        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override val anumber: kotlin.Number

        /**
         * A string value.
         */
        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override val astring: kotlin.String

        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override val firstOptional: kotlin.collections.List<kotlin.String>?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.anumber = this.jsiiCall("anumber", kotlin.Number::class.java) ?: error("'anumber' should be present")
            this.astring = this.jsiiCall("astring", kotlin.String::class.java) ?: error("'astring' should be present")
            this.firstOptional = this.jsiiCall("firstOptional", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.String>?
        }

        constructor(anumber: kotlin.Number, astring: kotlin.String, firstOptional: kotlin.collections.List<kotlin.String>?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.anumber = anumber
            this.astring = astring
            this.firstOptional = firstOptional
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.lib.MyFirstStruct
            if (anumber != other.anumber) return false
            if (astring != other.astring) return false
            if (firstOptional != other.firstOptional) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.anumber.hashCode()
            result = 31 * result + (this.astring.hashCode())
            result = 31 * result + (this.firstOptional?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("anumber", om.valueToTree(this.anumber))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("astring", om.valueToTree(this.astring))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("firstOptional", om.valueToTree(this.firstOptional))
            return obj
        }
    }
}
