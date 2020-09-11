package software.amazon.jsii.tests.kotlin.calculator.submodule.back_references

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface MyClassReference : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val reference: software.amazon.jsii.tests.kotlin.calculator.submodule.MyClass

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var reference: software.amazon.jsii.tests.kotlin.calculator.submodule.MyClass? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.submodule.back_references.MyClassReference {
            val reference = this.reference ?: kotlin.error("Value for property 'reference' must be specified")
            return `Jsii$Proxy`(reference)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.submodule.back_references.MyClassReference {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val reference: software.amazon.jsii.tests.kotlin.calculator.submodule.MyClass

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.reference = this.jsiiCall("reference", software.amazon.jsii.tests.kotlin.calculator.submodule.MyClass::class.java) ?: error("'reference' should be present")
        }

        constructor(reference: software.amazon.jsii.tests.kotlin.calculator.submodule.MyClass) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.reference = reference
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.submodule.back_references.MyClassReference
            if (reference != other.reference) return false
            return true
        }

        override fun hashCode(): Int {
            return this.reference.hashCode()
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("reference", om.valueToTree(this.reference))
            return obj
        }
    }
}
