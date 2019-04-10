using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIAnotherPublicInterface), "jsii-calc.IAnotherPublicInterface")]
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