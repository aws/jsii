using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <remarks>summary: The general contract for a concrete number.</remarks>
    [JsiiTypeProxy(typeof(IIDoublable), "@scope/jsii-calc-lib.IDoublable")]
    internal sealed class IDoublableProxy : DeputyBase, IIDoublable
    {
        private IDoublableProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("doubleValue", "{\"primitive\":\"number\"}")]
        public double DoubleValue
        {
            get => GetInstanceProperty<double>();
        }
    }
}