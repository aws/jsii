using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IIInterfaceWithPropertiesExtension), fullyQualifiedName: "jsii-calc.IInterfaceWithPropertiesExtension")]
    public interface IIInterfaceWithPropertiesExtension : IIInterfaceWithProperties
    {
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}")]
        double Foo
        {
            get;
            set;
        }
    }
}
