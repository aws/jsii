using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Generates random numbers.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IRandomNumberGenerator), fullyQualifiedName: "jsii-calc.IRandomNumberGenerator")]
    internal sealed class IRandomNumberGeneratorProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IRandomNumberGenerator
    {
        private IRandomNumberGeneratorProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Returns another random number.</summary>
        /// <returns>A random number.</returns>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "next", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public double Next()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }
    }
}
