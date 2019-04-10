using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IINonInternalInterface), fullyQualifiedName: "jsii-calc.INonInternalInterface")]
    public interface IINonInternalInterface : IIAnotherPublicInterface
    {
        [JsiiProperty(name: "b", typeJson: "{\"primitive\":\"string\"}")]
        string B
        {
            get;
            set;
        }

        [JsiiProperty(name: "c", typeJson: "{\"primitive\":\"string\"}")]
        string C
        {
            get;
            set;
        }
    }
}