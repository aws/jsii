package software.amazon.jsii.tests.kotlin.calculator

/**
 * awslabs/jsii#220 Abstract return type.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IInterfaceImplementedByAbstractClass : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val propFromInterface: kotlin.String

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IInterfaceImplementedByAbstractClass {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val propFromInterface: kotlin.String
            get() {
                return this.jsiiGet("propFromInterface", kotlin.String::class.java) ?: error("'propFromInterface' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }
    }
}
