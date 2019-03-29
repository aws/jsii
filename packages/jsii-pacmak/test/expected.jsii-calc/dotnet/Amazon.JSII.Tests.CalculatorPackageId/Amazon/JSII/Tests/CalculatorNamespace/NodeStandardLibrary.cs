using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: Test fixture to verify that jsii modules can use the node standard library.</remarks>
    [JsiiClass(typeof(NodeStandardLibrary), "jsii-calc.NodeStandardLibrary", "[]")]
    public class NodeStandardLibrary : DeputyBase
    {
        public NodeStandardLibrary(): base(new DeputyProps(new object[]{}))
        {
        }

        protected NodeStandardLibrary(ByRefValue reference): base(reference)
        {
        }

        protected NodeStandardLibrary(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// remarks: platform() from the "os" node module.
        /// summary: Returns the current os.
        /// </remarks>
        [JsiiProperty("osPlatform", "{\"primitive\":\"string\"}")]
        public virtual string OsPlatform
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// remarks: js "crypto" module to calculate sha256 of a string.
        /// returns: "6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50"
        /// summary: Uses node.
        /// </remarks>
        [JsiiMethod("cryptoSha256", "{\"primitive\":\"string\"}", "[]")]
        public virtual string CryptoSha256()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <remarks>
        /// remarks: txt) asynchronously.
        /// returns: "Hello, resource!"
        /// summary: Reads a local resource file (resource.
        /// </remarks>
        [JsiiMethod("fsReadFile", "{\"primitive\":\"string\",\"promise\":true}", "[]")]
        public virtual string FsReadFile()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <remarks>
        /// returns: "Hello, resource! SYNC!"
        /// summary: Sync version of fsReadFile.
        /// </remarks>
        [JsiiMethod("fsReadFileSync", "{\"primitive\":\"string\"}", "[]")]
        public virtual string FsReadFileSync()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}