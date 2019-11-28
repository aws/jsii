using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Returns a subclass of a known class which implements an interface.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IReturnJsii976), fullyQualifiedName: "jsii-calc.IReturnJsii976")]
    internal sealed class IReturnJsii976Proxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IReturnJsii976
    {
        private IReturnJsii976Proxy(ByRefValue reference): base(reference)
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
