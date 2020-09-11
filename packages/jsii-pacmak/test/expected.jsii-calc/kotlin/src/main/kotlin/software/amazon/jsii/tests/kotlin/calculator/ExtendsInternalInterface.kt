package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface ExtendsInternalInterface : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val boom: kotlin.Boolean

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val prop: kotlin.String

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var boom: kotlin.Boolean? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var prop: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.ExtendsInternalInterface {
            val boom = this.boom ?: kotlin.error("Value for property 'boom' must be specified")
            val prop = this.prop ?: kotlin.error("Value for property 'prop' must be specified")
            return `Jsii$Proxy`(boom, prop)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.ExtendsInternalInterface {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val boom: kotlin.Boolean

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val prop: kotlin.String

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.boom = this.jsiiCall("boom", kotlin.Boolean::class.java) ?: error("'boom' should be present")
            this.prop = this.jsiiCall("prop", kotlin.String::class.java) ?: error("'prop' should be present")
        }

        constructor(boom: kotlin.Boolean, prop: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.boom = boom
            this.prop = prop
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.ExtendsInternalInterface
            if (boom != other.boom) return false
            if (prop != other.prop) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.boom.hashCode()
            result = 31 * result + (this.prop.hashCode())
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("boom", om.valueToTree(this.boom))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("prop", om.valueToTree(this.prop))
            return obj
        }
    }
}
