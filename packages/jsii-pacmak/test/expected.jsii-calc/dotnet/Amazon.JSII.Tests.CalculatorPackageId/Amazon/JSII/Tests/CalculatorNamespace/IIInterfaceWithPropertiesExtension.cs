using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIInterfaceWithPropertiesExtension), "jsii-calc.IInterfaceWithPropertiesExtension")]
    public interface IIInterfaceWithPropertiesExtension : IIInterfaceWithProperties
    {
        [JsiiProperty("foo", "{\"primitive\":\"number\"}")]
        double Foo
        {
            get;
            set;
        }
    }
}