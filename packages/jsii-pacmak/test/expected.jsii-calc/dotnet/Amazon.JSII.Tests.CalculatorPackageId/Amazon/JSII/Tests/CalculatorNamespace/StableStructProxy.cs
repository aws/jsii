using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IStableStruct), fullyQualifiedName: "jsii-calc.StableStruct")]
    internal sealed class StableStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IStableStruct
    {
        private StableStructProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
