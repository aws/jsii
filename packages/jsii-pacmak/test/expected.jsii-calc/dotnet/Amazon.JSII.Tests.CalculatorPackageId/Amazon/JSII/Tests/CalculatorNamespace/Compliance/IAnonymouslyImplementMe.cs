using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IAnonymouslyImplementMe), fullyQualifiedName: "jsii-calc.compliance.IAnonymouslyImplementMe")]
    public interface IAnonymouslyImplementMe
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        double Value
        {
            get;
        }
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "verb", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        string Verb();
    }
}
