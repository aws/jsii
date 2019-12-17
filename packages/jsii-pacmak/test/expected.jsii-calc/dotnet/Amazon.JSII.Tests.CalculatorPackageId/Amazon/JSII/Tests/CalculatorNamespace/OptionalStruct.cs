using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.OptionalStruct")]
    public class OptionalStruct : Amazon.JSII.Tests.CalculatorNamespace.IOptionalStruct
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "field", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string Field
        {
            get;
            set;
        }
    }
}
