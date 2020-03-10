using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(INonInternalInterface), fullyQualifiedName: "jsii-calc.compliance.INonInternalInterface")]
    public interface INonInternalInterface : Amazon.JSII.Tests.CalculatorNamespace.Compliance.IAnotherPublicInterface
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "b", typeJson: "{\"primitive\":\"string\"}")]
        string B
        {
            get;
            set;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "c", typeJson: "{\"primitive\":\"string\"}")]
        string C
        {
            get;
            set;
        }
    }
}
