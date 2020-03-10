using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IPublicInterface2), fullyQualifiedName: "jsii-calc.compliance.IPublicInterface2")]
    public interface IPublicInterface2
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "ciao", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        string Ciao();
    }
}
