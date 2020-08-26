using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child
{
    [JsiiInterface(nativeType: typeof(IKwargsProps), fullyQualifiedName: "jsii-calc.submodule.child.KwargsProps")]
    public interface IKwargsProps : Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.ISomeStruct
    {
        [JsiiProperty(name: "extra", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        string? Extra
        {
            get
            {
                return null;
            }
        }
    }
}
