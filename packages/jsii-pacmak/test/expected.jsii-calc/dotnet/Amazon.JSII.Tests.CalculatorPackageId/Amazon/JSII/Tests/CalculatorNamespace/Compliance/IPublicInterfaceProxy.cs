using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IPublicInterface), fullyQualifiedName: "jsii-calc.compliance.IPublicInterface")]
    internal sealed class IPublicInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IPublicInterface
    {
        private IPublicInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "bye", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public string Bye()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }
    }
}
