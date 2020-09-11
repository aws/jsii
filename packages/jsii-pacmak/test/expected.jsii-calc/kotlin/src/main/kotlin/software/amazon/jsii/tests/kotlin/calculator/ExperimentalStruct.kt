package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface ExperimentalStruct : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val readonlyProperty: kotlin.String

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var readonlyProperty: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.ExperimentalStruct {
            val readonlyProperty = this.readonlyProperty ?: kotlin.error("Value for property 'readonlyProperty' must be specified")
            return `Jsii$Proxy`(readonlyProperty)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.ExperimentalStruct {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val readonlyProperty: kotlin.String

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.readonlyProperty = this.jsiiCall("readonlyProperty", kotlin.String::class.java) ?: error("'readonlyProperty' should be present")
        }

        constructor(readonlyProperty: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.readonlyProperty = readonlyProperty
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.ExperimentalStruct
            if (readonlyProperty != other.readonlyProperty) return false
            return true
        }

        override fun hashCode(): Int {
            return this.readonlyProperty.hashCode()
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("readonlyProperty", om.valueToTree(this.readonlyProperty))
            return obj
        }
    }
}
