using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    #pragma warning disable CS8618

    [JsiiByValue(fqn: "jsii-calc.SmellyStruct")]
    public class SmellyStruct : Amazon.JSII.Tests.CalculatorNamespace.ISmellyStruct
    {
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Property
        {
            get;
            set;
        }

        [JsiiProperty(name: "yetAnoterOne", typeJson: "{\"primitive\":\"boolean\"}", isOverride: true)]
        public bool YetAnoterOne
        {
            get;
            set;
        }
    }
}
