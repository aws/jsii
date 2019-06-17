using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIAnotherPublicInterface), fullyQualifiedName: "jsii-calc.IAnotherPublicInterface")]
    public interface IIAnotherPublicInterface
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "a", typeJson: "{\"primitive\":\"string\"}")]
        string A
        {
            get;
            set;
        }
    }
}
