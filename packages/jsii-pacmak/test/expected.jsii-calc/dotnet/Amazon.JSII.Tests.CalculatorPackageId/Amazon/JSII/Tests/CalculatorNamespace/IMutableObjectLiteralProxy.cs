using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IMutableObjectLiteral), fullyQualifiedName: "jsii-calc.IMutableObjectLiteral")]
    internal sealed class IMutableObjectLiteralProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IMutableObjectLiteral
    {
        private IMutableObjectLiteralProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        public string Value
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
