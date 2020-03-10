using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance.InterfaceInNamespaceIncludesClasses
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IHello), fullyQualifiedName: "jsii-calc.compliance.InterfaceInNamespaceIncludesClasses.Hello")]
    internal sealed class HelloProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.InterfaceInNamespaceIncludesClasses.IHello
    {
        private HelloProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}")]
        public double Foo
        {
            get => GetInstanceProperty<double>();
        }
    }
}
