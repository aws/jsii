using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is a struct with only optional properties.</summary>
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IStructWithOnlyOptionals), fullyQualifiedName: "@scope/jsii-calc-lib.StructWithOnlyOptionals")]
    [System.Obsolete()]
    internal sealed class StructWithOnlyOptionalsProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IStructWithOnlyOptionals
    {
        private StructWithOnlyOptionalsProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The first optional!</summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "optional1", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        [System.Obsolete()]
        public string Optional1
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "optional2", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [System.Obsolete()]
        public double? Optional2
        {
            get => GetInstanceProperty<double?>();
        }

        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "optional3", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true)]
        [System.Obsolete()]
        public bool? Optional3
        {
            get => GetInstanceProperty<bool?>();
        }
    }
}
