package software.amazon.jsii.tests.kotlin.calculator

/**
 * Verifies that, in languages that do keyword lifting (e.g: Python), having a struct member with the same name as a positional parameter results in the correct code being emitted.
 * 
 * See: https://github.com/aws/aws-cdk/issues/4302
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface StructParameterType : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val scope: kotlin.String

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val props: kotlin.Boolean?

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var scope: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var props: kotlin.Boolean? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.StructParameterType {
            val scope = this.scope ?: kotlin.error("Value for property 'scope' must be specified")
            val props = this.props
            return `Jsii$Proxy`(scope, props)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.StructParameterType {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val scope: kotlin.String

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val props: kotlin.Boolean?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.scope = this.jsiiCall("scope", kotlin.String::class.java) ?: error("'scope' should be present")
            this.props = this.jsiiCall("props", kotlin.Boolean::class.java)
        }

        constructor(scope: kotlin.String, props: kotlin.Boolean?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.scope = scope
            this.props = props
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.StructParameterType
            if (scope != other.scope) return false
            if (props != other.props) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.scope.hashCode()
            result = 31 * result + (this.props?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("scope", om.valueToTree(this.scope))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("props", om.valueToTree(this.props))
            return obj
        }
    }
}
