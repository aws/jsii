using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>The general contract for a concrete number.</summary>
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IDoublable), fullyQualifiedName: "@scope/jsii-calc-lib.IDoublable")]
    [System.Obsolete()]
    internal sealed class IDoublableProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IDoublable
    {
        private IDoublableProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
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
