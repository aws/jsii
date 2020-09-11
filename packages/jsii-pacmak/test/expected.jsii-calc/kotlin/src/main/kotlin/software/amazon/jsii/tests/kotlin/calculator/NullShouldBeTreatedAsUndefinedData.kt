package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface NullShouldBeTreatedAsUndefinedData : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val arrayWithThreeElementsAndUndefinedAsSecondArgument: kotlin.collections.List<kotlin.Any>

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val thisShouldBeUndefined: kotlin.Any?

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var arrayWithThreeElementsAndUndefinedAsSecondArgument: kotlin.collections.List<kotlin.Any>? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var thisShouldBeUndefined: kotlin.Any? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.NullShouldBeTreatedAsUndefinedData {
            val arrayWithThreeElementsAndUndefinedAsSecondArgument = this.arrayWithThreeElementsAndUndefinedAsSecondArgument ?: kotlin.error("Value for property 'arrayWithThreeElementsAndUndefinedAsSecondArgument' must be specified")
            val thisShouldBeUndefined = this.thisShouldBeUndefined
            return `Jsii$Proxy`(arrayWithThreeElementsAndUndefinedAsSecondArgument, thisShouldBeUndefined)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.NullShouldBeTreatedAsUndefinedData {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val arrayWithThreeElementsAndUndefinedAsSecondArgument: kotlin.collections.List<kotlin.Any>

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val thisShouldBeUndefined: kotlin.Any?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.arrayWithThreeElementsAndUndefinedAsSecondArgument = this.jsiiCall("arrayWithThreeElementsAndUndefinedAsSecondArgument", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.Any> ?: error("'arrayWithThreeElementsAndUndefinedAsSecondArgument' should be present")
            this.thisShouldBeUndefined = this.jsiiCall("thisShouldBeUndefined", kotlin.Any::class.java)
        }

        constructor(arrayWithThreeElementsAndUndefinedAsSecondArgument: kotlin.collections.List<kotlin.Any>, thisShouldBeUndefined: kotlin.Any?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.arrayWithThreeElementsAndUndefinedAsSecondArgument = arrayWithThreeElementsAndUndefinedAsSecondArgument
            this.thisShouldBeUndefined = thisShouldBeUndefined
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.NullShouldBeTreatedAsUndefinedData
            if (arrayWithThreeElementsAndUndefinedAsSecondArgument != other.arrayWithThreeElementsAndUndefinedAsSecondArgument) return false
            if (thisShouldBeUndefined != other.thisShouldBeUndefined) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.arrayWithThreeElementsAndUndefinedAsSecondArgument.hashCode()
            result = 31 * result + (this.thisShouldBeUndefined?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("arrayWithThreeElementsAndUndefinedAsSecondArgument", om.valueToTree(this.arrayWithThreeElementsAndUndefinedAsSecondArgument))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("thisShouldBeUndefined", om.valueToTree(this.thisShouldBeUndefined))
            return obj
        }
    }
}
