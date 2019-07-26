using Amazon.JSII.Runtime.Deputy;

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