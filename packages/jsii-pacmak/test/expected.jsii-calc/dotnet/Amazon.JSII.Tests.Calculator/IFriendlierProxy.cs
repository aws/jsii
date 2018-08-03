using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>Even friendlier classes can implement this interface.</summary>
    [JsiiInterfaceProxy(typeof(IIFriendlier), "jsii-calc.IFriendlier")]
    internal class IFriendlierProxy : DeputyBase, IIFriendlier
    {
        private IFriendlierProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Say goodbye.</summary>
        /// <returns>A goodbye blessing.</returns>
        [JsiiMethod("goodbye", "{\"primitive\":\"string\"}", "[]")]
        public virtual string Goodbye()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Say farewell.</summary>
        [JsiiMethod("farewell", "{\"primitive\":\"string\"}", "[]")]
        public virtual string Farewell()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Say hello!</summary>
        [JsiiMethod("hello", "{\"primitive\":\"string\"}", "[]")]
        public virtual string Hello()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}