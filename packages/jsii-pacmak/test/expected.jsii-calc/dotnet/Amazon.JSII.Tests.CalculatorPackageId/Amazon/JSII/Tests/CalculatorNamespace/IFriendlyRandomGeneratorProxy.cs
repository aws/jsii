using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IIFriendlyRandomGenerator), fullyQualifiedName: "jsii-calc.IFriendlyRandomGenerator")]
    internal sealed class IFriendlyRandomGeneratorProxy : DeputyBase, IIFriendlyRandomGenerator
    {
        private IFriendlyRandomGeneratorProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Returns another random number.</summary>
        /// <returns>A random number.</returns>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "next", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public double Next()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        /// <summary>Say hello!</summary>
        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiMethod(name: "hello", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        [System.Obsolete()]
        public string Hello()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}
