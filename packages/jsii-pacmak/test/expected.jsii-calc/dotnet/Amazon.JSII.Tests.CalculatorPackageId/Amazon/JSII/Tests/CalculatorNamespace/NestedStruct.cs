using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    #pragma warning disable CS8618

    [JsiiByValue(fqn: "jsii-calc.NestedStruct")]
    public class NestedStruct : Amazon.JSII.Tests.CalculatorNamespace.INestedStruct
    {
        /// <summary>When provided, must be &gt; 0.</summary>
        [JsiiProperty(name: "numberProp", typeJson: "{\"primitive\":\"number\"}", isOverride: true)]
        public double NumberProp
        {
            get;
            set;
        }
    }
}
