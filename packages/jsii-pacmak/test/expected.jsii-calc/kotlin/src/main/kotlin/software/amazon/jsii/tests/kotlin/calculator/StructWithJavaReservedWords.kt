package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface StructWithJavaReservedWords : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val default: kotlin.String

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val assert: kotlin.String?

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val result: kotlin.String?

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val that: kotlin.String?

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var default: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var assert: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var result: kotlin.String? = null

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var that: kotlin.String? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.StructWithJavaReservedWords {
            val default = this.default ?: kotlin.error("Value for property 'default' must be specified")
            val assert = this.assert
            val result = this.result
            val that = this.that
            return `Jsii$Proxy`(default, assert, result, that)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.StructWithJavaReservedWords {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val default: kotlin.String

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val assert: kotlin.String?

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val result: kotlin.String?

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val that: kotlin.String?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.default = this.jsiiCall("default", kotlin.String::class.java) ?: error("'default' should be present")
            this.assert = this.jsiiCall("assert", kotlin.String::class.java)
            this.result = this.jsiiCall("result", kotlin.String::class.java)
            this.that = this.jsiiCall("that", kotlin.String::class.java)
        }

        constructor(default: kotlin.String, assert: kotlin.String?, result: kotlin.String?, that: kotlin.String?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.default = default
            this.assert = assert
            this.result = result
            this.that = that
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.StructWithJavaReservedWords
            if (default != other.default) return false
            if (assert != other.assert) return false
            if (result != other.result) return false
            if (that != other.that) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.default.hashCode()
            result = 31 * result + (this.assert?.hashCode() ?: 0)
            result = 31 * result + (this.result?.hashCode() ?: 0)
            result = 31 * result + (this.that?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("default", om.valueToTree(this.default))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("assert", om.valueToTree(this.assert))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("result", om.valueToTree(this.result))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("that", om.valueToTree(this.that))
            return obj
        }
    }
}
