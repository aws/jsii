package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.AnonymousImplementationProvider")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class AnonymousImplementationProvider : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IAnonymousImplementationProvider {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun provideAsClass(): software.amazon.jsii.tests.kotlin.calculator.Implementation {
        return this.jsiiCall("provideAsClass", software.amazon.jsii.tests.kotlin.calculator.Implementation::class.java) ?: error("Method 'provideAsClass()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun provideAsInterface(): software.amazon.jsii.tests.kotlin.calculator.IAnonymouslyImplementMe {
        return this.jsiiCall("provideAsInterface", software.amazon.jsii.tests.kotlin.calculator.IAnonymouslyImplementMe::class.java) ?: error("Method 'provideAsInterface()' returned null value")
    }
}
