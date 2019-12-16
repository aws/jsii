using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.SecondLevelStruct")]
    public class SecondLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.ISecondLevelStruct
    {
        /// <summary>It's long and required.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "deeperRequiredProp", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string DeeperRequiredProp
        {
            get;
            set;
        }

        /// <summary>It's long, but you'll almost never pass it.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "deeperOptionalProp", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string DeeperOptionalProp
        {
            get;
            set;
        }
    }
}
