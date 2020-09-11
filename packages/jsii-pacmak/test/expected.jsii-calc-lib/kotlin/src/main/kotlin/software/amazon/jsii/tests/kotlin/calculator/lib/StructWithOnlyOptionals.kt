package software.amazon.jsii.tests.kotlin.calculator.lib

/**
 * This is a struct with only optional properties.
 */
@javax.annotation.Generated("jsii-pacmak")
@Deprecated("Declaration is deprecated.")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
interface StructWithOnlyOptionals : software.amazon.jsii.JsiiSerializable {
    /**
     * The first optional!
     */
    @Deprecated("Declaration is deprecated.")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    val optional1: kotlin.String?

    @Deprecated("Declaration is deprecated.")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    val optional2: kotlin.Number?

    @Deprecated("Declaration is deprecated.")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    val optional3: kotlin.Boolean?

    class Builder {
        /**
         * The first optional!
         */
        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        var optional1: kotlin.String? = null

        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        var optional2: kotlin.Number? = null

        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        var optional3: kotlin.Boolean? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.lib.StructWithOnlyOptionals {
            val optional1 = this.optional1
            val optional2 = this.optional2
            val optional3 = this.optional3
            return `Jsii$Proxy`(optional1, optional2, optional3)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.lib.StructWithOnlyOptionals {
        /**
         * The first optional!
         */
        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override val optional1: kotlin.String?

        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override val optional2: kotlin.Number?

        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override val optional3: kotlin.Boolean?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.optional1 = this.jsiiCall("optional1", kotlin.String::class.java)
            this.optional2 = this.jsiiCall("optional2", kotlin.Number::class.java)
            this.optional3 = this.jsiiCall("optional3", kotlin.Boolean::class.java)
        }

        constructor(optional1: kotlin.String?, optional2: kotlin.Number?, optional3: kotlin.Boolean?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.optional1 = optional1
            this.optional2 = optional2
            this.optional3 = optional3
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.lib.StructWithOnlyOptionals
            if (optional1 != other.optional1) return false
            if (optional2 != other.optional2) return false
            if (optional3 != other.optional3) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.optional1?.hashCode() ?: 0
            result = 31 * result + (this.optional2?.hashCode() ?: 0)
            result = 31 * result + (this.optional3?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("optional1", om.valueToTree(this.optional1))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("optional2", om.valueToTree(this.optional2))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("optional3", om.valueToTree(this.optional3))
            return obj
        }
    }
}
