package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface DiamondInheritanceTopLevelStruct : software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.kotlin.calculator.DiamondInheritanceFirstMidLevelStruct, software.amazon.jsii.tests.kotlin.calculator.DiamondInheritanceSecondMidLevelStruct {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val topLevelProperty: kotlin.String

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var baseLevelProperty: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var firstMidLevelProperty: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var secondMidLevelProperty: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var topLevelProperty: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.DiamondInheritanceTopLevelStruct {
            val baseLevelProperty = this.baseLevelProperty ?: kotlin.error("Value for property 'baseLevelProperty' must be specified")
            val firstMidLevelProperty = this.firstMidLevelProperty ?: kotlin.error("Value for property 'firstMidLevelProperty' must be specified")
            val secondMidLevelProperty = this.secondMidLevelProperty ?: kotlin.error("Value for property 'secondMidLevelProperty' must be specified")
            val topLevelProperty = this.topLevelProperty ?: kotlin.error("Value for property 'topLevelProperty' must be specified")
            return `Jsii$Proxy`(baseLevelProperty, firstMidLevelProperty, secondMidLevelProperty, topLevelProperty)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.DiamondInheritanceTopLevelStruct {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val baseLevelProperty: kotlin.String

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val firstMidLevelProperty: kotlin.String

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val secondMidLevelProperty: kotlin.String

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val topLevelProperty: kotlin.String

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.baseLevelProperty = this.jsiiCall("baseLevelProperty", kotlin.String::class.java) ?: error("'baseLevelProperty' should be present")
            this.firstMidLevelProperty = this.jsiiCall("firstMidLevelProperty", kotlin.String::class.java) ?: error("'firstMidLevelProperty' should be present")
            this.secondMidLevelProperty = this.jsiiCall("secondMidLevelProperty", kotlin.String::class.java) ?: error("'secondMidLevelProperty' should be present")
            this.topLevelProperty = this.jsiiCall("topLevelProperty", kotlin.String::class.java) ?: error("'topLevelProperty' should be present")
        }

        constructor(baseLevelProperty: kotlin.String, firstMidLevelProperty: kotlin.String, secondMidLevelProperty: kotlin.String, topLevelProperty: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.baseLevelProperty = baseLevelProperty
            this.firstMidLevelProperty = firstMidLevelProperty
            this.secondMidLevelProperty = secondMidLevelProperty
            this.topLevelProperty = topLevelProperty
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.DiamondInheritanceTopLevelStruct
            if (baseLevelProperty != other.baseLevelProperty) return false
            if (firstMidLevelProperty != other.firstMidLevelProperty) return false
            if (secondMidLevelProperty != other.secondMidLevelProperty) return false
            if (topLevelProperty != other.topLevelProperty) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.baseLevelProperty.hashCode()
            result = 31 * result + (this.firstMidLevelProperty.hashCode())
            result = 31 * result + (this.secondMidLevelProperty.hashCode())
            result = 31 * result + (this.topLevelProperty.hashCode())
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("baseLevelProperty", om.valueToTree(this.baseLevelProperty))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("firstMidLevelProperty", om.valueToTree(this.firstMidLevelProperty))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("secondMidLevelProperty", om.valueToTree(this.secondMidLevelProperty))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("topLevelProperty", om.valueToTree(this.topLevelProperty))
            return obj
        }
    }
}
