using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IIPrivatelyImplemented), fullyQualifiedName: "jsii-calc.IPrivatelyImplemented")]
    public interface IIPrivatelyImplemented
    {
        [JsiiProperty(name: "success", typeJson: "{\"primitive\":\"boolean\"}")]
        bool Success
        {
            get;
        }
    }
}