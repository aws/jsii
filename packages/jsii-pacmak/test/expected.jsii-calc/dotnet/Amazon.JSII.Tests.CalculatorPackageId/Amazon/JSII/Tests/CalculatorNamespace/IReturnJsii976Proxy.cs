using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Returns a subclass of a known class which implements an interface.</summary>
    [JsiiTypeProxy(nativeType: typeof(IReturnJsii976), fullyQualifiedName: "jsii-calc.IReturnJsii976")]
    internal sealed class IReturnJsii976Proxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IReturnJsii976
    {
        private IReturnJsii976Proxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}")]
        public double Foo
        {
            get => GetInstanceProperty<double>();
        }
    }
}
