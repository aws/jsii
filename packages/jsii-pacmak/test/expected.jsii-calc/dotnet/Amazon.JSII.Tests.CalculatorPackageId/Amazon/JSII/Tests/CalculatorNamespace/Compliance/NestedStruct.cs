using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    #pragma warning disable CS8618

    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.compliance.NestedStruct")]
    public class NestedStruct : Amazon.JSII.Tests.CalculatorNamespace.Compliance.INestedStruct
    {
        /// <summary>When provided, must be &gt; 0.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "numberProp", typeJson: "{\"primitive\":\"number\"}", isOverride: true)]
        public double NumberProp
        {
            get;
            set;
        }
    }
}
