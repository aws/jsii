package software.amazon.jsii.tests.kotlin.calculator

/**
 * Verifies that null/undefined can be returned for optional collections.
 * 
 * This source of collections is disappointing - it'll always give you nothing :(
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.DisappointingCollectionSource")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class DisappointingCollectionSource : software.amazon.jsii.JsiiObject {
    companion object {
        /**
         * Some List of strings, maybe?
         * 
         * (Nah, just a billion dollars mistake!)
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        val maybeList: kotlin.collections.List<kotlin.String>?
            get() {
                return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.DisappointingCollectionSource::class.java, "maybeList", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.String>?
            }

        /**
         * Some Map of strings to numbers, maybe?
         * 
         * (Nah, just a billion dollars mistake!)
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        val maybeMap: kotlin.collections.Map<kotlin.String, kotlin.Number>?
            get() {
                return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.DisappointingCollectionSource::class.java, "maybeMap", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, kotlin.Number>?
            }

    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)
}
