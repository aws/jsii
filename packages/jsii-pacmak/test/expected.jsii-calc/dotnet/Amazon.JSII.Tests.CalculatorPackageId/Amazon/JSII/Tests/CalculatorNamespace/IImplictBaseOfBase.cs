using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IImplictBaseOfBase), fullyQualifiedName: "jsii-calc.ImplictBaseOfBase")]
    public interface IImplictBaseOfBase : IBaseProps
    {
        [JsiiProperty(name: "goo", typeJson: "{\"primitive\":\"date\"}")]
        System.DateTime Goo
        {
            get;
        }
    }
}
