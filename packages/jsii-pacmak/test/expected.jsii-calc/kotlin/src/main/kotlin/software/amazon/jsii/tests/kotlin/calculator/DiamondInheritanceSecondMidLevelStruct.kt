package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface DiamondInheritanceSecondMidLevelStruct : software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.kotlin.calculator.DiamondInheritanceBaseLevelStruct {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val secondMidLevelProperty: kotlin.String

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var baseLevelProperty: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var secondMidLevelProperty: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.DiamondInheritanceSecondMidLevelStruct {
            val baseLevelProperty = this.baseLevelProperty ?: kotlin.error("Value for property 'baseLevelProperty' must be specified")
            val secondMidLevelProperty = this.secondMidLevelProperty ?: kotlin.error("Value for property 'secondMidLevelProperty' must be specified")
            return `Jsii$Proxy`(baseLevelProperty, secondMidLevelProperty)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.DiamondInheritanceSecondMidLevelStruct {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val baseLevelProperty: kotlin.String

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val secondMidLevelProperty: kotlin.String

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.baseLevelProperty = this.jsiiCall("baseLevelProperty", kotlin.String::class.java) ?: error("'baseLevelProperty' should be present")
            this.secondMidLevelProperty = this.jsiiCall("secondMidLevelProperty", kotlin.String::class.java) ?: error("'secondMidLevelProperty' should be present")
        }

        constructor(baseLevelProperty: kotlin.String, secondMidLevelProperty: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.baseLevelProperty = baseLevelProperty
            this.secondMidLevelProperty = secondMidLevelProperty
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.DiamondInheritanceSecondMidLevelStruct
            if (baseLevelProperty != other.baseLevelProperty) return false
            if (secondMidLevelProperty != other.secondMidLevelProperty) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.baseLevelProperty.hashCode()
            result = 31 * result + (this.secondMidLevelProperty.hashCode())
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("baseLevelProperty", om.valueToTree(this.baseLevelProperty))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("secondMidLevelProperty", om.valueToTree(this.secondMidLevelProperty))
            return obj
        }
    }
}
