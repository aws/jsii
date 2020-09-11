package software.amazon.jsii.tests.kotlin.calculator

/**
 * A struct which derives from another struct.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface DerivedStruct : software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.kotlin.calculator.lib.MyFirstStruct {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val anotherRequired: java.time.Instant

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val bool: kotlin.Boolean

    /**
     * An example of a non primitive property.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val nonPrimitive: software.amazon.jsii.tests.kotlin.calculator.DoubleTrouble

    /**
     * This is optional.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val anotherOptional: kotlin.collections.Map<kotlin.String, software.amazon.jsii.tests.kotlin.calculator.lib.Value>?

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val optionalAny: kotlin.Any?

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val optionalArray: kotlin.collections.List<kotlin.String>?

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

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var anotherRequired: java.time.Instant? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var bool: kotlin.Boolean? = null

        /**
         * An example of a non primitive property.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var nonPrimitive: software.amazon.jsii.tests.kotlin.calculator.DoubleTrouble? = null

        /**
         * This is optional.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var anotherOptional: kotlin.collections.Map<kotlin.String, software.amazon.jsii.tests.kotlin.calculator.lib.Value>? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var optionalAny: kotlin.Any? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var optionalArray: kotlin.collections.List<kotlin.String>? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.DerivedStruct {
            val anumber = this.anumber ?: kotlin.error("Value for property 'anumber' must be specified")
            val astring = this.astring ?: kotlin.error("Value for property 'astring' must be specified")
            val firstOptional = this.firstOptional
            val anotherRequired = this.anotherRequired ?: kotlin.error("Value for property 'anotherRequired' must be specified")
            val bool = this.bool ?: kotlin.error("Value for property 'bool' must be specified")
            val nonPrimitive = this.nonPrimitive ?: kotlin.error("Value for property 'nonPrimitive' must be specified")
            val anotherOptional = this.anotherOptional
            val optionalAny = this.optionalAny
            val optionalArray = this.optionalArray
            return `Jsii$Proxy`(anumber, astring, firstOptional, anotherRequired, bool, nonPrimitive, anotherOptional, optionalAny, optionalArray)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.DerivedStruct {
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

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val anotherRequired: java.time.Instant

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val bool: kotlin.Boolean

        /**
         * An example of a non primitive property.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val nonPrimitive: software.amazon.jsii.tests.kotlin.calculator.DoubleTrouble

        /**
         * This is optional.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val anotherOptional: kotlin.collections.Map<kotlin.String, software.amazon.jsii.tests.kotlin.calculator.lib.Value>?

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val optionalAny: kotlin.Any?

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val optionalArray: kotlin.collections.List<kotlin.String>?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.anumber = this.jsiiCall("anumber", kotlin.Number::class.java) ?: error("'anumber' should be present")
            this.astring = this.jsiiCall("astring", kotlin.String::class.java) ?: error("'astring' should be present")
            this.firstOptional = this.jsiiCall("firstOptional", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.String>?
            this.anotherRequired = this.jsiiCall("anotherRequired", java.time.Instant::class.java) ?: error("'anotherRequired' should be present")
            this.bool = this.jsiiCall("bool", kotlin.Boolean::class.java) ?: error("'bool' should be present")
            this.nonPrimitive = this.jsiiCall("nonPrimitive", software.amazon.jsii.tests.kotlin.calculator.DoubleTrouble::class.java) ?: error("'nonPrimitive' should be present")
            this.anotherOptional = this.jsiiCall("anotherOptional", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, software.amazon.jsii.tests.kotlin.calculator.lib.Value>?
            this.optionalAny = this.jsiiCall("optionalAny", kotlin.Any::class.java)
            this.optionalArray = this.jsiiCall("optionalArray", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.String>?
        }

        constructor(anumber: kotlin.Number, astring: kotlin.String, firstOptional: kotlin.collections.List<kotlin.String>?, anotherRequired: java.time.Instant, bool: kotlin.Boolean, nonPrimitive: software.amazon.jsii.tests.kotlin.calculator.DoubleTrouble, anotherOptional: kotlin.collections.Map<kotlin.String, software.amazon.jsii.tests.kotlin.calculator.lib.Value>?, optionalAny: kotlin.Any?, optionalArray: kotlin.collections.List<kotlin.String>?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.anumber = anumber
            this.astring = astring
            this.firstOptional = firstOptional
            this.anotherRequired = anotherRequired
            this.bool = bool
            this.nonPrimitive = nonPrimitive
            this.anotherOptional = anotherOptional
            this.optionalAny = optionalAny
            this.optionalArray = optionalArray
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.DerivedStruct
            if (anumber != other.anumber) return false
            if (astring != other.astring) return false
            if (firstOptional != other.firstOptional) return false
            if (anotherRequired != other.anotherRequired) return false
            if (bool != other.bool) return false
            if (nonPrimitive != other.nonPrimitive) return false
            if (anotherOptional != other.anotherOptional) return false
            if (optionalAny != other.optionalAny) return false
            if (optionalArray != other.optionalArray) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.anumber.hashCode()
            result = 31 * result + (this.astring.hashCode())
            result = 31 * result + (this.firstOptional?.hashCode() ?: 0)
            result = 31 * result + (this.anotherRequired.hashCode())
            result = 31 * result + (this.bool.hashCode())
            result = 31 * result + (this.nonPrimitive.hashCode())
            result = 31 * result + (this.anotherOptional?.hashCode() ?: 0)
            result = 31 * result + (this.optionalAny?.hashCode() ?: 0)
            result = 31 * result + (this.optionalArray?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("anumber", om.valueToTree(this.anumber))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("astring", om.valueToTree(this.astring))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("firstOptional", om.valueToTree(this.firstOptional))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("anotherRequired", om.valueToTree(this.anotherRequired))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("bool", om.valueToTree(this.bool))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("nonPrimitive", om.valueToTree(this.nonPrimitive))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("anotherOptional", om.valueToTree(this.anotherOptional))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("optionalAny", om.valueToTree(this.optionalAny))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("optionalArray", om.valueToTree(this.optionalArray))
            return obj
        }
    }
}
