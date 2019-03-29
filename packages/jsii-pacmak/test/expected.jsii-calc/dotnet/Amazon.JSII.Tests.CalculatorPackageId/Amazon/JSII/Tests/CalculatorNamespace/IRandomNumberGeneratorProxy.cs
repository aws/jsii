using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: Generates random numbers.</remarks>
    [JsiiTypeProxy(typeof(IIRandomNumberGenerator), "jsii-calc.IRandomNumberGenerator")]
    internal sealed class IRandomNumberGeneratorProxy : DeputyBase, IIRandomNumberGenerator
    {
        private IRandomNumberGeneratorProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// returns: A random number.
        /// summary: Returns another random number.
        /// </remarks>
        [JsiiMethod("next", "{\"primitive\":\"number\"}", "[]")]
        public double Next()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}