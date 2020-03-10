using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IPublicInterface2), fullyQualifiedName: "jsii-calc.compliance.IPublicInterface2")]
    internal sealed class IPublicInterface2Proxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IPublicInterface2
    {
        private IPublicInterface2Proxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "ciao", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public string Ciao()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }
    }
}
