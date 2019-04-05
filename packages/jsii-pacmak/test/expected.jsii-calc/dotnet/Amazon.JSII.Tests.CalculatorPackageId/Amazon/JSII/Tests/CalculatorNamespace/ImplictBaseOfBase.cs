using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace;
using System;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue]
    public class ImplictBaseOfBase : IImplictBaseOfBase
    {
        [JsiiProperty("goo", "{\"type\":{\"primitive\":\"date\"}}", true)]
        public DateTime Goo
        {
            get;
            set;
        }

        [JsiiProperty("bar", "{\"type\":{\"primitive\":\"string\"}}", true)]
        public string Bar
        {
            get;
            set;
        }

        [JsiiProperty("foo", "{\"type\":{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}}", true)]
        public Very Foo
        {
            get;
            set;
        }
    }
}