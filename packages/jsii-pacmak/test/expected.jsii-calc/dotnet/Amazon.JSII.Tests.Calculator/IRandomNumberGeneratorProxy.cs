using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>Generates random numbers.</summary>
    [JsiiInterfaceProxy(typeof(IIRandomNumberGenerator), "jsii-calc.IRandomNumberGenerator")]
    internal class IRandomNumberGeneratorProxy : DeputyBase, IIRandomNumberGenerator
    {
        private IRandomNumberGeneratorProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Returns another random number.</summary>
        /// <returns>A random number.</returns>
        [JsiiMethod("next", "{\"primitive\":\"number\"}", "[]")]
        public virtual double Next()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}