using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.BaseOfBase;
using System;

namespace Amazon.JSII.Tests.Calculator
{
    public class ImplictBaseOfBase : DeputyBase, IImplictBaseOfBase
    {
        [JsiiProperty("goo", "{\"primitive\":\"date\"}", true)]
        public DateTime Goo
        {
            get;
            set;
        }

        [JsiiProperty("bar", "{\"primitive\":\"string\"}", true)]
        public string Bar
        {
            get;
            set;
        }

        [JsiiProperty("foo", "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}", true)]
        public Very Foo
        {
            get;
            set;
        }
    }
}