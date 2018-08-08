using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.BaseOfBase;

namespace Amazon.JSII.Tests.Calculator.Base
{
    [JsiiInterface(typeof(IBaseProps), "@scope/jsii-calc-base.BaseProps")]
    public interface IBaseProps : IVeryBaseProps
    {
        [JsiiProperty("bar", "{\"primitive\":\"string\"}")]
        string Bar
        {
            get;
            set;
        }
    }
}