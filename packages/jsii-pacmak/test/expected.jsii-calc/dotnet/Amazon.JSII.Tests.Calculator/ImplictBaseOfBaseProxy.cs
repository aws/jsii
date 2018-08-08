using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.BaseOfBase;
using System;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiInterfaceProxy(typeof(IImplictBaseOfBase), "jsii-calc.ImplictBaseOfBase")]
    internal class ImplictBaseOfBaseProxy : DeputyBase, IImplictBaseOfBase
    {
        private ImplictBaseOfBaseProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("goo", "{\"primitive\":\"date\"}")]
        public virtual DateTime Goo
        {
            get => GetInstanceProperty<DateTime>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("bar", "{\"primitive\":\"string\"}")]
        public virtual string Bar
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("foo", "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}")]
        public virtual Very Foo
        {
            get => GetInstanceProperty<Very>();
            set => SetInstanceProperty(value);
        }
    }
}