using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.Base;
using System;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiInterface(typeof(IImplictBaseOfBase), "jsii-calc.ImplictBaseOfBase")]
    public interface IImplictBaseOfBase : IBaseProps
    {
        [JsiiProperty("goo", "{\"primitive\":\"date\"}")]
        DateTime Goo
        {
            get;
            set;
        }
    }
}