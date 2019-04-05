using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    [JsiiInterface(typeof(IBaseProps), "@scope/jsii-calc-base.BaseProps")]
    public interface IBaseProps : IVeryBaseProps
    {
        [JsiiProperty("bar", "{\"type\":{\"primitive\":\"string\"}}")]
        string Bar
        {
            get;
        }
    }
}