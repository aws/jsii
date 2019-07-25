using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IIPublicInterface), fullyQualifiedName: "jsii-calc.IPublicInterface")]
    internal sealed class IPublicInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface
    {
        private IPublicInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "bye", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public string Bye()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}
