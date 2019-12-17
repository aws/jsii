using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Stable
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.StableStruct")]
    public class StableStruct : Amazon.JSII.Tests.CalculatorNamespace.IStableStruct
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Stable
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string ReadonlyProperty
        {
            get;
            set;
        }
    }
}
