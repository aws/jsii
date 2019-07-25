using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>The general contract for a concrete number.</summary>
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IIDoublable), fullyQualifiedName: "@scope/jsii-calc-lib.IDoublable")]
    [System.Obsolete()]
    internal sealed class IDoublableProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IIDoublable
    {
        private IDoublableProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "doubleValue", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        public double DoubleValue
        {
            get => GetInstanceProperty<double>();
        }
    }
}
