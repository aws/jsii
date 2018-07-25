package org.jsii.tests.calculator;
/**
 * Test fixture to verify that jsii modules can use the node standard library.
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.NodeStandardLibrary")
public class NodeStandardLibrary extends org.jsii.JsiiObject {
    protected NodeStandardLibrary(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public NodeStandardLibrary() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    /**
     * Reads a local resource file (resource.txt) asynchronously.
     * @return "Hello, resource!"
     */
    public java.lang.String fsReadFile() {
        return this.jsiiAsyncCall("fsReadFile", java.lang.String.class);
    }
    /**
     * Sync version of fsReadFile.
     * @return "Hello, resource! SYNC!"
     */
    public java.lang.String fsReadFileSync() {
        return this.jsiiCall("fsReadFileSync", java.lang.String.class);
    }
    /**
     * Uses node.js "crypto" module to calculate sha256 of a string.
     * @return "6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50"
     */
    public java.lang.String cryptoSha256() {
        return this.jsiiCall("cryptoSha256", java.lang.String.class);
    }
    /**
     * Returns the current os.platform() from the "os" node module.
     */
    public java.lang.String getOsPlatform() {
        return this.jsiiGet("osPlatform", java.lang.String.class);
    }
}
