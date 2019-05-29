using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>The general contract for a concrete number.</summary>
    [JsiiTypeProxy(nativeType: typeof(IIDoublable), fullyQualifiedName: "@scope/jsii-calc-lib.IDoublable")]
    internal sealed class IDoublableProxy : DeputyBase, IIDoublable
    {
        private IDoublableProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "doubleValue", typeJson: "{\"primitive\":\"number\"}")]
        public double DoubleValue
        {
            get => GetInstanceProperty<double>();
        }
    }
}
