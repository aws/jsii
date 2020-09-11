package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ClassWithCollections")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ClassWithCollections : software.amazon.jsii.JsiiObject {
    companion object {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var staticArray: kotlin.collections.List<kotlin.String>
            get() {
                return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.ClassWithCollections::class.java, "staticArray", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.String> ?: error("'staticArray' should be present")
            }
            set(v) {
                software.amazon.jsii.JsiiObject.jsiiStaticSet(software.amazon.jsii.tests.kotlin.calculator.ClassWithCollections::class.java, "staticArray", v)
            }

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var staticMap: kotlin.collections.Map<kotlin.String, kotlin.String>
            get() {
                return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.ClassWithCollections::class.java, "staticMap", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, kotlin.String> ?: error("'staticMap' should be present")
            }
            set(v) {
                software.amazon.jsii.JsiiObject.jsiiStaticSet(software.amazon.jsii.tests.kotlin.calculator.ClassWithCollections::class.java, "staticMap", v)
            }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun createAList(): kotlin.collections.List<kotlin.String> {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.ClassWithCollections::class.java, "createAList", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.String> ?: error("Method 'createAList()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun createAMap(): kotlin.collections.Map<kotlin.String, kotlin.String> {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.ClassWithCollections::class.java, "createAMap", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, kotlin.String> ?: error("Method 'createAMap()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(map: kotlin.collections.Map<kotlin.String, kotlin.String>, array: kotlin.collections.List<kotlin.String>) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            map,
            array
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var array: kotlin.collections.List<kotlin.String>
        get() {
            return this.jsiiGet("array", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.String> ?: error("'array' should be present")
        }
        set(v) {
            this.jsiiSet("array", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var map: kotlin.collections.Map<kotlin.String, kotlin.String>
        get() {
            return this.jsiiGet("map", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, kotlin.String> ?: error("'map' should be present")
        }
        set(v) {
            this.jsiiSet("map", v)
        }

}
