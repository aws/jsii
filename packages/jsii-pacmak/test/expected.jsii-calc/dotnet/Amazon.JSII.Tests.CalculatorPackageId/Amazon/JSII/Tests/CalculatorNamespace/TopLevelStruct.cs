using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.TopLevelStruct")]
    public class TopLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.ITopLevelStruct
    {
        /// <summary>This is a required field.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "required", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Required
        {
            get;
            set;
        }

        /// <summary>A union to really stress test our serialization.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "secondLevel", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.SecondLevelStruct\"}]}}", isOverride: true)]
        public object SecondLevel
        {
            get;
            set;
        }

        /// <summary>You don't have to pass this.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optional", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string Optional
        {
            get;
            set;
        }
    }
}
