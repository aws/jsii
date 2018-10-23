using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IInterfaceWithPropertiesExtension), "jsii-calc.InterfaceWithPropertiesExtension")]
    public interface IInterfaceWithPropertiesExtension : IInterfaceWithProperties
    {
        [JsiiProperty("foo", "{\"primitive\":\"number\"}")]
        double Foo
        {
            get;
            set;
        }
    }
}