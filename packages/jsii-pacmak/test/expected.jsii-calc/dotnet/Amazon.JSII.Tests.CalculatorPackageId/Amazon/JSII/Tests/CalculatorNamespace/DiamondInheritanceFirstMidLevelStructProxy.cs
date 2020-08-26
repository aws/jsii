using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IDiamondInheritanceFirstMidLevelStruct), fullyQualifiedName: "jsii-calc.DiamondInheritanceFirstMidLevelStruct")]
    internal sealed class DiamondInheritanceFirstMidLevelStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceFirstMidLevelStruct
    {
        private DiamondInheritanceFirstMidLevelStructProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "firstMidLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string FirstMidLevelProperty
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty(name: "baseLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string BaseLevelProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
