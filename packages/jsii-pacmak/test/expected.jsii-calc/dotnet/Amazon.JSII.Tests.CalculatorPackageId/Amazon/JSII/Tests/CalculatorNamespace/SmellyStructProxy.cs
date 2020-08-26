using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(ISmellyStruct), fullyQualifiedName: "jsii-calc.SmellyStruct")]
    internal sealed class SmellyStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.ISmellyStruct
    {
        private SmellyStructProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        public string Property
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty(name: "yetAnoterOne", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool YetAnoterOne
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
