using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IDiamondInheritanceSecondMidLevelStruct), fullyQualifiedName: "jsii-calc.DiamondInheritanceSecondMidLevelStruct")]
    public interface IDiamondInheritanceSecondMidLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceBaseLevelStruct
    {
        [JsiiProperty(name: "secondMidLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        string SecondMidLevelProperty
        {
            get;
        }
    }
}
