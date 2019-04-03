using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: Even friendlier classes can implement this interface.</remarks>
    [JsiiTypeProxy(typeof(IIFriendlier), "jsii-calc.IFriendlier")]
    internal sealed class IFriendlierProxy : DeputyBase, IIFriendlier
    {
        private IFriendlierProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>summary: Say farewell.</remarks>
        [JsiiMethod("farewell", "{\"primitive\":\"string\"}", "[]")]
        public string Farewell()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <remarks>
        /// returns: A goodbye blessing.
        /// summary: Say goodbye.
        /// </remarks>
        [JsiiMethod("goodbye", "{\"primitive\":\"string\"}", "[]")]
        public string Goodbye()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <remarks>summary: Say hello!</remarks>
        [JsiiMethod("hello", "{\"primitive\":\"string\"}", "[]")]
        public string Hello()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}