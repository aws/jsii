using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.NestedStruct")]
    public class NestedStruct : Amazon.JSII.Tests.CalculatorNamespace.INestedStruct
    {
        /// <summary>When provided, must be > 0.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "numberProp", typeJson: "{\"primitive\":\"number\"}", isOverride: true)]
        public double NumberProp
        {
            get;
            set;
        }
    }
}
