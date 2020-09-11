package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface DiamondInheritanceBaseLevelStruct : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val baseLevelProperty: kotlin.String

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var baseLevelProperty: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.DiamondInheritanceBaseLevelStruct {
            val baseLevelProperty = this.baseLevelProperty ?: kotlin.error("Value for property 'baseLevelProperty' must be specified")
            return `Jsii$Proxy`(baseLevelProperty)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.DiamondInheritanceBaseLevelStruct {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val baseLevelProperty: kotlin.String

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.baseLevelProperty = this.jsiiCall("baseLevelProperty", kotlin.String::class.java) ?: error("'baseLevelProperty' should be present")
        }

        constructor(baseLevelProperty: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.baseLevelProperty = baseLevelProperty
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.DiamondInheritanceBaseLevelStruct
            if (baseLevelProperty != other.baseLevelProperty) return false
            return true
        }

        override fun hashCode(): Int {
            return this.baseLevelProperty.hashCode()
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("baseLevelProperty", om.valueToTree(this.baseLevelProperty))
            return obj
        }
    }
}
