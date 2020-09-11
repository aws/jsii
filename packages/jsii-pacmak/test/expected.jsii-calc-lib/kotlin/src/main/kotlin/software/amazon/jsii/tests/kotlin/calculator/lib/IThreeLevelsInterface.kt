package software.amazon.jsii.tests.kotlin.calculator.lib

/**
 * Interface that inherits from packages 2 levels up the tree.
 * 
 * Their presence validates that .NET/Java/jsii-reflect can track all fields
 * far enough up the tree.
 */
@javax.annotation.Generated("jsii-pacmak")
@Deprecated("Declaration is deprecated.")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
interface IThreeLevelsInterface : software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.kotlin.calculator.base.IBaseInterface {
    @Deprecated("Declaration is deprecated.")
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    fun baz()

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.lib.IThreeLevelsInterface {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @Deprecated("Declaration is deprecated.")
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override fun foo() {
            this.jsiiCall("foo", kotlin.Unit::class.java) ?: error("Method 'foo()' returned null value")
        }

        @Deprecated("Declaration is deprecated.")
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override fun bar() {
            this.jsiiCall("bar", kotlin.Unit::class.java) ?: error("Method 'bar()' returned null value")
        }

        @Deprecated("Declaration is deprecated.")
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override fun baz() {
            this.jsiiCall("baz", kotlin.Unit::class.java) ?: error("Method 'baz()' returned null value")
        }
    }
}
