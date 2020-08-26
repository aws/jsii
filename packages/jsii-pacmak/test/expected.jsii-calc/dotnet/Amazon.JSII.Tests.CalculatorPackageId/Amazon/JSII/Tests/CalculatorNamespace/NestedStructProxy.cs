using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(INestedStruct), fullyQualifiedName: "jsii-calc.NestedStruct")]
    internal sealed class NestedStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.INestedStruct
    {
        private NestedStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>When provided, must be &gt; 0.</summary>
        [JsiiProperty(name: "numberProp", typeJson: "{\"primitive\":\"number\"}")]
        public double NumberProp
        {
            get => GetInstanceProperty<double>();
        }
    }
}
