using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IStructWithCollections), fullyQualifiedName: "jsii-calc.StructWithCollections")]
    internal sealed class StructWithCollectionsProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IStructWithCollections
    {
        private StructWithCollectionsProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "array", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}", isOptional: true)]
        public string[] Array
        {
            get => GetInstanceProperty<string[]>();
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "map", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"map\"}}", isOptional: true)]
        public System.Collections.Generic.IDictionary<string, string> Map
        {
            get => GetInstanceProperty<System.Collections.Generic.IDictionary<string, string>>();
        }
    }
}
