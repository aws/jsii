using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Generates random numbers.</summary>
    [JsiiTypeProxy(typeof(IIRandomNumberGenerator), "jsii-calc.IRandomNumberGenerator")]
    internal sealed class IRandomNumberGeneratorProxy : DeputyBase, IIRandomNumberGenerator
    {
        private IRandomNumberGeneratorProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Returns another random number.</summary>
        /// <returns>A random number.</returns>
        [JsiiMethod("next", "{\"primitive\":\"number\"}", "[]")]
        public double Next()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}