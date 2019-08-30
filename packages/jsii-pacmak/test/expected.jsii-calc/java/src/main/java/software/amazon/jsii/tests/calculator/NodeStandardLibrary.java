package software.amazon.jsii.tests.calculator;

/**
 * Test fixture to verify that jsii modules can use the node standard library.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.NodeStandardLibrary")
public class NodeStandardLibrary extends software.amazon.jsii.JsiiObject {

    protected NodeStandardLibrary(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected NodeStandardLibrary(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public NodeStandardLibrary() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * Uses node.js "crypto" module to calculate sha256 of a string.
     * 
     * EXPERIMENTAL
     * 
     * @return "6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50"
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String cryptoSha256() {
        return this.jsiiCall("cryptoSha256", java.lang.String.class);
    }

    /**
     * Reads a local resource file (resource.txt) asynchronously.
     * 
     * EXPERIMENTAL
     * 
     * @return "Hello, resource!"
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String fsReadFile() {
        return this.jsiiAsyncCall("fsReadFile", java.lang.String.class);
    }

    /**
     * Sync version of fsReadFile.
     * 
     * EXPERIMENTAL
     * 
     * @return "Hello, resource! SYNC!"
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String fsReadFileSync() {
        return this.jsiiCall("fsReadFileSync", java.lang.String.class);
    }

    /**
     * Returns the current os.platform() from the "os" node module.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getOsPlatform() {
        return this.jsiiGet("osPlatform", java.lang.String.class);
    }
}
