package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IJSII417Derived : software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.kotlin.calculator.IJSII417PublicBaseOfBase {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val propertyValue: kotlin.String

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun bar()

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun baz()

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IJSII417Derived {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val hasRoot: kotlin.Boolean
            get() {
                return this.jsiiGet("hasRoot", kotlin.Boolean::class.java) ?: error("'hasRoot' should be present")
            }

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val propertyValue: kotlin.String
            get() {
                return this.jsiiGet("property", kotlin.String::class.java) ?: error("'property' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun foo() {
            this.jsiiCall("foo", kotlin.Unit::class.java) ?: error("Method 'foo()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun bar() {
            this.jsiiCall("bar", kotlin.Unit::class.java) ?: error("Method 'bar()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun baz() {
            this.jsiiCall("baz", kotlin.Unit::class.java) ?: error("Method 'baz()' returned null value")
        }
    }
}
