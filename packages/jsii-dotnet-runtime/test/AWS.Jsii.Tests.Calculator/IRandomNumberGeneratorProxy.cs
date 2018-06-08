using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    /// <summary>Generates random numbers.</summary>
    [JsiiInterfaceProxy("jsii-calc", "jsii$jsii_calc$.IRandomNumberGenerator")]
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
            return InvokeMethod<double>(new object[]{});
        }
    }
}