using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>Test fixture to verify that jsii modules can use the node standard library.</summary>
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

        /// <summary>Returns the current os.platform() from the "os" node module.</summary>
        [JsiiProperty("osPlatform", "{\"primitive\":\"string\"}")]
        public virtual string OsPlatform
        {
            get => GetInstanceProperty<string>();
        }

        /// <summary>Reads a local resource file (resource.txt) asynchronously.</summary>
        /// <returns>"Hello, resource!"</returns>
        [JsiiMethod("fsReadFile", "{\"primitive\":\"string\",\"promise\":true}", "[]")]
        public virtual string FsReadFile()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Sync version of fsReadFile.</summary>
        /// <returns>"Hello, resource! SYNC!"</returns>
        [JsiiMethod("fsReadFileSync", "{\"primitive\":\"string\"}", "[]")]
        public virtual string FsReadFileSync()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Uses node.js "crypto" module to calculate sha256 of a string.</summary>
        /// <returns>"6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50"</returns>
        [JsiiMethod("cryptoSha256", "{\"primitive\":\"string\"}", "[]")]
        public virtual string CryptoSha256()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}