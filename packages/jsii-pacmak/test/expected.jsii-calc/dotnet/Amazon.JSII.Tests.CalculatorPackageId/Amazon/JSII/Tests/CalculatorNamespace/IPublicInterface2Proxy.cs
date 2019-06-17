using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IIPublicInterface2), fullyQualifiedName: "jsii-calc.IPublicInterface2")]
    internal sealed class IPublicInterface2Proxy : DeputyBase, IIPublicInterface2
    {
        private IPublicInterface2Proxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "ciao", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public string Ciao()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}
