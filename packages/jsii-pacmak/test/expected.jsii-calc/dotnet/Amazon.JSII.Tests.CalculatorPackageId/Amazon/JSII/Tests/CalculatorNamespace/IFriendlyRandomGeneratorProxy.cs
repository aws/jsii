using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIFriendlyRandomGenerator), "jsii-calc.IFriendlyRandomGenerator")]
    internal sealed class IFriendlyRandomGeneratorProxy : DeputyBase, IIFriendlyRandomGenerator
    {
        private IFriendlyRandomGeneratorProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Returns another random number.</summary>
        /// <returns>A random number.</returns>
        [JsiiMethod("next", "{\"type\":{\"primitive\":\"number\"}}", "[]")]
        public double Next()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        /// <summary>Say hello!</summary>
        [JsiiMethod("hello", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        public string Hello()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}