using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IPublicInterface), fullyQualifiedName: "jsii-calc.IPublicInterface")]
    internal sealed class IPublicInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IPublicInterface
    {
        private IPublicInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "bye", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public string Bye()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }
    }
}
