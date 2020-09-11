package software.amazon.jsii.tests.kotlin.calculator.submodule.child

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface Structure : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val bool: kotlin.Boolean

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var bool: kotlin.Boolean? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.submodule.child.Structure {
            val bool = this.bool ?: kotlin.error("Value for property 'bool' must be specified")
            return `Jsii$Proxy`(bool)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.submodule.child.Structure {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val bool: kotlin.Boolean

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.bool = this.jsiiCall("bool", kotlin.Boolean::class.java) ?: error("'bool' should be present")
        }

        constructor(bool: kotlin.Boolean) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.bool = bool
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.submodule.child.Structure
            if (bool != other.bool) return false
            return true
        }

        override fun hashCode(): Int {
            return this.bool.hashCode()
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("bool", om.valueToTree(this.bool))
            return obj
        }
    }
}
