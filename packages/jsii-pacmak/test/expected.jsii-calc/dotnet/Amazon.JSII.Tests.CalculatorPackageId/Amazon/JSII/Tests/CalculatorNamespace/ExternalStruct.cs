using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    #pragma warning disable CS8618

    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// 
    /// <strong>External</strong>: true
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.ExternalStruct")]
    public class ExternalStruct : Amazon.JSII.Tests.CalculatorNamespace.IExternalStruct
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// 
        /// <strong>External</strong>: true
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string ReadonlyProperty
        {
            get;
            set;
        }
    }
}
