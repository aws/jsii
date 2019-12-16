using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(INonInternalInterface), fullyQualifiedName: "jsii-calc.INonInternalInterface")]
    public interface INonInternalInterface : Amazon.JSII.Tests.CalculatorNamespace.IAnotherPublicInterface
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "b", typeJson: "{\"primitive\":\"string\"}")]
        string B
        {
            get;
            set;
        }

        /// <summary></summary>
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
