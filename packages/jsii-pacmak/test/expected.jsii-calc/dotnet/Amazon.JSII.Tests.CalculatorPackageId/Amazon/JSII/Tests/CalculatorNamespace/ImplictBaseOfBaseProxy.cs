using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace;
using System;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IImplictBaseOfBase), "jsii-calc.ImplictBaseOfBase")]
    internal sealed class ImplictBaseOfBaseProxy : DeputyBase, IImplictBaseOfBase
    {
        private ImplictBaseOfBaseProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "goo", typeJson: "{\"primitive\":\"date\"}")]
        public DateTime Goo
        {
            get => GetInstanceProperty<DateTime>();
        }

        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"string\"}")]
        public string Bar
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty(name: "foo", typeJson: "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}")]
        public Very Foo
        {
            get => GetInstanceProperty<Very>();
        }
    }
}