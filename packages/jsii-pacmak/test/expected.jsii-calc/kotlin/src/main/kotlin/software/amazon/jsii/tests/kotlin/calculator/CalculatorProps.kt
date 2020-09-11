package software.amazon.jsii.tests.kotlin.calculator

/**
 * Properties for Calculator.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface CalculatorProps : software.amazon.jsii.JsiiSerializable {
    /**
     * The initial value of the calculator.
     * 
     * NOTE: Any number works here, it's fine.
     * 
     * Default: 0
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val initialValue: kotlin.Number?

    /**
     * The maximum value the calculator can store.
     * 
     * Default: none
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val maximumValue: kotlin.Number?

    class Builder {
        /**
         * The initial value of the calculator.
         * 
         * NOTE: Any number works here, it's fine.
         * 
         * Default: 0
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var initialValue: kotlin.Number? = null

        /**
         * The maximum value the calculator can store.
         * 
         * Default: none
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var maximumValue: kotlin.Number? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.CalculatorProps {
            val initialValue = this.initialValue
            val maximumValue = this.maximumValue
            return `Jsii$Proxy`(initialValue, maximumValue)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.CalculatorProps {
        /**
         * The initial value of the calculator.
         * 
         * NOTE: Any number works here, it's fine.
         * 
         * Default: 0
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val initialValue: kotlin.Number?

        /**
         * The maximum value the calculator can store.
         * 
         * Default: none
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val maximumValue: kotlin.Number?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.initialValue = this.jsiiCall("initialValue", kotlin.Number::class.java)
            this.maximumValue = this.jsiiCall("maximumValue", kotlin.Number::class.java)
        }

        constructor(initialValue: kotlin.Number?, maximumValue: kotlin.Number?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.initialValue = initialValue
            this.maximumValue = maximumValue
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.CalculatorProps
            if (initialValue != other.initialValue) return false
            if (maximumValue != other.maximumValue) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.initialValue?.hashCode() ?: 0
            result = 31 * result + (this.maximumValue?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("initialValue", om.valueToTree(this.initialValue))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("maximumValue", om.valueToTree(this.maximumValue))
            return obj
        }
    }
}
