using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IDiamondInheritanceBaseLevelStruct), fullyQualifiedName: "jsii-calc.DiamondInheritanceBaseLevelStruct")]
    internal sealed class DiamondInheritanceBaseLevelStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceBaseLevelStruct
    {
        private DiamondInheritanceBaseLevelStructProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "baseLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string BaseLevelProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
