using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IIAnotherPublicInterface), fullyQualifiedName: "jsii-calc.IAnotherPublicInterface")]
    public interface IIAnotherPublicInterface
    {
        [JsiiProperty(name: "a", typeJson: "{\"primitive\":\"string\"}")]
        string A
        {
            get;
            set;
        }
    }
}
