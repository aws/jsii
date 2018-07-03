using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiInterfaceProxy("jsii-calc", "jsii$jsii_calc$.IFriendlyRandomGenerator")]
    internal class IFriendlyRandomGeneratorProxy : DeputyBase, IIFriendlyRandomGenerator
    {
        private IFriendlyRandomGeneratorProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Returns another random number.</summary>
        /// <returns>A random number.</returns>
        [JsiiMethod("next", "{\"primitive\":\"number\"}", "[]")]
        public virtual double Next()
        {
            return InvokeMethod<double>(new object[]{});
        }

        /// <summary>Say hello!</summary>
        [JsiiMethod("hello", "{\"primitive\":\"string\"}", "[]")]
        public virtual string Hello()
        {
            return InvokeMethod<string>(new object[]{});
        }
    }
}