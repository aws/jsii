using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Test fixture to verify that jsii modules can use the node standard library.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.NodeStandardLibrary), fullyQualifiedName: "jsii-calc.NodeStandardLibrary")]
    public class NodeStandardLibrary : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public NodeStandardLibrary(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected NodeStandardLibrary(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected NodeStandardLibrary(DeputyProps props): base(props)
        {
        }

        /// <summary>Uses node.js "crypto" module to calculate sha256 of a string.</summary>
        /// <returns>"6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50"</returns>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "cryptoSha256", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string CryptoSha256()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary>Reads a local resource file (resource.txt) asynchronously.</summary>
        /// <returns>"Hello, resource!"</returns>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "fsReadFile", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isAsync: true)]
        public virtual string FsReadFile()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary>Sync version of fsReadFile.</summary>
        /// <returns>"Hello, resource! SYNC!"</returns>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "fsReadFileSync", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string FsReadFileSync()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary>Returns the current os.platform() from the "os" node module.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "osPlatform", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string OsPlatform
        {
            get => GetInstanceProperty<string>();
        }
    }
}
