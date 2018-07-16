package org.jsii.tests.calculator;
/**
 * Tests to verify that jsii modules can use the node standard library.
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
     * @returns "Hello, resource!"
     * Reads a local resource file (resource.txt) asynchronously.
     */
    public java.lang.String fsReadFile() {
        return this.jsiiAsyncCall("fsReadFile", java.lang.String.class);
    }
    /**
     * @returns "Hello, resource! SYNC!"
     * Sync version of fsReadFile.
     */
    public java.lang.String fsReadFileSync() {
        return this.jsiiCall("fsReadFileSync", java.lang.String.class);
    }
    /**
     * @returns "6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50"
     * Uses node.js "crypto" module to calculate sha256 of a string.
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
