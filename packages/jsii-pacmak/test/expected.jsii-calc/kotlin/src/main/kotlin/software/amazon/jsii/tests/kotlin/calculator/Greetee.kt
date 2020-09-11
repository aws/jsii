package software.amazon.jsii.tests.kotlin.calculator

/**
 * These are some arguments you can pass to a method.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface Greetee : software.amazon.jsii.JsiiSerializable {
    /**
     * The name of the greetee.
     * 
     * Default: world
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val name: kotlin.String?

    class Builder {
        /**
         * The name of the greetee.
         * 
         * Default: world
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var name: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.Greetee {
            val name = this.name
            return `Jsii$Proxy`(name)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.Greetee {
        /**
         * The name of the greetee.
         * 
         * Default: world
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val name: kotlin.String?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.name = this.jsiiCall("name", kotlin.String::class.java)
        }

        constructor(name: kotlin.String?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.name = name
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.Greetee
            if (name != other.name) return false
            return true
        }

        override fun hashCode(): Int {
            return this.name?.hashCode() ?: 0
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("name", om.valueToTree(this.name))
            return obj
        }
    }
}
