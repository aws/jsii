using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IImplictBaseOfBase), fullyQualifiedName: "jsii-calc.compliance.ImplictBaseOfBase")]
    internal sealed class ImplictBaseOfBaseProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IImplictBaseOfBase
    {
        private ImplictBaseOfBaseProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "goo", typeJson: "{\"primitive\":\"date\"}")]
        public System.DateTime Goo
        {
            get => GetInstanceProperty<System.DateTime>();
        }

        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"string\"}")]
        public string Bar
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty(name: "foo", typeJson: "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}")]
        public Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.Very Foo
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.Very>();
        }
    }
}
