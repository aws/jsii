using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
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