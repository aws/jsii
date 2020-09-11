package software.amazon.jsii.tests.kotlin.calculator.submodule.child

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface SomeStruct : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val prop: software.amazon.jsii.tests.kotlin.calculator.submodule.child.SomeEnum

    class Builder {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var prop: software.amazon.jsii.tests.kotlin.calculator.submodule.child.SomeEnum? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.submodule.child.SomeStruct {
            val prop = this.prop ?: kotlin.error("Value for property 'prop' must be specified")
            return `Jsii$Proxy`(prop)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.submodule.child.SomeStruct {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val prop: software.amazon.jsii.tests.kotlin.calculator.submodule.child.SomeEnum

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.prop = this.jsiiCall("prop", software.amazon.jsii.tests.kotlin.calculator.submodule.child.SomeEnum::class.java) ?: error("'prop' should be present")
        }

        constructor(prop: software.amazon.jsii.tests.kotlin.calculator.submodule.child.SomeEnum) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.prop = prop
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.submodule.child.SomeStruct
            if (prop != other.prop) return false
            return true
        }

        override fun hashCode(): Int {
            return this.prop.hashCode()
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("prop", om.valueToTree(this.prop))
            return obj
        }
    }
}
