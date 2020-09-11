package software.amazon.jsii.tests.kotlin.calculator.lib.submodule

@javax.annotation.Generated("jsii-pacmak")
@Deprecated("Declaration is deprecated.")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
interface ReflectableEntry : software.amazon.jsii.JsiiSerializable {
    @Deprecated("Declaration is deprecated.")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    val key: kotlin.String

    @Deprecated("Declaration is deprecated.")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    val value: kotlin.Any

    class Builder {
        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        var key: kotlin.String? = null

        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        var value: kotlin.Any? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.lib.submodule.ReflectableEntry {
            val key = this.key ?: kotlin.error("Value for property 'key' must be specified")
            val value = this.value ?: kotlin.error("Value for property 'value' must be specified")
            return `Jsii$Proxy`(key, value)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.lib.submodule.ReflectableEntry {
        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override val key: kotlin.String

        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override val value: kotlin.Any

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.key = this.jsiiCall("key", kotlin.String::class.java) ?: error("'key' should be present")
            this.value = this.jsiiCall("value", kotlin.Any::class.java) ?: error("'value' should be present")
        }

        constructor(key: kotlin.String, value: kotlin.Any) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.key = key
            this.value = value
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.lib.submodule.ReflectableEntry
            if (key != other.key) return false
            if (value != other.value) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.key.hashCode()
            result = 31 * result + (this.value.hashCode())
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("key", om.valueToTree(this.key))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("value", om.valueToTree(this.value))
            return obj
        }
    }
}
