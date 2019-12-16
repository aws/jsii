using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IImplictBaseOfBase), fullyQualifiedName: "jsii-calc.ImplictBaseOfBase")]
    internal sealed class ImplictBaseOfBaseProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IImplictBaseOfBase
    {
        private ImplictBaseOfBaseProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "goo", typeJson: "{\"primitive\":\"date\"}")]
        public System.DateTime Goo
        {
            get => GetInstanceProperty<System.DateTime>();
        }

        /// <summary></summary>
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"string\"}")]
        public string Bar
        {
            get => GetInstanceProperty<string>();
        }

        /// <summary></summary>
        [JsiiProperty(name: "foo", typeJson: "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}")]
        public Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.Very Foo
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.Very>();
        }
    }
}
