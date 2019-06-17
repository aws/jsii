using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: stable
    /// </remarks>
    [JsiiByValue]
    public class StableStruct : IStableStruct
    {
        /// <remarks>
        /// stability: stable
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string ReadonlyProperty
        {
            get;
            set;
        }
    }
}
