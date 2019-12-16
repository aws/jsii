using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.SmellyStruct")]
    public class SmellyStruct : Amazon.JSII.Tests.CalculatorNamespace.ISmellyStruct
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Property
        {
            get;
            set;
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "yetAnoterOne", typeJson: "{\"primitive\":\"boolean\"}", isOverride: true)]
        public bool YetAnoterOne
        {
            get;
            set;
        }
    }
}
