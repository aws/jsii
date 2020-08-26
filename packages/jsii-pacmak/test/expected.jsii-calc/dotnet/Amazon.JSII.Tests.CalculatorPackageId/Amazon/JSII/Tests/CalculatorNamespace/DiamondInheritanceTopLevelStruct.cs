using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    #pragma warning disable CS8618

    [JsiiByValue(fqn: "jsii-calc.DiamondInheritanceTopLevelStruct")]
    public class DiamondInheritanceTopLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceTopLevelStruct
    {
        [JsiiProperty(name: "topLevelProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string TopLevelProperty
        {
            get;
            set;
        }

        [JsiiProperty(name: "firstMidLevelProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string FirstMidLevelProperty
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

        [JsiiProperty(name: "secondMidLevelProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string SecondMidLevelProperty
        {
            get;
            set;
        }
    }
}
