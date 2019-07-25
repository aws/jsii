using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IINonInternalInterface), fullyQualifiedName: "jsii-calc.INonInternalInterface")]
    public interface IINonInternalInterface : Amazon.JSII.Tests.CalculatorNamespace.IIAnotherPublicInterface
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "b", typeJson: "{\"primitive\":\"string\"}")]
        string B
        {
            get;
            set;
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "c", typeJson: "{\"primitive\":\"string\"}")]
        string C
        {
            get;
            set;
        }
    }
}
