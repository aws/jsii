package software.amazon.jsii.tests.kotlin.calculator

/**
 * Test fixture to verify that jsii modules can use the node standard library.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.NodeStandardLibrary")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class NodeStandardLibrary : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    /**
     * Returns the current os.platform() from the "os" node module.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val osPlatform: kotlin.String
        get() {
            return this.jsiiGet("osPlatform", kotlin.String::class.java) ?: error("'osPlatform' should be present")
        }

    /**
     * Uses node.js "crypto" module to calculate sha256 of a string.
     * 
     * @return "6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50"
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun cryptoSha256(): kotlin.String {
        return this.jsiiCall("cryptoSha256", kotlin.String::class.java) ?: error("Method 'cryptoSha256()' returned null value")
    }

    /**
     * Reads a local resource file (resource.txt) asynchronously.
     * 
     * @return "Hello, resource!"
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun fsReadFile(): kotlin.String {
        return this.jsiiCall("fsReadFile", kotlin.String::class.java) ?: error("Method 'fsReadFile()' returned null value")
    }

    /**
     * Sync version of fsReadFile.
     * 
     * @return "Hello, resource! SYNC!"
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun fsReadFileSync(): kotlin.String {
        return this.jsiiCall("fsReadFileSync", kotlin.String::class.java) ?: error("Method 'fsReadFileSync()' returned null value")
    }
}
