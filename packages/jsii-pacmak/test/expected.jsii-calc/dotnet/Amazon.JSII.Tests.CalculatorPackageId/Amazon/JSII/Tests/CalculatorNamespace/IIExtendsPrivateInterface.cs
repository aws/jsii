using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiInterface(nativeType: typeof(IIExtendsPrivateInterface), fullyQualifiedName: "jsii-calc.IExtendsPrivateInterface")]
    public interface IIExtendsPrivateInterface
    {
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "moreThings", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}")]
        string[] MoreThings
        {
            get;
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "private", typeJson: "{\"primitive\":\"string\"}")]
        string Private
        {
            get;
            set;
        }
    }
}