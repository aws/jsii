using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    [JsiiInterface(nativeType: typeof(IBaseProps), fullyQualifiedName: "@scope/jsii-calc-base.BaseProps")]
    public interface IBaseProps : Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.IVeryBaseProps
    {
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"string\"}")]
        string Bar
        {
            get;
        }
    }
}
