using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    [JsiiInterface(nativeType: typeof(IBaseProps), fullyQualifiedName: "@scope/jsii-calc-base.BaseProps")]
    public interface IBaseProps : IVeryBaseProps
    {
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"string\"}")]
        string Bar
        {
            get;
        }
    }
}