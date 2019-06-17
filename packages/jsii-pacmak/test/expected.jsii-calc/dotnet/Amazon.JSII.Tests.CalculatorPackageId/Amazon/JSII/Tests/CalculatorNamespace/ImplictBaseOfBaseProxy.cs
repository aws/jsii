using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IImplictBaseOfBase), fullyQualifiedName: "jsii-calc.ImplictBaseOfBase")]
    internal sealed class ImplictBaseOfBaseProxy : DeputyBase, IImplictBaseOfBase
    {
        private ImplictBaseOfBaseProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: experimental
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
