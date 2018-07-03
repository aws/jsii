using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiInterface("jsii-calc", "jsii$jsii_calc$.IInterfaceWithPropertiesExtension")]
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