using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IPrivatelyImplemented), fullyQualifiedName: "jsii-calc.IPrivatelyImplemented")]
    internal sealed class IPrivatelyImplementedProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IPrivatelyImplemented
    {
        private IPrivatelyImplementedProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "success", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool Success
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
