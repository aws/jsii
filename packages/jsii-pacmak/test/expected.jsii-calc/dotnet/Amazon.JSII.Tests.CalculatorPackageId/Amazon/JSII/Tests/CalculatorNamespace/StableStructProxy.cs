using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Stable</remarks>
    [JsiiTypeProxy(nativeType: typeof(IStableStruct), fullyQualifiedName: "jsii-calc.StableStruct")]
    internal sealed class StableStructProxy : DeputyBase, IStableStruct
    {
        private StableStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>stability: Stable</remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}