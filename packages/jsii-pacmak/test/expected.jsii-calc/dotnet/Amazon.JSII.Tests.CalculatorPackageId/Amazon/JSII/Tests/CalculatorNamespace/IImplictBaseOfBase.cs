using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace;
using System;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IImplictBaseOfBase), "jsii-calc.ImplictBaseOfBase")]
    public interface IImplictBaseOfBase : IBaseProps
    {
        [JsiiProperty("goo", "{\"primitive\":\"date\"}")]
        DateTime Goo
        {
            get;
        }
    }
}