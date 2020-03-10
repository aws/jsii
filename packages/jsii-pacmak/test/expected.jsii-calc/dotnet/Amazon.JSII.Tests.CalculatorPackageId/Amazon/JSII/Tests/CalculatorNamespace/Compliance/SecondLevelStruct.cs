using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    #pragma warning disable CS8618

    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.compliance.SecondLevelStruct")]
    public class SecondLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.Compliance.ISecondLevelStruct
    {
        /// <summary>It's long and required.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "deeperRequiredProp", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string DeeperRequiredProp
        {
            get;
            set;
        }

        /// <summary>It's long, but you'll almost never pass it.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "deeperOptionalProp", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? DeeperOptionalProp
        {
            get;
            set;
        }
    }
}
