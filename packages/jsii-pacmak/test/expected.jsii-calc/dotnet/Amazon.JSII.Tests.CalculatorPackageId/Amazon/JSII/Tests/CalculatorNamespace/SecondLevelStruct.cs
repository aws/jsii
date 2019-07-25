using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue]
    public class SecondLevelStruct : ISecondLevelStruct
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
        [JsiiProperty(name: "deeperOptionalProp", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string DeeperOptionalProp
        {
            get;
            set;
        }
    }
}
