using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Stable
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IStableStruct), fullyQualifiedName: "jsii-calc.StableStruct")]
    internal sealed class StableStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IStableStruct
    {
        private StableStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Stable
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
