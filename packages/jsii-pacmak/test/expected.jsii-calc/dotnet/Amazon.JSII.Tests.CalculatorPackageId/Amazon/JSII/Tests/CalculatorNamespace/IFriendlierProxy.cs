using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Even friendlier classes can implement this interface.</summary>
    [JsiiTypeProxy(typeof(IIFriendlier), "jsii-calc.IFriendlier")]
    internal sealed class IFriendlierProxy : DeputyBase, IIFriendlier
    {
        private IFriendlierProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Say farewell.</summary>
        [JsiiMethod("farewell", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        public string Farewell()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Say goodbye.</summary>
        /// <returns>A goodbye blessing.</returns>
        [JsiiMethod("goodbye", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        public string Goodbye()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Say hello!</summary>
        [JsiiMethod("hello", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        public string Hello()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}