using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiByValue]
    public class ExperimentalStruct : Amazon.JSII.Tests.CalculatorNamespace.IExperimentalStruct
    {
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string ReadonlyProperty
        {
            get;
            set;
        }
    }
}