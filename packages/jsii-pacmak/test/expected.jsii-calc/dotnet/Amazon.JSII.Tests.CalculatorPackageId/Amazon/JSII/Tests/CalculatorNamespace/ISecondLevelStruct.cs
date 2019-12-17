using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(ISecondLevelStruct), fullyQualifiedName: "jsii-calc.SecondLevelStruct")]
    public interface ISecondLevelStruct
    {
        /// <summary>It's long and required.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "deeperRequiredProp", typeJson: "{\"primitive\":\"string\"}")]
        string DeeperRequiredProp
        {
            get;
        }

        /// <summary>It's long, but you'll almost never pass it.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "deeperOptionalProp", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        string DeeperOptionalProp
        {
            get
            {
                return null;
            }
        }
    }
}
