using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIFriendlyRandomGenerator), "jsii-calc.IFriendlyRandomGenerator")]
    internal sealed class IFriendlyRandomGeneratorProxy : DeputyBase, IIFriendlyRandomGenerator
    {
        private IFriendlyRandomGeneratorProxy(ByRefValue reference): base(reference)
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

        /// <remarks>summary: Say hello!.</remarks>
        [JsiiMethod("hello", "{\"primitive\":\"string\"}", "[]")]
        public string Hello()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}