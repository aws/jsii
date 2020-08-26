using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    #pragma warning disable CS8618

    [JsiiByValue(fqn: "jsii-calc.DiamondInheritanceSecondMidLevelStruct")]
    public class DiamondInheritanceSecondMidLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceSecondMidLevelStruct
    {
        [JsiiProperty(name: "secondMidLevelProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string SecondMidLevelProperty
        {
            get;
            set;
        }

        [JsiiProperty(name: "baseLevelProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string BaseLevelProperty
        {
            get;
            set;
        }
    }
}
