using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IPrivatelyImplemented), fullyQualifiedName: "jsii-calc.compliance.IPrivatelyImplemented")]
    internal sealed class IPrivatelyImplementedProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IPrivatelyImplemented
    {
        private IPrivatelyImplementedProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "success", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool Success
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
