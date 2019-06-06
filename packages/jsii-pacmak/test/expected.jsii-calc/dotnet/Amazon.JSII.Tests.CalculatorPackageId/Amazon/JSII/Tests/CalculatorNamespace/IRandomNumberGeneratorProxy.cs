using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Generates random numbers.</summary>
    /// <remarks>stability: Experimental</remarks>
    [JsiiTypeProxy(nativeType: typeof(IIRandomNumberGenerator), fullyQualifiedName: "jsii-calc.IRandomNumberGenerator")]
    internal sealed class IRandomNumberGeneratorProxy : DeputyBase, IIRandomNumberGenerator
    {
        private IRandomNumberGeneratorProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Returns another random number.</summary>
        /// <returns>A random number.</returns>
        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "next", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public double Next()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}