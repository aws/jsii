using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.PythonSelf
{
    #pragma warning disable CS8618

    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.PythonSelf.StructWithSelf")]
    public class StructWithSelf : Amazon.JSII.Tests.CalculatorNamespace.PythonSelf.IStructWithSelf
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "self", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Self
        {
            get;
            set;
        }
    }
}
