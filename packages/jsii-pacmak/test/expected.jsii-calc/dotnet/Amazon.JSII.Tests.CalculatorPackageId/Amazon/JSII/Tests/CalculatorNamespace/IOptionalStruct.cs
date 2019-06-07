using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IOptionalStruct), fullyQualifiedName: "jsii-calc.OptionalStruct")]
    public interface IOptionalStruct
    {
        [JsiiProperty(name: "field", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        string Field
        {
            get;
        }
    }
}
